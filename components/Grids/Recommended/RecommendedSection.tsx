'use client'
import { Card, Container, Grid, SimpleGrid, Skeleton, Space, Title } from '@mantine/core'
import { IconArrowBarRight } from '@tabler/icons'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { getPosts } from '../../../utils/actions/posts'
import { RecommendedCard } from './RecommendedCard/RecommendedCard'
import useStyles from './style'


type Props = {
  tag: string
}

export function RecommendedCardsGrid({tag}: Props) {
  const { classes, theme } = useStyles()
  const { isLoading, error, data } = useQuery('trendingData', () => getPosts({
    tag: tag,
    sort: 'hot',
    limit: 4
  }));

  if (error) return <div>'An error has occurred: ' + error</div>

  return (
    <>
      <Container fluid className={classes.gradient}>
      <Container size="xl" p={8}>
      <Space h="xl" />
      <Space h="xl" />
          <Card  withBorder p="md" radius={0} className={classes.cardHeader}>
            <Title order={2}>
              Recomended
            </Title>
          </Card>
          <SimpleGrid sx={{backgroundColor: '#ffff'}} cols={4} spacing={0} mt={0} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {
              isLoading ?  

              Array.from({ length: 4 }).map((_, index) => (
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
                    <RecommendedCard article={item} key={index}/>
                )) 
            }
          </SimpleGrid>
          <Card  withBorder p="md" radius={0} className={classes.cardFooter}>
            <Link href={'community/' + tag + '/recommended'} className={classes.link}>
              Check for more <Space w='sm'/> <IconArrowBarRight />
            </Link>
          </Card>
        </Container>
        </Container>
    </>
  )
}
