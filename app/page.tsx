'use client'

import { CommunityBar } from '@/components/CommunityBar/CommunityBar'
import { CommunitySection } from '@/components/Sections/Community/CommunitySection'
import { FeedSection } from '@/components/Sections/Feed/FeedSection'
import { MainSection } from '@/components/Sections/Main/MainSection'
import { RecommendedSection } from '@/components/Sections/Recommended/RecommendedSection'
import oneuplogo2 from '@/images/oneup2.png'
import { Card, Container, Grid, NavLink, Space } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconBrandDiscord } from '@tabler/icons'
import { Timeline } from 'react-twitter-widgets'

export const runtime = 'experimental-edge'

export default function Home() {
  const isMd = useMediaQuery(`(max-width: 1000px)`)

  return (
    <>
      <Container fluid bg={'linear-gradient(to top, #275c672d, #072f37)'} pb={isMd ? 0 : 25}>
        {isMd ? (
          <MainSection />
        ) : (
          <Container size="xl" pt={0}>
            <MainSection />
          </Container>
        )}
      </Container>
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
          <Container fluid bg={'linear-gradient(to bottom, #E9ECEF, #072f37)'}>
            <RecommendedSection />
          </Container>
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
                  <Space h="xl" />
                  <CommunityBar communityLogo={oneuplogo2.src} tag={'hive-102223'} />

                  <div style={{ position: 'sticky', top: '0' }}>
                    <Space h={20} />
                    <Card withBorder p={10} radius={10} sx={{
                      borderColor: '#e2e8f0d2',
                      borderWidth: 1
                    }}>
                      <NavLink
                        label={'Check our Discord'}
                        // description={item.description}
                        icon={<IconBrandDiscord size={24} stroke={1.5} color='#7289da' />}
                        onClick={() => window.open('https://discord.gg/f7sHEHYZJZ', '_blank')}
                      />
                    </Card>

                    <Space h={20} />
                    <Card withBorder p={0} radius={10} sx={{
                      borderColor: '#e2e8f0d2',
                      borderWidth: 1
                    }}>
                      <Timeline
                        dataSource={{ sourceType: "profile", screenName: "CartelOneup" }}
                        options={{ height: "600", chrome: " noborders, transparent" }}
                      />
                    </Card>
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
