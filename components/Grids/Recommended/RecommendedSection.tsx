'use client'
import { AspectRatio, Avatar, Card, Container, Grid, Image, SimpleGrid, Space, Text, Title } from '@mantine/core'
import { IconArrowBarRight, IconHeart, IconMessage } from '@tabler/icons'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import useStyles from '.'
import api from '../../../utils/api'


type Props = {
  tag: string
}

export function RecommendedCardsGrid({tag}: Props) {
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
    getPosts(tag)
  }, [])

  const cards = articles.map((article: any) =>{ 
    const date = new Date(article.created);
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    return(
    <Card key={article.post_id} p="md" withBorder radius={0} component="a" href="#" className={classes.card}>
      <Grid grow>
      <Grid.Col span={12}>
            <Container className={classes.headerContainer}>
            <Avatar color="blue" radius="xl" src={`https://images.hive.blog/u/${article?.author}/avatar`}/>
             <Text pl={10} color="dimmed" size="xs" transform="uppercase" weight={500}>
                {article?.author} - {formattedDate}
              </Text>       
            </Container>
          </Grid.Col>  
        <Grid.Col span={12}>
          <Container >
            <AspectRatio ratio={16/9}>
              <Image radius={10}  src={article.json_metadata.image ? article.json_metadata.image[0] : null} />
            </AspectRatio>
          </Container>
        </Grid.Col>
        <Grid.Col span={12}>
          <Container>
            <Text className={classes.title} mt={5}>
              {article?.title}
            </Text>
          </Container>
        </Grid.Col>
        <Grid.Col span={12} display="flex">
          <Container mr={0} className={classes.metadataContainer}>
              <IconHeart color="grey" size={14}/>
              <Text color="dimmed"  className={classes.price}>
              {article?.active_votes.length}
              </Text>
              <Space w="sm" />
              <IconMessage color="grey" size={14}/>
              <Text color="dimmed"  className={classes.price}>
               {article?.children}
              </Text>
              <Space w="sm" />
              <Text color="dimmed"  className={classes.price}>
              {article?.pending_payout_value}
              </Text>
            </Container>
          </Grid.Col>
      </Grid>
    </Card>
  )})

  return (
    <>

  <Suspense>
      <Container fluid className={classes.gradient}>
      <Container size="xl" p={8}>
      <Space h="xl" />
      <Space h="xl" />
          <Card  withBorder p="md" radius={0} className={classes.cardHeader}>
            <Title order={2}>
              Recomended
            </Title>
          </Card>
          <SimpleGrid sx={{backgroundColor: '#ffff'}} cols={4} spacing={0} mt={0} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            {cards}
          </SimpleGrid>
          <Card  withBorder p="md" radius={0} className={classes.cardFooter}>
            <Link href={'community/' + tag + '/recommended'} className={classes.link}>
              Check for more <Space w='sm'/> <IconArrowBarRight />
            </Link>
          </Card>
        </Container>
        </Container>
    </Suspense>
    </>
  )
}
