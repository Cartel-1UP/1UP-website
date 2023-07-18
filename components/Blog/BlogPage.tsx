'use client'
import { Card, Center, Container, Grid, SimpleGrid, Skeleton } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useQuery } from 'react-query';
import { getComments, getPost } from '../../utils/actions/posts';
import { getUserProfile } from '../../utils/actions/user';
import { useAuthorizationStore } from '../../zustand/stores/useAuthorizationStore';
import { ContentCard } from './ContentCard/ContentCard';
import useStyles from './style';

interface Props {
  id: string,
  username: string
}

export function BlogPage({ ...props }: Props) {
  const { classes, theme } = useStyles();
  const laptop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  const { data: data } = useQuery('post-data', () => getPost({
    permlink: props.id,
    author: props.username,
  }));

  const { data: comments } = useQuery('comments-data', () => getComments({
    permlink: props.id,
    author: props.username,
  }));

  const { data: user } = useQuery('user-data', () => getUserProfile({
    author: props.username,
  }));

  const username = useAuthorizationStore((state: { username: string; }) => state.username)

  if (data && user && comments) {
    return (
      <Container fluid className={classes.default}>
        <Container size="xl">
          <Grid>
            <ContentCard article={data} user={user} comments={comments} permlink={props.id} username={username} />
          </Grid>
        </Container>
      </Container>
    );
  }

  return (
    <Container fluid className={classes.default}>
      <Container size="lg" sx={{ height: '90vh' }}>
        <Grid grow>
          <Grid.Col span={laptop ? 12 : 9}>
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
          <Grid.Col span={laptop ? 12 : 3}>
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
  )

}
