'use client'
import { Card, Container, Grid, Image, SimpleGrid, Space, Text, Title } from '@mantine/core'
import useStyles from '.'
import { mockdata } from './data'

export function ArticlesCardsGrid() {
  const { classes, theme } = useStyles()

  const cards = mockdata.map((article) => (
    
      <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card}>
        <Grid grow>        
          <Grid.Col span={3}>
          <Image src={article.image} />
          </Grid.Col>
          <Grid.Col span={9}>
            <Container>
              <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
                Tags: [ {article.category} ]
              </Text>
            </Container>
            <Container>
              <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
                {article.author} - {article.date}
              </Text>
            </Container>
            <Container>
              <Text className={classes.title} mt={5}>
                {article.title}
              </Text>
            </Container>
            <Container>
              <Text color="dimmed"  className={classes.price} mt={20}>
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
    </Container>
  )
}
