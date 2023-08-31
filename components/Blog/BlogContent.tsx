'use client'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore';
import { useNotifiactionStore } from '@/zustand/stores/useNotificationStore';
import { useMediaQuery, useScrollIntoView } from '@mantine/hooks';

import { useGetBlog } from '@/actions/hive/get-blog';
import { useGetComments } from '@/actions/hive/get-comments';
import { useGetFollowing } from '@/actions/hive/get-following';
import { useGetUserProfile } from '@/actions/hive/get-userprofile';
import CommentEditor from '@/components/ui/CommentEditor/CommentEditor';
import { VoteSlider } from '@/components/ui/VoteSlider/VoteSlider';
import { ActionIcon, Avatar, Badge, Box, Button, Card, Center, Container, Grid, Group, SimpleGrid, Skeleton, Space, Text, Title } from '@mantine/core';
import { IconArrowDown, IconHeart, IconMessage } from '@tabler/icons';
import { Custom, KeychainKeyTypes, KeychainSDK } from 'keychain-sdk';
import { useState } from 'react';
import { useMutation } from 'react-query';
import CommentCard from './CommentCard/CommentCard';
import { Markdown } from './Markdown/Markdown';
import useStyles from './style';



type Props = {
  permlink: string,
  author: string
}

export function BlogContent({ permlink, author }: Props) {
  const { classes, theme } = useStyles();
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const [isVote, setIsVote] = useState(false)
  const [isComment, setIsComment] = useState(false)
  const [successfullUpvoted, setSuccessfullUpvoted] = useState(false)
  const [color, setColor] = useState("grey")
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60, });


  const username = useAuthorizationStore((state: { username: string; }) => state.username)
  const addSnackbar = useNotifiactionStore((state) => state.addSnackbar);
  const authorized = useAuthorizationStore((state: { authorized: boolean; }) => state.authorized)

  const { data: blogData, isLoading: isLodingBlogData } = useGetBlog({ permlink, author })
  const { data: commentsData, isLoading: isLodingCommentsData } = useGetComments({ permlink, author })
  const { data: userProfileData, isLoading: isLodingUserProfileData } = useGetUserProfile(author)
  const { data: following } = useGetFollowing(username)


  const numericalValue = parseFloat(blogData?.data?.result?.pending_payout_value);
  const roundedValue = Math.ceil(numericalValue * 100) / 100;
  const formattedCurrency = `$${roundedValue.toFixed(2)}`;

  const handlePostFollow = useMutation<void, any, void, unknown>(
    async () => {
      const keychain = new KeychainSDK(window);
      const formParamsAsObject = {
        "data": {
          "username": "kwskicky",
          "id": "follow",
          "method": KeychainKeyTypes.posting,
          "json": `[    \"follow\",    {       \"follower\": \"${username}\",       \"following\": \"${author}\",       \"what\": [          \"blog\"       ]    } ]`,
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
          queryKey: 'blog-data'
        });
      },
      onError: (e: any) => {
        console.log(e);
      }
    }
  );


  return (
    <>
      {
        (isLodingBlogData || isLodingCommentsData || isLodingUserProfileData) ?
          <>
            <Container fluid className={classes.default}>
              <Container size="lg" sx={{ height: '90vh' }}>
                <Grid grow>
                  <Grid.Col span={isMd ? 12 : 9}>
                    <SimpleGrid cols={1} pt={25} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                      <Card withBorder p="md" radius={0} className={classes.cardHeader}>
                        <Grid grow>
                          <Grid.Col span={10}>
                            <Skeleton height='5vh' />
                          </Grid.Col>
                          <Grid.Col span={2}>
                            <Skeleton height='5vh' />
                          </Grid.Col>
                        </Grid>
                      </Card>
                      <Card withBorder p="md" radius={0} className={classes.card}>
                        <Skeleton height='65vh' />
                      </Card>
                      <Card withBorder p="md" mb={25} radius={0} className={classes.cardFooter}>
                        <Skeleton height={'5vh'} />
                      </Card>
                    </SimpleGrid>
                  </Grid.Col>
                  <Grid.Col span={isMd ? 12 : 3}>
                    <SimpleGrid cols={1} pt={25} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                      <Card withBorder p="xl" radius="md" className={classes.card} >
                        <Center>
                          <Skeleton height={'6vh'} circle mb="xl" />
                        </Center>
                        <Skeleton height={'5vh'} mt={10} />
                        <Skeleton height={'5vh'} mt={10} />
                      </Card>
                    </SimpleGrid>
                  </Grid.Col>
                </Grid>
              </Container>
            </Container>
          </>
          :
          <>
            <Space h="xl" />
            <Grid grow>
              <Grid.Col span={isMd ? 12 : 9}>
                <SimpleGrid cols={1} spacing={0} >
                  <Card p="md" radius={0} className={classes.cardHeader}>
                    <Grid grow>
                      <Grid.Col span={10}>
                        <Title order={2}>
                          {blogData?.data?.result.title}<Text span fz="sm" inherit style={{ verticalAlign: 'middle' }}> </Text>
                        </Title>
                        <Space h="md" />
                        <Badge color="gray" variant="outline" size="md">comments {blogData?.data?.result.children}</Badge>
                        <Badge color="gray" variant="outline" ml={10} size="md">votes {blogData?.data?.result.stats.total_votes}</Badge>
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
                            {blogData?.time} MINS READ
                          </Text>
                        </Box>
                      </Grid.Col>
                    </Grid>
                  </Card>
                  <Card withBorder p="md" radius={0} className={classes.card}>
                    <Container>
                      <Markdown text={blogData?.data?.result.body} />
                    </Container>
                  </Card>
                  <div style={{ position: 'sticky', bottom: '0' }}>
                    <Card p="md" radius={0}>
                      <Container className={classes.metadataContainer}>
                        <Group spacing={1}>
                          <span className={classes.icon}>
                            <IconHeart
                              size={'1rem'}
                              onClick={() => authorized ?
                                setIsVote(!isVote) :
                                addSnackbar({
                                  id: '1',
                                  title: 'Warning',
                                  message: 'You have to login to upvote post!',
                                  queryKey: undefined,
                                  color: 'red'
                                })
                              }
                            />
                          </span>
                          <Text color="dimmed" >
                            {blogData?.data?.result?.active_votes.length}
                          </Text>
                          <Space w="sm" />
                          <span className={classes.icon}>
                            <IconMessage
                              size={'1rem'}
                              onClick={() => authorized ?
                                setIsComment(!isComment) :
                                addSnackbar({
                                  id: '2',
                                  title: 'Warning',
                                  message: 'You have to login to add comment!',
                                  queryKey: undefined,
                                  color: 'red'
                                })
                              }
                            />
                          </span>
                          <Text color="dimmed" >
                            {blogData?.data?.result?.children}
                          </Text>
                          <Space w="sm" />
                          <Text color="dimmed" align={"right"}>
                            {formattedCurrency}
                          </Text>
                        </Group>
                        <Group spacing={1}>
                          <ActionIcon color="dark" onClick={() => scrollIntoView({ alignment: 'end' })}>
                            <IconArrowDown size="1.125rem" />
                          </ActionIcon>
                        </Group>
                      </Container>
                      {
                        isVote &&
                        <Grid.Col span={12}>
                          <VoteSlider permlink={blogData?.data?.result.permlink} author={blogData?.data?.result.author} setIsVote={setIsVote} setSuccessfullUpvoted={setSuccessfullUpvoted} queryKey={'post-data'} />
                        </Grid.Col>
                      }
                      {
                        isComment &&
                        <Grid.Col span={12}>
                          <CommentEditor setIsComment={setIsComment} permlink={blogData?.data?.result.permlink} parentAuthor={blogData?.data?.result.author} parentPermlink={''} />
                        </Grid.Col>
                      }
                    </Card>
                  </div>
                  <CommentCard comments={commentsData} permlink={permlink} article={blogData?.data?.result} queryKey={'comments-data'} />
                </SimpleGrid>
              </Grid.Col>
              <Grid.Col span={isMd ? 12 : 3}>
                {!isMd &&
                  <div style={{ position: 'sticky', top: '10px' }}>
                    <Card withBorder p="xl" radius="md">
                      {
                        userProfileData?.result?.metadata.profile.cover_image ?
                          <Card.Section sx={{ backgroundImage: `url(${userProfileData?.result?.metadata.profile.cover_image})`, height: 140 }} />
                          :
                          <Card.Section sx={{ backgroundColor: '#25262B', height: 140 }} />
                      }
                      <Avatar src={userProfileData?.result?.metadata.profile.profile_image} size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
                      <Text align="center" size="lg" weight={500} mt="sm">
                        {author}
                      </Text>
                      <Text align="center" size="sm" color="dimmed">
                        {userProfileData?.result?.metadata.profile.about}
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
                            {userProfileData?.result?.stats.followers}
                          </Text>
                        </Grid.Col>
                        <Grid.Col span={4}>
                          <Text align="center" size="lg" weight={500}>
                            {userProfileData?.result?.stats.following}
                          </Text>
                        </Grid.Col>
                        <Grid.Col span={4}>
                          <Text align="center" size="lg" weight={500}>
                            {userProfileData?.result?.post_count}
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
                        {following?.includes(author) ? 'Unfollow' : 'Follow'}
                      </Button>
                    </Card>
                  </div>
                }
              </Grid.Col>
            </Grid>
          </>
      }
    </>

  );
}
