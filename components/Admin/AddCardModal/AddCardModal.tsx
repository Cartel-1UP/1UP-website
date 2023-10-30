import { addMaincard } from '@/utils/actions/cartel'
import { Button, Group, Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useMutation, useQueryClient } from 'react-query'
import useStyles from '../style'

type Props = {
  opened: boolean
  close: () => void
}

export default function AddCardModal({ opened, close }: Props) {
  const { classes, theme } = useStyles()
  const queryCache = useQueryClient()
  const form = useForm({
    initialValues: {
      author: '',
      category: '',
      title: '',
      image: '',
      permlink: '',
    },
  })

  const addMaincardMutation = useMutation(addMaincard, {
    onSuccess: () => {
      queryCache.refetchQueries('maincards-data')
      close()
      form.reset()
    },
    onError: (error) => {
      console.error('Error adding maincard:', error)
    },
  })

  const handleSubmit = async (values: any) => {
    try {
      await addMaincardMutation.mutateAsync(values)
    } catch (error) {
      console.error('Error adding maincard:', error)
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add main card" zIndex={100000} size={'xl'}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput label="Author" placeholder="Author" {...form.getInputProps('author')} />
          <TextInput label="Category" placeholder="Category" {...form.getInputProps('category')} />
          <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
          <TextInput label="Image url" placeholder="Image url" {...form.getInputProps('image')} />
          <TextInput label="Permlink" placeholder="Permlink" {...form.getInputProps('permlink')} />
          <Group position="right" mt="md">
            <Button
              variant="outline"
              radius={5}
              size="sm"
              color={theme.colorScheme === 'dark' ? undefined : 'dark'}
              type="submit"
            >
              Add card
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
