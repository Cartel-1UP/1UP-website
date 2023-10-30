'use client'

import { useGetUsersChoice } from '@/actions/database/get-userschoice'
import { deleteMaincard } from '@/utils/actions/cartel'
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

  const [editValues, setEditValues] = useState({
    result: '',
  })

  const [deletedValues, setDeletedValues] = useState('')

  const deleteMaincardMutation = useMutation(deleteMaincard, {
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
                <th>Userpost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Skeleton height={8} mt={6} radius="xl" />
                </td>
              </tr>
              <tr>
                <td>
                  <Skeleton height={8} mt={6} radius="xl" />
                </td>
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
              <th>Userpost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((element: any) => (
                <tr key={element.id}>
                  <td className={classes.turncate}>{JSON.stringify(element.userpost)}</td>
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
      {/* <AddCardModal opened={opened} close={close} />
      <EditMainCardModal
        opened={openedEdit}
        close={closeEdit}
        data={editValues}
      /> */}
      {/* <ConfirmModal
        title='Are you sure you want to delete this card?'
        message='This action cannot be undone.'
        onConfirm={() => {
          deleteMaincardMutation.mutateAsync(deletedValues)
        }
        }
        opened={openedDelete}
        close={closeDelete}
      /> */}
    </>
  )
}
