'use client'
import { Carousel } from '@mantine/carousel';
import { Box, Container, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import useStyles from '.';
import { supabase } from '../../../lib/supabaseClient';
import { mockdata } from './data';

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  const { classes } = useStyles();

  return (
    <Box  
      mt={30}
      mb={30}
      mr={10}
      ml={10}
      className={classes.container}>
        <img src={image} alt={'Main'} className={classes.image}/>
        <div className={classes.overlay}>
           <Text className={classes.category} size="xs">
             {category}
           </Text>
          <Title order={3} className={classes.title}>
            {title}
          </Title>
        </div>
    </Box>



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

  getServerSideProps()

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
          {slides}
        </Carousel>
      </Container>
    </Container>
  );
}



export async function getServerSideProps() {
  let { data } = await supabase.from('maincards').select()

  console.log(data)

  return data
}

