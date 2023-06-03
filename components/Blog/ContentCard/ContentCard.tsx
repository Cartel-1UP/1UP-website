'use client'
import { Avatar, Badge, Box, Button, Card, Container, Grid, Group, SimpleGrid, Space, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconHeart, IconMessage } from '@tabler/icons';
import { Article } from '../../../types/blog.interface';
import { User } from '../../../types/user.interface';
import { dateRefactor } from '../../../utils/methods/dateRefactor';
import { Markdown } from '../MarkdownReplacer/Markdown';
import useStyles from './style';


interface Props {
  article: {
    data: Article,
    time: number
  };
  user: {
    data: User
  }
}

export function ContentCard({ ...props }: Props) {
  const { classes, theme } = useStyles();
  const laptop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const profile = props?.user.data.result.metadata.profile
  const article = props?.article.data.result
  const user = props?.user.data.result

  return (
    <>
      <Space h="xl" />
      <Grid grow>
        <Grid.Col span={laptop ? 12 : 9}>
          <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Card withBorder p="md" radius={0} className={classes.cardHeader}>
              <Grid grow>
                <Grid.Col span={10}>
                  <Title order={2}>
                    {article.title}<Text span fz="sm" inherit style={{ verticalAlign: 'middle' }}> • {dateRefactor(article.created.slice(0, 10))}</Text>
                  </Title>
                  <Space h="md" />
                  <Badge color="gray" variant="outline" size="md">comments {article.children}</Badge>
                  <Badge color="gray" variant="outline" ml={10} size="md">votes {article.stats.total_votes}</Badge>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Box
                    sx={(theme) => ({
                      backgroundColor: theme.colors.gray[0],
                      textAlign: 'center',
                      borderRadius: theme.radius.md,
                    })}
                  >
                    <Text className={classes.text}>
                      {props.article.time} MINS READ
                    </Text>
                  </Box>
                </Grid.Col>
              </Grid>
            </Card>
            <Card withBorder p="md" radius={0} className={classes.card}>
              <Container>
                <Markdown text={article.body} />
              </Container>
            </Card>
          </SimpleGrid>
          <Card withBorder p="xl" radius="md" className={classes.cardSticky} sx={{ position: 'sticky', bottom: 0 }}>
            <Container size={'xl'} className={classes.metadataContainer}>
              <Group spacing={3}>
                <IconHeart color="grey" size={24} />
                <Text color="dimmed" size={"lg"}>
                  {article.active_votes.length}
                </Text>
              </Group>

              <Space w="sm" />
              <Group spacing={3}>
                <IconMessage color="grey" size={24} />
                <Text color="dimmed" size={"lg"}>
                  {article.children}
                </Text>
              </Group>

              <Space w="sm" />
              <Text color="dimmed" size={"lg"} align={"end"}>
                {article.pending_payout_value}
              </Text>
            </Container>
          </Card>
        </Grid.Col>

        <Grid.Col span={laptop ? 12 : 3}>
          {!laptop &&
            <div style={{ position: 'sticky', top: '10px' }}>
              <Card withBorder p="xl" radius="md" className={classes.card}>
                {
                  profile.cover_image ?
                    <Card.Section sx={{ backgroundImage: `url(${profile.cover_image})`, height: 140 }} />
                    :
                    <Card.Section sx={{ backgroundColor: '#072f37', height: 140 }} />
                }
                <Avatar src={profile.profile_image} size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
                <Text align="center" size="lg" weight={500} mt="sm">
                  {user.name}
                </Text>
                <Text align="center" size="sm" color="dimmed">
                  {profile.about}
                </Text>
                <Grid grow pt={25}>
                  <Grid.Col span={4}>
                    <Text align="center" size="sm" color="dimmed">
                      Followers
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text align="center" size="sm" color="dimmed">
                      Follows
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text align="center" size="sm" color="dimmed">
                      Posts
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text align="center" size="lg" weight={500} pt={0}>
                      {user.stats.followers}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text align="center" size="lg" weight={500}>
                      {user.stats.following}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <Text align="center" size="lg" weight={500}>
                      {user.post_count}
                    </Text>
                  </Grid.Col>
                </Grid>
                <Button
                  fullWidth
                  radius="md"
                  mt="xl"
                  size="md"
                  color={theme.colorScheme === 'dark' ? undefined : 'dark'}
                >
                  Follow
                </Button>
              </Card>
            </div>
          }
        </Grid.Col>
      </Grid>

    </>
  );
}
