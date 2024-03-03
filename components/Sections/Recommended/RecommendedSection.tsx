'use client'

import { useGetUsersChoice } from '@/actions/database/get-userschoice'
import { NotificationText } from '@/components/ui/ProgressBar/ProgressBar'
import useSettings from '@/utils/methods/useSettings'
import { Card, Group, SimpleGrid, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconInfoCircle } from '@tabler/icons'
import { RecommendedCard } from './RecommendedCard'
import { RecommendedCardSkeleton } from './RecommendedCardSkeleton'
import useStyles from './style'

export function RecommendedSection() {
  const { classes, theme } = useStyles()
  const { ...settings } = useSettings()
  const { isLoading, data, error } = useGetUsersChoice()

  if (error) {
    return null
  }

  return (
    <>
      <Card withBorder p="md" radius={0} className={classes.cardHeader}>
        <Group spacing={5}>
          <Text size={24} fw={700} sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>
            Cartel users choice
          </Text>
          <span className={classes.icon}>
            <IconInfoCircle
              size={'1rem'}
              onClick={() =>
                showNotification({
                  autoClose: 7000,
                  title: 'Info',
                  message: (
                    <NotificationText
                      message={
                        <>
                          If you want to vote for weekly users choice, you can check out our{' '}
                          <a
                            href={'https://discord.gg/f7sHEHYZJZ'}
                            target="_blank"
                            className={classes.discordLink}
                            rel="noreferrer"
                          >
                            discord
                          </a>{' '}
                          server!
                        </>
                      }
                      time={7000}
                    />
                  ),
                  styles: (theme) => ({
                    root: {
                      backgroundColor: '#072f37',
                      borderColor: '#072f37',
                      '&::before': { backgroundColor: theme.white },
                    },
                    title: { color: theme.white },
                    description: { color: theme.white },
                    closeButton: {
                      color: theme.white,
                      '&:hover': { backgroundColor: '#04191d' },
                    },
                  }),
                  loading: false,
                })
              }
            />
          </span>
        </Group>
      </Card>
      <SimpleGrid
        className={classes.card}
        cols={4}
        spacing={0}
        mt={0}
        breakpoints={[{ maxWidth: 'md', cols: 1 }]}
      >
        {isLoading ? (
          <RecommendedCardSkeleton />
        ) : data ? (
          data?.map?.((item: any) => <RecommendedCard article={item} key={item.id} />)
        ) : (
          <></>
        )}
      </SimpleGrid>
      {!settings.isMd && (
        <Card withBorder p="md" radius={0} className={classes.cardFooter}>
          {' '}
        </Card>
      )}
    </>
  )
}
