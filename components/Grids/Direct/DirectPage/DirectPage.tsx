'use client'
import { Card, Container, Grid, SimpleGrid, Skeleton, Space, Title } from '@mantine/core'
import { useQuery } from 'react-query'
import { getPosts } from '../../../../utils/actions/posts'
import { DirectCard } from './DirectCard/DirectCard'
import useStyles from './style'

type Props = {
  tag: string
  type: string
  name: string
}


export function DirectPage({tag, type, name} : Props) {
  const { classes, theme } = useStyles()

  const { isLoading, error, data } = useQuery('directData', () => getPosts({
    tag: tag,
    sort: type,
    limit: 10
  }));

  if (error) return <div>An error has occurred</div>

  return (
    <>
      <Space h="xl" />
        <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Card  withBorder p="md" radius={0} className={classes.cardHeader}>
            <Title order={2}>
              {name}
            </Title>
          </Card>
          {
              isLoading ?  

              Array.from({ length: 5 }).map((_, index) => (
                <Card withBorder p="md" radius={0} className={classes.card} key={index}>
                  <Grid grow>
                    <Grid.Col>
                      <Skeleton height={50} circle mb="xl" />
                    </Grid.Col>
                    <Grid.Col span={7}>
                      <Skeleton height={8} radius="xl" />
                      <Skeleton height={8} mt={6} radius="xl" />
                      <Skeleton height={8} mt={6} radius="xl" />
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
                    <DirectCard article={item} key={index}/>
                )) 
            }
        </SimpleGrid>
        <Space h="xl" />
    </>

  )
}
