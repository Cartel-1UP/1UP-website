import { UsersChoiceCard } from '@/types/blog.type';
import { AspectRatio, Avatar, Badge, Card, Container, Grid, Group, Image, Text } from '@mantine/core';
import useStyles from '../style';

type CardProps = {
  article: UsersChoiceCard;
}

export function RecommendedCard({ article }: CardProps) {

  const { classes } = useStyles();
  let imageExists

  if (Array.isArray(article.userpost.json_metadata.image) && article.userpost.json_metadata.image.length === 0) {
    imageExists = false
  } else if (!Array.isArray(article.userpost.json_metadata.image)) {
    imageExists = false
  } else {
    imageExists = true
  }

  return (
    <Card p="md" withBorder radius={0} component="a" href={`community/userschoice/post/` + article.userpost.author + '/' + article.userpost.permlink} className={classes.card} sx={{
      '&:hover': {
        backgroundColor: '#f8f9fc',
      },
    }}>
      <Grid grow>
        <Grid.Col span={12}>
          <Container className={classes.headerContainer}>
            <Avatar color="blue" radius="xl" src={`https://images.hive.blog/u/${article.userpost?.author}/avatar`} />
            <Badge ml={10} color="dark" variant="outline">{article.userpost.author_reputation.toFixed()} lvl</Badge>
            <Text pl={10} color="dimmed" size="xs" transform="uppercase" weight={500}>
              {article.userpost?.author}
            </Text>
          </Container>
        </Grid.Col>
        <Grid.Col span={12}>
          <Container >
            <AspectRatio ratio={16 / 9}>
              {imageExists ?
                <Image
                  radius={10}
                  src={article.userpost.json_metadata.image[0]}
                /> :
                <Image
                  src={null}
                  alt="Image placeholder"
                  withPlaceholder
                  radius={10}
                  height={120}
                />
              }
            </AspectRatio>
          </Container>
        </Grid.Col>
        <Grid.Col span={12}>
          <Container>
            <Text className={classes.title} mt={5} sx={{ WebkitLineClamp: 1, }}>
              {article.userpost?.title}
            </Text>
          </Container>
        </Grid.Col>
        <Grid.Col span={12}>
          {/* <Container mr={0} className={classes.metadataContainer}>
            <IconHeart color="grey" size={14} />
            <Text color="dimmed" className={classes.price}>
              {article.userpost?.active_votes.length}
            </Text>
            <Space w="sm" />
            <IconMessage color="grey" size={14} />
            <Text color="dimmed" className={classes.price}>
              {article.userpost?.children}
            </Text>
            <Space w="sm" />
            <Text color="dimmed" className={classes.price}>
              {article.userpost?.pending_payout_value}
            </Text>
          </Container> */}
          <Container >
            <Group position="right">
              <Badge c={'#072f37'} bg={'#072f371A'} radius={5}  >{article.userpost?.community_title}</Badge>
            </Group>
          </Container>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
