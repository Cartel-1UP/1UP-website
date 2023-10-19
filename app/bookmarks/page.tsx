'use client'

import { BookmarkSection } from "@/components/Sections/Bookmark/BookmarkSection"

import {
  Container
} from '@mantine/core'
import { useMediaQuery } from "@mantine/hooks"

export default function Page() {
  const isMd = useMediaQuery(`(max-width: 1000px)`)
  return (
    <>
      <Container fluid pb={20} bg={'linear-gradient(to bottom, #072f37 0%, #E9ECEF 33%, #E9ECEF 33%, #E9ECEF 100%)'}>
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
