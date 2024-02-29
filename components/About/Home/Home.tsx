'use client'
import AnimatedImages from '@/components/AnimatedImages'
import { Button, Grid, Text } from '@mantine/core'

export function Home() {
  return (
    <>
      <Grid>
        <Grid.Col span={8}>
          <Text
            variant="gradient"
            gradient={{ from: 'white', to: 'cyan', deg: 45 }}
            sx={{
              fontFamily: 'Segoe UI, sans-serif',
            }}
            ta="left"
            fz={64}
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
            fz={32}
            fw={500}
            mt={20}
          >
            Introducing the Cartel Guild. As a guild, we foster collaboration with top gaming developers across various Hive projects.
          </Text>
          <Button
            variant="gradient"
            gradient={{ from: '#162947', to: '#2ecde6', deg: 45 }}
            radius="md"
            size="xl"
            mt={'xl'}
            style={{
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Adjust the shadow properties as needed
            }}
            onClick={() => window.open('https://discord.gg/f7sHEHYZJZ', '_blank')}
          >
            Join Discord
          </Button>
          <Button
            variant="gradient"
            gradient={{ from: '#162947', to: '#2ecde6', deg: -45 }}
            radius="md"
            size="xl"
            mt={'xl'}
            style={{
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)', // Adjust the shadow properties as needed
            }}
            ml={'lg'}
          >
            Check Community
          </Button>
        </Grid.Col>
        <Grid.Col span={4}>
          <AnimatedImages />
        </Grid.Col>
      </Grid>
    </>
  )
}
