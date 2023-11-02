import { Card, Container, Grid, Skeleton } from '@mantine/core'
import useStyles from './style'

export function FeedCardSkeleton() {
  const { classes } = useStyles()

  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <Card withBorder p="md" radius={0} className={classes.card} key={index}>
          <Grid grow>
            <Grid.Col span={7}>
              <Container>
                <Skeleton height={50} circle mb="xl" />
              </Container>
              <Container>
                <Skeleton height={8} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
              </Container>
            </Grid.Col>
            <Grid.Col span={5}>
              <Container>
                <Skeleton height={100} radius="sm" />
              </Container>
            </Grid.Col>
            <Grid.Col span={7}>
              <Container>
                <Skeleton height={16} width={'30%'} radius="xl" />
              </Container>
            </Grid.Col>
            <Grid.Col span={5}>
              <Container>
                <Skeleton height={16} radius="xl" />
              </Container>
            </Grid.Col>
          </Grid>
        </Card>
      ))}
    </>
  )
}
