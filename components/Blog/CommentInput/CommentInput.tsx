'use client'
import { Card, Grid, SimpleGrid, Space } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import useStyles from './style';

interface Props {
  article : any;
  user: any;
  comments: any;
}

export function CommentInput() {
  const { classes, theme } = useStyles();
  const laptop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  return (
    <>
      <Space h="xl" />
      <Grid grow>
        <Grid.Col span={laptop ? 12 : 9}>
            <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <Card withBorder p="xl" radius="md" className={classes.card}>
                
                </Card>
            </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={laptop ? 12 : 3}>
          {!laptop && 
            <Card withBorder p="xl" radius="md" className={classes.card}>
              
            </Card>
            }
        </Grid.Col>      
      </Grid>
    
    </>
  );
}
