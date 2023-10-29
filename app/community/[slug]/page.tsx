'use client'

import { CommunityPage } from '@/components/CommunityPage/CommunityPage'
import { RecommendedSection } from '@/components/Sections/Recommended/RecommendedSection'
import { Container, Space } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export const runtime = 'experimental-edge'

export default function Page({ params }: { params: { slug: string } }) {
  const isMd = useMediaQuery(`(max-width: 1000px)`)
  return (
    <>
      {
        isMd ? (
          <>
            <CommunityPage tag={params.slug} image={params.slug} />
            <RecommendedSection />
          </>
        ) : (
          <>
            <Container fluid bg={`linear-gradient(to bottom, #072f37 0%, #072f37 10%, #f3f3f3 30%, #f3f3f3 100%)`}>
              <Container size="xl">
                <Space h="xl" />
                <CommunityPage tag={params.slug} image={params.slug} />
              </Container>
            </Container>
            <Container fluid bg={'linear-gradient(to bottom, #f3f3f3, #072f37)'}>
              <Container size="xl">
                <Space h="md" />
                <RecommendedSection />
              </Container>
            </Container>
          </>
        )}
    </>
  )
}
