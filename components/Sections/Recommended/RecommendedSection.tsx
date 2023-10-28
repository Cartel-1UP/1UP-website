'use client'

import { useGetUsersChoice } from '@/actions/database/get-userschoice'
import { UsersChoiceCard } from '@/types/blog.type'
import { Card, SimpleGrid, Space, Text } from '@mantine/core'
import { RecommendedCard } from './RecommendedCard'
import { RecommendedCardSkeleton } from './RecommendedCardSkeleton'
import useStyles from './style'

export function RecommendedSection() {
  const { classes, theme } = useStyles()
  const { isLoading, data } = useGetUsersChoice()

  return (
    <>
      <Space h="xl" />
      <Card withBorder p="md" radius={0} className={classes.cardHeader}>
        <Text size={24} fw={700} sx={{ fontFamily: 'Greycliff CF, sans-serif' }}>
          Cartel users choice
        </Text>
      </Card>
      <SimpleGrid
        className={classes.card}
        cols={4}
        spacing={0}
        mt={0}
        breakpoints={[{ maxWidth: 'md', cols: 1 }]}
      >
        {
          isLoading ? <RecommendedCardSkeleton /> : data ? (
            data?.map?.((item: UsersChoiceCard) => <RecommendedCard article={item} key={item.id} />)
          ) : (
            <></>
          )}
      </SimpleGrid>
      <Card withBorder p="md" radius={0} className={classes.cardFooter}>

      </Card>
    </>
  )
}
