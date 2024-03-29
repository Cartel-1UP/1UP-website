'use client'

import { CommunityBar } from '@/components/CommunityBar/CommunityBar'
import { CommunitySection } from '@/components/Sections/Community/CommunitySection'
import { FeedSection } from '@/components/Sections/Feed/FeedSection'
import { MainSection } from '@/components/Sections/Main/MainSection'
import XTimeline from '@/components/XTimline/XTimeline'
import oneuplogo2 from '@/images/oneup2.png'
import useSettings from '@/utils/methods/useSettings'
import { Card, Container, Grid, NavLink, Space } from '@mantine/core'
import { IconBrandDiscord } from '@tabler/icons'

export default function Home() {
  const { ...settings } = useSettings()
  return (
    <>
      {settings.isMd ? (
        <div
          style={{ background: 'linear-gradient(to top, #275c672d, #072f37 90%, #072f37 100%)' }}
        >
          <MainSection />
        </div>
      ) : (
        <>
          <Container
            fluid
            bg={'linear-gradient(to top, #275c672d, #072f37 90%, #072f37 100%)'}
            pb={25}
          >
            <Container size="xl" pt={0}>
              <MainSection />
            </Container>
          </Container>
          <CommunitySection />
        </>
      )}
      {settings.isMd ? (
        <>
          <FeedSection sort={'created'} tag={'hive-102223'} communityLogo={oneuplogo2.src} />
          <CommunityBar communityLogo={oneuplogo2.src} tag={'hive-102223'} />
          {/* <RecommendedSection /> */}
        </>
      ) : (
        <>
          <Container fluid bg={'#f3f3f3'}>
            <Container size="xl">
              <Grid>
                <Grid.Col span={9}>
                  <Space h="xl" />
                  <FeedSection
                    sort={'created'}
                    tag={'hive-102223'}
                    communityLogo={oneuplogo2.src}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Space h="xl" />
                  <CommunityBar communityLogo={oneuplogo2.src} tag={'hive-102223'} />
                  <div style={{ position: 'sticky', top: '85px' }}>
                    <Space h={20} />
                    <Card
                      withBorder
                      p={10}
                      radius={5}
                      sx={{
                        borderColor: '#f3f3f3',
                        borderWidth: 1,
                      }}
                    >
                      <NavLink
                        label={'Check our Discord'}
                        icon={<IconBrandDiscord size={24} stroke={1.5} color="#7289da" />}
                        onClick={() => window.open('https://discord.gg/f7sHEHYZJZ', '_blank')}
                      />
                    </Card>
                    <Space h={20} />
                    <Card
                      withBorder
                      p={0}
                      radius={5}
                      sx={{
                        borderColor: '#f3f3f3',
                        borderWidth: 1,
                      }}
                    >
                      <XTimeline />
                    </Card>
                  </div>
                </Grid.Col>
              </Grid>
              <Space h={40} />
            </Container>
          </Container>
          {/* <Container fluid bg={'linear-gradient(to bottom, #f3f3f3, #f3f3f3 10%, #072f37 100%)'}> */}
          <Container fluid bg={'#072f37'}>
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
