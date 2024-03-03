'use client'

import useSettings from '@/utils/methods/useSettings'
import { Container, Grid, Image, Text } from '@mantine/core'
import splinterlands from '../../images/splinterland_1.jpg'
import useStyles from './style'

type Props = {
  value: string
}

export function CommunityStats({ value }: Props) {
  const { classes, theme } = useStyles()
  const { ...settings } = useSettings()
  return (
    <>
      {settings.isMd ? (
        <>
          <Grid grow pt={20}>
            <Grid.Col span={12}>
              <div className={classes.frame}>
                <Image src={splinterlands.src} fit={'cover'} />
              </div>
            </Grid.Col>
            <Grid.Col span={12}>
              <Text c={'#ffffff'}>{value}</Text>
            </Grid.Col>
          </Grid>
        </>
      ) : (
        <>
          <Container fluid pt={'xl'}>
            <Grid grow>
              <Grid.Col span={7}>
                <Text c={'#ffffff'}>{value}</Text>
              </Grid.Col>
              <Grid.Col span={5}>
                <div className={classes.frame}>
                  <Image src={splinterlands.src} fit={'cover'} />
                </div>
              </Grid.Col>
            </Grid>
          </Container>
        </>
      )}
    </>
  )
}
