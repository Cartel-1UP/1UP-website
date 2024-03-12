'use clinet'

import CommentEditor from '@/components/ui/CommentEditor/CommentEditor'
import { NotificationText } from '@/components/ui/ProgressBar/ProgressBar'
import { VoteSlider } from '@/components/ui/VoteSlider/VoteSlider'
import { Bookmark, HiveArticle } from '@/types/blog.type'
import { formatedDate } from '@/utils/methods/formateDate'
import useSettings from '@/utils/methods/useSettings'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
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
  ThemeIcon,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconArrowBack, IconBookmark, IconBookmarkOff, IconHeart, IconMessage } from '@tabler/icons'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useStyles from './style'

type Props = {
  article: HiveArticle
}

export function FeedCard({ article }: Props) {
  const { classes, theme } = useStyles()
  const { ...settings } = useSettings()
  const router = useRouter()
  const authorized = useAuthorizationStore((state: { authorized: boolean }) => state.authorized)

  const [isVote, setIsVote] = useState(false)
  const [isComment, setIsComment] = useState(false)
  const [isImageExists, setIsImageExists] = useState(false)
  const [isToggle, setIsToggle] = useState(false)

  const numericalValue = parseFloat(article?.pending_payout_value) + parseFloat(article?.curator_payout_value)
  const roundedValue = Math.ceil(numericalValue * 100) / 100
  const formattedCurrency = `$${roundedValue.toFixed(2)}`

  const date = new Date(article.created)
  const forbiddenChars = ['!', '<', '>', '[', ']', '#']
  const body = article.body.split(' ')
  const filteredBody = body.filter(function (word: string) {
    return !word.split('').some(function (char: string) {
      return forbiddenChars.includes(char)
    })
  })
  const bodyOfArticle = filteredBody.join(' ')

  const toggleBookmark = () => {
    const bookmarks: Bookmark[] = JSON.parse(localStorage.getItem('bookmarks') || '[]')
    if (!bookmarks.some((bookmark: Bookmark) => bookmark.permlink === article.permlink)) {
      const newBookmark = { author: article.author, permlink: article.permlink }

      localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, newBookmark]))
      setIsToggle(!isToggle)
      showNotification({
        autoClose: 3000,
        title: 'Bookmark',
        message: <NotificationText message="Post correctly added to boomarks" time={3000} />,
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
    } else {
      const updatedBookmarks = bookmarks.filter(
        (bookmark: any) => bookmark.permlink !== article.permlink
      )
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
      setIsToggle(!isToggle)
      showNotification({
        autoClose: 3000,
        title: 'Bookmark',
        message: <NotificationText message="Post correctly deleted from boomarks" time={3000} />,
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
  }

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
          {article.reblogged_by && (
            <>
              <Container>
                <Group spacing={'xs'}>
                  <ThemeIcon
                    variant="light"
                    color="gray"
                    size={settings.isSm ? 'xs' : 'sm'}
                    radius="xl"
                  >
                    <IconArrowBack />
                  </ThemeIcon>
                  <Text size={settings.isSm ? 'xs' : 'sm'} weight={400}>
                    Rebbloged by{' '}
                    <Text span c="blue" inherit>
                      <a
                        href={`https://peakd.com/@${article.reblogged_by[0]}`}
                        className={classes.peakdLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{article.reblogged_by[0]}
                      </a>
                    </Text>
                  </Text>
                </Group>
                <Space h={settings.isSm ? 0 : 'md'} />
              </Container>
            </>
          )}
        </Grid.Col>
        <Grid.Col span={7}>
          <Container className={classes.headerContainer}>
            <Indicator
              color={'#114f5c'}
              inline
              label={`${article.author_reputation.toFixed()}`}
              size={settings.isSm ? 25 : 30}
              position="bottom-end"
              withBorder
            >
              <Avatar
                color="gray"
                size={settings.isSm ? 35 : 45}
                radius="xl"
                src={`https://images.hive.blog/u/${article?.author}/avatar`}
              />
            </Indicator>
            {article.stats.is_pinned && (
              <Badge
                ml={settings.isSm ? 20 : 10}
                color="red"
                variant="outline"
                size={settings.isSm ? 'xs' : 'md'}
              >
                Pinned
              </Badge>
            )}
            <Text
              pl={article.stats.is_pinned ? 10 : 20}
              size="xs"
              transform="uppercase"
              color={'dimmed'}
              fw={500}
            >
              {settings.isSm ? (
                <>
                  {article?.author && <span>{article.author}</span>}
                  {article?.author && <br />}
                  {date && <span>{formatedDate(date)}</span>}
                </>
              ) : (
                `${article?.author} • ${formatedDate(date)}`
              )}
            </Text>
          </Container>
          <Container
            className={classes.link}
            ml={0}
            onClick={() =>
              router.push(`/${article.community}/@${article.author}/${article.permlink}`)
            }
          >
            <Text
              fw={settings.isSm ? 600 : 700}
              color={theme.colors.dark[5]}
              mt={20}
              sx={{
                fontFamily: 'Greycliff CF, sans-serif',
              }}
              size={settings.isSm ? 'sm' : 'md'}
              className={classes.turncateTitle}
            >
              {article?.title}
            </Text>
            {!settings.isSm && (
              <Text
                color="dimmed"
                size={'sm'}
                fw={500}
                mt={5}
                className={classes.turncate}
                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
              >
                {bodyOfArticle}
              </Text>
            )}
          </Container>
        </Grid.Col>
        <Grid.Col span={settings.isSm ? 4 : 5}>
          <Container>
            <AspectRatio ratio={settings.isSm ? 1 : 5 / 3}>
              {isImageExists ? (
                <Image
                  radius={0}
                  src={article?.json_metadata.image[0]}
                  withPlaceholder
                  fit={'fill'} // Adjust fit based on condition
                  h={200} // Set height to 100% if isSm is true, else set to 200
                />
              ) : (
                <Image src={null} withPlaceholder radius={10} />
              )}
            </AspectRatio>
          </Container>
        </Grid.Col>
        <Grid.Col span={settings.isSm ? 3 : 7}>
          <Container>
            {article?.json_metadata.tags
              ? article?.json_metadata.tags
                .slice(0, parseInt(`${settings.isSm ? 1 : 3}`))
                .map?.((item: string) => (
                  <Badge mr={5} radius={5} color="gray" key={item}>
                    {item}
                  </Badge>
                ))
              : null}
          </Container>
        </Grid.Col>
        <Grid.Col span={5} display="flex" mt={5}>
          <Container mr={0} className={classes.metadataContainer}>
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
            <Text color="dimmed">{article?.active_votes.length}</Text>
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
            <Text color="dimmed">{article?.children}</Text>
            <Space w="sm" />
            <Text color="dimmed" align={'right'}>
              {formattedCurrency}
            </Text>
            <Space w="sm" />
            <span className={classes.icon}>
              {JSON.parse(localStorage.getItem('bookmarks') || '[]').some(
                (bookmark: any) => bookmark.permlink === article.permlink
              ) ? (
                <IconBookmarkOff
                  size={'1.1rem'}
                  onClick={() =>
                    authorized
                      ? toggleBookmark()
                      : showNotification({
                        autoClose: 3000,
                        title: 'Warning',
                        message: (
                          <NotificationText
                            message="You have to login to delete bookmark!"
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
              ) : (
                <IconBookmark
                  size={'1.1rem'}
                  onClick={() =>
                    authorized
                      ? toggleBookmark()
                      : showNotification({
                        autoClose: 3000,
                        title: 'Warning',
                        message: (
                          <NotificationText
                            message="You have to login to add bookmark!"
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
              )}
            </span>
          </Container>
        </Grid.Col>
      </Grid>
      {isVote &&
        (settings.isMd ? (
          <VoteSlider permlink={article.permlink} author={article.author} setIsVote={setIsVote} />
        ) : (
          <Grid.Col span={12}>
            <VoteSlider permlink={article.permlink} author={article.author} setIsVote={setIsVote} />
          </Grid.Col>
        ))}
      {isComment &&
        (settings.isMd ? (
          <CommentEditor
            setIsComment={setIsComment}
            permlink={article.permlink}
            parentAuthor={article.author}
            parentPermlink={article?.parent_permlink}
          />
        ) : (
          <Grid.Col span={12}>
            <CommentEditor
              setIsComment={setIsComment}
              permlink={article.permlink}
              parentAuthor={article.author}
              parentPermlink={article?.parent_permlink}
            />
          </Grid.Col>
        ))}
    </Card>
  )
}
