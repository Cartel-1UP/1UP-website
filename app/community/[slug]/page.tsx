'use client'

import { CommunityPage } from '@/components/CommunityPage/CommunityPage'
import { RecommendedSection } from '@/components/Sections/Recommended/RecommendedSection'
import { Container } from '@mantine/core'

export const runtime = 'experimental-edge'

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <CommunityPage tag={params.slug} image={params.slug} />
      <Container fluid bg={'linear-gradient(to bottom, #f3f3f3, #072f37)'}>
        <Container size="xl">
          <RecommendedSection />
        </Container>
      </Container>
    </>
  )
}
