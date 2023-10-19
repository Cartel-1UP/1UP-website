'use client'

import { useGetBookmarksBlogs } from '@/actions/hive/get-bookmarks-blogs'
import {
  ActionIcon,
  Box, Card,
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  Space,
  Text
} from '@mantine/core'
import { useScrollIntoView } from '@mantine/hooks'
import { IconArrowUp } from '@tabler/icons'
import { useEffect, useState } from 'react'
import { BookmarkCard } from './BookmarkCard'
import useStyles from './style'



export function BookmarkSection() {
  const { classes, theme } = useStyles()
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60 })
  const [storedBookmarksJSON, setStoredBookmarksJSON] = useState([]);
  const [bookmarks, setBookmarks] = useState<string | null>('');

  useEffect(() => {
    const bookmarks = localStorage.getItem('bookmarks')
    if (bookmarks) {
      setBookmarks(bookmarks)
    }
  }, [])



  useEffect(() => {

  }, [])

  const { data, isLoading, refetch } = useGetBookmarksBlogs(
    storedBookmarksJSON.map((bookmark: any) => ({
      author: bookmark.author,
      permlink: bookmark.permlink,
    }))
  );



  useEffect(() => {
    setStoredBookmarksJSON(JSON.parse(localStorage?.getItem('bookmarks') ?? '[]'));
  }, [bookmarks]);

  useEffect(() => {
    refetch();
  }, [storedBookmarksJSON]);





  return (
    <>
      <Box className={classes.default}>
        <Space h="xl" />
        <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} >
          <Card withBorder p="md" radius={0} className={classes.cardHeader}>
            <Text size={24} fw={500}>Bookmarks</Text>
          </Card>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
              <Card withBorder p="md" radius={0} className={classes.card} key={index}>
                <Grid grow>
                  <Grid.Col span={7}>
                    <Container>
                      <Skeleton height={50} circle mb="xl" />
                    </Container>
                    <Container>
                      <Skeleton height={8} radius="xl" />
                      <Skeleton height={8} mt={6} radius="xl" />
                      <Skeleton height={8} mt={6} radius="xl" />
                    </Container>
                  </Grid.Col>
                  <Grid.Col span={5}>
                    <Container>
                      <Skeleton height={100} radius="sm" />
                    </Container>
                  </Grid.Col>
                  <Grid.Col span={7}>
                    <Container>
                      <Skeleton height={16} width={'30%'} radius="xl" />
                    </Container>
                  </Grid.Col>
                  <Grid.Col span={5}>
                    <Container>
                      <Skeleton height={16} radius="xl" />
                    </Container>
                  </Grid.Col>
                </Grid>
              </Card>
            ))
            : (data && data?.length > 0) ? data?.map(
              (item: any) =>
                <BookmarkCard article={item?.data.result} key={item?.data?.result.post_id} />
            ) :
              <>
                <Card withBorder p="md" radius={0} className={classes.card}>
                  No bookmarks.
                </Card>
              </>

          }
          <Card withBorder p="md" radius={0} className={classes.cardFooter}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <ActionIcon color="dark" onClick={() => scrollIntoView({ alignment: 'start' })}>
                <IconArrowUp size="1.125rem" />
              </ActionIcon>
            </Box>
          </Card>
        </SimpleGrid>
      </Box>

    </>
  )
}
