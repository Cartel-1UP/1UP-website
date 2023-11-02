import { Card, Center, Container, Grid, SimpleGrid, Skeleton } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import useStyles from './style'

export function BlogContentSkeleton() {
  const { classes, theme } = useStyles()
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)

  return (
    <>
      {isMd ? (
        <>
          <Card withBorder p="md" radius={0} className={classes.cardHeader}>
            <Grid grow>
              <Grid.Col span={10}>
                <Skeleton height="5vh" />
              </Grid.Col>
              <Grid.Col span={2}>
                <Skeleton height="5vh" />
              </Grid.Col>
            </Grid>
          </Card>
          <Card withBorder p="md" radius={0} className={classes.card}>
            <Skeleton height="65vh" />
          </Card>
          <Card withBorder p="md" radius={0} className={classes.cardFooter}>
            <Skeleton height={'5vh'} />
          </Card>
        </>
      ) : (
        <Container fluid>
          <Grid grow>
            <Grid.Col span={isMd ? 12 : 9}>
              <SimpleGrid cols={1} pt={25} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <Card withBorder p="md" radius={0} className={classes.cardHeader}>
                  <Grid grow>
                    <Grid.Col span={10}>
                      <Skeleton height="5vh" />
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <Skeleton height="5vh" />
                    </Grid.Col>
                  </Grid>
                </Card>
                <Card withBorder p="md" radius={0} className={classes.card}>
                  <Skeleton height="65vh" />
                </Card>
                <Card withBorder p="md" mb={25} radius={0} className={classes.cardFooter}>
                  <Skeleton height={'5vh'} />
                </Card>
              </SimpleGrid>
            </Grid.Col>
            <Grid.Col span={3}>
              <SimpleGrid cols={1} pt={25} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <Card withBorder p="xl" radius="md" className={classes.card}>
                  <Center>
                    <Skeleton height={'6vh'} circle mb="xl" />
                  </Center>
                  <Skeleton height={'5vh'} mt={10} />
                  <Skeleton height={'5vh'} mt={10} />
                </Card>
              </SimpleGrid>
            </Grid.Col>
          </Grid>
        </Container>
      )}
    </>
  )
}
