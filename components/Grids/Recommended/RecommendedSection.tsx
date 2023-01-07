'use client'
import { AspectRatio, Card, Container, Image, SimpleGrid, Space, Text, Title } from '@mantine/core'
import { useEffect, useState } from 'react'
import useStyles from '.'
import api from '../../../utils/api'

export function RecommendedCardsGrid() {
    const { classes, theme } = useStyles()
  const [articles, setArticles] = useState<any>([])
  
  async function getPosts(tag: string) {
    try {
      const { data } = await api.post('hot', tag )      
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
      <Container>
        <AspectRatio ratio={16/9}>
        <Image src={article.json_metadata.image[0]} />
        </AspectRatio> 
      </Container>
      <Container>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        Tags: [ {article.category} ]
      </Text>
        
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {article.author} - {article.created}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
      </Container>
    </Card>
  ))

  return (
    <>
    <Space h="xl" />
    <Space h="xl" />
    <Space h="xl" />
    <Container fluid sx={{backgroundColor: theme.colors.dark[6]}} pb={20} pt={20}>
      <Title order={1}>Recommended</Title>
        <Space h="xl" />
        <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {cards}
        </SimpleGrid>
    </Container>
    </>
  )
}
