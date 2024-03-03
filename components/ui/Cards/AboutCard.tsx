import useSettings from '@/utils/methods/useSettings'
import { Card, Center, Stack, Text } from '@mantine/core'
import { useState } from 'react'
import useStyles from './style'

type Props = {
  title: string
  description: string
  icon: any
}

export default function AboutCard({ title, description, icon }: Props) {
  const { classes, theme } = useStyles()
  const { ...settings } = useSettings()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <Card
        bg={'linear-gradient(#2ecde6 -20%, #162947 100%)'}
        className={classes.card2}
        mih={'100%'}
        h={settings.isMd ? 220 : 350}
        pt={settings.isMd ? 20 : 10}
        pb={settings.isMd ? 20 : 15}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Center>
          <Stack
            spacing={0}
            align="center"
            sx={{
              transition: 'opacity 0.3s',
              opacity: isHovered ? 0 : 1,
              pointerEvents: isHovered ? 'none' : 'auto',
            }}
          >
            {icon}
            <Text
              variant="gradient"
              gradient={{ from: 'white', to: 'white', deg: 45 }}
              sx={{
                fontFamily: 'Segoe UI, sans-serif',
              }}
              ta="center"
              fz={settings.isMd ? 24 : 32}
              fw={700}
              mt={10}
            >
              {title}
            </Text>
          </Stack>
          <Stack
            spacing={0}
            align="center"
            sx={{
              position: 'absolute',
              transition: 'opacity 0.3s',
              opacity: isHovered ? 1 : 0,
              pointerEvents: isHovered ? 'auto' : 'none',
            }}
          >
            <Text
              variant="gradient"
              gradient={{ from: 'white', to: 'white', deg: 45 }}
              sx={{
                fontFamily: 'Segoe UI, sans-serif',
              }}
              ta="center"
              fz={settings.isMd ? 16 : 24}
              fw={500}
              p={10}
            >
              {description}
            </Text>
          </Stack>
        </Center>
      </Card>
    </>
  )
}
