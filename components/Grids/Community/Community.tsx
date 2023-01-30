'use client'
import { Carousel } from '@mantine/carousel';
import { AspectRatio, Container, Image, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { useRef } from 'react';
import useStyles from '.';
import { mockdata } from './data';


interface CardProps {
  image: string;
  tag: string
}

function Card({ image, tag}: CardProps) {
  const { classes } = useStyles();

  return (
    <AspectRatio ratio={1/1} sx={{maxWidth:'5em'}}>
       <Link href={'community/' + tag}>
      <Image src={image} className={classes.card}/>
      </Link>
    </AspectRatio>
);
}

export function CommunityGrid() {
  const autoplayOptions = {
    delay: 100,
    playOnInit: true,
    stopOnInteraction: false,
    rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  }
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const autoplay = useRef(Autoplay(autoplayOptions));
  

  
  const slides = mockdata.map((item, index) => (
    <Carousel.Slide key={index}>
      <Card {...item} />
    </Carousel.Slide>
  ));

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
            {slides}
          </Carousel>
        </Container>
      </Container>
      }
    </>
  );
}

