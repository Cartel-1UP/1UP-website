'use client'
import { Card, SimpleGrid, Space, Tabs, Title } from '@mantine/core';
import { useState } from 'react';
import { AdminMainCards } from '../AdminMainCards/AdminMainCards';
import useStyles from './style';

export function AdminPage() {
  const { classes, theme } = useStyles()
  const [activeTab, setActiveTab] = useState<string | null>('first');

  return (
    <>
      <Space h="xl" />
      <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Card withBorder p="md" radius={0} className={classes.cardHeader}>
          <Title order={2}>
            Dashboard
          </Title>
        </Card>
        <Card withBorder p="md" radius={0} className={classes.cardBody}>
          <Tabs value={activeTab} onTabChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="first">Main cards</Tabs.Tab>
              <Tabs.Tab value="second">Users choice</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="first">
              <AdminMainCards />
            </Tabs.Panel>
            <Tabs.Panel value="second">Second panel</Tabs.Panel>
          </Tabs>
        </Card>
      </SimpleGrid>
      <Space h="xl" />
    </>

  )
}
