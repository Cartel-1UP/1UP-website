'use client'
import { Carousel } from '@mantine/carousel';
import { AspectRatio, Container, Image, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import useStyles from '.';
import { mockdata } from './data';


interface CardProps {
  image: string;
}

function Card({ image}: CardProps) {
  const { classes } = useStyles();

  return (
    <AspectRatio ratio={1/1}>
      <Image src={image} className={classes.card}/>
    </AspectRatio>
);
}

export function CommunityGrid() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = mockdata.map((item, index) => (
    <Carousel.Slide key={index}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Container>
      <Carousel
        slideSize= "12.5%"
        breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 8 }]}
        slideGap="xl"
        align="start"
        slidesToScroll={mobile ? 1 : 8}
        loop
      >
        {slides}
      </Carousel>
    </Container>
  );
}

