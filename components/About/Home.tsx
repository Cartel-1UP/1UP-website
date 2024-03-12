'use client'
import AnimatedImages from '@/components/AnimatedImages/AnimatedImages'
import useSettings from '@/utils/methods/useSettings'
import { Button, Grid, Group, Text } from '@mantine/core'
import { useRouter } from 'next/navigation'
import useStyles from './style'

export function Home() {
  const { ...settings } = useSettings()
  const { classes } = useStyles()
  const router = useRouter()
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
            fw={600}
            lh={1.35}
          >
            Hive Gaming Guild
            <br />
            where{' '}
            <Text span c="blue" inherit>
              players
            </Text>{' '}
            matters.
          </Text>
          <Grid>
            <Grid.Col span={settings.isMd ? 12 : 10}>
              <Text
                variant="gradient"
                gradient={{ from: 'white', to: 'white', deg: 45 }}
                sx={{
                  fontFamily: 'Segoe UI, sans-serif',
                }}
                ta="left"
                fz={settings.isMd ? 18 : 32}
                fw={500}
                mt={20}
              >
                As a guild, we foster collaboration with top gaming developers across various Hive
                projects.
              </Text>
            </Grid.Col>
          </Grid>
          <Group spacing={settings.isMd ? 5 : 15} mt={'md'}>
            <Button
              className={classes.textButton2}
              radius="sm"
              size={settings.isMd ? 'md' : 'xl'}
              mt={settings.isMd ? 5 : 'xl'}
              style={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              }}
              onClick={() => window.open('https://discord.gg/f7sHEHYZJZ', '_blank')}
            >
              Join Discord
            </Button>
            <Button
              radius="sm"
              size={settings.isMd ? 'md' : 'xl'}
              mt={settings.isMd ? 5 : 'xl'}
              ml={0}
              style={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
              }}
              className={classes.textButton1}
              onClick={() => router.push('/blog')}

            >
              Our Community
            </Button>
          </Group>
        </Grid.Col>
        {settings.isMd ? null : (
          <Grid.Col span={4}>
            <AnimatedImages />
          </Grid.Col>
        )}
      </Grid>
    </>
  )
}
