'use client'
import { Card, Center, Grid, Space, Stack, Text } from '@mantine/core'
import { IconArrowsExchange, IconCards, IconDeviceGamepad2, IconUsers } from '@tabler/icons'
import useStyles from '../style'

export function Owned() {
  const { classes } = useStyles()

  const cards = [
    {
      title: 'Curators',
      description: 'Our Hive curators use a specialized system to meticulously curate top-quality blogs.',
      icon: <IconUsers color='white' size={120} stroke={1} />
    },
    {
      title: 'NFT\'s',
      description: 'We have hundreds of assets from all the games on the Hive network.',
      icon: <IconCards color='white' size={120} stroke={1} />
    },
    {
      title: 'Hive SWAP',
      description: 'In order to help the Hive exchange, we created our own swap, for our community.',
      icon: <IconArrowsExchange color='white' size={120} stroke={1} />
    },
    {
      title: 'Players',
      description: 'Our team includes talented players fighting for top positions in the games.',
      icon: <IconDeviceGamepad2 color='white' size={120} stroke={1} />
    }
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
        fz={48}
        fw={700}
        mt={100}
      >
        Why should you join us?
      </Text>
      <Space h={30} />
      <Grid>
        {
          cards.map((item, index) => (
            <Grid.Col span={3} key={index}>
              <Card bg={'linear-gradient(#2ecde6 -80%, #162947 95%)'} className={classes.card2} mih={'100%'}>
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
                        fz={32}
                        fw={700}
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
                        fz={24}
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
