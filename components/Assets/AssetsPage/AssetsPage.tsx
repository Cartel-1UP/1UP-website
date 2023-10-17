'use client'

import { faker } from '@faker-js/faker';
import { Card, Container, Grid, Space, Text } from '@mantine/core';
import {
  ArcElement, CategoryScale, Chart as ChartJS, Legend,
  LineElement,
  LinearScale,
  PointElement, Title,
  Tooltip
} from 'chart.js';
import useStyles from '../style';

ChartJS.register(
  ArcElement,
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

export const data2 = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
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
                  {/* <Grid grow>
                    <Grid.Col span={8}>
                      <Container size='sm'>
                        <Line options={options} data={data} />
                      </Container>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Pie data={data2} />
                    </Grid.Col>
                  </Grid> */}
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
