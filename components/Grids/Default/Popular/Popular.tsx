'use client'
import { AspectRatio, Card, Center, Container, Grid, Image, SimpleGrid, Space, Text, Title } from '@mantine/core'
import { Suspense } from 'react'
import useStyles from '.'
import { usePostsStore } from '../../../../zustand/stores/usePostsStore'
import BlogPagination from '../../../Pagination/Pagination'

export function Popular() {
  const { classes, theme } = useStyles()
  const posts = usePostsStore((state: { posts: any; }) => state.posts)
  const nextUser = usePostsStore((state: { nextUser: any; }) => state.nextUser)


  const cards = posts.map((article: any) => {
    const date = new Date(article.created);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    return (
      <Card key={article.post_id} p="md" radius="md" component="a" href="#" className={classes.card}>
        <Grid grow>        
          <Grid.Col span={3}>
          <AspectRatio ratio={4/3}>
            <Image src={article.json_metadata.image ? article.json_metadata.image[0] : null} />
          </AspectRatio>
          </Grid.Col>
          <Grid.Col span={9}>
            <Container>
              <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                {article?.author} - {formattedDate}
              </Text>
            </Container>
            <Container>
              <Text className={classes.title} mt={5}>
                {article?.title}
              </Text>
              <Text color="dimmed" size="sm" weight={600}  mt={10}>
                {/* {article.body} */}
              </Text>
            </Container>
            <Container>
              <Text color="dimmed" size="xs" transform="uppercase" weight={600} mt={20}>
                Tags: [ {article?.category} ]
              </Text>
            </Container>
            <Container>
              <Text color="dimmed"  className={classes.price} >
                ${article?.payout} | comments: {article?.children}
              </Text>
            </Container>
          </Grid.Col>
        </Grid>
      </Card>
    )}
    )

  return (
    <>
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
    </>

  )
}
