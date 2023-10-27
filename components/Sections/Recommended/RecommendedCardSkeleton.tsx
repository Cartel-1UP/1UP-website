import { Card, Grid, Skeleton } from "@mantine/core"

export function RecommendedCardSkeleton() {
    return (
        <>
            {
                Array.from({ length: 4 }).map((_, index) => (
                    <Card withBorder p="md" radius={0} key={index}>
                        <Grid grow>
                            <Grid.Col>
                                <Skeleton height={50} circle mb="xl" />
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <Skeleton key={index} height={8} mt={6} radius="xl" />
                                ))}
                            </Grid.Col>
                            <Grid.Col span={7}>
                                <Skeleton height={16} width={'30%'} radius="xl" />
                            </Grid.Col>
                            <Grid.Col span={5}>
                                <Skeleton height={16} radius="xl" />
                            </Grid.Col>
                        </Grid>
                    </Card>
                ))
            }
        </>
    )

}