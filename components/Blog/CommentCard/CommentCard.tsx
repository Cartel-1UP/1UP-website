import { Card, Grid, SimpleGrid } from '@mantine/core';
import React from 'react';
import useStyles from '../style';
import CommentComponent from './CommentComponent';



interface Props {
  comments: any;
  permlink: string;
  article: any;
  queryKey: string;
}

const CommentCard: React.FC<Props> = ({ comments, permlink, article, queryKey }) => {
  const { classes, theme } = useStyles();

  const commentArray: any[] = Object.values(comments.data.result);

  const renderComment = (comment: any, depth: number = 0) => {
    const subcomments = commentArray.filter((subcomment: { parent_permlink: string; }) => subcomment.parent_permlink === comment.permlink);

    if (depth > 1) {
      return null; // stop rendering subcomments if the depth level is too deep
    }

    if (comment.permlink === permlink) {
      return null; // exclude the last comment
    }

    return <CommentComponent key={comment.id} comment={comment} subcomments={subcomments} article={article} queryKey={queryKey} />;
  };

  return (
    <Grid grow>
      <Grid.Col>
        <SimpleGrid cols={1} mt={2} spacing={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Card p="md" mb={25} radius={0} className={classes.cardFooter}>
            {commentArray.filter((comment: any) => comment.depth < 2).map((comment: any) => renderComment(comment))}
          </Card>
        </SimpleGrid>
      </Grid.Col>
    </Grid>
  );
};

export default CommentCard;
