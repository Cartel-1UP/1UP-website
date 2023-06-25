'use client'
import { AspectRatio, Avatar, Badge, Card, Container, Grid, Image, Space, Text } from '@mantine/core';
import { IconHeart, IconMessage } from '@tabler/icons';
import useStyles from './style';

interface CardProps {
  article: any;
}

export function RecommendedCard({ article }: CardProps) {

  article = article.userpost
  const { classes } = useStyles();
  let imageExists

  if (Array.isArray(article.json_metadata.image) && article.json_metadata.image.length === 0) {
    imageExists = false
  } else if (!Array.isArray(article.json_metadata.image)) {
    imageExists = false
  } else {
    imageExists = true
  }

  return (
    <Card key={article?.userpostpost_id} p="md" withBorder radius={0} component="a" href="#" className={classes.card}>
      <Grid grow>
        <Grid.Col span={12}>
          <Container className={classes.headerContainer}>
            <Avatar color="blue" radius="xl" src={`https://images.hive.blog/u/${article?.author}/avatar`} />
            <Badge ml={10} color="dark" variant="outline">{article.author_reputation.toFixed()} lvl</Badge>
            <Text pl={10} color="dimmed" size="xs" transform="uppercase" weight={500}>
              {article?.author}
            </Text>
          </Container>
        </Grid.Col>
        <Grid.Col span={12}>
          <Container >
            <AspectRatio ratio={16 / 9}>
              {imageExists ?
                <Image radius={10} src={article.json_metadata.image[0]} /> :
                <Image
                  src={null}
                  alt="Image placeholder"
                  withPlaceholder
                  radius={10}
                  height={100}
                />
              }
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
            <IconHeart color="grey" size={14} />
            <Text color="dimmed" className={classes.price}>
              {article?.active_votes.length}
            </Text>
            <Space w="sm" />
            <IconMessage color="grey" size={14} />
            <Text color="dimmed" className={classes.price}>
              {article?.children}
            </Text>
            <Space w="sm" />
            <Text color="dimmed" className={classes.price}>
              {article?.pending_payout_value}
            </Text>
          </Container>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
