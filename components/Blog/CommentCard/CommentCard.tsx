import {
  Avatar,
  Card,
  Container,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Text,
  TypographyStylesProvider
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Markdown } from '../MarkdownReplacer/Markdown';
import useStyles from './style';

interface Props {
  comments: any,
  permlink: string,
}

interface Comment {
  id: string,
  postId: string,
  author: string,
  title: string,
  body: string,
  depth: number,
  parent_permlink: string,
  permlink: string,
  replies: any,
  children: any
}

export function CommentCard({ ...props }: Props) {

  const comments: Comment[] = Object.entries(props.comments.data.result).map(([key, post]: any) => ({
    id: key,
    postId: post.post_id,
    author: post.author,
    title: post.title,
    body: post.body,
    depth: post.depth,
    parent_permlink: post.parent_permlink,
    permlink: post.permlink,
    replies: post.replies,
    children: post.children
  }));

  const { classes, theme } = useStyles();
  const laptop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  const renderComment = (comment: Comment, depth: number = 0) => {
    const subcomments = comments.filter(subcomment => subcomment.parent_permlink === comment.permlink);
    
    if (depth > 1) {
      return null; // stop rendering subcomments if the depth level is too deep
    }

    if (comment.permlink === props.permlink) {
      return null; // exclude the last comment
    }

    
  
    return (
      <Paper withBorder m={10} p={15} radius="md" className={classes.comment}>
        <Container size="lg">
          <Group>
            <Avatar alt={comment.author} src={`https://images.hive.blog/u/${comment.author}/avatar`} radius="xl" />
            <div>
              <Text fz="sm">{comment.author}</Text>
            </div>
          </Group>
          <TypographyStylesProvider className={classes.body}>
            <Markdown text={comment.body} />
          </TypographyStylesProvider>
          {subcomments.length > 0 &&
            <div>
              {subcomments.map(subcomment => renderComment(subcomment, depth + 1))}
            </div>
          }
        </Container>
      </Paper>
    );
  };
  

  return (
    <Grid grow sx={{width: '-webkit-fill-available'}} >
      <Grid.Col span={laptop ? 12 : 9}>
        <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Card withBorder p="md" mb={25} radius={0} className={classes.cardFooter}>
            {comments.filter(comment => comment.depth < 2).map(comment => renderComment(comment))}
          </Card>
        </SimpleGrid>
      </Grid.Col>
      <Grid.Col span={laptop ? 12 : 3}>
      </Grid.Col>
    </Grid>

    
  );
}
