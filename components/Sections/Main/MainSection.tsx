import { useGetMaincards } from '@/actions/database/get-maincards'
import useSettings from '@/utils/methods/useSettings'
import { Carousel } from '@mantine/carousel'
import { Card } from './MainCard'

export function MainSection() {
  const { ...settings } = useSettings()
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
      slideSize={settings.isMd ? '50%' : '33.33%'}
      breakpoints={[{ maxWidth: 'xs', slideSize: '100%', slideGap: 3 }]}
      slideGap="xl"
      align="start"
      slidesToScroll={settings.isMd ? 1 : 3}
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
