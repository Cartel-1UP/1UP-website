'use client'
import useSettings from '@/utils/methods/useSettings'
import { Card, Center, Grid, Image, Space, Stack, Text } from '@mantine/core'
import useStyles from './style'

export function Owned() {
  const { classes } = useStyles()
  const { ...settings } = useSettings()

  const cards = [
    {
      title: 'Curators',
      description: 'These are the people who reliably check the content and choose only the most valuable ones.',
      icon: <Image src={'https://cdn-icons-png.flaticon.com/512/554/554795.png'} fit='fill' maw={settings.isMd ? 80 : 110} />
    },
    {
      title: 'NFT\'s',
      description: 'We select promising projects and then successively buy up the digital assets appearing in them.',
      icon: <Image src={'https://cdn-icons-png.flaticon.com/512/7747/7747255.png'} fit='fill' maw={settings.isMd ? 80 : 110} />
    },
    {
      title: 'Rankers',
      description: 'These are players who are in the business of getting the best results to maximize game profits.',
      // icon: <IconDeviceGamepad2 color='white' size={settings.isMd ? 80 : 120} stroke={1} />
      icon: <Image src={'https://cdn-icons-png.flaticon.com/512/3097/3097980.png'} fit='fill' maw={settings.isMd ? 80 : 110} />
    },
    {
      title: 'Cartel.SWAP',
      description: 'This is our app that allows guild members to swap HIVE at the best price.',
      icon: <Image src={'https://cdn-icons-png.flaticon.com/512/11497/11497943.png'} fit='fill' maw={settings.isMd ? 80 : 110} />
    },

  ]

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
        mt={settings.isMd ? 30 : 100}
      >
        What does Cartel do?
      </Text>
      <Grid>
        <Grid.Col span={8}>
          <Text
            c={'#fff'}
            sx={{
              fontFamily: 'Segoe UI, sans-serif',
            }}
            ta="left"
            fz={settings.isMd ? 16 : 24}
            fw={400}
            mt={settings.isMd ? 15 : 20}
          >
            Our guild does not only deal with the games themselves on the network. We try to work with the entire Hive ecosystem by having our own curators and systems to help users collect tokens more efficiently.
          </Text>
        </Grid.Col>
      </Grid>

      <Space h={60} />
      <Grid>
        {
          cards.map((item, index) => (
            <Grid.Col span={settings.isMd ? 6 : 3} key={index}>
              <Card bg={'linear-gradient(#2ecde6 -20%, #162947 100%)'} className={classes.card2} mih={'100%'} pt={settings.isMd ? 20 : 30} pb={settings.isMd ? 20 : 35}>
                <Center>
                  <Stack spacing={0} align="center">
                    <>
                      {item.icon}
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
                        {item.title}
                      </Text>
                      <Text
                        variant="gradient"
                        gradient={{ from: 'white', to: 'white', deg: 45 }}
                        sx={{
                          fontFamily: 'Segoe UI, sans-serif',
                        }}
                        ta="center"
                        fz={settings.isMd ? 16 : 18}
                        fw={500}
                      >
                        {item.description}
                      </Text>
                    </>
                  </Stack>
                </Center>
              </Card>
            </Grid.Col>
          ))
        }
      </Grid>

    </>
  )
}
