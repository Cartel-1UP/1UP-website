'use client'
import { Carousel } from '@mantine/carousel';
import { Box, Center, Container, Skeleton, useMantineTheme } from '@mantine/core';
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

  if (isLoading) return (
    <Container fluid className={classes.gradientBot}>
      <Container size="xl" pt={0}>
        <Center>
        <Box  
          mt={30}
          mb={30}
          mr={10}
          ml={10}
          className={classes.container}>
          <Skeleton height={100} radius="xl" />
        </Box>
        </Center>
      </Container>
    </Container>
  )
 
  if (error) return <div>An error has occurred</div>
  
  if (data && typeof data === 'object') {
  return (
    <Container fluid className={classes.gradientBot}>
      <Container size="xl" pt={0}>
        <Carousel
          slideSize="33.33%"
          breakpoints={[{ maxWidth: 'xs', slideSize: '100%', slideGap: 3 }]}
          slideGap="xl"
          align="start"
          slidesToScroll={mobile ? 1 : 3}
          loop
        >
          {
            data.map?.((item: any, index: any) => (
              <Carousel.Slide key={index}>
                <Card {...item} />
              </Carousel.Slide>
            )) 
          }
        </Carousel>
      </Container>
    </Container>
  );
}

  return <div>Loading...</div>

}
