'use client'
import { Card, Container, Grid, SimpleGrid, Space, Text, Title } from '@mantine/core'
import { Suspense, useEffect } from 'react'
import useStyles from '.'
import getPosts from '../../../../utils/actions/posts'
import { setLatestPosts, usePostsStore } from '../../../../zustand/stores/usePostsStore'

type Props = {
  tag: string
}

export function Latest({tag}: Props) {
  
  const { classes, theme } = useStyles()
  const posts = usePostsStore((state: { latestPosts: any; }) => state.latestPosts)
  const nextUser = usePostsStore((state: { nextUser: any; }) => state.nextUser)
  
  useEffect(() => {
    console.log('test: ' + tag)
    getPosts({
      tag: tag,
      sort: 'trending',
      limit: 6
    }).then((data) => { 
        setLatestPosts(data.result) 
      }
    )
  }, [])

  const cards = posts.map((article: any) => {
    const date = new Date(article.created);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });



    

    return (
      <Card key={article.post_id} radius="md" component="a" href="#" className={classes.card}>
        <Grid grow>     
          <Grid.Col>
            <Container>
              <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                {article?.author} - {formattedDate}
              </Text>
            </Container>
            <Container>
              <Text className={classes.title} mt={5}>
                {article?.title}
              </Text>
            </Container>
            <Container>
              <Text color="dimmed"  className={classes.price} pt={10}>
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
      <Title order={1}>Latest</Title>
      <Space h="xl" />
      <Suspense>
        <SimpleGrid cols={1} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </Suspense>
      <Container pt={25}>
        {/* <Center>
          <BlogPagination amount={5} type={'latest'}/>
        </Center> */}
      </Container>
    </>

  )
}
