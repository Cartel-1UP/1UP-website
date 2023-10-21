'use client'

import { Card, Container, Grid, Space, Text } from '@mantine/core';
import Line from '../Line';
import useStyles from '../style';







export function AssetsPage() {
  const { classes, theme } = useStyles()




  return (
    <>
      <Space h="xl" />
      <Grid grow>
        <Grid.Col span={12}>
          <Card className={classes.card}>
            <Container size='xl'>
              <Grid grow>
                <Grid.Col span={8}>
                  <Text size={18} fw={400}>Total amount of vault</Text>
                  <Grid grow>
                    <Grid.Col span={8}>
                      <Container size='sm'>
                        <Line />
                      </Container>
                    </Grid.Col>
                    <Grid.Col span={4}>

                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
            </Container>
          </Card>
        </Grid.Col>
      </Grid>
      <Space h="xl" />
    </>
  )
}
