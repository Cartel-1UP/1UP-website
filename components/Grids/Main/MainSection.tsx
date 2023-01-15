'use client'
import { Carousel } from '@mantine/carousel';
import { Container, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import useStyles from '.';
import { mockdata } from './data';


interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
    </Paper>
  );
}

export function MainCardsGrid() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = mockdata.map((item, index) => (
    <Carousel.Slide key={index}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Container fluid className={classes.gradientBot}>
    <Container size="xl" pt={80}>

      <Carousel
        slideSize="25%"
        breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 4 }]}
        slideGap="xl"
        align="start"
        slidesToScroll={mobile ? 1 : 4}
        loop
      >
        {slides}
      </Carousel>
    </Container>
    </Container>
  );
}

