// export default function CommentCard({ comments, permlink, article, queryKey }: Props) {
//   const { classes, theme } = useStyles();
//   const [root, setRoot] = useState([])

import { Markdown } from '@/components/ui/Markdown/Markdown'
import { VoteSlider } from '@/components/ui/VoteSlider/VoteSlider'
import { getTimeAgo } from '@/utils/methods/dateRefactor'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import {
  ActionIcon,
  Avatar,
  Container,
  Grid,
  Group,
  Indicator,
  Paper,
  Space,
  Text,
  TypographyStylesProvider
} from '@mantine/core'
import { IconChevronDown, IconChevronUp, IconHeart, IconMessage } from '@tabler/icons'
import { useState } from 'react'
import useStyles from './style'

type Props = {
  comment: any
  nestedComments: any
  isVisible?: boolean
}

export default function CommentCard({ comment, nestedComments, isVisible }: Props) {
  const { classes, theme } = useStyles()
  const [isVote, setIsVote] = useState(false)
  const [isComment, setIsComment] = useState(false)
  const [areChildrenVisible, setChildrenVisible] = useState(isVisible)

  const authorized = useAuthorizationStore((state: { authorized: boolean }) => state.authorized)

  const handleToggleChildren = () => {
    setChildrenVisible(!areChildrenVisible)
  }

  const date = new Date(comment.created)

  const handleVoteClick = () => {
    setIsVote(!isVote)
  }

  const handleCommentClick = () => {
    setIsComment(!isComment)
  }

  return (
    <Paper withBorder={comment.depth == 1} p={15} radius={0} className={classes.comment}>
      <Container m={10} size="lg">
        <Group spacing={0}>
          <Indicator
            color={'#114f5c'}
            inline
            label={comment?.author_reputation?.toFixed()}
            size={29}
            position="bottom-end"
            withBorder
          >
            <Avatar
              size={45}
              color="gray"
              radius="xl"
              src={`https://images.hive.blog/u/${comment.author}/avatar`}
            />
          </Indicator>
          <Text pl={20} color="dimmed" size="xs" transform="uppercase" weight={500}>
            {comment.author} - {getTimeAgo(comment.created)}
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
              {comment.active_votes?.length}
            </Text>
            <Space w="sm" />
            <ActionIcon variant="transparent" onClick={handleCommentClick} disabled={!authorized}>
              <IconMessage color="grey" size="1rem" />
            </ActionIcon>
            <Text color="dimmed" className={classes.price}>
              {comment.children}
            </Text>
            <Space w="sm" />
            {nestedComments?.length > 0 && (
              <ActionIcon variant="transparent" onClick={handleToggleChildren}>
                {areChildrenVisible ? (
                  <IconChevronUp color="grey" size="1rem" />
                ) : (
                  <IconChevronDown color="grey" size="1rem" />
                )}
              </ActionIcon>
            )}
          </Container>
        </Grid.Col>
        {isVote && (
          <Grid.Col span={12}>
            <VoteSlider
              permlink={comment.permlink}
              author={comment.author}
              setIsVote={setIsVote}
              queryKey={'comments-data'}
            />
          </Grid.Col>
        )}
        {isComment && (
          <Grid.Col span={12}>
            {/* <CommentEditor
              setIsComment={setIsComment}
              permlink={comment.permlink}
              parentAuthor={comment.author}
              parentPermlink={comment?.parent_permlink}
              queryKey={'comments-data'}
            /> */}
          </Grid.Col>
        )}
        {areChildrenVisible && (
          <div style={{ marginLeft: `${(comment.depth - 1) * 20}px` }}>
            {nestedComments &&
              nestedComments.map((childComment: any) => (
                <CommentCard
                  key={childComment.post_id}
                  comment={childComment}
                  nestedComments={childComment.newChildren}
                  isVisible={true}
                />
              ))}
          </div>
        )}
      </Container>
    </Paper>
  )
}
