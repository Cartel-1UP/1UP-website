'use clinet'

import CommentEditor from '@/components/ui/CommentEditor/CommentEditor'
import { VoteSlider } from '@/components/ui/VoteSlider/VoteSlider'
import { HiveArticle } from '@/types/blog.type'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import { useNotifiactionStore } from '@/zustand/stores/useNotificationStore'
import {
  Avatar,
  Badge,
  Card,
  Container,
  Grid, Group, Indicator,
  Space,
  Text
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconHeart, IconMessage, IconX } from '@tabler/icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import useStyles from './style'

interface Props {
  article: HiveArticle
  refetch: () => void
  storedBookmarksJSON: any
  setStoredBookmarksJSON: any
}

export function BookmarkCard({ article, refetch, storedBookmarksJSON, setStoredBookmarksJSON }: Props) {
  const { classes, theme } = useStyles()
  const [isVote, setIsVote] = useState(false)
  const [isComment, setIsComment] = useState(false)
  const [isImageExists, setIsImageExists] = useState(false)

  const numericalValue = parseFloat(article?.pending_payout_value)
  const roundedValue = Math.ceil(numericalValue * 100) / 100
  const formattedCurrency = `$${roundedValue.toFixed(2)}`

  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
  const authorized = useAuthorizationStore((state: { authorized: boolean }) => state.authorized)
  const addSnackbar = useNotifiactionStore((state) => state.addSnackbar)
  const date = new Date(article.created)
  const formatedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })


  const isInBookmarks = storedBookmarksJSON.map((bookmark: any) => bookmark.permlink).includes(article.permlink);



  // Function to add or delete a bookmark
  const toggleBookmark = () => {
    const isInBookmarks = storedBookmarksJSON.map((bookmark: any) => bookmark.permlink).includes(article.permlink);

    if (isInBookmarks) {
      const updatedBookmarks = storedBookmarksJSON.filter((bookmark: any) => bookmark.permlink !== article.permlink);


      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      setStoredBookmarksJSON(updatedBookmarks); // Update the storedBookmarksJSON
      console.log(storedBookmarksJSON)
      addSnackbar({
        id: '6',
        title: 'Bookmark deleted',
        message: `You've successfully deleted this blog post from your bookmarks`,
        queryKey: undefined,
        color: 'green',
        time: 3000
      });
    }
  };

  useEffect(() => {
    if (Array.isArray(article?.json_metadata.image) && article?.json_metadata.image.length === 0) {
      setIsImageExists(false)
    } else if (!Array.isArray(article?.json_metadata.image)) {
      setIsImageExists(false)
    } else {
      setIsImageExists(true)
    }
  }, [article])

  return (
    <Card key={article.post_id} withBorder p="md" radius={0} className={classes.card}>
      <Grid grow>
        <Grid.Col span={12}>
          <Container fluid className={classes.headerContainer} display={'flex'}>
            <Indicator
              color={'#114f5c'}
              inline
              label={`${article.author_reputation.toFixed()}`}
              size={30}
              position="bottom-end"
              withBorder
            >
              <Avatar
                color="gray"
                size={45}
                radius="xl"
                src={`https://images.hive.blog/u/${article?.author}/avatar`}
              />
            </Indicator>
            <Group position='apart' style={{ flex: 1 }}>
              <Text pl={20} color="dimmed" size="xs" transform="uppercase" weight={600}>
                {`${article?.author} - ${formatedDate}`}
              </Text>
              <span className={classes.icon}>
                {isInBookmarks ?
                  <IconX
                    size={'1.3rem'}
                    onClick={() =>
                      authorized
                        ?
                        toggleBookmark() :
                        addSnackbar({
                          id: '3',
                          title: 'Warning',
                          message: 'You have to login to save bookmark!',
                          queryKey: undefined,
                          color: 'red',
                          time: 3000
                        })
                    }
                  />
                  :
                  <IconX
                    size={'1.1rem'}
                    onClick={() =>
                      authorized
                        ?
                        toggleBookmark() :
                        addSnackbar({
                          id: '4',
                          title: 'Warning',
                          message: 'You have to login to save bookmark!',
                          queryKey: undefined,
                          color: 'red',
                          time: 3000
                        })
                    }
                  />}
              </span>
            </Group>
          </Container>
          <Container fluid sx={{ display: 'flex', alignItems: 'start' }}>
            <Link
              href={`community/${article.community}/post/` + article.author + '/' + article.permlink}
              className={classes.link}
            >
              <Text weight={600} mt={25}>
                {article?.title}
              </Text>
            </Link>
          </Container>

        </Grid.Col>
        <Grid.Col span={12}>
          <Container fluid>
            {article?.json_metadata.tags
              ? article?.json_metadata.tags.slice(0, 3).map?.((item: string) => (
                <Badge mr={5} radius={5} color="gray" key={item}>
                  {item}
                </Badge>
              ))
              : null}
          </Container>
        </Grid.Col>
        <Grid.Col span={12} display="flex">
          <Container mr={0} className={classes.metadataContainer}>
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
                      time: 3000
                    })
                }
              />
            </span>
            <Text color="dimmed">{article?.active_votes.length}</Text>
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
                      time: 3000
                    })
                }
              />
            </span>
            <Text color="dimmed">{article?.children}</Text>
            <Space w="sm" />
            <Text color="dimmed" align={'right'}>
              {formattedCurrency}
            </Text>
            <Space w="sm" />
          </Container>
        </Grid.Col>
      </Grid>
      {
        isVote && (
          <Grid.Col span={12}>
            <VoteSlider permlink={article.permlink} author={article.author} setIsVote={setIsVote} />
          </Grid.Col>
        )
      }
      {
        isComment && (
          <Grid.Col span={12}>
            <CommentEditor
              setIsComment={setIsComment}
              permlink={article.permlink}
              parentAuthor={article.author}
              parentPermlink={article?.parent_permlink}
            />
          </Grid.Col>
        )
      }

    </Card >
  )
}
