'use client'
import { useGetPools } from '@/actions/hive/get-pools'
import { Pool } from '@/types/pool.type'
import useSettings from '@/utils/methods/useSettings'
import { Button, Grid, Text } from '@mantine/core'
import StakingCard from '../ui/Cards/StakingCard'
import useStyles from './style'

export function Pools() {
  const { classes } = useStyles()
  const { ...settings } = useSettings()

  const { data: poolsData, isLoading } = useGetPools()


  const filteredArray: Pool[] = poolsData?.data?.result?.filter((obj: any) => obj.tokenPair.includes("ONEUP"));




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
      <Button
        className={classes.glassMorphicButton}
        radius="sm"
        size={settings.isMd ? 'md' : 'xl'}
        mt={settings.isMd ? 5 : 'xl'}
        onClick={() => window.open('https://beeswap.dcity.io/pools?search=oneup', '_blank')}
      >
        Check pools
      </Button>
      <Grid mt={20}>
        {filteredArray?.map((item, i) => (
          <Grid.Col span={settings.isMd ? 12 : 6} key={i}>
            <StakingCard
              tokenPair={item.tokenPair}
              baseQuantity={item.baseQuantity}
              quoteQuantity={item.quoteQuantity}
              basePrice={item.basePrice}
              quotePrice={item.quotePrice}
            />
          </Grid.Col>
        ))}

      </Grid>
    </>
  )
}
