import {
  Avatar, Container, Group, Paper, Text, TypographyStylesProvider
} from '@mantine/core';
import { Markdown } from '../MarkdownReplacer/Markdown';
import useStyles from './style';

  interface Comment {
    author: string,
    body: string,
  }

  interface Props {
    comment: Comment;
  }
  
  export function CommentCard({ comment }: Props) {
    const { classes } = useStyles();

    return (
      <Paper withBorder m={10} p={15}radius="md" className={classes.comment}>
        <Container size="lg">
        <Group>
          <Avatar alt={comment.author} src={`https://images.hive.blog/u/${comment.author}/avatar`} radius="xl" />
          <div>
            <Text fz="sm">{comment.author}</Text>
          </div>
        </Group>
        <TypographyStylesProvider className={classes.body}>
          <Markdown text={comment.body}/>
        </TypographyStylesProvider>
        </Container>
      </Paper>
    );
  }