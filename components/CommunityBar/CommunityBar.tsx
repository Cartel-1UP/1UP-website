'use client'

import { useGetCommunity } from '@/actions/hive/get-community'
import {
  AspectRatio,
  Avatar,
  Badge,
  Card,
  Divider,
  Group,
  Image, Skeleton, Text,
  ThemeIcon,
  Tooltip
} from '@mantine/core'
import { IconMessage2, IconPigMoney, IconUsers } from '@tabler/icons'
import { Markdown } from '../ui/Markdown/Markdown'
import useStyles from './style'

type Props = {
  communityLogo: string
  tag: string
}

export function CommunityBar({ communityLogo, tag }: Props) {
  const { classes, theme } = useStyles()

  const { data: community, isLoading } = useGetCommunity(tag);

  const communityInfo = community?.data?.result

  return (
    <>
      {isLoading ?
        <Card withBorder p="md" radius={10} className={classes.card} >
          <Skeleton width={'100%'} height={200} />
        </Card> :
        communityInfo && (
          <>
            <Card withBorder p="md" radius={10} className={classes.card}>
              <AspectRatio ratio={1 / 1} sx={{ maxWidth: 200 }} mx="auto">
                <Image src={communityLogo} alt="Logo" fit="contain" withPlaceholder />
              </AspectRatio>
              <Group position="center" spacing={'xs'}>
                <Group position="center" spacing={'xs'}>
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
                </Group>
              </Group>
              <Text fw={500} mb={10} mt={20}>
                {communityInfo?.title}
              </Text>
              <Text fz={'sm'}>{communityInfo?.about}</Text>
              <Divider my="xs" />
              <Text fw={500} mb={10}>
                Description
              </Text>
              <Text fz={'sm'}>
                <Markdown text={communityInfo?.description ? communityInfo?.description : ''} />
              </Text>
              {communityInfo?.flag_text != '' ? (
                <>
                  <Divider my="xs" />
                  <Text fw={500} mb={10}>
                    Rules
                  </Text>
                  <Text fz={'sm'}>
                    <Markdown text={communityInfo?.flag_text ? communityInfo?.flag_text : ''} />
                  </Text>
                </>
              ) : null}
              <Divider my="xs" />
              <Text fw={500} mb={10}>
                Team
              </Text>
              {communityInfo?.team.map((user: any) => {
                return (
                  <>
                    <Group spacing={'xs'} pb={10} key={user[0]}>
                      <Avatar
                        size={'sm'}
                        color="blue"
                        radius="xl"
                        src={`https://images.hive.blog/u/${user[0]}/avatar`}
                      />
                      <Text size={'sm'}>{user[0]}</Text>
                      <Badge c={'#072f37'} sx={{ borderColor: '#072f37' }} variant="outline">
                        {user[1]}
                      </Badge>
                    </Group>
                  </>
                )
              })}
            </Card>
          </>
        )}
    </>
  )
}
