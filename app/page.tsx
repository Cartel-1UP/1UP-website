"use client"

import { CommunityBar } from '@/components/CommunityBar/CommunityBar';
import { Community } from '@/components/Sections/Community/Community';
import { Feed } from '@/components/Sections/Feed/Feed';
import { MainCards } from '@/components/Sections/Main/MainCards';
import { RecommendedCardsGrid } from '@/components/Sections/Recommended/RecommendedSection';
import oneuplogo2 from '@/images/oneup2.png';
import { Container, Grid, Space } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const runtime = 'experimental-edge';

export default function Home() {
  const isMd = useMediaQuery(`(max-width: 1000px)`);

  return (
    <>
      <MainCards />
      <Community />

      {
        isMd ?
          <>
            <Container fluid bg={'#E9ECEF'}>
              <Grid>
                <Grid.Col span={12}>
                  <Feed sort={'created'} tag={'hive-102223'} />
                </Grid.Col>
              </Grid>
            </Container>
            <Container fluid bg={'linear-gradient(to bottom, #E9ECEF, #072f37)'}>
              <RecommendedCardsGrid />
            </Container>
          </>
          :
          <>
            <Container fluid bg={'#E9ECEF'}>
              <Container size="xl">
                <Grid>
                  <Grid.Col span={9}>
                    <Feed sort={'created'} tag={'hive-102223'} />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <div style={{ position: 'sticky', top: '0' }}>
                      <Space h="xl" />
                      <CommunityBar communityLogo={oneuplogo2.src} tag={'hive-102223'} />
                    </div>
                  </Grid.Col>
                </Grid>
              </Container>
            </Container>
            <Container fluid bg={'linear-gradient(to bottom, #E9ECEF, #072f37)'}>
              <Container size="xl">
                <RecommendedCardsGrid />
              </Container>
            </Container>
          </>
      }


    </>
  )
}
