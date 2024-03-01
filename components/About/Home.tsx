'use client'
import AnimatedImages from '@/components/AnimatedImages/AnimatedImages'
import useSettings from '@/utils/methods/useSettings'
import { Button, Grid, Group, Text } from '@mantine/core'
import useStyles from './style'



export function Home() {
  const { ...settings } = useSettings()
  const { classes } = useStyles()
  return (
    <>
      <Grid>
        <Grid.Col span={settings.isMd ? 12 : 8}>
          <Text
            variant="gradient"
            gradient={{ from: 'white', to: 'cyan', deg: 45 }}
            sx={{
              fontFamily: 'Segoe UI, sans-serif',
            }}
            ta="left"
            fz={settings.isMd ? 32 : 64}
            fw={700}
          >
            Hive Gaming Guild<br />where players matters.
          </Text>
          <Text
            variant="gradient"
            gradient={{ from: 'white', to: 'white', deg: 45 }}
            sx={{
              fontFamily: 'Segoe UI, sans-serif',
            }}
            ta="left"
            fz={settings.isMd ? 16 : 32}
            fw={500}
            mt={20}
          >
            As a guild, we foster collaboration with top gaming developers across various Hive projects.
          </Text>
          <Group spacing={'lg'}>
            <Button
              className={classes.textButton2}
              // variant="gradient"
              // gradient={{ from: '#162947', to: '#2ecde6', deg: 45 }}
              radius="md"
              size={settings.isMd ? "sm" : "xl"}
              mt={'xl'}
              style={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Adjust the shadow properties as needed
              }}
              onClick={() => window.open('https://discord.gg/f7sHEHYZJZ', '_blank')}
            >
              Join Discord
            </Button>
            <Button
              // variant="gradient"
              // gradient={{ from: '#162947', to: '#2ecde6', deg: -45 }}
              radius="md"
              size={settings.isMd ? "sm" : "xl"}
              mt={'xl'}
              style={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Adjust the shadow properties as needed

              }}
              className={classes.textButton1}
            >
              Check Community
            </Button>
          </Group>

        </Grid.Col>
        {settings.isMd ? null :
          <Grid.Col span={4}>
            <AnimatedImages />
          </Grid.Col>
        }

      </Grid>
    </>
  )
}
