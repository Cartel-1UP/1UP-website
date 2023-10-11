'use client'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import { useNotifiactionStore } from '@/zustand/stores/useNotificationStore'
import { useMediaQuery } from '@mantine/hooks'

import { useGetBlog } from '@/actions/hive/get-blog'
import { useGetComments } from '@/actions/hive/get-comments'
import { useGetFollowing } from '@/actions/hive/get-following'
import { useGetUserProfile } from '@/actions/hive/get-userprofile'
import CommentEditor from '@/components/ui/CommentEditor/CommentEditor'
import { VoteSlider } from '@/components/ui/VoteSlider/VoteSlider'
import { dateRefactor } from '@/utils/methods/dateRefactor'
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Skeleton,
  Space,
  Stack,
  Text,
  Title
} from '@mantine/core'
import { IconArrowDown, IconHeart, IconMessage } from '@tabler/icons'
import { Custom, KeychainKeyTypes, KeychainSDK } from 'keychain-sdk'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Markdown } from '../ui/Markdown/Markdown'
import Comment from './Comment/Comment'
import useStyles from './style'

type Props = {
  permlink: string
  author: string
}

export function BlogContent({ permlink, author }: Props) {
  const { classes, theme } = useStyles()
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)
  const [isVote, setIsVote] = useState(false)
  const [isComment, setIsComment] = useState(false)
  const [successfullUpvoted, setSuccessfullUpvoted] = useState(false)
  const queryCache = useQueryClient()

  const endElementRef = useRef<HTMLDivElement>(null)


  const [username, setUsername] = useState<string>('')

  const addSnackbar = useNotifiactionStore((state) => state.addSnackbar)
  const authorized = useAuthorizationStore((state: { authorized: boolean }) => state.authorized)

  const { data: blogData, isLoading: isLodingBlogData } = useGetBlog({ permlink, author })
  const { data: commentsData, isLoading: isLodingCommentsData } = useGetComments({
    permlink,
    author,
  })
  const { data: userProfileData, isLoading: isLodingUserProfileData } = useGetUserProfile(author)
  const { data: following } = useGetFollowing(username)

  const numericalValue = parseFloat(blogData?.data?.result?.pending_payout_value)
  const roundedValue = Math.ceil(numericalValue * 100) / 100
  const formattedCurrency = `$${roundedValue.toFixed(2)}`

  useEffect(() => {
    const user = localStorage.getItem('username')
    if (user) {
      setUsername(user)
    }
  }, [])


  const handlePostFollow = useMutation<void, any, void, unknown>(
    async () => {
      const keychain = new KeychainSDK(window)
      const isFollowing = following?.includes(author)
      const formParamsAsObject = {
        data: {
          username: `${username}`,
          id: 'follow',
          method: KeychainKeyTypes.posting,
          json: `[    "follow",    {       "follower": "${username}",       "following": "${author}",       "what": [          \"${isFollowing ? '' : 'blog'
            }\"       ]    } ]`,
          required_posting_auths: [`${username}`],
          display_msg: isFollowing ? 'Unfollow' : 'Follow',
        },
      }
      await keychain.custom(formParamsAsObject.data as Custom).then(() => {
        const timeout = setTimeout(() => {
          queryCache.invalidateQueries('following-data')
        }, 10000)
        return () => {
          clearTimeout(timeout)
        }
      })
    },
    {
      onSuccess: () => {
        const isFollowing = following?.includes(author)
        addSnackbar({
          id: '3',
          title: 'Success',
          message: `You ${isFollowing ? 'unfollowed' : 'followed'}: ${author}`,
        })
      },
      onError: (e: any) => {
        console.log(e)
      },
    }
  )

  return (
    <>
      {isLodingBlogData || isLodingCommentsData || isLodingUserProfileData ? (
        <>
          <Container fluid className={classes.default}>
            <Container size="lg" sx={{ height: '90vh' }}>
              <Grid grow>
                <Grid.Col span={isMd ? 12 : 9}>
                  <SimpleGrid
                    cols={1}
                    pt={25}
                    spacing={0}
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                  >
                    <Card withBorder p="md" radius={0} className={classes.cardHeader}>
                      <Grid grow>
                        <Grid.Col span={10}>
                          <Skeleton height="5vh" />
                        </Grid.Col>
                        <Grid.Col span={2}>
                          <Skeleton height="5vh" />
                        </Grid.Col>
                      </Grid>
                    </Card>
                    <Card withBorder p="md" radius={0} className={classes.card}>
                      <Skeleton height="65vh" />
                    </Card>
                    <Card withBorder p="md" mb={25} radius={0} className={classes.cardFooter}>
                      <Skeleton height={'5vh'} />
                    </Card>
                  </SimpleGrid>
                </Grid.Col>
                <Grid.Col span={isMd ? 12 : 3}>
                  <SimpleGrid
                    cols={1}
                    pt={25}
                    spacing={0}
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                  >
                    <Card withBorder p="xl" radius="md" className={classes.card}>
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
      ) : (
        <>
          <Space h="xl" />
          <Grid grow>
            <Grid.Col span={isMd ? 12 : 9}>
              <SimpleGrid cols={1} spacing={0}>
                <Card p="md" radius={0} className={classes.cardHeader}>
                  <Container>
                    <Grid grow>
                      <Grid.Col span={10}>
                        <Title color={'dimmed'} order={4}>
                          {dateRefactor(blogData?.data?.result.created.slice(0, 10))}
                        </Title>
                        <Space h="sm" />
                        <Title order={2}>{blogData?.data?.result.title}</Title>
                        <Space h="md" />
                        <Badge c={'#ffffff'} bg={'#02505f'} radius={5} mr={5}>
                          comments {blogData?.data?.result.children}
                        </Badge>
                        <Badge c={'#ffffff'} bg={'#02505f'} radius={5}>
                          votes {blogData?.data?.result.stats.total_votes}
                        </Badge>
                      </Grid.Col>
                      <Grid.Col span={2}>
                        <Box
                          sx={(theme) => ({
                            backgroundColor: '#02505f',
                            color: '#ffffff',
                            textAlign: 'center',
                            borderRadius: theme.radius.sm,
                          })}
                        >
                          <Text className={classes.text}>{blogData?.time} MINS READ</Text>
                        </Box>
                      </Grid.Col>
                    </Grid>
                  </Container>
                </Card>
                <Card withBorder p="md" radius={0} className={classes.card}>
                  <Container>
                    <Markdown text={blogData?.data?.result.body} />
                  </Container>
                </Card>
                <div style={{ position: 'sticky', bottom: '0px' }}>
                  <Card withBorder p="md" radius={0} className={classes.card}>
                    <Container className={classes.metadataContainer}>
                      <Group spacing={1}>
                        <span className={classes.icon}>
                          <IconHeart
                            size={'1rem'}
                            onClick={() =>
                              authorized
                                ? setIsVote(!isVote)
                                : addSnackbar({
                                  id: '1',
                                  title: 'Warning',
                                  message: 'You have to login to upvote post!',
                                  queryKey: undefined,
                                  color: 'red',
                                })
                            }
                          />
                        </span>
                        <Text color="dimmed">{blogData?.data?.result?.active_votes.length}</Text>
                        <Space w="sm" />
                        <span className={classes.icon}>
                          <IconMessage
                            size={'1rem'}
                            onClick={() =>
                              authorized
                                ? setIsComment(!isComment)
                                : addSnackbar({
                                  id: '2',
                                  title: 'Warning',
                                  message: 'You have to login to add comment!',
                                  queryKey: undefined,
                                  color: 'red',
                                })
                            }
                          />
                        </span>
                        <Text color="dimmed">{blogData?.data?.result?.children}</Text>
                        <Space w="sm" />
                        <Text color="dimmed" align={'right'}>
                          {formattedCurrency}
                        </Text>
                      </Group>
                      <Group spacing={1}>
                        <ActionIcon
                          color="dark"
                          onClick={() => {
                            endElementRef.current &&
                              endElementRef.current.scrollIntoView({
                                behavior: 'smooth',
                                block: 'end',
                                inline: 'nearest',
                              })
                          }}
                        >
                          <IconArrowDown size="1.125rem" />
                        </ActionIcon>
                      </Group>
                    </Container>
                    {isVote && (
                      <Grid.Col span={12}>
                        <VoteSlider
                          permlink={blogData?.data?.result.permlink}
                          author={blogData?.data?.result.author}
                          setIsVote={setIsVote}
                          setSuccessfullUpvoted={setSuccessfullUpvoted}
                          queryKey={'post-data'}
                        />
                      </Grid.Col>
                    )}
                    {isComment && (
                      <Grid.Col span={12}>
                        <CommentEditor
                          setIsComment={setIsComment}
                          permlink={blogData?.data?.result.permlink}
                          parentAuthor={blogData?.data?.result.author}
                          parentPermlink={''}
                        />
                      </Grid.Col>
                    )}
                  </Card>
                </div>
                <div ref={endElementRef}></div>
                <Comment comments={commentsData} />
                <Card withBorder p="xl" className={classes.cardFooter}>
                  <Container></Container>
                </Card>
              </SimpleGrid>
            </Grid.Col>
            <Grid.Col span={isMd ? 12 : 3}>
              {!isMd && (
                <div style={{ position: 'sticky', top: '10px' }}>
                  <Card p="xl" radius="md">
                    {userProfileData?.result?.metadata.profile.cover_image ? (
                      <Card.Section
                        sx={{
                          backgroundImage: `url(${userProfileData?.result?.metadata.profile.cover_image})`,
                          height: 140,
                        }}
                      />
                    ) : (
                      <Card.Section sx={{ backgroundColor: '#25262B', height: 140 }} />
                    )}
                    <Avatar
                      src={userProfileData?.result?.metadata.profile.profile_image}
                      size={80}
                      radius={80}
                      mx="auto"
                      mt={-30}
                      className={classes.avatar}
                    />
                    <Text align="center" size="lg" weight={500} mt="sm">
                      {author}
                    </Text>
                    <Text align="center" size="sm" color="dimmed">
                      {userProfileData?.result?.metadata.profile.about}
                    </Text>
                    <Grid grow pt={25}>
                      <Grid.Col span={4}>
                        <Stack spacing={4}>
                          <Text align="center" size="sm" color="dimmed">
                            Followers
                          </Text>
                          <Text align="center" size="lg" weight={500} pt={0}>
                            {userProfileData?.result?.stats.followers}
                          </Text>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Stack spacing={4}>
                          <Text align="center" size="sm" color="dimmed">
                            Follows
                          </Text>
                          <Text align="center" size="lg" weight={500}>
                            {userProfileData?.result?.stats.following}
                          </Text>
                        </Stack>
                      </Grid.Col>
                      <Grid.Col span={4}>
                        <Stack spacing={4}>
                          <Text align="center" size="sm" color="dimmed">
                            Posts
                          </Text>
                          <Text align="center" size="lg" weight={500}>
                            {userProfileData?.result?.post_count}
                          </Text>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                    <Button
                      disabled={!authorized}
                      fullWidth
                      radius="md"
                      mt="xl"
                      size="md"
                      color={'dark'}
                      onClick={() => handlePostFollow.mutate()}
                    >
                      {following?.includes(author) ? 'Unfollow' : 'Follow'}
                    </Button>
                  </Card>
                </div>
              )}
            </Grid.Col>
          </Grid>

          <Space h="xl" />
        </>
      )}
    </>
  )
}
