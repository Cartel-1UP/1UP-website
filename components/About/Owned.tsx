'use client'
import useSettings from '@/utils/methods/useSettings'
import { Grid, Image, Space, Text } from '@mantine/core'
import AboutCard from '../ui/Cards/AboutCard'
import useStyles from './style'

import boss from '@/images/boss.png'
import swap from '@/images/juggle.png'
import rankers from '@/images/ragnarok.png'
import nft from '@/images/shroominaut.png'

export function Owned() {
  const { classes } = useStyles()
  const { ...settings } = useSettings()

  const cards = [
    {
      title: 'Curators',
      description:
        'These are the people who reliably check the content and choose only the most valuable ones.',
      icon: <Image src={boss.src} fit="fill" maw={settings.isMd ? 120 : 240} />,
    },
    {
      title: "NFT's",
      description:
        'We select promising projects and then successively buy up the digital assets appearing in them.',
      icon: <Image src={nft.src} fit="fill" maw={settings.isMd ? 100 : 195} />,
    },
    {
      title: 'Rankers',
      description:
        'These are players who are in the business of getting the best results to maximize game profits.',
      icon: <Image src={rankers.src} fit="fill" maw={settings.isMd ? 100 : 195} />,
    },
    {
      title: 'Cartel.SWAP',
      description: 'This is our app that allows guild members to swap HIVE at the best price.',
      icon: <Image src={swap.src} fit="fill" maw={settings.isMd ? 100 : 195} />,
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
        mt={settings.isMd ? 40 : 100}
      >
        What does Cartel do?
      </Text>
      <Grid>
        <Grid.Col span={settings.isMd ? 12 : 10}>
          <Text
            c={'#fff'}
            sx={{
              fontFamily: 'Segoe UI, sans-serif',
            }}
            ta="left"
            fz={settings.isMd ? 18 : 24}
            fw={400}
            mt={settings.isMd ? 15 : 20}
          >
            Our guild does not only deal with the games themselves on the network. We try to work
            with the entire Hive ecosystem by having our own curators and systems to help users
            collect tokens more efficiently.
          </Text>
        </Grid.Col>
      </Grid>

      <Space h={60} />
      <Grid>
        {cards.map((item, index) => (
          <Grid.Col span={settings.isMd ? 12 : 3} key={index}>
            <AboutCard title={item.title} description={item.description} icon={item.icon} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  )
}
