'use client'
import { Card, Container, Grid, SimpleGrid, Skeleton } from '@mantine/core';
import { useQuery } from 'react-query';
import { getComments, getPost } from '../../utils/actions/posts';
import { getUserProfile } from '../../utils/actions/user';
import { CommentCard } from './CommentCard/CommentCard';
import { ContentCard } from './ContentCard/ContentCard';
import useStyles from './style';

interface Props{
  id: string,
  username: string
}

export function BlogPage({...props}: Props) {
  const { classes, theme } = useStyles();
  
  const { data: data } = useQuery('postData', () => getPost({
    permlink: props.id,
    author: props.username,
  }));
  
  const { data: comments } = useQuery('commentsData', () => getComments({
    permlink: props.id,
    author: props.username,
  }));

  const { data: user } = useQuery('userData', () => getUserProfile({
    author: props.username,
  }));
  
  if(data && user && comments){
    return (
      <Container fluid className={classes.default}>
        <Container size="xl">
          <Grid>
            <ContentCard article={data} user={user} />
            <CommentCard comments={comments} permlink={props.id}/>
          </Grid>
          </Container>
      </Container>
    );
  }

  return(
    <Container fluid className={classes.default}>
      <Container size="lg" sx={{height: '80vh'}}>
        <SimpleGrid cols={1} pt={25} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Card withBorder p="md" radius={0} className={classes.cardHeader}>
            <Grid grow>
              <Grid.Col span={10}>
                <Skeleton height={24}/>
              </Grid.Col>
              <Grid.Col span={2}>
                <Skeleton height={24}/>
              </Grid.Col>
            </Grid>
          </Card>
          <Card  withBorder p="md" radius={0} className={classes.card}>
            <Skeleton height='40vh'/>
          </Card>
          <Card  withBorder p="md" mb={25} radius={0} className={classes.cardFooter}>
            <Skeleton height={24}/>
          </Card>
        </SimpleGrid> 
      </Container>
  </Container>
  )
 
}
