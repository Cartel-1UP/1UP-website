'use client'

import { deleteUsersChoiceCard } from '@/actions/database/delete-userschoice'
import { useGetUsersChoice } from '@/actions/database/get-userschoice'
import { addUserChoiceCard } from '@/actions/database/post-userchoicecard'
import { editUsersChoiceCard } from '@/actions/database/put-userschoicecard'
import ConfirmModal from '@/components/ui/ConfirmModal/ConfirmModal'
import CRUDModal from '@/components/ui/CRUDModal/CRUDModal'
import { ActionIcon, Button, SimpleGrid, Skeleton, Space, Table } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencil, IconTrash } from '@tabler/icons'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import useStyles from './style'

export function UserChoiceCards() {
  const { classes, theme } = useStyles()
  const queryCache = useQueryClient()
  const { data, isLoading, error } = useGetUsersChoice()

  const [opened, { open: open, close: close }] = useDisclosure(false)
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false)
  const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false)

  const [editValues, setEditValues] = useState({})

  const [deletedValues, setDeletedValues] = useState('')

  const deleteCarddMutation = useMutation(deleteUsersChoiceCard, {
    onSuccess: () => {
      queryCache.refetchQueries('userschoice-data')
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
                <th>Community</th>
                <th>Author</th>
                <th>Title</th>
                <th>Image</th>
                <th>Community Title</th>
                <th>Permlink</th>
                <th>LvL</th>
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
              <th>Community</th>
              <th>Author</th>
              <th>Title</th>
              <th>Image</th>
              <th>Tag</th>
              <th>Permlink</th>
              <th>LvL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((element: any) => (
                <tr key={element.id}>
                  <td>{element.community}</td>
                  <td>{element.author}</td>
                  <td>{element.title}</td>
                  <td className={classes.turncate}>{element.image}</td>
                  <td>{element.tag}</td>
                  <td>{element.permlink}</td>
                  <td>{element.lvl}</td>
                  <td style={{ width: 120 }}>
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
        mutation={addUserChoiceCard}
        rows={['Community', 'Author', 'Title', 'Image', 'Tag', 'Permlink', 'LvL']}
      />
      <CRUDModal
        title="Edit card"
        action="Edit"
        opened={openedEdit}
        close={closeEdit}
        data={editValues}
        mutation={editUsersChoiceCard}
        rows={['Community', 'Author', 'Title', 'Image', 'Tag', 'Permlink', 'LvL']}
      />
      <ConfirmModal
        title="Are you sure you want to delete this card?"
        message="This action cannot be undone."
        onConfirm={() => {
          deleteCarddMutation.mutateAsync(deletedValues)
        }}
        opened={openedDelete}
        close={closeDelete}
      />
    </>
  )
}
