'use client'

import { useMemo, useState } from 'react'
import CommentThread from './CommentThread'

interface Props {
  comments: any
}

export default function Comment({ comments }: Props) {
  const [idMapping, setIdMapping] = useState({} as any)
  const [root, setRoot] = useState({} as any)

  const commentArray: any[] = Object.values(comments.result)
  const permlinkCount: Record<string, number> = {}

  const updatedCommentArray = commentArray.map((comment) => {
    const permlink = comment.permlink
    if (permlinkCount[permlink] >= 1) {
      comment.permlink = Math.random().toString()
    }
    if (permlinkCount[permlink]) {
      permlinkCount[permlink]++
    } else {
      permlinkCount[permlink] = 1
    }
    return comment
  })

  useMemo(() => {
    const newIdMapping: Record<string, number> = updatedCommentArray?.reduce((acc, el, i = 0) => {
      console.log(el)
      acc[el.permlink] = i
      return acc
    }, {})

    console.log(newIdMapping)
    setIdMapping(newIdMapping)
  }, [])

  useMemo(() => {
    commentArray.forEach((el) => {
      if (!el?.parent_permlink) {
        setRoot(el)
        return
      }
      const parentEl = commentArray[idMapping[el.parent_permlink]]

      if (parentEl) {
        parentEl.newChildren = [...(parentEl.newChildren || []), el]
      }
    })
  }, [idMapping, root])

  return <div id="comments-container">{root && <CommentThread comments={root} />}</div>
}
