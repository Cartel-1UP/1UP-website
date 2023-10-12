'use clinet'

import CommentEditor from '@/components/ui/CommentEditor/CommentEditor'
import { VoteSlider } from '@/components/ui/VoteSlider/VoteSlider'
import { HiveArticle } from '@/types/blog.type'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import { useNotifiactionStore } from '@/zustand/stores/useNotificationStore'
import {
  AspectRatio,
  Avatar,
  Badge,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Indicator,
  Space,
  Text,
  ThemeIcon
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconArrowBack, IconBookmark, IconBookmarkOff, IconHeart, IconMessage } from '@tabler/icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import useStyles from './style'

interface Props {
  article: HiveArticle
}

export function BookmarkCard({ article }: Props) {
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

  const forbiddenChars = ['!', '<', '>', '[', ']']
  const body = article.body.split(' ')
  const filteredBody = body.filter(function (word: string) {
    return !word.split('').some(function (char: string) {
      return forbiddenChars.includes(char)
    })
  })
  const bodyOfArticle = filteredBody.join(' ')




  const [storedBookmarksJSON, setStoredBookmarksJSON] = useState('');
  const storedBookmarks = storedBookmarksJSON ? JSON.parse(storedBookmarksJSON) : [];
  const isInBookmarks = storedBookmarks.map((bookmark: any) => bookmark.permlink).includes(article.permlink);


  const toggleBookmark = () => {
    const storedBookmarks = storedBookmarksJSON ? JSON.parse(storedBookmarksJSON) : [];
    const isInBookmarks = storedBookmarks.map((bookmark: any) => bookmark.permlink).includes(article.permlink);

    if (!isInBookmarks) {
      const newBookmarks = [...storedBookmarks, { permlink: article.permlink, author: article.author }];
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      addSnackbar({
        id: '5',
        title: 'Bookmark added',
        message: `You've successfully added this blog post to your bookmarks`,
        queryKey: undefined,
        color: 'green',
        time: 3000
      })
    } else {
      const updatedBookmarks = storedBookmarks.filter((bookmark: any) => bookmark.permlink !== article.permlink)
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
      addSnackbar({
        id: '6',
        title: 'Bookmark deleted',
        message: `You've successfully deleted this blog post from your bookmarks`,
        queryKey: undefined,
        color: 'green',
        time: 3000
      })
    }


  };





  // Function to add or delete a bookmark

  useEffect(() => {
    const storedBookmarksJSON = localStorage.getItem('bookmarks');
    if (storedBookmarksJSON) {
      setStoredBookmarksJSON(storedBookmarksJSON);
    }
  })


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
        <Grid.Col span={7}>
          {article.reblogged_by && (
            <>
              <Container>
                <Group spacing={'xs'}>
                  <ThemeIcon variant="light" color="gray" size={'sm'} radius="xl">
                    <IconArrowBack />
                  </ThemeIcon>
                  <Text size={'sm'} weight={400}>
                    Rebbloged by{' '}
                    <Text span c="blue" inherit>
                      <a href={`https://peakd.com/@${article.reblogged_by[0]}`} className={classes.peakdLink} target="_blank" rel="noopener noreferrer">@{article.reblogged_by[0]}</a>
                    </Text>
                  </Text>
                </Group>
                <Space h={'md'} />
              </Container>
            </>
          )}
          <Container className={classes.headerContainer}>
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
            {article.stats.is_pinned && (
              <Badge ml={10} color="red" variant="outline">
                Pinned
              </Badge>
            )}
            <Text pl={20} color="dimmed" size="xs" transform="uppercase" weight={600}>
              {`${article?.author} - ${formatedDate}`}
            </Text>
          </Container>
          <Link
            href={`community/${article.community}/post/` + article.author + '/' + article.permlink}
            className={classes.link}
          >
            <Container>
              <Text weight={600} mt={15}>
                {article?.title}
              </Text>
              <Text color="dimmed" size="sm" weight={600} mt={5} className={classes.turncate}>
                {bodyOfArticle}
              </Text>
            </Container>
          </Link>
        </Grid.Col>
        {!isMobile && (
          <Grid.Col span={5}>
            <Container>
              <AspectRatio ratio={16 / 9}>
                {isImageExists ? (
                  <Image radius={10} src={article?.json_metadata.image[0]} withPlaceholder />
                ) : (
                  <Image src={null} withPlaceholder radius={10} />
                )}
              </AspectRatio>
            </Container>
          </Grid.Col>
        )}
        <Grid.Col span={isMobile ? 12 : 7}>
          <Container>
            {article?.json_metadata.tags
              ? article?.json_metadata.tags.slice(0, 3).map?.((item: string) => (
                <Badge mr={5} radius={5} color="gray" key={item}>
                  {item}
                </Badge>
              ))
              : null}
          </Container>
        </Grid.Col>
        <Grid.Col span={isMobile ? 12 : 5} display="flex">
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
            <span className={classes.icon}>
              {isInBookmarks ?
                <IconBookmarkOff
                  size={'1.1rem'}
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
                <IconBookmark
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
          </Container>
        </Grid.Col>
      </Grid>
      {isVote && (
        <Grid.Col span={12}>
          <VoteSlider permlink={article.permlink} author={article.author} setIsVote={setIsVote} />
        </Grid.Col>
      )}
      {isComment && (
        <Grid.Col span={12}>
          <CommentEditor
            setIsComment={setIsComment}
            permlink={article.permlink}
            parentAuthor={article.author}
            parentPermlink={article?.parent_permlink}
          />
        </Grid.Col>
      )}
    </Card>
  )
}
