
import { Card, Container, Grid, Skeleton } from '@mantine/core';
import { useQuery } from 'react-query';
import { getPost } from '../../utils/actions/posts';
import { getUserPostData } from '../../utils/actions/user';
import { ContentCard } from './ContentCard/ContentCard';
import useStyles from './style';

interface Props{
  id: string,
  username: string
}

export function BlogPage({...props}: Props) {
  const { classes } = useStyles();
  const { isLoading, error, data: data } = useQuery('postData', () => getPost({
    permlink: props.id,
    author: props.username,
  }));

  const { data: user } = useQuery('userData', () => getUserPostData({
    username: props.username,
  }));
  
  if(data && user){
    return (
      <Container fluid className={classes.default}>
        <Container size="lg">
          <Grid>
            <ContentCard article={data} user={user}/>
          </Grid>
          </Container>
      
      </Container>
  
    );
  }

  return(
    <Container fluid className={classes.default}>
      <Container size="xl">
        <Container>
        <Grid>
          <Card withBorder p="md" radius={0} className={classes.card}>
            <Grid grow>
                <Container >
                  <Skeleton height={50} circle mb="xl" />
                </Container>
                <Container>
                  <Skeleton height={8} radius="xl" />
                  <Skeleton height={8} mt={6} radius="xl" />
                  <Skeleton height={8} mt={6} radius="xl" />
                </Container>
            </Grid>
          </Card>
        </Grid>
        </Container>
      </Container>
    </Container>
  )
 
}
