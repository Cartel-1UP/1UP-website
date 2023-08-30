'use client'
import { ActionIcon, Avatar, Badge, Box, Button, Card, Container, Grid, Group, SimpleGrid, Space, Text, Title } from '@mantine/core';
import { useMediaQuery, useScrollIntoView } from '@mantine/hooks';
import { IconHeart, IconMessage } from '@tabler/icons';
import { Custom, KeychainKeyTypes, KeychainSDK } from 'keychain-sdk';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Article } from '../../../types/blog.interface';
import { User } from '../../../types/user.interface';
import { fetchFollowingAccounts } from '../../../utils/actions/user';
import { dateRefactor } from '../../../utils/methods/dateRefactor';
import { useAuthorizationStore } from '../../../zustand/stores/useAuthorizationStore';
import { useNotifiactionStore } from '../../../zustand/stores/useNotificationStore';
import CommentEditor from '../../ui/CommentEditor/CommentEditor';
import { VoteSlider } from '../../ui/VoteSlider/VoteSlider';
import CommentCard from '../CommentCard/CommentCard';

import { Markdown } from '../MarkdownReplacer/Markdown';
import useStyles from './style';

interface Props {
  article: {
    data: Article,
    time: number
  };
  user: {
    data: User
  }
  comments: any,
  permlink: string,
  username: string,
}

export function ContentCard({ ...props }: Props) {
  const { classes, theme } = useStyles();
  const laptop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const profile = props?.user.data.result.metadata.profile;
  const article = props?.article.data.result;
  const user = props?.user.data.result;
  const [isVote, setIsVote] = useState(false)
  const [isComment, setIsComment] = useState(false)
  const [successfullUpvoted, setSuccessfullUpvoted] = useState(false)
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  const [color, setColor] = useState("grey")

  const addSnackbar = useNotifiactionStore((state) => state.addSnackbar);
  const authorized = useAuthorizationStore((state: { authorized: boolean; }) => state.authorized)
  const { data: following } = useQuery('following-data', () => fetchFollowingAccounts(props.username));

  const handlePostFollow = useMutation<void, any, void, unknown>(
    async () => {

      const keychain = new KeychainSDK(window);
      const formParamsAsObject = {
        "data": {
          "username": "kwskicky",
          "id": "follow",
          "method": KeychainKeyTypes.posting,
          "json": `[    \"follow\",    {       \"follower\": \"${props.username}\",       \"following\": \"${user.name}\",       \"what\": [          \"blog\"       ]    } ]`,
          "display_msg": "Follow"
        }
      }
      await keychain.custom(formParamsAsObject.data as Custom).then(
        (response) => {
          console.log(response)
        }
      );
    },
    {
      onSuccess: () => {
        addSnackbar({
          id: '3',
          title: 'Success',
          message: 'Your followed corectly',
          queryKey: 'post-data'
        });
      },
      onError: (e: any) => {
        console.log(e);
      }
    }
  );

  return (
    <>
      <Space h="xl" />
      <Grid grow>
        <Grid.Col span={laptop ? 12 : 9}>
          <SimpleGrid cols={1} spacing={0} >
            <Card p="md" radius={0} className={classes.cardHeader}>
              <Grid grow>
                <Grid.Col span={10}>
                  <Title order={2}>
                    {article.title}<Text span fz="sm" inherit style={{ verticalAlign: 'middle' }}> • {dateRefactor(article.created.slice(0, 10))}</Text>
                  </Title>
                  <Space h="md" />
                  <Badge color="gray" variant="outline" size="md">comments {article.children}</Badge>
                  <Badge color="gray" variant="outline" ml={10} size="md">votes {article.stats.total_votes}</Badge>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Box
                    sx={(theme) => ({
                      backgroundColor: theme.colors.gray[0],
                      textAlign: 'center',
                      borderRadius: theme.radius.md,
                    })}
                  >
                    <Text className={classes.text}>
                      {props.article.time} MINS READ
                    </Text>
                  </Box>
                </Grid.Col>
              </Grid>
            </Card>
            <Card withBorder p="md" radius={0} className={classes.card}>
              <Container>
                <Markdown text={article.body} />
              </Container>
            </Card>

            <div style={{ position: 'sticky', bottom: '0' }}>
              <Card p="md" radius={0} className={classes.cardSticky}>
                <Container className={classes.metadataContainer} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Group style={{ display: 'flex', alignItems: 'center' }}>
                    <Group spacing={3}>
                      <ActionIcon
                        variant="transparent"
                        onClick={() => setIsVote(!isVote)}
                        onMouseEnter={() => (setColor('red'))}
                        onMouseLeave={() => (setColor('grey'))}
                        disabled={successfullUpvoted || !authorized}
                      >
                        <IconHeart color={successfullUpvoted ? 'red' : color} size="1rem" />
                      </ActionIcon>
                      <Text color="dimmed" size={"md"}>
                        {article.active_votes.length}
                      </Text>
                    </Group>
                    <Group spacing={3}>
                      <ActionIcon
                        variant="transparent"
                        onClick={() => setIsComment(!isComment)}
                        disabled={!authorized}
                      >
                        <IconMessage color="grey" size={16} />
                      </ActionIcon>
                      <Text color="dimmed" size={"md"}>
                        {article.children}
                      </Text>
                    </Group>
                    <Text color="dimmed" size={"md"} align={"end"}>
                      {article.pending_payout_value}
                    </Text>
                  </Group>
                  {/* <ActionIcon color="dark" onClick={() => scrollIntoView({ alignment: 'end' })}>
                  <IconArrowDown size="1.125rem" />
                </ActionIcon> */}
                </Container>
                {
                  isVote &&
                  <Grid.Col span={12}>
                    <VoteSlider permlink={article.permlink} author={article.author} setIsVote={setIsVote} setSuccessfullUpvoted={setSuccessfullUpvoted} queryKey={'post-data'} />
                  </Grid.Col>
                }
                {
                  isComment &&
                  <Grid.Col span={12}>
                    <CommentEditor setIsComment={setIsComment} permlink={article.permlink} parentAuthor={article.author} parentPermlink={''} />
                  </Grid.Col>
                }

              </Card>
            </div>
            {/* <Editor /> */}
            <CommentCard comments={props.comments} permlink={props.permlink} article={article} queryKey={'comments-data'} />
          </SimpleGrid>

        </Grid.Col>
        <Grid.Col span={laptop ? 12 : 3}>
          {!laptop &&
            <div style={{ position: 'sticky', top: '10px' }}>
              <Card withBorder p="xl" radius="md" className={classes.card} >
                {
                  profile.cover_image ?
                    <Card.Section sx={{ backgroundImage: `url(${profile.cover_image})`, height: 140 }} />
                    :
                    <Card.Section sx={{ backgroundColor: '#25262B', height: 140 }} />
                }
                <Avatar src={profile.profile_image} size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
                <Text align="center" size="lg" weight={500} mt="sm">
                  {user.name}
                </Text>
                <Text align="center" size="sm" color="dimmed">
                  {profile.about}
                </Text>
                <Grid grow pt={25}>
                  <Grid.Col span={4}>
                    <Text align="center" size="sm" color="dimmed">
                      Followers
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text align="center" size="sm" color="dimmed">
                      Follows
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text align="center" size="sm" color="dimmed">
                      Posts
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text align="center" size="lg" weight={500} pt={0}>
                      {user.stats.followers}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text align="center" size="lg" weight={500}>
                      {user.stats.following}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text align="center" size="lg" weight={500}>
                      {user.post_count}
                    </Text>
                  </Grid.Col>
                </Grid>
                <Button
                  disabled={!authorized}
                  fullWidth
                  radius="md"
                  mt="xl"
                  size="md"
                  color={theme.colorScheme === 'dark' ? undefined : 'dark'}
                  onClick={() => handlePostFollow.mutate()}
                >
                  {following?.includes(user.name) ? 'Unfollow' : 'Follow'}
                </Button>
              </Card>
            </div>
          }
        </Grid.Col>
      </Grid>
    </>
  );
}
