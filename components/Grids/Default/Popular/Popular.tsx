'use client'
import { Avatar, Button, Card, Container, Grid, Image, SimpleGrid, Space, Text, Title } from '@mantine/core'
import { IconArrowBarRight, IconHeart, IconMessage } from '@tabler/icons'
import Link from 'next/link'
import { Suspense, useEffect } from 'react'
import useStyles from '.'
import { getPosts } from '../../../../utils/actions/posts'
import { setPosts, usePostsStore } from '../../../../zustand/stores/usePostsStore'


type Props = {
  tag: string
}


export function Popular({tag} : Props) {
  const { classes, theme } = useStyles()
  const posts = usePostsStore((state: { posts: any; }) => state.posts)
  const nextUser = usePostsStore((state: { nextUser: any; }) => state.nextUser)

  useEffect(() => {
    getPosts({
      tag: tag,
      sort: 'trending',
      limit: 5
    }).then((data: any) => {  
          setPosts(data.result) 
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

    let forbiddenChars = ["!", "<", ">","[","]"];
    let myString = article.body;
    let words = myString.split(" ");
    let newWords = words.filter(function(word: string) {
        return !word.split('').some(function(char: string) {
            return forbiddenChars.includes(char);
        });
    });
    
    let bodyOfArticle = newWords.join(" ");

    let json_metadata = article?.json_metadata
    json_metadata = JSON.parse(json_metadata)
  

    return (
      <Card key={article.post_id} withBorder p="md" radius={0} component="a" href="#" className={classes.card}>
        <Grid grow>
          <Grid.Col span={12}>
            <Container className={classes.headerContainer}>
              <Avatar color="blue" radius="xl" />
             <Text pl={10} color="dimmed" size="xs" transform="uppercase" weight={500}>
                {article?.author} - {formattedDate}
              </Text>       
            </Container>
          </Grid.Col>  
          <Grid.Col span={7}>
          <Container>
              <Text className={classes.title} mt={5}>
                {article?.title}
              </Text>
              <Text color="dimmed" size="sm" weight={600}  mt={10} className={classes.turncate}>
                {bodyOfArticle}
              </Text>
            </Container>
          </Grid.Col>
          <Grid.Col span={5} display="flex">
            <Container className={classes.imageContainer}>
              <Image radius={10}  src={json_metadata.image ? json_metadata.image[0] : null} />
            </Container>
          </Grid.Col>
          <Grid.Col span={7}>
          <Container>
                <Button variant="outline" color="gray" radius="md" size="xs" uppercase>
                {article?.category}
                </Button>
            </Container>
          </Grid.Col>
          <Grid.Col span={5} display="flex">
          <Container mr={0} className={classes.metadataContainer}>
              <IconHeart color="grey" size={14}/>
              <Text color="dimmed"  className={classes.price}>
                20
              </Text>
              <Space w="sm" />
              <IconMessage color="grey" size={14}/>
              <Text color="dimmed"  className={classes.price}>
               {article?.children}
              </Text>
              <Space w="sm" />
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
      <Space h="xl" />
      <Suspense>
        <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <Card  withBorder p="md" radius={0} className={classes.cardHeader}>
            <Title order={2}>
              Popular
            </Title>
          </Card>
          {cards}
          <Card  withBorder p="md" radius={0} className={classes.cardFooter}>
            <Link href={'community/' + tag + '/popular'} className={classes.link}>
              Check for more <Space w='sm'/> <IconArrowBarRight />
            </Link>
          </Card>
        </SimpleGrid>
      </Suspense>
    </>

  )
}
