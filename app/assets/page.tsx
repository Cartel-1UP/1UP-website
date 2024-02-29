'use client'

import { AssetsPage } from '@/components/Assets/AssetsPage'
import { Container } from '@mantine/core'



export default function Page() {
  return (
    <Container fluid bg={'linear-gradient(to top, #275c672d, #072f37 90%, #072f37 100%)'} pb={25}>
      <AssetsPage />
    </Container>
  )
}
