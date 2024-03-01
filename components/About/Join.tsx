'use client'
import useSettings from '@/utils/methods/useSettings'
import { Text } from '@mantine/core'
import useStyles from './style'

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
        fw={700}
        mt={settings.isMd ? 30 : 100}
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
        fz={settings.isMd ? 16 : 32}
        fw={500}
        mt={settings.isMd ? 15 : 20}
      >
        It is simple, all you have to do is get $CARTEL from <a href={"https://beeswap.dcity.io/tokens/CARTEL"} target="_blank" rel="noreferrer" className={classes.link}>HIVE market</a>.<br />
        Then you can join our community and start earning rewards.
      </Text>
    </>
  )
}
