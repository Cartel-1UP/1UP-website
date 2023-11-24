'use client'
import { deleteMainCard } from '@/actions/database/delete-maincard'
import { useGetMaincards } from '@/actions/database/get-maincards'
import { addMainCard } from '@/actions/database/post-maincards'
import { editMainCard } from '@/actions/database/put-maincards'
import ConfirmModal from '@/components/ui/ConfirmModal/ConfirmModal'
import CRUDModal from '@/components/ui/CRUDModal/CRUDModal'
import { ActionIcon, Button, SimpleGrid, Skeleton, Space, Table } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencil, IconTrash } from '@tabler/icons'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import useStyles from './style'

export function AdminMainCards() {
  const { classes, theme } = useStyles()
  const queryCache = useQueryClient()
  const { data, isLoading, error } = useGetMaincards()

  const [opened, { open: open, close: close }] = useDisclosure(false)
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false)
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false)

  const [editValues, setEditValues] = useState({
    author: '',
    category: '',
    title: '',
    image: '',
    permlink: '',
  })

  const [deletedValues, setDeletedValues] = useState('')

  const deleteMaincardMutation = useMutation(deleteMainCard, {
    onSuccess: () => {
      queryCache.refetchQueries('maincards-data')
    },
    onError: (error) => {
      console.error('Error deleting main card:', error)
    },
  })

  if (error) {
    return null
  }

  if (isLoading)
    return (
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
                {Array.from({ length: 8 }).map((_, index) => (
                  <td key={index}>
                    <Skeleton height={8} mt={6} radius="xl" />
                  </td>
                ))}
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
                          setEditValues(element)
                          openEdit()
                        }}
                      >
                        <IconPencil size="1.125rem" />
                      </ActionIcon>
                      <ActionIcon
                        color="dark"
                        variant="outline"
                        size="sm"
                        radius="sm"
                        onClick={() => {
                          setDeletedValues(element.permlink)
                          openDelete()
                        }}
                      >
                        <IconTrash size="1.125rem" />
                      </ActionIcon>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </SimpleGrid>
      <Space h="xl" />
      <CRUDModal
        title="Add card"
        action="Add"
        opened={opened}
        close={close}
        mutation={addMainCard}
        rows={['Author', 'Category', 'Title', 'Image', 'Permlink']}
      />
      <CRUDModal
        title="Edit card"
        action="Edit"
        opened={openedEdit}
        close={closeEdit}
        mutation={editMainCard}
        rows={['Author', 'Category', 'Title', 'Image', 'Permlink']}
      />
      <ConfirmModal
        title="Are you sure you want to delete this card?"
        message="This action cannot be undone."
        onConfirm={() => {
          deleteMaincardMutation.mutateAsync(deletedValues)
        }}
        opened={openedDelete}
        close={closeDelete}
      />
    </>
  )
}
