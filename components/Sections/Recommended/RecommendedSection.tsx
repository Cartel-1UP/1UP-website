import { useGetUsersChoice } from '@/actions/database/get-userschoice'
import { UsersChoiceCard } from '@/types/blog.type'
import { Card, Grid, SimpleGrid, Skeleton, Space, Text } from '@mantine/core'
import { RecommendedCard } from './RecommendedCard/RecommendedCard'
import useStyles from './style'

export function RecommendedCardsGrid() {
  const { classes, theme } = useStyles()
  const { isLoading, data } = useGetUsersChoice()

  return (
    <>

      <Space h="xl" />
      <Space h="xl" />
      <Card withBorder p="md" radius={0} className={classes.cardHeader}>
        <Text size={24} fw={500}>
          Cartel users choice
        </Text>
      </Card>
      <SimpleGrid className={classes.card} cols={4} spacing={0} mt={0} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {
          isLoading ?
            Array.from({ length: 4 }).map((_, index) => (
              <Card withBorder p="md" radius={0} key={index}>
                <Grid grow>
                  <Grid.Col>
                    <Skeleton height={50} circle mb="xl" />
                    {
                      Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} height={8} mt={6} radius="xl" />
                      ))
                    }
                  </Grid.Col>
                  <Grid.Col span={7}>
                    <Skeleton height={16} width={"30%"} radius="xl" />
                  </Grid.Col>
                  <Grid.Col span={5}>
                    <Skeleton height={16} radius="xl" />
                  </Grid.Col>
                </Grid>
              </Card>
            ))
            :
            data ?
              data?.map?.((item: UsersChoiceCard) => (
                <RecommendedCard article={item} key={item.id} />
              )) :
              <>
              </>
        }
      </SimpleGrid>
      <Card withBorder p="md" radius={0} className={classes.cardFooter}>
      </Card>
    </>
  )
}
