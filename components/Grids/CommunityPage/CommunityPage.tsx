'use client'
import { AspectRatio, Avatar, Badge, Card, Container, Divider, Grid, Group, Image, Space, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconMessage2, IconPigMoney, IconUsers } from '@tabler/icons';
import { useQuery } from 'react-query';
import { comumnityData } from '../../../data/communityData';
import { getCommunityData } from '../../../utils/actions/user';
import { Markdown } from '../../Blog/MarkdownReplacer/Markdown';
import { Recent } from '../Default/Recent/Recent';
import { Trending } from '../Default/Trending/Trending';
import useStyles from './style';

interface Props {
  image: string
  tag: string
}

export function CommunityPage({ ...props }: Props) {
  const { classes, theme } = useStyles()
  const laptop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const result = comumnityData.filter(data => data.tag === props.tag)[0];

  const { data: community } = useQuery('community-data', () => getCommunityData(props.tag));

  const communityInfo = community?.data?.result

  return (
    <Container fluid className={classes.default}>
      <Container size="xl">
        <Grid>
          <Grid.Col span={laptop ? 12 : 9}>
            <Recent tag={props.tag} />
          </Grid.Col>
          <Grid.Col span={laptop ? 12 : 3}>
            <Space h="xl" />
            {!laptop &&
              <Card withBorder p="md" radius={10} className={classes.card}>
                <AspectRatio ratio={1 / 1} sx={{ maxWidth: 300 }} mx="auto">
                  <Image
                    src={props.image = result ? result.image : null}
                    alt="Logo"
                    fit="contain"
                  />
                </AspectRatio>
                <Group position="center" spacing={'xs'}>
                  <><Group position="center" spacing={'xs'}>

                    <ThemeIcon variant="light" color="gray" size={'sm'}>
                      <IconUsers />
                    </ThemeIcon>
                    <Tooltip label="Total subscribers" withArrow>
                      <Text size={'sm'}>{communityInfo?.subscribers}</Text>
                    </Tooltip>
                  </Group>
                    <Group position="center" spacing={'xs'}>
                      <ThemeIcon variant="light" color="gray" size={'sm'}>
                        <IconMessage2 />
                      </ThemeIcon>
                      <Tooltip label="Weekly interactions" withArrow>
                        <Text size={'sm'}>{communityInfo?.num_pending}</Text>
                      </Tooltip>
                    </Group>
                    <Group position="center" spacing={'xs'}>
                      <ThemeIcon variant="light" color="gray" size={'sm'}>
                        <IconPigMoney />
                      </ThemeIcon>
                      <Tooltip label="Pending rewards" withArrow>
                        <Text size={'sm'}>{communityInfo?.sum_pending}</Text>
                      </Tooltip>
                    </Group></>
                </Group>
                <Text fw={500} mb={10} mt={20}>{communityInfo?.title}</Text>
                <Text fz={"sm"}>{communityInfo?.about}</Text>
                <Divider my="xs" />
                <Text fw={500} mb={10}>Description</Text>
                <Text fz={"sm"}><Markdown text={communityInfo?.description ? communityInfo?.description : ''} /></Text>
                {communityInfo?.flag_text != '' ?
                  <>
                    <Divider my="xs" />
                    <Text fw={500} mb={10}>Rules</Text>
                    <Text fz={"sm"}><Markdown text={communityInfo?.flag_text ? communityInfo?.flag_text : ''} /></Text></>
                  : null
                }
                <Divider my="xs" />
                <Text fw={500} mb={10}>Team</Text>
                {
                  communityInfo?.team.map((user: any) => {
                    return (
                      <>
                        <Group spacing={'xs'} pb={10}>
                          <Avatar size={'sm'} color="blue" radius="xl" src={`https://images.hive.blog/u/${user[0]}/avatar`} />
                          <Text size={'sm'}>{user[0]}</Text>
                          <Badge color="gray" variant="outline">{user[1]}</Badge>
                        </Group>
                      </>
                    )
                  })
                }
              </Card>
            }
            <div style={{ position: 'sticky', top: '0' }}>
              <Trending tag={props.tag} />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </Container>
  );
}