'use client'

import { CommunityBar } from '@/components/CommunityBar/CommunityBar'
import { FeedSection } from '@/components/Sections/Feed/FeedSection'
import { comumnityData } from '@/data/communityData'
import { tagToTwitterAccount } from '@/data/twitterData'
import { Card, Container, Grid, Space } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Timeline } from 'react-twitter-widgets'

import useStyles from './style'

interface Props {
  image: string
  tag: string
}

export function CommunityPage({ image, tag }: Props) {
  const { classes, theme } = useStyles()
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)
  const result = comumnityData.filter((data) => data.tag === tag)[0]



  const name = tagToTwitterAccount[tag];



  return (
    <Container fluid className={classes.default}>
      <Container size="xl">
        <Grid>
          <Grid.Col span={isMd ? 12 : 9}>
            <FeedSection sort={'created'} tag={tag} isCommunity={true} />
          </Grid.Col>
          <Grid.Col span={isMd ? 12 : 3}>
            {name ? (
              <>
                <Space h="xl" />
                <CommunityBar communityLogo={result.image} tag={result.tag} />
                <div style={!isMd ? { position: 'sticky', top: 0 } : {}}>
                  <Space h={20} />
                  <Card withBorder p={0} radius={10} sx={{
                    borderColor: '#e2e8f0d2',
                    borderWidth: 1
                  }}>
                    <Timeline
                      dataSource={{ sourceType: "profile", screenName: name }}
                      options={{ height: "600", chrome: "noborders, transparent" }}
                    />
                  </Card>
                </div>
              </>
            ) :
              (
                <div style={!isMd ? { position: 'sticky', top: 0 } : {}}>
                  <Space h="xl" />
                  <CommunityBar communityLogo={result.image} tag={result.tag} />
                </div>
              )
            }
          </Grid.Col>
        </Grid>
      </Container>
    </Container>
  )
}
