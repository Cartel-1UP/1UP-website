import {
  Avatar, Container, createStyles, Group, Paper, Text, TypographyStylesProvider
} from '@mantine/core';
import { Markdown } from '../MarkdownReplacer/Markdown';
  
  const useStyles = createStyles((theme) => ({
    comment: {
      padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    },
  
    body: {
      paddingLeft: 54,
      paddingTop: theme.spacing.sm,
      fontSize: theme.fontSizes.sm,
    },
  
    content: {
      '& > p:last-child': {
        marginBottom: 0,
      },
    },
  }));
  
  interface CommentHtmlProps {
    comment: any;
  }
  
  export function CommentCard({ comment }: CommentHtmlProps) {
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