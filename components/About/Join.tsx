'use client'
import { Text } from '@mantine/core'
import useStyles from './style'

export function Join() {
  const { classes } = useStyles()

  return (
    <>
      <Text
        variant="gradient"
        gradient={{ from: 'white', to: 'cyan', deg: 45 }}
        sx={{
          fontFamily: 'Segoe UI, sans-serif',
        }}
        ta="left"
        fz={48}
        fw={700}
        mt={100}
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
        fz={32}
        fw={500}
        mt={20}
      >
        It is simple, all you have to do is get $CARTEL from <a href={"https://beeswap.dcity.io/tokens/CARTEL"} target="_blank" rel="noreferrer" className={classes.link}>HIVE market</a>.<br />
        Then you can join our community and start earning rewards.
      </Text>
    </>
  )
}
