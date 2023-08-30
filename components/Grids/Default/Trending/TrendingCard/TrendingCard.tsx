'use client'
import { Avatar, Badge, Card, Container, Grid, Indicator, Space, Text } from '@mantine/core';
import { IconHeart, IconMessage } from '@tabler/icons';
import useStyles from './style';

interface CardProps {
  article: any;
}

export function TrendingCard({ article }: CardProps) {

  const { classes } = useStyles();

  return (
    <Card key={article.post_id} withBorder p="md" radius={0} component="a" href={`community/${article.community}/post/${article.author}/${article.permlink}`} className={classes.card}>
      <Grid grow>
        <Grid.Col span={12}>
          <Container className={classes.headerContainer}>
            <Indicator color={'#072f37'} inline label={article.author_reputation.toFixed()} size={25} position="bottom-end" withBorder>
              <Avatar color="gray" radius="xl" src={`https://images.hive.blog/u/${article?.author}/avatar/`} />
            </Indicator>
            {
              article.stats.is_pinned && <Badge ml={10} color="red" variant="outline">Pinned</Badge>
            }
            <Text className={classes.author} pl={10} color="dimmed" size="xs" transform="uppercase" weight={500}>
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
            <IconHeart color="grey" size={14} />
            <Text color="dimmed" className={classes.price}>
              {article?.active_votes.length}
            </Text>
            <Space w="xs" />
            <IconMessage color="grey" size={14} />
            <Text color="dimmed" className={classes.price}>
              {article?.children}
            </Text>
            <Space w="xs" />
            <Text color="dimmed" className={classes.price}>
              {article?.pending_payout_value}
            </Text>
          </Container>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
