'use client'
import useSettings from '@/utils/methods/useSettings'
import { Grid, Text } from '@mantine/core'
import CoinCard from '../ui/Cards/CoinCard'
import useStyles from './style'

import oneup from '@/images/1up.png'
import cartel1 from '@/images/cartel_logo_1.png'

export function Join() {
  const { classes } = useStyles()
  const { ...settings } = useSettings()

  return (
    <>
      <Text
        variant="gradient"
        gradient={{ from: 'white', to: 'cyan', deg: 45 }}
        sx={{
          fontFamily: 'Segoe UI, sans-serif',
        }}
        ta="left"
        fz={settings.isMd ? 28 : 48}
        fw={600}
        mt={settings.isMd ? 40 : 100}
      >
        How to join CARTEL?
      </Text>
      <Text
        // variant="gradient"
        // gradient={{ from: 'white', to: 'white', deg: 45 }}
        c={'#fff'}
        sx={{
          fontFamily: 'Segoe UI, sans-serif',
        }}
        ta="left"
        fz={settings.isMd ? 18 : 24}
        fw={400}
        mt={settings.isMd ? 15 : 20}
      >
        It is simple, all you have to do is get $CARTEL from{' '}
        <a
          href={'https://beeswap.dcity.io/tokens/CARTEL'}
          target="_blank"
          rel="noreferrer"
          className={classes.link}
        >
          HIVE market
        </a>
        .<br />
        Then you can join our community and start earning rewards.
      </Text>
      <Grid mt={20}>
        <Grid.Col span={settings.isMd ? 12 : 6}>
          <CoinCard name={'CARTEL'} image={cartel1} />
        </Grid.Col>
        <Grid.Col span={settings.isMd ? 12 : 6}>
          <CoinCard name={'ONEUP'} image={oneup} />
        </Grid.Col>
      </Grid>
    </>
  )
}
