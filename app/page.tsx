'use client'

import { AboutPage } from '@/components/About/About/AboutPage'
import { Container } from '@mantine/core'

export const runtime = 'experimental-edge'

export default function Home() {
  return (
    <>
      <Container
        fluid
        bg={'radial-gradient(#125c6b 0%, #072f37 70%)'}
        pb={25}
      >
        <Container size="xl" pt={'90px'}>
          <AboutPage />
        </Container>
      </Container>
    </>
  )
}
