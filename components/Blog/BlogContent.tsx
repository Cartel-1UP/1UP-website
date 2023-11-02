'use client'

import { useGetBlog } from '@/actions/hive/get-blog'
import { useGetComments } from '@/actions/hive/get-comments'
import { useGetFollowing } from '@/actions/hive/get-following'
import { useGetUserProfile } from '@/actions/hive/get-userprofile'
import CommentEditor from '@/components/ui/CommentEditor/CommentEditor'
import { VoteSlider } from '@/components/ui/VoteSlider/VoteSlider'
import { formatedDate } from '@/utils/methods/formateDate'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconArrowDown, IconHeart, IconMessage } from '@tabler/icons'
import { Custom, KeychainKeyTypes, KeychainSDK } from 'keychain-sdk'
import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Markdown } from '../ui/Markdown/Markdown'
import { NotificationText } from '../ui/ProgressBar/ProgressBar'
import { BlogContentSkeleton } from './BlogContentSkeleton'
import Comment from './Comment/Comment'
import useStyles from './style'

type Props = {
  permlink: string
  author: string
}

export function BlogContent({ permlink, author }: Props) {
  const { classes, theme } = useStyles()
  const queryCache = useQueryClient()
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)
  const endElementRef = useRef<HTMLDivElement>(null)
  const authorized = useAuthorizationStore((state: { authorized: boolean }) => state.authorized)

  const [isVote, setIsVote] = useState(false)
  const [isComment, setIsComment] = useState(false)
  const [successfullUpvoted, setSuccessfullUpvoted] = useState(false)
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem('username') ? localStorage.getItem('username') : ''
  )

  const { data: blogData, isLoading: isLodingBlogData } = useGetBlog({ permlink, author })
  const {
    data: commentsData,
    isLoading: isLodingCommentsData,
    isFetching: isFetchingData,
  } = useGetComments({ permlink, author })
  const { data: userProfileData, isLoading: isLodingUserProfileData } = useGetUserProfile(author)
  const { data: following } = useGetFollowing(username ? username : '')

  const numericalValue = parseFloat(blogData?.data?.result?.pending_payout_value)
  const roundedValue = Math.ceil(numericalValue * 100) / 100
  const formattedCurrency = `$${roundedValue.toFixed(2)}`

  const date = new Date(blogData?.data?.result.created)

  const handlePostFollow = useMutation<void, any, void, unknown>(
    async () => {
      const keychain = new KeychainSDK(window)
      const isFollowing = following?.includes(author)
      const formParamsAsObject = {
        data: {
          username: `${username}`,
          id: 'follow',
          method: KeychainKeyTypes.posting,
          json: `[    "follow",    {       "follower": "${username}",       "following": "${author}",       "what": [          \"${
            isFollowing ? '' : 'blog'
          }\"       ]    } ]`,
          required_posting_auths: [`${username}`],
          display_msg: isFollowing ? 'Unfollow' : 'Follow',
        },
      }
      await keychain.custom(formParamsAsObject.data as Custom)
    },
    {
      onSuccess: () => {
        const isFollowing = following?.includes(author)
        showNotification({
          autoClose: 7000,
          title: 'Success',
          message: (
            <NotificationText
              message={`You ${isFollowing ? 'unfollowed' : 'followed'}: ${author}`}
              time={7000}
            />
          ),
          styles: (theme) => ({
            root: {
              backgroundColor: '#072f37',
              borderColor: '#072f37',
              '&::before': { backgroundColor: theme.white },
            },
            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: '#04191d' },
            },
          }),
          loading: false,
          onClose: () => {
            queryCache.refetchQueries('following-data')
          },
        })
      },
      onError: (e: any) => {
        showNotification({
          autoClose: 7000,
          title: 'Warning',
          message: (
            <NotificationText
              message={`You already upvoted this post with same wieght`}
              time={7000}
            />
          ),
          styles: (theme) => ({
            root: {
              backgroundColor: '#072f37',
              borderColor: '#072f37',
              '&::before': { backgroundColor: theme.white },
            },
            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: '#04191d' },
            },
          }),
          loading: false,
          onClose: () => {
            queryCache.refetchQueries('following-data')
          },
        })
      },
    }
  )

  return (
    <>
      {isLodingBlogData || isLodingCommentsData || isLodingUserProfileData ? (
        <>
          <BlogContentSkeleton />
        </>
      ) : (
        <>
          {isMd ? (
            <>
              <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <Card p="md" radius={0} className={classes.cardHeader}>
                  <Container>
                    <Grid grow>
                      <Grid.Col span={10}>
                        <Text size={28} fw={700} sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                          {blogData?.data?.result.title}
                        </Text>
                        <Text
                          color="dimmed"
                          size="md"
                          fw={600}
                          mt={5}
                          sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                        >
                          {`${blogData?.time} min read • ${formatedDate(date)}`}
                        </Text>
                        <Space h="sm" />
                        <Badge c={'#ffffff'} bg={'#02505f'} radius={5} mr={5}>
                          comments {blogData?.data?.result.children}
                        </Badge>
                        <Badge c={'#ffffff'} bg={'#02505f'} radius={5}>
                          votes {blogData?.data?.result.stats.total_votes}
                        </Badge>
                      </Grid.Col>
                    </Grid>
                  </Container>
                </Card>
                <Card withBorder p="md" pt={25} radius={0} className={classes.card}>
                  <Container>
                    {blogData?.data?.result?.body ? (
                      <Markdown text={blogData?.data?.result?.body} />
                    ) : (
                      'Error'
                    )}
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
                                : showNotification({
                                    autoClose: 3000,
                                    title: 'Warning',
                                    message: (
                                      <NotificationText
                                        message="You have to login to upvote post!"
                                        time={3000}
                                      />
                                    ),
                                    styles: (theme) => ({
                                      root: {
                                        backgroundColor: '#072f37',
                                        borderColor: '#072f37',
                                        '&::before': { backgroundColor: theme.white },
                                      },
                                      title: { color: theme.white },
                                      description: { color: theme.white },
                                      closeButton: {
                                        color: theme.white,
                                        '&:hover': { backgroundColor: '#04191d' },
                                      },
                                    }),
                                    loading: false,
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
                                : showNotification({
                                    autoClose: 3000,
                                    title: 'Warning',
                                    message: (
                                      <NotificationText
                                        message="You have to login to comment post!"
                                        time={3000}
                                      />
                                    ),
                                    styles: (theme) => ({
                                      root: {
                                        backgroundColor: '#072f37',
                                        borderColor: '#072f37',
                                        '&::before': { backgroundColor: theme.white },
                                      },
                                      title: { color: theme.white },
                                      description: { color: theme.white },
                                      closeButton: {
                                        color: theme.white,
                                        '&:hover': { backgroundColor: '#04191d' },
                                      },
                                    }),
                                    loading: false,
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
                      <VoteSlider
                        permlink={blogData?.data?.result.permlink}
                        author={blogData?.data?.result.author}
                        setIsVote={setIsVote}
                        setSuccessfullUpvoted={setSuccessfullUpvoted}
                        queryKey={'post-data'}
                      />
                    )}
                    {isComment && (
                      <CommentEditor
                        setIsComment={setIsComment}
                        permlink={blogData?.data?.result.permlink}
                        parentAuthor={blogData?.data?.result.author}
                        parentPermlink={''}
                      />
                    )}
                  </Card>
                </div>
                <div ref={endElementRef}></div>
                {!isFetchingData && <Comment comments={commentsData} />}
              </SimpleGrid>
            </>
          ) : (
            <>
              <Grid>
                <Grid.Col span={9}>
                  <Space h="xl" />
                  <Space h="md" />
                  <Card p="md" radius={0} className={classes.cardHeader}>
                    <Container>
                      <Grid grow>
                        <Grid.Col span={10}>
                          <Text size={28} fw={700} sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                            {blogData?.data?.result.title}
                          </Text>
                          <Text
                            color="dimmed"
                            size="md"
                            fw={600}
                            mt={5}
                            sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                          >
                            {`${blogData?.time} min read • ${formatedDate(date)}`}
                          </Text>
                          <Space h="sm" />
                          <Badge c={'#ffffff'} bg={'#02505f'} radius={5} mr={5}>
                            comments {blogData?.data?.result.children}
                          </Badge>
                          <Badge c={'#ffffff'} bg={'#02505f'} radius={5}>
                            votes {blogData?.data?.result.stats.total_votes}
                          </Badge>
                        </Grid.Col>
                      </Grid>
                    </Container>
                  </Card>
                  <Card withBorder p="md" pt={25} radius={0} className={classes.card}>
                    <Container>
                      {blogData?.data?.result?.body ? (
                        <Markdown text={blogData?.data?.result?.body} />
                      ) : (
                        'Error'
                      )}
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
                                  : showNotification({
                                      autoClose: 3000,
                                      title: 'Warning',
                                      message: (
                                        <NotificationText
                                          message="You have to login to upvote post!"
                                          time={3000}
                                        />
                                      ),
                                      styles: (theme) => ({
                                        root: {
                                          backgroundColor: '#072f37',
                                          borderColor: '#072f37',
                                          '&::before': { backgroundColor: theme.white },
                                        },
                                        title: { color: theme.white },
                                        description: { color: theme.white },
                                        closeButton: {
                                          color: theme.white,
                                          '&:hover': { backgroundColor: '#04191d' },
                                        },
                                      }),
                                      loading: false,
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
                                  : showNotification({
                                      autoClose: 3000,
                                      title: 'Warning',
                                      message: (
                                        <NotificationText
                                          message="You have to login to comment post!"
                                          time={3000}
                                        />
                                      ),
                                      styles: (theme) => ({
                                        root: {
                                          backgroundColor: '#072f37',
                                          borderColor: '#072f37',
                                          '&::before': { backgroundColor: theme.white },
                                        },
                                        title: { color: theme.white },
                                        description: { color: theme.white },
                                        closeButton: {
                                          color: theme.white,
                                          '&:hover': { backgroundColor: '#04191d' },
                                        },
                                      }),
                                      loading: false,
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
                  {!isFetchingData && <Comment comments={commentsData} />}
                  {!isMd && (
                    <Card withBorder p="xl" className={classes.cardFooter}>
                      <Container></Container>
                    </Card>
                  )}
                </Grid.Col>
                <Grid.Col span={3}>
                  <div style={{ position: 'sticky', top: '60px' }}>
                    <Space h="xl" />
                    <Space h="md" />
                    <Card p="xl" radius={5}>
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
                        disabled={!authorized || username === author}
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
                </Grid.Col>
              </Grid>
            </>
          )}
        </>
      )}
    </>
  )
}
