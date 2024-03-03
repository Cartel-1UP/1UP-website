'use client'

import { BlogContent } from '@/components/Blog/BlogContent'
import useSettings from '@/utils/methods/useSettings'
import { Container, Space } from '@mantine/core'

export default function Page({ params }: { params: { id: string; username: string } }) {
  const permlink = params.id
  const author = params.username.replace('@', '').replace('%40', '')
  const { ...settings } = useSettings()
  return (
    <>
      <div style={{ minHeight: '100vh' }}>
        {settings.isMd ? (
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
