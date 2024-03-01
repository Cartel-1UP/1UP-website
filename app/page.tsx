'use client'

import { AboutPage } from '@/components/About/AboutPage'
import useSettings from '@/utils/methods/useSettings'
import { Container } from '@mantine/core'

export default function Home() {
  const { ...settings } = useSettings()
  return (
    <>
      <Container fluid bg={'radial-gradient(#125c6b 0%, #072f37 70%)'} pb={25}>
        <Container size="xl" pt={settings.isMd ? '10px' : '90px'}>
          <AboutPage />
        </Container>
      </Container>
    </>
  )
}
