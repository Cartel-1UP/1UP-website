import CommentCard from './CommentCard'

type Props = {
  comments: any
}

export default function CommentThread({ comments }: Props) {
  const createCommentTree = (comment: any) => {
    const commentElements = comment?.newChildren?.map((comment: any) => {
      return (
        <CommentCard
          key={comment.newChildren?.post_id}
          comment={comment}
          nestedComments={comment.newChildren}
        />
      )
    })

    return commentElements
  }

  return <div>{createCommentTree(comments)}</div>
}
