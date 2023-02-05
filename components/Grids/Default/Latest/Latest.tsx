'use client'
import { Avatar, Button, Card, Container, Grid, SimpleGrid, Space, Text, Title } from '@mantine/core'
import { IconHeart, IconMessage } from '@tabler/icons'
import Link from 'next/link'
import { Suspense, useEffect } from 'react'
import useStyles from '.'
import { getPosts } from '../../../../utils/actions/posts'
import getUserData from '../../../../utils/actions/user'
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
    }).then((data: any) => { 
        setLatestPosts(data.result) 
      }
    )
    getUserData('kwskicky').then((data:any) => {
      console.log(data.result.rc_accounts[0])
    })
  }, [])

  const cards = posts.map((article: any) => {
    const date = new Date(article.created);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });



    

    return (
      <Card key={article.post_id} withBorder p="md" radius={0} component="a" href="#" className={classes.card}>
        <Grid grow>  
          <Grid.Col span={12}>
            <Container className={classes.headerContainer}>
              <Avatar color="blue" radius="xl" />
             <Text pl={10} color="dimmed" size="xs" transform="uppercase" weight={500}>
                {article?.author}
              </Text>       
            </Container>
          </Grid.Col>   
          <Grid.Col span={12}>
            <Container>
              <Text className={classes.title}>
                {article?.title}
              </Text>
            </Container>
          </Grid.Col>
          <Grid.Col span={12} display="flex">
          <Container ml={0} className={classes.metadataContainer}>
              <IconHeart color="grey" size={14}/>
              <Text color="dimmed"  className={classes.price}>
                20
              </Text>
              <Space w="xs" />
              <IconMessage color="grey" size={14}/>
              <Text color="dimmed"  className={classes.price}>
               {article?.children}
              </Text>
              <Space w="xs" />
              <Text color="dimmed"  className={classes.price}>
               100.11 ONEUP
              </Text>
            </Container>
          </Grid.Col>
        </Grid>
      </Card>
    )}
    )

  return (

    <>
      <Suspense>
      <Space h="xl" />
        <SimpleGrid cols={1} spacing={0} mt={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Card  withBorder p="md" radius={0} className={classes.cardHeader}>
            <Title order={2}>
              Latest
            </Title>
          </Card>
            {cards}
          <Card  withBorder p="md" radius={0} className={classes.cardFooter}>
            <Link href={'community/' + tag + '/latest'} className={classes.link}>
              <Button variant="outline" radius="md" size="xs" uppercase>
                Show more
              </Button>
            </Link>
          </Card>
        </SimpleGrid>
      </Suspense>
    </>

  )
}
