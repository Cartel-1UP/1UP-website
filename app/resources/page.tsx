'use client'

import { Resources } from "@/components/Resources/Resources"

import { Container, Space } from '@mantine/core'
import { useMediaQuery } from "@mantine/hooks"

export const runtime = 'experimental-edge'

export default function Page() {
  const isMd = useMediaQuery(`(max-width: 1000px)`)
  return (
    <>
      <Container fluid pb={40} bg={`linear-gradient(to bottom, #072f37 0%, #072f37 10%, #f3f3f3 30%, #f3f3f3 100%)`}>
        {isMd ? (
          <Resources />
        ) : (
          <Container size={'xl'}>
            <Space h="xl" />
            <Resources />
          </Container>
        )}
      </Container>
    </>
  )
}
