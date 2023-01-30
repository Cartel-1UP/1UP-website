'use client'
import { Center, Container, Image, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import useStyles from '.';


interface Props {
    image: string
}


export function MainPage({image} : Props) {


  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  if(image == 'hive-191258'){
    image = 'https://play.wrestlingorganizationonline.com/_nuxt/img/logo-more.1bdca5f.png'
  }else{
    image = 'https://play.wrestlingorganizationonline.com/_nuxt/img/logo-more.1bdca5f.png'
  }

  return (
    <Container fluid className={classes.gradientBot}>
      <Container size="sm" pt={10} pb={20}>
      <Center>
            <Center>
            {/* <img src={image} alt={'Main'} className={classes.image}/> */}
            <Image
                src={image}
                alt="Logo"
                fit="contain"
                width={'50vw'}
                />

            </Center>
          </Center>
      </Container>
    </Container>
  );
}