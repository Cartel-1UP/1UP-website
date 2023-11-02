'use client'

import { BookmarkSection } from '@/components/ui/Bookmark/BookmarkSection'

import { Container } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export const runtime = 'experimental-edge'

export default function Page() {
  const isMd = useMediaQuery(`(max-width: 1000px)`)
  return (
    <>
      <Container
        fluid
        pb={20}
        bg={`linear-gradient(to bottom, #072f37 0%, #072f37 10%,  #f3f3f3 100%)`}
        style={{ height: '100vh' }}
      >
        {isMd ? (
          <BookmarkSection />
        ) : (
          <Container size={'xl'}>
            <BookmarkSection />
          </Container>
        )}
      </Container>
    </>
  )
}
