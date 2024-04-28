'use client'
import { comumnityData } from '@/data/communityData'
import useSettings from '@/utils/methods/useSettings'
import { Carousel } from '@mantine/carousel'
import { Card, Grid, Image, Space, Text } from '@mantine/core'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { useRef } from 'react'
import useStyles from './style'

export function Communities() {
  const { classes } = useStyles()
  const { ...settings } = useSettings()
  const autoplayOptions = {
    delay: 100,
    playOnInit: true,
    stopOnInteraction: false,
    rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  }
  const autoplay = useRef(Autoplay(autoplayOptions))

  return (
    <>
      <Text
        ta="left"
        fz={settings.isMd ? 28 : 48}
        fw={600}
        mt={settings.isMd ? 40 : 100}
        c={'#fff'}
      >
        We are working with
      </Text>
      <Space h={20} />
      <Grid>
        <Carousel
          slideSize="20%"
          slideGap="xl"
          align="start"
          slidesToScroll={1}
          loop
          withControls={false}
          plugins={[autoplay.current]}
          // onMouseEnter={autoplay.current.stop}
          // onMouseLeave={autoplay.current.reset}
          dragFree={true}
          speed={0.01}
        >
          {comumnityData.map((item, index) => (
            <Grid.Col span={settings.isMd ? 4 : 2} key={index}>
              {item.tag !== 'none' ? (
                <Link href={item?.tag}>
                  <Card
                    p="md"
                    bg={'radial-gradient(#15aabf 30%, #162947 100%)'}
                    radius={settings.isMd ? 'md' : 'lg'}
                    className={classes.card}
                  >
                    <Image src={item.image} alt={item.name} fit="scale-down" />
                  </Card>
                </Link>
              ) : (
                <Card
                  p="md"
                  bg={'radial-gradient(#15aabf 30%, #162947 100%)'}
                  radius="md"
                  className={classes.card}
                >
                  <Image src={item.image} alt={item.name} fit="scale-down" />
                </Card>
              )}
            </Grid.Col>
          ))}
        </Carousel>
      </Grid>
    </>
  )
}
