'use client'
import { AspectRatio, Avatar, Badge, Card, Container, Grid, Group, Image, Space, Text } from '@mantine/core';
import { IconHeart, IconMessage } from '@tabler/icons';
import Link from 'next/link';
import useStyles from './style';

interface Props {
  article: any;
  tag: string;
}

export function RecentCard({ ...props }: Props) {
  const { classes } = useStyles();
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
          <Link href={'community/' + props.tag + '/post/' + props.article.author + '/' + props.article.permlink} className={classes.link}>
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
        <Grid.Col span={7}>
          <Container>
            {json_metadata.tags ? json_metadata.tags.slice(0, 3).map?.((item: string) => (
              <Badge mr={5} color="gray" key={item}>{item}</Badge>
            )) : null}
          </Container>
        </Grid.Col>
        <Grid.Col span={5} display="flex">
          <Container mr={0} className={classes.metadataContainer}>
            <Group>
              <IconHeart color="grey" size={14} />
              <Text color="dimmed" className={classes.price}>
                {props.article?.active_votes.length}
              </Text>
            </Group>

            <Space w="sm" />
            <IconMessage color="grey" size={14} />
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
    </Card>
  );
}
