'use client'

import { Button, Group, Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import useStyles from './style'

type Props = {
  title: string
  action: string
  opened: boolean
  rows?: string[]
  data?: any
  queryKey?: string
  close: () => void
  mutation: (cardData: any) => Promise<undefined[] | undefined>
}

export default function CRUDModal({ title, action, opened, close, data, queryKey, mutation, rows }: Props) {
  const { classes, theme } = useStyles()
  const queryCache = useQueryClient()
  const form = useForm({
    initialValues: data
  })

  console.log(data)

  useEffect(() => {
    form.setValues(data)

    return () => {
      form.reset()
    }
  }, [data])

  const actionMutation = useMutation(mutation, {
    onSuccess: () => {
      queryCache.refetchQueries(queryKey)
      close()
      form.reset()
    },
    onError: (error) => {
      console.error(`Error ${action}:`, error)
    },
  })

  const handleSubmit = async (values: any) => {
    try {
      await actionMutation.mutateAsync(values)
    } catch (error) {
      console.error(`Error ${action}:`, error)
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title={title} zIndex={100000} size={'xl'}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {
            rows?.map((row) => {
              return (
                <TextInput key={row} label={row} placeholder={row} {...form.getInputProps(row.toLowerCase())} />)
            }
            )
          }
          <Group position="right" mt="md">
            <Button
              variant="outline"
              radius={5}
              size="sm"
              color={theme.colorScheme === 'dark' ? undefined : 'dark'}
              type="submit"
            >
              {`${action} card`}
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
