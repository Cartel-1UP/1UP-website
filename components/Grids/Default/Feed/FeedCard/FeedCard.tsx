'use client'
import { ActionIcon, AspectRatio, Avatar, Badge, Card, Container, Grid, Group, Image, Space, Text, ThemeIcon } from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';
import { IconArrowBack, IconHeart, IconMessage } from '@tabler/icons';
import Link from 'next/link';
import { useState } from 'react';
import CommentEditor from '../../../../CommentEditor/CommentEditor';
import { VoteSlider } from '../../../../VoteSlider/VoteSlider';
import useStyles from './style';

interface Props {
  article: any;
}

export function FeedCard({ ...props }: Props) {

  const { classes, theme } = useStyles();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [isVote, setIsVote] = useState(false)
  const [isComment, setIsComment] = useState(false)
  const date = new Date(props.article.created);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  let forbiddenChars = ["!", "<", ">", "[", "]"];
  let myString = props.article.body;
  let words = myString.split(" ");
  let newWords = words.filter(function (word: string) {
    return !word.split('').some(function (char: string) {
      return forbiddenChars.includes(char);
    });
  });

  let bodyOfArticle = newWords.join(" ");
  let json_metadata = props.article?.json_metadata
  let imageExists

  if (Array.isArray(json_metadata.image) && json_metadata.image.length === 0) {
    imageExists = false
  } else if (!Array.isArray(json_metadata.image)) {
    imageExists = false
  } else {
    imageExists = true
  }

  return (
    <Card key={props.article.post_id} withBorder p="md" radius={0} className={classes.card}>
      <Grid grow>
        <Grid.Col span={7}>
          {props.article.reblogged_by &&
            <>
              <Container>
                <Group spacing={'xs'}>
                  <ThemeIcon variant="light" color="gray" size={'sm'} radius='xl'>
                    <IconArrowBack />
                  </ThemeIcon>
                  <Text size={'sm'} weight={400}>Rebbloged by <Text span c="blue" inherit>@{props.article.reblogged_by[0]}</Text></Text>
                </Group>
                <Space h={'md'} />
              </Container>

            </>
          }

          <Container className={classes.headerContainer}>
            <Avatar color="blue" radius="xl" src={`https://images.hive.blog/u/${props.article?.author}/avatar`} />
            <Badge ml={10} color="dark" variant="outline">{props.article.author_reputation.toFixed()} lvl</Badge>
            {
              props.article.stats.is_pinned && <Badge ml={10} color="red" variant="outline">Pinned</Badge>
            }
            <Text pl={10} color="dimmed" size="xs" transform="uppercase" weight={500}>
              {props.article?.author} - {formattedDate}
            </Text>
          </Container>
          <Link href={`community/${props.article.community}/post/` + props.article.author + '/' + props.article.permlink} className={classes.link}>
            <Container >
              <Text className={classes.title} mt={5}>
                {props.article?.title}
              </Text>
              <Text color="dimmed" size="sm" weight={600} mt={10} className={classes.turncate}>
                {bodyOfArticle}
              </Text>
            </Container>
          </Link>
        </Grid.Col>
        {!mobile &&
          <Grid.Col span={5}>
            <Container >
              <AspectRatio ratio={4 / 3}>
                {imageExists ?
                  <Image radius={10} src={json_metadata.image[0]} /> :
                  <Image
                    src={null}
                    alt="Image placeholder"
                    withPlaceholder
                    radius={10}
                    height={100}
                  />
                }
              </AspectRatio>
            </Container>
          </Grid.Col>
        }
        <Grid.Col span={mobile ? 12 : 7}>
          <Container>
            {json_metadata.tags ? json_metadata.tags.slice(0, 3).map?.((item: string) => (
              <Badge mr={5} color="gray" key={item}>{item}</Badge>
            )) : null}
          </Container>
        </Grid.Col>
        <Grid.Col span={mobile ? 12 : 5} display="flex">
          <Container mr={0} className={classes.metadataContainer}>
            <ActionIcon
              variant="subtle"
              onClick={() => setIsVote(!isVote)}
            >
              <IconHeart color={"grey"} size="1rem" />
            </ActionIcon>
            <Text color="dimmed" className={classes.price}>
              {props.article?.active_votes.length}
            </Text>
            <Space w="sm" />
            <ActionIcon
              variant="subtle"
              onClick={() => setIsComment(!isComment)}
            >
              <IconMessage color="grey" size='1rem' />
            </ActionIcon>

            <Text color="dimmed" className={classes.price}>
              {props.article?.children}
            </Text>
            <Space w="sm" />
            <Text color="dimmed" className={classes.price} align={"right"}>
              {props.article?.pending_payout_value}
            </Text>
          </Container>
        </Grid.Col>
      </Grid>
      {
        isVote &&
        <Grid.Col span={12}>
          <VoteSlider permlink={props.article.permlink} author={props.article.author} setIsVote={setIsVote} />
        </Grid.Col>
      }
      {
        isComment &&
        <Grid.Col span={12}>
          <CommentEditor setIsComment={setIsComment} permlink={props.article.permlink} parentAuthor={props.article.author} parentPermlink={props.article?.parentPermlink} />
        </Grid.Col>
      }
    </Card>
  );
}
