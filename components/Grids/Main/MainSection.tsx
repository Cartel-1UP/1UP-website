'use client'
import { Carousel } from '@mantine/carousel';
import { Center, Container, Skeleton, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useQuery } from 'react-query';
import { fetchMaincards } from '../../../utils/actions/cartel';
import { Card } from './MainCard/MainCard';
import useStyles from './style';

export function MainCardsGrid() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const { isLoading, error, data } = useQuery('carouselData', () => fetchMaincards());

  if (isLoading) {
    return (
      <Container fluid className={classes.gradientBot}>
        <Container size="xl" pt={0}>
          <Center>
            <Carousel
              slideSize="33.33%"
              breakpoints={[{ maxWidth: 'xs', slideSize: '100%', slideGap: 3 }]}
              slideGap="xl"
              align="start"
              slidesToScroll={mobile ? 1 : 3}
              loop
            >
              {
                Array.from(Array(3)).map((_, index) => (
                  <Carousel.Slide key={index}>
                    <Skeleton width="100%" height="200px" />
                  </Carousel.Slide>
                ))
              }
            </Carousel>
          </Center>
        </Container>
      </Container>
    );
  }

  if (data && typeof data === 'object') {
    return (
      <Container fluid className={classes.gradientBot} pb={25}>
        <Container size="xl" pt={0}>
          <Carousel
            slideSize="33.33%"
            breakpoints={[{ maxWidth: 'xs', slideSize: '100%', slideGap: 3 }]}
            slideGap="xl"
            align="start"
            slidesToScroll={mobile ? 1 : 3}
            loop
          >
            {data.map?.((item: any, index: any) => (
              <Carousel.Slide key={index}>
                <Card {...item} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Container>
      </Container>
    );
  }

  return (
    <Container fluid className={classes.gradientBot}>
      <Container size="xl" pt={0}>
        <Center>
          <Carousel
            slideSize="33.33%"
            breakpoints={[{ maxWidth: 'xs', slideSize: '100%', slideGap: 3 }]}
            slideGap="xl"
            align="start"
            slidesToScroll={mobile ? 1 : 3}
            loop
          >
            {
              Array.from(Array(3)).map((_, index) => (
                <Carousel.Slide key={index}>
                  <Skeleton width="100%" height="200px" />
                </Carousel.Slide>
              ))
            }
          </Carousel>
        </Center>
      </Container>
    </Container>
  );
}
