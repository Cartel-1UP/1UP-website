'use client'

import { useGetUsersChoice } from '@/actions/database/get-userschoice'
import { Card, SimpleGrid, Text } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { RecommendedCard } from './RecommendedCard'
import { RecommendedCardSkeleton } from './RecommendedCardSkeleton'
import useStyles from './style'

export function RecommendedSection() {
  const { classes, theme } = useStyles()
  const { isLoading, data, error } = useGetUsersChoice()
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)

  if (error) {
    return null
  }

  return (
    <>
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
        {isLoading ? (
          <RecommendedCardSkeleton />
        ) : data ? (
          data?.map?.((item: any) => <RecommendedCard article={item} key={item.id} />)
        ) : (
          <></>
        )}
      </SimpleGrid>
      {!isMd && <Card withBorder p="md" radius={0} className={classes.cardFooter}></Card>}
    </>
  )
}
