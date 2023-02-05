'use client'
import { AspectRatio, Card, Container, Grid, Image, Space } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import useStyles from '.';
import { mockdata } from '../Community/data';
import { Recent } from '../Default/Recent/Recent';
import { Trending } from '../Default/Trending/Trending';


interface Props {
    image: string
    tag: string
}


export function CommunityPage({image, tag} : Props) {
  const { classes, theme } = useStyles()
  const laptop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  const result = mockdata.filter(data => data.tag === tag)[0];
  
  image = result ? result.image : null;  
  const name = result ? result.name : null;   

  return (
    <Container fluid className={classes.default}>
      <Container size="xl">
      <Grid grow>
      <Grid>
        <Grid.Col span={laptop ? 12 : 9}>
          <Recent tag={tag}/>
        </Grid.Col>
        <Grid.Col span={laptop ? 12 : 3}>
        <Space h="xl" />
        {!laptop && 
          <Card withBorder p="md" radius={10} className={classes.card}>
            
            <AspectRatio ratio={1/1} sx={{ maxWidth: 300 }} mx="auto">
            <Image
                src={image}
                alt="Logo"
                fit="contain"
                />
          </AspectRatio>

            {/* <Title>{name}</Title> */}
          </Card>
}
          <Trending tag={tag}/>
        </Grid.Col>
      </Grid>
      </Grid>
      </Container>
    </Container>
  );
}