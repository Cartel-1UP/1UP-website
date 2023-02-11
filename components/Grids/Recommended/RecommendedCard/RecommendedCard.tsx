'use client'
import { AspectRatio, Avatar, Card, Container, Grid, Image, Space, Text } from '@mantine/core';
import { IconHeart, IconMessage } from '@tabler/icons';
import useStyles from './style';

interface CardProps {
  article: any;
}

export function RecommendedCard({ article }: CardProps) {

  const { classes } = useStyles();
  const date = new Date(article.created);
  const formattedDate = date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
  });

  const json_metadata = JSON.parse(article.json_metadata)

  return (
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
              <Image radius={10}  src={json_metadata.image ? json_metadata.image[0] : null} />
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
  );
}
