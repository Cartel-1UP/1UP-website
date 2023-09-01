'use client'
import { fetchMaincards } from '@/utils/actions/cartel';
import { ActionIcon, Button, SimpleGrid, Skeleton, Space, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPencil } from '@tabler/icons';
import { useState } from 'react';
import { useQuery } from 'react-query';
import AddCardModal from '../AddCardModal/AddCardModal';
import EditMainCardModal from '../EditCardModal/EditCardModal';
import useStyles from './style';

export function AdminMainCards() {
  const { classes, theme } = useStyles()
  const { isLoading, error, data, refetch: refetchCarouselData } = useQuery('carouselData', () => fetchMaincards());

  const [opened, { open: open, close: close }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);


  const [editValues, setEditValues] = useState(
    {
      author: '',
      category: '',
      title: '',
      image: '',
      permlink: '',
    }
  );


  if (isLoading) return (
    <>
      <Space h="xl" />
      <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Table highlightOnHover withColumnBorders>
          <thead>
            <tr>
              <th>Author</th>
              <th>Category</th>
              <th>Title</th>
              <th>Image</th>
              <th>Permlink</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Skeleton height={8} mt={6} radius="xl" /></td>
              <td><Skeleton height={8} mt={6} radius="xl" /></td>
              <td><Skeleton height={8} mt={6} radius="xl" /></td>
              <td><Skeleton height={8} mt={6} radius="xl" /></td>
            </tr>
          </tbody>
        </Table>
      </SimpleGrid>
      <Space h="xl" />
    </>
  )

  return (
    <>
      <Space h="xl" />
      <Button
        variant="outline"
        radius="md"
        size="sm"
        color={theme.colorScheme === 'dark' ? undefined : 'dark'}
        onClick={open}
      >
        Add card
      </Button>
      <Space h="xl" />
      <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Table highlightOnHover withColumnBorders>
          <thead>
            <tr>
              <th>Author</th>
              <th>Category</th>
              <th>Title</th>
              <th>Image</th>
              <th>Permlink</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((element: any) => (
                <tr key={element.id}>
                  <td>{element.author}</td>
                  <td>{element.category}</td>
                  <td>{element.title}</td>
                  <td className={classes.turncate}>{element.image}</td>
                  <td>{element.permlink}</td>
                  <td>
                    <span style={{ display: 'flex', gap: '4px' }}>
                      <ActionIcon
                        color="dark"
                        variant="outline"
                        size="sm"
                        radius="sm"
                        onClick={() => {
                          setEditValues(element);
                          openEdit()
                        }}
                      >
                        <IconPencil size="1.125rem" />
                      </ActionIcon>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </SimpleGrid>
      <Space h="xl" />
      <AddCardModal opened={opened} close={close} refetch={refetchCarouselData} />
      <EditMainCardModal opened={openedEdit} close={closeEdit} refetch={refetchCarouselData} data={editValues} />
    </>

  )
}
