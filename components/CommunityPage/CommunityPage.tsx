'use client'

import { FeedSection } from '@/components/Sections/Feed/FeedSection'
import { comumnityData } from '@/data/communityData'
import { tagToTwitterAccount } from '@/data/twitterData'
import { Card, Grid, Space } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Timeline } from 'react-twitter-widgets'
import { CommunityBar } from '../CommunityBar/CommunityBar'

import useStyles from './style'

interface Props {
  image: string
  tag: string
}

export function CommunityPage({ image, tag }: Props) {
  const { classes, theme } = useStyles()
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)
  const result = comumnityData.filter((data) => data.tag === tag)[0]
  const name = tagToTwitterAccount[tag]

  return isMd ? (
    <>
      <FeedSection sort={'created'} tag={tag} isCommunity={true} communityLogo={result.image} />
      {<CommunityBar communityLogo={result.image} tag={result.tag} />}
    </>
  ) : (
    <>
      <Grid grow>
        <Grid.Col span={9}>
          <Space h="xl" />
          <FeedSection sort={'created'} tag={tag} isCommunity={true} />
        </Grid.Col>
        <Grid.Col span={3}>
          {
            <>
              <Space h="xl" />
              <CommunityBar communityLogo={result.image} tag={result.tag} />
              {name && (
                <div style={{ position: 'sticky', top: 90 }}>
                  <Space h="md" />
                  <Card
                    withBorder
                    p={0}
                    radius={5}
                    sx={{
                      borderColor: '#e2e8f0d2',
                      borderWidth: 1,
                    }}
                  >
                    <Timeline
                      dataSource={{ sourceType: 'profile', screenName: name }}
                      options={{ height: '600', chrome: 'noborders, transparent' }}
                    />
                  </Card>
                </div>
              )}
            </>
          }
        </Grid.Col>
      </Grid>
    </>
  )
}
