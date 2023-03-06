'use client'
import { Carousel } from '@mantine/carousel';
import { Container, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import CommunityCard from './CommunityCard/CommunityCard';
import { mockdata } from './data';
import useStyles from './style';

export function CommunityGrid() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  
  const autoplayOptions = {
    delay: 100,
    playOnInit: true,
    stopOnInteraction: false,
    rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  }
  const autoplay = useRef(Autoplay(autoplayOptions));
  
  return (
    <>
      {!mobile && 
      <Container fluid className={classes.containerLogos} pt={10} pb={30}>
        <Container size="xl">
          <Carousel
            slideSize={mobile ? '20%' : "10%"}
            breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 1 }]}
            slideGap="xl"
            align="start"
            slidesToScroll={mobile ? 2 : 1}
            loop
            withControls={false}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            dragFree={true}
            speed={0.01}
          >
            {mockdata.map((item, index) => (
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

