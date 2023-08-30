import { getFeedBlogs, getRecentBlogs } from '@/actions/hive/get-blogs';
import TabButtons from '@/components/TabButtons/TabButtons';
import { Tabs } from '@/enums/blog.enum';
import { HiveArticle } from '@/types/blog.type';
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore';
import { useNotifiactionStore } from '@/zustand/stores/useNotificationStore';
import { ActionIcon, Box, Button, Card, Container, Grid, SimpleGrid, Skeleton, Space } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { IconArrowBarRight, IconArrowUp } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { FeedCard } from './FeedCard/FeedCard';
import useStyles from './style';

type Props = {
  sort: string
  tag?: string
  isCommunity?: boolean
};

export function Feed({ sort, tag, isCommunity }: Props) {
  const { classes, theme } = useStyles();

  const [startAuthor, setStartAuthor] = useState('');
  const [startPermlink, setStartPermlink] = useState('');
  const [posts, setPosts] = useState<any[]>([]);
  const [postType, setPostType] = useState(sort);
  const [data, setData] = useState<any>([]);

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60, });

  const username = localStorage.getItem('username')
  const authorized = useAuthorizationStore((state: { authorized: boolean; }) => state.authorized)
  const defaultTab = Tabs.New;

  const addSnackbar = useNotifiactionStore((state) => state.addSnackbar);
  const handleTabChange = (tab: string) => {
    setPostType(tab)
  };

  const loadPosts = useMutation(
    async () => {
      let queryData;
      switch (postType) {
        case 'feed':
          queryData = await getFeedBlogs({
            account: username || '',
            sort: postType,
            limit: 10,
          });
          break;
        default:
          queryData = await getRecentBlogs({
            tag: tag,
            sort: postType,
            limit: 10,
          });
      }
      return queryData;
    },
    {
      onSuccess: (newArticles) => {
        setData(newArticles);
        setPosts([])
        const lastPost = newArticles[newArticles.length - 1];
        setStartAuthor(lastPost.author);
        setStartPermlink(lastPost.permlink);
      },
    }
  );

  const loadMorePosts = useMutation(
    async () => {
      let queryData;
      switch (postType) {
        case 'feed':
          queryData = await getFeedBlogs({
            account: username || '',
            sort: 'feed',
            limit: 10,
            start_author: startAuthor,
            start_permlink: startPermlink,
          });
          break;
        default:
          queryData = await getRecentBlogs({
            tag: tag,
            sort: postType,
            limit: 10,
            start_author: startAuthor,
            start_permlink: startPermlink,
          });
      }
      return queryData;
    },
    {
      onSuccess: (newArticles) => {
        console.log(newArticles)
        if (newArticles.length < 1) {
          return (
            addSnackbar({
              id: '5',
              title: 'Warning',
              message: `There is no more ${postType} posts!`,
            })
          )
        }
        setPosts((prevPosts) => [...prevPosts, ...newArticles]);
        const lastPost = newArticles[newArticles.length - 1];
        setStartAuthor(lastPost.author);
        setStartPermlink(lastPost.permlink);
      },
    },
  );

  useEffect(() => {
    loadPosts.mutate()
  }, [postType, sort]);

  useEffect(() => {
    if (data && data.length > 0) {
      const lastPost = data[data.length - 1];
      setStartAuthor(lastPost.author);
      setStartPermlink(lastPost.permlink);
    }
  }, [data]);

  return (
    <>
      <Space h="xl" />
      <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Card withBorder p="md" radius={0} className={classes.cardHeader}>
          <TabButtons authorized={authorized} defaultTab={defaultTab} onChange={handleTabChange} isCommunity={isCommunity} />
        </Card>
        {!data ? (
          Array.from({ length: 5 }).map((_, index) => (
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
        ) : (
          data?.map((item: HiveArticle) => (
            <FeedCard article={item} key={item.post_id} />
          ))
        )}
        {
          posts?.map((item: HiveArticle) => (
            <FeedCard article={item} key={item.post_id} />
          ))
        }
        <Card withBorder p="md" radius={0} className={classes.cardFooter}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <Button
              variant="outline"
              color="dark"
              rightIcon={<IconArrowBarRight size="1rem" />}
              onClick={() => loadMorePosts.mutate()}
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
  );
}
