'use client'

import { BookmarkSection } from '@/components/ui/Bookmark/BookmarkSection'
import useSettings from '@/utils/methods/useSettings'

import { Container } from '@mantine/core'

export default function Page() {
  const { ...settings } = useSettings()
  return (
    <>
      <Container
        fluid
        pb={20}
        bg={`linear-gradient(to bottom, #072f37 0%, #072f37 10%,  #f3f3f3 100%)`}
        style={{ height: '100vh' }}
      >
        {settings.isMd ? (
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
