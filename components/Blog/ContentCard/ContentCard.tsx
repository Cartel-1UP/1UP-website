'use client'
import { Avatar, Badge, Box, Button, Card, Container, Grid, Group, SimpleGrid, Space, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { CommentCard } from '../CommentCard/CommentCard';
import { Markdown } from '../MarkdownReplacer/Markdown';
import useStyles from './style';


interface Article {

}



interface Props {
  article :{
    data : {
      result: {
        title: string,
        children: string,
        body: string,
        stats: {
          total_votes: number
        }
      }
    }
    time : string
  } ;
  user: any;
  comments: any;
}

export function ContentCard({...props}: Props) {
  const { classes, theme } = useStyles();
  const laptop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  const profile = props.user.result.metadata.profile
  const stats = props.user.result.stats

  var mappedPosts = Object.entries(props.comments.data.result).map(([key, post]: any) => ({
    id: key,
    postId: post.post_id,
    author: post.author,
    title: post.title,
    body: post.body
  }));

  return (
    <>
      <Space h="xl" />
      <Grid grow>
        <Grid.Col span={laptop ? 12 : 9}>
          <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Card  withBorder p="md" radius={0} className={classes.cardHeader}>
              <Grid grow>
                <Grid.Col span={10}>
                  <Title order={2}>
                    {props.article.data.result.title}
                  </Title>
                  <Space h="md" />
                  <Badge color="gray" variant="outline" size="md">comments {props.article.data.result.children}</Badge>
                  <Badge color="gray" variant="outline" ml={10} size="md">votes {props.article.data.result.stats.total_votes}</Badge>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Box
                    sx={(theme) => ({
                      backgroundColor: theme.colors.gray[0],
                      textAlign: 'center',
                      borderRadius: theme.radius.md,
                    })}
                  >
                    <Text className={classes.text}>
                      {props.article.time} MINS READ
                    </Text>      
                  </Box>
                </Grid.Col>
              </Grid>
            </Card>
            <Card withBorder p="md" radius={0} className={classes.card}>
                <Container>
                  <Markdown text={props.article.data.result.body}/>
                </Container>
            </Card>
            <Card withBorder p="md" mb={25} radius={0} className={classes.cardFooter}>
                {mappedPosts.slice(1).map((item: any) => (
                  <CommentCard comment={item} key={item.postId}/>
                  
                ))}
            </Card>
        </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={laptop ? 12 : 3}>
          {!laptop && 
            <Card withBorder p="xl" radius="md" className={classes.card}>
              {
                profile.cover_image ? 
                <Card.Section sx={{ backgroundImage: `url(${profile.cover_image})`, height: 140 }} />
                :
                <Card.Section sx={{ backgroundColor: '#072f37', height: 140 }} />
              }
            <Avatar src={profile.profile_image} size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
            <Text align="center" size="lg" weight={500} mt="sm">
              {props.user.result.name}
            </Text>
            <Text align="center" size="sm" color="dimmed">
              {profile.about}
            </Text>
            <Group mt="md" position="center" spacing={30}>
              <Text align="center" size="lg" weight={500}>
                {stats.followers}
              </Text>
              <Text align="center" size="sm" color="dimmed">
                Followers
              </Text>
              <Text align="center" size="lg" weight={500}>
                {stats.following}
              </Text>
              <Text align="center" size="sm" color="dimmed">
                Follows
              </Text>
              <Text align="center" size="lg" weight={500}>
                {props.user.result.post_count}
              </Text>
              <Text align="center" size="sm" color="dimmed">
                Posts
              </Text>
            </Group>
            <Button
              fullWidth
              radius="md"
              mt="xl"
              size="md"
              color={theme.colorScheme === 'dark' ? undefined : 'dark'}
            >
              Follow
            </Button>
            </Card>
            }
        </Grid.Col>      
      </Grid>
    
    </>
  );
}
