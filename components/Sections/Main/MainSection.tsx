import { useGetMaincards } from '@/actions/database/get-maincards'
import { Carousel } from '@mantine/carousel'
import { useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { Card } from './MainCard'
import useStyles from './style'

export function MainSection() {
  const { classes } = useStyles()
  const theme = useMantineTheme()

  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)
  const { data, isLoading, error } = useGetMaincards()

  const simpleData = [
    { image: null, title: null, category: null, permlink: null, author: null },
    { image: null, title: null, category: null, permlink: null, author: null },
    { image: null, title: null, category: null, permlink: null, author: null },
  ]

  if (error || data?.length === 0) {
    return null
  }

  return (
    <Carousel
      slideSize={isMd ? '50%' : '33.33%'}
      breakpoints={[{ maxWidth: 'xs', slideSize: '100%', slideGap: 3 }]}
      slideGap="xl"
      align="start"
      slidesToScroll={isMd ? 1 : 3}
      loop
    >
      {isLoading
        ? simpleData.map((item: any, index: any) => (
          <Carousel.Slide key={index}>
            <Card {...item} />
          </Carousel.Slide>
        ))
        : data?.map?.((item: any, index: any) => (
          <Carousel.Slide key={index}>
            <Card {...item} />
          </Carousel.Slide>
        ))}
    </Carousel>
  )
}
