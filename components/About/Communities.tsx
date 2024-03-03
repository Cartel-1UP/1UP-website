'use client'
import { comumnityData } from '@/data/communityData'
import useSettings from '@/utils/methods/useSettings'
import { Card, Grid, Image, Space, Text } from '@mantine/core'
import Link from 'next/link'
import useStyles from './style'

export function Communities() {
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
        fw={600}
        mt={settings.isMd ? 30 : 100}
      >
        We are working with
      </Text>
      <Space h={20} />
      <Grid>
        {comumnityData.map((item, index) => (
          <Grid.Col span={settings.isMd ? 3 : 2} key={index}>
            {item.tag !== 'none' ? (
              <Link href={item?.tag}>
                <Card
                  p="md"
                  bg={'radial-gradient(#2ecde6 30%, #162947 130%)'}
                  radius={settings.isMd ? 'md' : 'lg'}
                  className={classes.card}
                >
                  <Image src={item.image} alt={item.name} fit="scale-down" />
                </Card>
              </Link>
            ) : (
              <Card
                p="md"
                bg={'radial-gradient(#2ecde6 30%, #162947 130%)'}
                radius="md"
                className={classes.card}
              >
                <Image src={item.image} alt={item.name} fit="scale-down" />
              </Card>
            )}
          </Grid.Col>
        ))}
      </Grid>
    </>
  )
}
