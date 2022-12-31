'use client'
import { AspectRatio, Card, Center, Container, Grid, Image, SimpleGrid, Space, Text, Title } from '@mantine/core'
import { useEffect } from 'react'
import useStyles from '.'
import api from '../../../utils/api'
import BlogPagination from '../../Pagination/Pagination'
import { mockdata } from './data'

export function ArticlesCardsGrid() {
  const { classes, theme } = useStyles()
  
  async function getPosts({tag}: any) {
    try {
      const { data } = await api.post('trending', { tag } )
      data.result.map((article: any)=>(
        console.log(article.author),
        console.log(article.title),
        console.log(article.created),
        console.log(article.category),
        console.log(article.pending_payout_value)
      ))
    } catch (e:any) {
      console.log(e)
    }
  }

  useEffect(() => {
    getPosts("hive-167922")
  }, [])

  const cards = mockdata.map((article, index) => (
      <Card key={index} p="md" radius="md" component="a" href="#" className={classes.card}>
        <Grid grow>        
          <Grid.Col span={3}>
          <AspectRatio ratio={4/3}>
            <Image src={article.image} />
          </AspectRatio>
          </Grid.Col>
          <Grid.Col span={9}>
            <Container>
              <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                {article.author} - {article.date}
              </Text>
            </Container>
            <Container>
              <Text className={classes.title} mt={5}>
                {article.title}
              </Text>
              <Text color="dimmed" size="sm" weight={600}  mt={10}>
                {article.body}
              </Text>
            </Container>
            <Container>
              <Text color="dimmed" size="xs" transform="uppercase" weight={600} mt={20}>
                Tags: [ {article.category} ]
              </Text>
            </Container>
            <Container>
              <Text color="dimmed"  className={classes.price} >
                ${article.price} | comments: {article.comments}
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
      <SimpleGrid cols={1} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {cards}
      </SimpleGrid>
      <Container pt={25}>
        <Center>
          <BlogPagination/>
        </Center>
      </Container>
    </Container>
  )
}
