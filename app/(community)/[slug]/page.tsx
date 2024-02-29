'use client'

import { CommunityPage } from '@/components/CommunityPage/CommunityPage';
import useSettings from '@/utils/methods/useSettings';

import { Container, Space } from '@mantine/core';

export default function Page({ params }: { params: { slug: string } }) {
  const { ...settings } = useSettings();
  return (
    <>
      {settings.isMd ? (
        <>
          <CommunityPage tag={params.slug} image={params.slug} />
          {/* <RecommendedSection /> */}
        </>
      ) : (
        <>
          <Container
            fluid
            bg={`linear-gradient(to bottom, #072f37 0%, #072f37 10%, #f3f3f3 30%, #f3f3f3 100%)`}
          >
            <Container size="xl">
              <Space h="xl" />
              <CommunityPage tag={params.slug} image={params.slug} />
              <Space h={40} />
            </Container>
          </Container>
          <Container fluid bg={'#072f37'}>
            {/* <Container fluid bg={'linear-gradient(to bottom, #f3f3f3, #072f37)'}> */}
            <Container size="xl">
              <Space h="md" />
              {/* <RecommendedSection /> */}
            </Container>
          </Container>
        </>
      )}
    </>
  )
}
