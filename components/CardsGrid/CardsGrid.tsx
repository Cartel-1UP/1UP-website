'use client'
import { AspectRatio, Card, Container, Image, SimpleGrid, Text } from '@mantine/core'
import useStyles from '.'
import { mockdata } from './data'

export function ArticlesCardsGrid() {
  const { classes, theme } = useStyles()

  const cards = mockdata.map((article) => (
    <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card} >
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        Tags: [ {article.category} ]
      </Text>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {article.author} - {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
    </Card>
  ))

  return (
    <Container py="xl" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  )
}
