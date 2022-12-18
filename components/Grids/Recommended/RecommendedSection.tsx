'use client'
import { AspectRatio, Card, Container, Image, SimpleGrid, Space, Text, Title } from '@mantine/core'
import useStyles from '.'
import { mockdata } from './data'

export function RecommendedCardsGrid() {
  const { classes, theme } = useStyles()

  const cards = mockdata.map((article) => (
    <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card}>
      <Container>
        <AspectRatio ratio={16/9}>
        <Image src={article.image} />
        </AspectRatio> 
      </Container>
      <Container>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        Tags: [ {article.category} ]
      </Text>
        
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {article.author} - {article.date}
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
