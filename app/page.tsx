'use client'

import { CommunityBar } from '@/components/CommunityBar/CommunityBar'
import { CommunitySection } from '@/components/Sections/Community/CommunitySection'
import { FeedSection } from '@/components/Sections/Feed/FeedSection'
import { MainSection } from '@/components/Sections/Main/MainSection'
import { RecommendedSection } from '@/components/Sections/Recommended/RecommendedSection'
import oneuplogo2 from '@/images/oneup2.png'
import { Container, Grid, Space } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export const runtime = 'experimental-edge'

export default function Home() {
  const isMd = useMediaQuery(`(max-width: 1000px)`)

  return (
    <>
      <MainSection />
      <CommunitySection />
      {isMd ? (
        <>
          <Container fluid bg={'#E9ECEF'}>
            <Grid>
              <Grid.Col span={12}>
                <FeedSection sort={'created'} tag={'hive-102223'} />
              </Grid.Col>
            </Grid>
          </Container>
          {/* <Container fluid bg={'linear-gradient(to bottom, #E9ECEF, #072f37)'}>
            <RecommendedSection />
          </Container> */}
        </>
      ) : (
        <>
          <Container fluid bg={'#E9ECEF'}>
            <Container size="xl">
              <Grid>
                <Grid.Col span={9}>
                  <FeedSection sort={'created'} tag={'hive-102223'} />
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
              <RecommendedSection />
            </Container>
          </Container>
        </>
      )}
    </>
  )
}
