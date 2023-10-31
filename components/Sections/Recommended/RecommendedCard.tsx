import {
  AspectRatio,
  Avatar,
  Badge,
  Card,
  Container,
  Grid,
  Group,
  Image, Indicator, Text
} from '@mantine/core'
import Link from 'next/link'
import useStyles from './style'

type CardProps = {
  article: any
}

export function RecommendedCard({ article }: CardProps) {
  const { classes } = useStyles()

  return (
    <Link
      href={
        `community/${article.community}/post/` +
        article.author +
        '/' +
        article.permlink
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
                label={article.lvl}
                size={30}
                position="bottom-end"
                withBorder
              >
                <Avatar
                  color="gray"
                  size={45}
                  radius="xl"
                  src={`https://images.hive.blog/u/${article.author}/avatar/`}
                />
              </Indicator>
              <Text pl={20} size="xs" transform="uppercase" color={'dimmed'} fw={500}>
                {article.author}
              </Text>
            </Container>
          </Grid.Col>
          <Grid.Col span={12} mt={5}>
            <Container>
              <AspectRatio ratio={5 / 3}>
                <Image
                  radius={0}
                  src={article.image}
                  withPlaceholder
                  fit='fill'
                  h={200}
                />
              </AspectRatio>
            </Container>
          </Grid.Col>
          <Grid.Col span={12}>
            <Container>
              <Text className={classes.title} mt={5} sx={{ WebkitLineClamp: 2 }}>
                {article.title}
              </Text>
            </Container>
          </Grid.Col>
          <Grid.Col span={12}>
            <Container>
              <Group position="right">
                <Badge c={'#072f37'} bg={'#072f371A'} radius={5}>
                  {article.community_title}
                </Badge>
              </Group>
            </Container>
          </Grid.Col>
        </Grid>
      </Card>
    </Link>
  )
}
