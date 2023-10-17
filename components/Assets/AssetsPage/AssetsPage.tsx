'use client'

import { comumnityData } from '@/data/communityData';
import { faker } from '@faker-js/faker';
import { Accordion, Card, Container, Grid, Image, Space, Text } from '@mantine/core';
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useStyles from '../style';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};


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
                        <Line options={options} data={data} />
                      </Container>
                    </Grid.Col>
                    {/* <Grid.Col span={4}>
                      <PieChart />
                    </Grid.Col> */}
                  </Grid>
                </Grid.Col>
              </Grid>
            </Container>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card className={classes.card}>
            <Container size='xl'>
              <Grid grow>
                <Grid.Col span={8}>
                  <Text size={18} fw={400}>Splinterlands</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Image
                    radius="md"
                    h={200}
                    w="auto"
                    fit="contain"
                    src={comumnityData[0].image}
                  />
                </Grid.Col>
              </Grid>

              <Accordion defaultValue="Splinterlands">
                <Accordion.Item key={1} value={'Splinterlands'}>
                  <Accordion.Control>Assets of splinterlands</Accordion.Control>
                  <Accordion.Panel>Assets</Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Container>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card className={classes.card}>
            <Container size='xl'>
              <Text size={18} fw={400}>Woo</Text>
            </Container>
          </Card>
        </Grid.Col>
      </Grid>
      <Space h="xl" />
    </>
  )
}
