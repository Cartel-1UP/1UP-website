'use client'
import { AspectRatio, Card, Center, Container, Grid, Image, SimpleGrid, Space, Text, Title } from '@mantine/core'
import { Suspense, useEffect, useState } from 'react'
import useStyles from '.'
import api from '../../../utils/api'
import BlogPagination from '../../Pagination/Pagination'

export function ArticlesCardsGrid() {
  const { classes, theme } = useStyles()
  const [articles, setArticles] = useState<any>([])
  
  async function getPosts(tag: string) {
    try {
      const { data } = await api.post('trending', tag )      
      setArticles(data.result)

    } catch (e:any) {
      console.log(e)
    }
  }

  useEffect(() => {
    getPosts("hive-102223")
  }, [])

  const cards = articles.map((article: any) => (
      <Card key={article.post_id} p="md" radius="md" component="a" href="#" className={classes.card}>
        <Grid grow>        
          <Grid.Col span={3}>
          <AspectRatio ratio={4/3}>
            <Image src={article.json_metadata.image[0]} />
          </AspectRatio>
          </Grid.Col>
          <Grid.Col span={9}>
            <Container>
              <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                {article.author} - {article.created}
              </Text>
            </Container>
            <Container>
              <Text className={classes.title} mt={5}>
                {article.title}
              </Text>
              <Text color="dimmed" size="sm" weight={600}  mt={10}>
                {/* {article.body} */}
              </Text>
            </Container>
            <Container>
              <Text color="dimmed" size="xs" transform="uppercase" weight={600} mt={20}>
                Tags: [ {article.category} ]
              </Text>
            </Container>
            <Container>
              <Text color="dimmed"  className={classes.price} >
                ${article.payout} | comments: {article.children}
              </Text>
            </Container>
          </Grid.Col>
        </Grid>
      </Card>
  ))

  return (

    <Container py="xl" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}>
      <Space h="xl" />
      <Title order={1}>Recent</Title>
      <Space h="xl" />
      <Suspense>
        <SimpleGrid cols={1} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </Suspense>
      <Container pt={25}>
        <Center>
          <BlogPagination/>
        </Center>
      </Container>
    </Container>
  )
}
