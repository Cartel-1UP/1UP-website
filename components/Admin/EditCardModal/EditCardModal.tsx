import { editMaincard } from '@/actions/database/put-maincards'
import { Button, Group, Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import useStyles from '../style'

type Props = {
  opened: boolean
  close: () => void
  data: {
    author: string
    category: string
    title: string
    image: string
    permlink: string
  }
}

export default function EditMainCardModal({ opened, close, data }: Props) {
  const { classes, theme } = useStyles()
  const queryCache = useQueryClient()
  const form = useForm({
    initialValues: data,
  })

  useEffect(() => {
    form.setValues(data)

    return () => {
      form.reset()
    }
  }, [data])

  const editMaincardMutation = useMutation(editMaincard, {
    onSuccess: () => {
      queryCache.refetchQueries('maincards-data')
      close()
      form.reset()
    },
    onError: (error) => {
      console.error('Error editing main card:', error)
    },
  })

  const handleSubmit = async (values: any) => {
    try {
      await editMaincardMutation.mutateAsync(values)
    } catch (error) {
      console.error('Error editing main card:', error)
    }
  }

  return (
    <Modal opened={opened} onClose={close} title="Edit main card" zIndex={100000} size={'xl'}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Author" placeholder="Author" {...form.getInputProps('author')} />
        <TextInput label="Category" placeholder="Category" {...form.getInputProps('category')} />
        <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
        <TextInput label="Image" placeholder="Image" {...form.getInputProps('image')} />
        <TextInput label="Permlink" placeholder="Permlink" {...form.getInputProps('permlink')} />
        <Group position="right" mt="md">
          <Button
            variant="outline"
            radius="md"
            size="sm"
            color={theme.colorScheme === 'dark' ? undefined : 'dark'}
            type="submit"
          >
            Edit card
          </Button>
        </Group>
      </form>
    </Modal>
  )
}
