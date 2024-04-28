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
            ta="left"
            fz={settings.isMd ? 32 : 64}
            fw={600}
            lh={1.35}
            c={'white'}
          >
            Hive Gaming Guild
            <br />
            where{' '}
            <Text span c="cyan" inherit>
              players
            </Text>{' '}
            matters.
          </Text>
          <Grid>
            <Grid.Col span={settings.isMd ? 12 : 10}>
              <Text
                ta="left"
                fz={settings.isMd ? 18 : 32}
                fw={500}
                mt={20}
                c={'white'}
              >
                As a guild, we foster collaboration with top gaming developers across various Hive
                projects.
              </Text>
            </Grid.Col>
          </Grid>
          <Group spacing={settings.isMd ? 5 : 15} mt={'md'}>
            <Button
              className={classes.glassMorphicButton}
              radius="sm"
              size={settings.isMd ? 'md' : 'xl'}
              mt={settings.isMd ? 5 : 'xl'}
              onClick={() => {
                router.push('/blog')
              }}
            >
              Go to community
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
