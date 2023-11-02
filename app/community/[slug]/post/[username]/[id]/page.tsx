'use client'

import { BlogContent } from '@/components/Blog/BlogContent'
import { Container, Space } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export const runtime = 'experimental-edge'

export default function Page({ params }: { params: { id: string; username: string } }) {
  const permlink = params.id
  const author = params.username
  const isMd = useMediaQuery(`(max-width: 1000px)`)
  return (
    <>
      <div style={{ minHeight: '100vh' }}>
        {isMd ? (
          <BlogContent permlink={permlink} author={author} />
        ) : (
          <Container
            fluid
            bg={`linear-gradient(to bottom, #072f37 0%, #072f37 10%, #f3f3f3 30%, #f3f3f3 100%)`}
          >
            <Container size="xl">
              <BlogContent permlink={permlink} author={author} />
              <Space h="xl" />
            </Container>
          </Container>
        )}
      </div>
    </>
  )
}
