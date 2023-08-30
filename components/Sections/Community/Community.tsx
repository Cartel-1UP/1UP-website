import { Carousel } from '@mantine/carousel';
import { Container, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { comumnityData } from '../../../data/communityData';
import CommunityCard from './CommunityCard';

export function Community() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const autoplayOptions = {
    delay: 100,
    playOnInit: true,
    stopOnInteraction: false,
    rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  }
  const autoplay = useRef(Autoplay(autoplayOptions));

  return (
    <>
      {!isMobile &&
        <Container fluid bg={'linear-gradient(to bottom, #275c672d, #275c67bb)'} pt={10} pb={30}>
          <Container size="xl">
            <Carousel
              slideSize={"10%"}
              breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 1 }]}
              slideGap="xl"
              align="start"
              slidesToScroll={1}
              loop
              withControls={false}
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              dragFree={true}
              speed={0.01}
            >
              {comumnityData.map((item, index) => (
                <Carousel.Slide key={index}>
                  <CommunityCard {...item} />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Container>
        </Container>
      }
    </>
  );
}

