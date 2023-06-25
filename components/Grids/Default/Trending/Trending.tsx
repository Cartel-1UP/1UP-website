'use client'
import { Card, Container, Grid, SimpleGrid, Skeleton, Space, Title } from '@mantine/core'
import { IconArrowBarRight } from '@tabler/icons'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { getPosts } from '../../../../utils/actions/posts'
import useStyles from './style'
import { TrendingCard } from './TrendingCard/TrendingCard'

type Props = {
  tag: string
}

export function Trending({ ...props }: Props) {
  const { classes, theme } = useStyles()
  const { isLoading, error, data } = useQuery('trendingData', () => getPosts({
    tag: props.tag,
    sort: 'trending',
    limit: 10
  }));

  if (error) return <div>An error has occurred</div>

  return (
    <>
      <Space h="xl" />
      <SimpleGrid cols={1} spacing={0} mt={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Card withBorder p="md" radius={0} className={classes.cardHeader}>
          <Title order={2}>
            Trending
          </Title>
        </Card>
        {
          isLoading ?
            Array.from({ length: 5 }).map((_, index) => (
              <Card withBorder p="md" radius={0} className={classes.card} key={index}>
                <Grid grow>
                  <Grid.Col>
                    <Container>
                      <Skeleton height={50} circle mb="xl" />
                    </Container>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Container>
                      <Skeleton height={8} radius="xl" />
                      <Skeleton height={8} mt={6} radius="xl" />
                      <Skeleton height={8} mt={6} radius="xl" />
                    </Container>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Container ml={0} className={classes.metadataContainer}>
                      <Skeleton height={8} mt={6} radius="xl" />
                    </Container>
                  </Grid.Col>
                </Grid>
              </Card>
            ))
            :
            data.result.map?.((item: any, index: any) => (
              item?.stats?.is_pinned ? null : <TrendingCard article={item} key={index} />
            ))
        }
        <Card withBorder p="md" radius={0} className={classes.cardFooter}>
          <Link href={'community/' + props.tag + '/popular'} className={classes.link}>
            Check for more <Space w='sm' /> <IconArrowBarRight />
          </Link>
        </Card>
      </SimpleGrid>
    </>

  )
}
