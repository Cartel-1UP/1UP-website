'use client'

import { BlogPage } from '@/components/Blog/BlogPage'

export default function Page({ params }: { params: { id: string; username: string } }) {
  const permlink = params.id
  const author = params.username
  return (
    <>
      <BlogPage permlink={permlink} author={author} />
    </>
  )
}
