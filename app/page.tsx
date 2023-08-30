"use client"

import { CommunityBar } from '@/components/CommunityBar/CommunityBar';
import { Feed } from '@/components/Grids/Default/Feed/Feed';
import { Community } from '@/components/Sections/Community/Community';
import { MainCards } from '@/components/Sections/Main/MainCards';
import { RecommendedCardsGrid } from '@/components/Sections/Recommended/RecommendedSection';
import oneuplogo2 from '@/images/oneup2.png';
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore';
import { Container, Grid, Space } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const runtime = 'experimental-edge';

export default function Home() {
  const isMd = useMediaQuery(`(max-width: 1000px)`);
  const authorized = useAuthorizationStore((state: { authorized: boolean; }) => state.authorized)

  return (
    <>
      <MainCards />
      <Community />
      <Container fluid bg={'#E9ECEF'}>
        <Container size="xl">
          <Grid>
            <Grid.Col span={isMd ? 12 : 9}>
              {authorized ?
                <Feed sort={'feed'} /> : <Feed sort={'created'} />
              }
            </Grid.Col>
            <Grid.Col span={isMd ? 12 : 3}>
              <div style={{ position: 'sticky', top: '0' }}>
                <Space h="xl" />
                <CommunityBar communityLogo={oneuplogo2.src} tag={'hive-102223'} />
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </Container>
      <RecommendedCardsGrid />
    </>
  )
}
