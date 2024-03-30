'use client'
import stellarium from '@/images/stellarium.png'
import useSettings from '@/utils/methods/useSettings'
import { Grid, Text } from '@mantine/core'
import StakingCard from '../ui/Cards/StakingCard'
import useStyles from './style'

export function Pools() {
  const { classes } = useStyles()
  const { ...settings } = useSettings()

  const data = [
    {
      title: 'Stellarium',
      liquidity: '100,000',
      apr: '10',
      timer: '2 days',
      icon: stellarium,
    },

  ]
  return (
    <>
      <Text
        ta="left"
        fz={settings.isMd ? 28 : 48}
        fw={600}
        mt={settings.isMd ? 40 : 100}
        c={'#fff'}
      >
        Staking pools
      </Text>
      <Text
        c={'#fff'}
        ta="left"
        fz={settings.isMd ? 18 : 24}
        fw={400}
        mt={settings.isMd ? 15 : 20}
      >
        Staking pools are a way to earn passive income by holding your tokens in a wallet.
        You can stake your tokens in a pool and earn rewards for doing so.
      </Text>
      <Grid mt={20}>
        {data.map((item, i) => (
          <Grid.Col span={settings.isMd ? 12 : 6} key={i}>
            <StakingCard
              title={item.title}
              liquidity={item.liquidity}
              apr={item.apr}
              timer={item.timer}
              icon={item.icon} />
          </Grid.Col>
        ))}

      </Grid>
    </>
  )
}
