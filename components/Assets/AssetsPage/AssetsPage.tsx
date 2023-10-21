'use client'

import { communityAssetsData } from '@/data/communityData';
import { Avatar, Card, Center, Container, Grid, Group, Select, Space, Text } from '@mantine/core';
import { forwardRef, useState } from 'react';
import { CommunityStats } from '../CommunityStats';
import Line from '../Line';
import useStyles from '../style';




interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
);

export function AssetsPage() {
  const { classes, theme } = useStyles()
  const [searchValue, onSearchChange] = useState(communityAssetsData[0].value);

  return (
    <>
      <Space h="xl" />
      <Grid grow>
        <Grid.Col span={12}>
          <Card bg={'#072f37'} className={classes.card}>
            <Container size='xl'>
              <Center><Text size={18} fw={400} c={'#ffffff'}>Total amount of vault</Text></Center>
              <Line />
            </Container>
          </Card>
          <Space h="xl" />
          <Card className={classes.card} bg={'#072f37'}>
            <Container size='xl' h={400}>
              <Grid grow>
                <Grid.Col span={12}>
                  <Text size={18} fw={400} c={'#ffffff'}>Community assets</Text>
                  <Select
                    maw={300}
                    pt={20}
                    placeholder="Pick community"
                    itemComponent={SelectItem}
                    defaultValue={communityAssetsData[0].value}
                    searchValue={searchValue}
                    onSearchChange={onSearchChange}
                    data={communityAssetsData}
                    searchable
                    maxDropdownHeight={220}
                    nothingFound="Nobody here"
                    filter={(value, item) =>
                      Boolean(item.label && item.label.toLowerCase().includes(value.toLowerCase().trim()))
                    }
                  />
                  <Grid grow>
                    <Grid.Col span={12}>
                      <CommunityStats value={searchValue} />
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
