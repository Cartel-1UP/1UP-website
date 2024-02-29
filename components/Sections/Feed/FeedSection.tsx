'use client'

import { getFeedBlogs, getRecentBlogs } from '@/actions/hive/get-blogs'
import { NotificationText } from '@/components/ui/ProgressBar/ProgressBar'
import TabButtons from '@/components/ui/TabButtons/TabButtons'
import { Tabs } from '@/enums/blog.enum'
import { HiveArticle } from '@/types/blog.type'
import useSettings from '@/utils/methods/useSettings'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import { ActionIcon, Avatar, Box, Button, Card, Group, SimpleGrid } from '@mantine/core'
import { useScrollIntoView } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconArrowBarRight, IconArrowUp } from '@tabler/icons'
import { useEffect, useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { FeedCard } from './FeedCard'
import { FeedCardSkeleton } from './FeedCardSkeleton'
import useStyles from './style'

type Props = {
  sort: string
  tag?: string
  isCommunity?: boolean
  communityLogo?: string
}

export function FeedSection({ sort, tag, isCommunity, communityLogo }: Props) {
  const { classes, theme } = useStyles()
  const { ...settings } = useSettings();

  const [startAuthor, setStartAuthor] = useState('')
  const [startPermlink, setStartPermlink] = useState('')
  const [posts, setPosts] = useState<any[]>([])
  const [postType, setPostType] = useState(sort)
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [loadingMorePosts, setLoadingMorePosts] = useState(false)
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60 })

  const [username, setUsername] = useState('')
  const authorized = useAuthorizationStore((state: { authorized: boolean }) => state.authorized)
  const userZustand = useAuthorizationStore((state: { username: string }) => state.username)

  const handleTabChange = (tab: string) => {
    setPostType(tab)
    if (scrollRef.current) {
      window.scrollTo({
        top: 0,
      })
    }
  }

  const scrollRef = useRef<HTMLDivElement>(null)

  const loadPosts = useMutation(
    async () => {
      setLoading(true)
      let queryData
      switch (postType) {
        case 'feed':
          queryData = await getFeedBlogs({
            account: username || userZustand,
            sort: postType,
            limit: 10,
          })
          break
        default:
          queryData = await getRecentBlogs({
            tag: tag,
            sort: postType,
            limit: 10,
          })
      }
      setLoading(false)
      return queryData
    },
    {
      onSuccess: (newArticles) => {
        setData(newArticles)
        setPosts([])
        const lastPost = newArticles[newArticles.length - 1]
        setStartAuthor(lastPost.author)
        setStartPermlink(lastPost.permlink)
      },
    }
  )

  const loadMorePosts = useMutation(
    async () => {
      setLoadingMorePosts(true)
      let queryData
      switch (postType) {
        case 'feed':
          queryData = await getFeedBlogs({
            account: username || userZustand,
            sort: 'feed',
            limit: 10,
            start_author: startAuthor,
            start_permlink: startPermlink,
          })
          break
        default:
          queryData = await getRecentBlogs({
            tag: tag,
            sort: postType,
            limit: 10,
            start_author: startAuthor,
            start_permlink: startPermlink,
          })
      }
      setLoadingMorePosts(false)
      return queryData
    },
    {
      onSuccess: (newArticles) => {
        if (newArticles.length < 1) {
          return showNotification({
            autoClose: 3000,
            title: 'Warning',
            message: (
              <NotificationText message={`There is no more ${postType} posts!`} time={3000} />
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
        setPosts((prevPosts) => [...prevPosts, ...newArticles])
        const lastPost = newArticles[newArticles.length - 1]
        setStartAuthor(lastPost.author)
        setStartPermlink(lastPost.permlink)
      },
    }
  )

  useEffect(() => {
    const user = localStorage.getItem('username')
    if (user) {
      setUsername(user)
    }
  }, [])

  useEffect(() => {
    loadPosts.mutate()
  }, [postType, sort])

  useEffect(() => {
    if (data && data.length > 0) {
      const lastPost = data[data.length - 1]
      setStartAuthor(lastPost.author)
      setStartPermlink(lastPost.permlink)
    }
  }, [data])

  return (
    <>
      <SimpleGrid
        cols={1}
        mt={0}
        ref={scrollRef}
        spacing={0}
        breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
      >
        {!settings.isMd && (
          <Card withBorder p="md" radius={0} className={classes.cardHeader}>
            <Group position="apart">
              <div>
                <TabButtons
                  authorized={authorized}
                  defaultTab={Tabs.New}
                  onChange={handleTabChange}
                  isCommunity={isCommunity}
                />
              </div>
              {settings.isMd && <Avatar size={48} color="blue" radius="xl" src={communityLogo} />}
            </Group>
          </Card>
        )}
        {loading || !data || data.length === 0 ? (
          <FeedCardSkeleton />
        ) : (
          data?.map((item: HiveArticle) => <FeedCard article={item} key={item.post_id} />)
        )}
        {posts?.map((item: HiveArticle) => (
          <FeedCard article={item} key={item.post_id} />
        ))}
        {settings.isMd && (
          <div style={{ position: 'sticky', bottom: '0px', zIndex: '999' }}>
            <Card withBorder p="sm" radius={0} className={classes.cardHeader}>
              <Group position="apart">
                <div>
                  <TabButtons
                    authorized={authorized}
                    defaultTab={Tabs.New}
                    onChange={handleTabChange}
                    isCommunity={isCommunity}
                  />
                </div>
                {settings.isMd && <Avatar size={48} color="blue" radius="xl" src={communityLogo} />}
              </Group>
            </Card>
          </div>
        )}
        <Card withBorder p="md" radius={0} className={classes.cardFooter}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="outline"
              color="dark"
              rightIcon={<IconArrowBarRight size="1rem" />}
              onClick={() => loadMorePosts.mutate()}
              loading={loadingMorePosts}
            >
              Load more
            </Button>
            <ActionIcon color="dark" onClick={() => scrollIntoView({ alignment: 'start' })}>
              <IconArrowUp size="1.125rem" />
            </ActionIcon>
          </Box>
        </Card>
      </SimpleGrid>
    </>
  )
}
