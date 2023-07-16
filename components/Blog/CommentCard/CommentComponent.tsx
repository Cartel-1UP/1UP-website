import {
  ActionIcon,
  Avatar,
  Badge, Container,
  Grid,
  Group,
  Paper, Space,
  Text,
  TypographyStylesProvider
} from '@mantine/core';
import { IconHeart, IconMessage } from '@tabler/icons';
import React, { useState } from 'react';
import { Comment } from '../../../types/blog.interface';
import { useAuthorizationStore } from '../../../zustand/stores/useAuthorizationStore';
import CommentEditor from '../../CommentEditor/CommentEditor';
import { VoteSlider } from '../../VoteSlider/VoteSlider';
import { Markdown } from '../MarkdownReplacer/Markdown';
import useStyles from './style';

interface CommentProps {
  comment: Comment;
  subcomments: Comment[];
  article: any;
  queryKey: string
}



const CommentComponent: React.FC<CommentProps> = ({ comment, subcomments, queryKey }) => {
  const { classes, theme } = useStyles();
  const [isVote, setIsVote] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const authorized = useAuthorizationStore((state: { authorized: boolean; }) => state.authorized)

  const date = new Date(comment.created);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleVoteClick = () => {
    setIsVote(!isVote);
  };

  const handleCommentClick = () => {
    setIsComment(!isComment);
  };

  return (
    <Paper withBorder m={10} p={15} radius="md" className={classes.comment}>
      <Container size="lg">
        <Group spacing={0}>
          <Avatar alt={comment.author} src={`https://images.hive.blog/u/${comment.author}/avatar`} radius="xl" />
          <Badge ml={10} color="dark" variant="outline">
            {comment.author_reputation.toFixed()} lvl
          </Badge>
          <Text pl={10} color="dimmed" size="xs" transform="uppercase" weight={500}>
            {comment.author} - {formattedDate}
          </Text>
        </Group>
        <TypographyStylesProvider className={classes.body}>
          <Markdown text={comment.body} />
        </TypographyStylesProvider>
        <Grid.Col span={12} display="flex">
          <Container ml={24} className={classes.metadataContainer}>
            <ActionIcon variant="transparent" onClick={handleVoteClick} disabled={!authorized}>
              <IconHeart color="grey" size="1rem" />
            </ActionIcon>
            <Text color="dimmed" className={classes.price}>
              {comment.active_votes.length}
            </Text>
            <Space w="sm" />
            <ActionIcon variant="transparent" onClick={handleCommentClick} disabled={!authorized}>
              <IconMessage color="grey" size="1rem" />
            </ActionIcon>
            <Text color="dimmed" className={classes.price}>
              {comment.children}
            </Text>
            <Space w="sm" />
          </Container>
        </Grid.Col>
        {subcomments.length > 0 && (
          <div>
            {subcomments.map(subcomment => (
              <CommentComponent key={subcomment.id} comment={subcomment} subcomments={[]} article={undefined} queryKey={queryKey} />
            ))}
          </div>
        )}
      </Container>
      {isVote && (
        <Grid.Col span={12}>
          <VoteSlider permlink={comment.permlink} author={comment.author} setIsVote={setIsVote} queryKey={queryKey} />
        </Grid.Col>
      )}
      {isComment && (
        <Grid.Col span={12}>
          <CommentEditor setIsComment={setIsComment} permlink={comment.permlink} parentAuthor={comment.author} parentPermlink={comment?.parent_permlink} queryKey={queryKey} />
        </Grid.Col>
      )}
    </Paper>
  );
};

export default CommentComponent;
