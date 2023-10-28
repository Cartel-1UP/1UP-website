import { UsersChoiceCard } from '@/types/blog.type'
import {
  AspectRatio,
  Avatar,
  Badge,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Indicator,
  Text
} from '@mantine/core'
import Link from 'next/link'
import useStyles from './style'

type CardProps = {
  article: UsersChoiceCard
}

export function RecommendedCard({ article }: CardProps) {
  const { classes } = useStyles()
  let imageExists

  if (
    Array.isArray(article.userpost.json_metadata.image) &&
    article.userpost.json_metadata.image.length === 0
  ) {
    imageExists = false
  } else if (!Array.isArray(article.userpost.json_metadata.image)) {
    imageExists = false
  } else {
    imageExists = true
  }

  return (
    <Link
      href={
        `community/${article.userpost.community}/post/` +
        article.userpost.author +
        '/' +
        article.userpost.permlink
      }
      className={classes.link}
    >
      <Card
        p="md"
        withBorder
        radius={0}
        component="a"
        className={classes.card}
        sx={{
          '&:hover': {
            backgroundColor: '#f8f9fc',
          },
        }}
      >
        <Grid grow>
          <Grid.Col span={12}>
            <Container className={classes.headerContainer}>
              <Indicator
                color={'#114f5c'}
                inline
                label={article.userpost.author_reputation.toFixed()}
                size={30}
                position="bottom-end"
                withBorder
              >
                <Avatar
                  color="gray"
                  size={45}
                  radius="xl"
                  src={`https://images.hive.blog/u/${article.userpost?.author}/avatar/`}
                />
              </Indicator>
              <Text pl={20} size="xs" transform="uppercase" color={'dimmed'} fw={500}>
                {article.userpost?.author}
              </Text>
            </Container>
          </Grid.Col>
          <Grid.Col span={12} mt={5}>
            <Container>
              <AspectRatio ratio={5 / 3}>
                {imageExists ? (
                  <Image
                    radius={0}
                    src={article.userpost.json_metadata.image[0]}
                    withPlaceholder
                    fit='fill'
                    h={200}
                  />
                ) : (
                  <Image src={null} withPlaceholder radius={10} />
                )}
              </AspectRatio>
            </Container>
          </Grid.Col>
          <Grid.Col span={12}>
            <Container>
              <Text className={classes.title} mt={5} sx={{ WebkitLineClamp: 2 }}>
                {article.userpost?.title}
              </Text>
            </Container>
          </Grid.Col>
          <Grid.Col span={12}>
            <Container>
              <Group position="right">
                <Badge c={'#072f37'} bg={'#072f371A'} radius={5}>
                  {article.userpost?.community_title}
                </Badge>
              </Group>
            </Container>
          </Grid.Col>
        </Grid>
      </Card>
    </Link>
  )
}
