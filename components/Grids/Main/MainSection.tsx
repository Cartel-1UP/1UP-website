'use client'
import { Carousel } from '@mantine/carousel';
import { Box, Center, Container, Loader, useMantineTheme } from '@mantine/core';
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
          <Box sx={{height: 400}}>
            <Center>
                <Loader size="xl" color="dark"/> 
            </Center>
          </Box>
        </Center>
      </Container>
    </Container>
  )
 
  if (error) return 'An error has occurred: ' + error
  
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

return null
}
