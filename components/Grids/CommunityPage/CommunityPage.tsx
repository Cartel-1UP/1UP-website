'use client'
import { AspectRatio, Card, Container, Grid, Image, Space } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { mockdata } from '../Community/data';
import { Recent } from '../Default/Recent/Recent';
import { Trending } from '../Default/Trending/Trending';
import useStyles from './style';

interface Props {
  image: string
  tag: string
}

export function CommunityPage({ ...props }: Props) {
  const { classes, theme } = useStyles()
  const laptop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const result = mockdata.filter(data => data.tag === props.tag)[0];

  props.image = result ? result.image : null;

  return (
    <Container fluid className={classes.default}>
      <Container size="xl">
        <Grid>
          <Grid.Col span={laptop ? 12 : 9}>
            <Recent tag={props.tag} />
          </Grid.Col>
          <Grid.Col span={laptop ? 12 : 3}>
            <Space h="xl" />
            {!laptop &&
              <Card withBorder p="md" radius={10} className={classes.card}>
                <AspectRatio ratio={1 / 1} sx={{ maxWidth: 300 }} mx="auto">
                  <Image
                    src={props.image}
                    alt="Logo"
                    fit="contain"
                  />
                </AspectRatio>
              </Card>
            }
            <div style={{ position: 'sticky', top: '0' }}>
              <Trending tag={props.tag} />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </Container>
  );
}