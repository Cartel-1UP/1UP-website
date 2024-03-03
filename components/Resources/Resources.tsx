'use client'

import { galleryData } from '@/data/galleryData'
import useSettings from '@/utils/methods/useSettings'
import { ActionIcon, Box, Card, Center, Grid, Image, Space, Text } from '@mantine/core'
import { useScrollIntoView } from '@mantine/hooks'
import { IconArrowUp } from '@tabler/icons'
import useStyles from './style'

export function Resources() {
  const { classes, theme } = useStyles()
  const { ...settings } = useSettings()
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ offset: 60 })

  return (
    <>
      <Space h={'xl'} />
      <Card withBorder p="md" radius={0} className={classes.cardHeader}>
        <Text size={24} fw={700} sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>
          Resources
        </Text>
        <Text>
          You are welcome to access and utilize the graphics available in our comprehensive vault on
          our website.
        </Text>
      </Card>
      <Card p={0} m={0} withBorder={false} radius={0} className={classes.card}>
        <Grid gutter={0}>
          {galleryData.map((item, index) => {
            return (
              <Grid.Col span={settings.isMd ? item.span * 2 : item.span} key={index}>
                <Card p={10} radius={0} key={index}>
                  <Center>
                    <Image src={item.image} alt={item.name} fit="contain" withPlaceholder />
                  </Center>
                </Card>
              </Grid.Col>
            )
          })}
        </Grid>
      </Card>
      <Card
        withBorder
        p="md"
        radius={0}
        className={classes.cardFooter}
        sx={{ position: 'sticky', bottom: 0 }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <ActionIcon color="dark" onClick={() => scrollIntoView({ alignment: 'start' })}>
            <IconArrowUp size="1.125rem" />
          </ActionIcon>
        </Box>
      </Card>
    </>
  )
}
