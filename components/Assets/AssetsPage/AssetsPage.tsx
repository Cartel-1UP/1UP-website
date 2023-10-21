'use client'

import { Card, Center, Container, Grid, Space, Text } from '@mantine/core';
import Line from '../Line';
import useStyles from '../style';







export function AssetsPage() {
  const { classes, theme } = useStyles()




  return (
    <>
      <Space h="xl" />
      <Grid grow>
        <Grid.Col span={12}>

          <Card bg={'#072f37'}>
            <Container size='xl'>
              <Center><Text size={18} fw={400} c={'#ffffff'}>Total amount of vault</Text></Center>
              <Line />
            </Container>
          </Card>
          <Space h="xl" />
          <Card className={classes.card}>
            <Container size='xl'>
              <Grid grow>
                <Grid.Col span={12}>
                  <Text size={18} fw={400}>Community assets</Text>
                  <Grid grow>
                    <Grid.Col span={12}>

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
