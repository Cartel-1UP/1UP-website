'use client'
import { Card, Container, Grid, SimpleGrid, Skeleton, Space, Title } from '@mantine/core'
import { IconArrowBarRight } from '@tabler/icons'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { getPosts } from '../../../../utils/actions/posts'
import { RecentCard } from './RecentCard/RecentCard'
import useStyles from './style'

type Props = {
  tag: string
}

export function Recent({...props} : Props) {
  const { classes, theme } = useStyles()

  const { isLoading, error, data } = useQuery('recentData', () => getPosts({
    tag: props.tag,
    sort: 'created',
    limit: 10
  }));

  return (
    <>
      <Space h="xl" />
        <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Card  withBorder p="md" radius={0} className={classes.cardHeader}>
            <Title order={2}>
              Recent
            </Title>
          </Card>
            {
              isLoading ?  
              Array.from({ length: 5 }).map((_, index) => (
                <Card withBorder p="md" radius={0} className={classes.card} key={index}>
                  <Grid grow>
                    <Grid.Col span={7}>
                      <Container >
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
                        <Skeleton height={100} radius="sm"/>
                      </Container>
                    </Grid.Col>
                    <Grid.Col span={7}>
                      <Container>
                        <Skeleton height={16} width={"30%"}  radius="xl"/>
                      </Container>
                    </Grid.Col>
                    <Grid.Col span={5}>
                      <Container>
                        <Skeleton height={16} radius="xl"/>
                      </Container>
                    </Grid.Col>
                  </Grid>
                </Card>
              ))

              : 
                data.result.map?.((item: any, index: any) => (
                    <RecentCard article={item} key={index} tag={props.tag}/>
                )) 
            }

          <Card  withBorder p="md" radius={0} className={classes.cardFooter}>
            <Link href={'community/' + props.tag + '/latest'} className={classes.link}>
              Check for more <Space w='sm'/> <IconArrowBarRight />
            </Link>
          </Card>
        </SimpleGrid>
    </>

  )
}
