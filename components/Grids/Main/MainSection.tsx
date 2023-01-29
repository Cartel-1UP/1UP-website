'use client'
import { Carousel } from '@mantine/carousel';
import { Box, Center, Container, Loader, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import useStyles from '.';
import { supabase } from '../../../lib/supabaseClient';

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
  const [loading, setLoading] = useState(true);
  const [maincards, setMaincards] = useState(['']);

  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);


  

  useEffect(() => {
    fetchMaincards()
  }, [])

  const fetchMaincards = async () => {
    try {

      setLoading(true);

      const {data, error} = await supabase
      .from("maincards")
      .select("*")

      if (error) throw error

      const slides:any = data.map((item, index) => (
        <Carousel.Slide key={index}>
          <Card {...item} />
        </Carousel.Slide>
      ));

      setMaincards(slides)
      
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container fluid className={classes.gradientBot}>
      <Container size="xl" pt={0}>
      {loading ? 
      <Center>
          <Box sx={{height: 400}}>
            <Center>
                <Loader size="xl" color="dark"/> 
            </Center>
          </Box>
          </Center>
        :
        <Carousel
          slideSize="33.33%"
          breakpoints={[{ maxWidth: 'xs', slideSize: '100%', slideGap: 3 }]}
          slideGap="xl"
          align="start"
          slidesToScroll={mobile ? 1 : 3}
          loop
        >

          {maincards}
        </Carousel>
 }
      </Container>
    </Container>
  );
}