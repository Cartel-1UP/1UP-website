import { ActionIcon, Box, Button, Card, Container, Grid, SimpleGrid, Skeleton, Space, Title } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { IconArrowBarRight, IconArrowUp } from '@tabler/icons';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getMultiPosts } from '../../../../utils/actions/posts';
import { RecentCard } from './RecentCard/RecentCard';
import useStyles from './style';

type Props = {
  tag: string;
};

export function Recent({ tag }: Props) {
  const { classes, theme } = useStyles();

  const [startAuthor, setStartAuthor] = useState('');
  const [startPermlink, setStartPermlink] = useState('');
  const [posts, setPosts] = useState<any[]>([]);

  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  const { isLoading, error } = useQuery(
    'recent-data',
    () =>
      getMultiPosts({
        tag,
        sort: 'created',
        limit: 10,
        start_author: startAuthor,
        start_permlink: startPermlink,
      }),
    {
      onSuccess: (data) => {
        setPosts((prevPosts) => [...prevPosts, ...data.result]);
        const lastPost = data.result[data.result.length - 1];
        setStartAuthor(lastPost.author);
        setStartPermlink(lastPost.permlink);
      },
    },
  );

  const loadMorePosts = useMutation(
    () =>
      getMultiPosts({
        tag,
        sort: 'created',
        limit: 10,
        start_author: startAuthor,
        start_permlink: startPermlink,
      }),
    {
      onSuccess: (data) => {
        setPosts((prevPosts) => [...prevPosts, ...data.result]);
        const lastPost = data.result[data.result.length - 1];
        setStartAuthor(lastPost.author);
        setStartPermlink(lastPost.permlink);
      },
    },
  );


  return (
    <>
      <Space h="xl" />
      <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Card withBorder p="md" radius={0} className={classes.cardHeader}>
          <Title order={2}>Recent</Title>
        </Card>
        {isLoading ? (
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
          posts.map((item: any, index: any) => (
            <RecentCard article={item} key={index} tag={tag} />
          ))
        )}
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
