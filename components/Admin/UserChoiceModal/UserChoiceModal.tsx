
import { Button, Group, Modal, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import useStyles from '../style'

type Props = {
  action: string,
  opened: boolean
  data?: any
  close: () => void
  mutation: (cardData: any) => Promise<undefined[] | undefined>
}

export default function UserChoiceModal({ action, opened, close, data, mutation }: Props) {
  const { classes, theme } = useStyles()
  const queryCache = useQueryClient()
  const form = useForm({
    initialValues: data || {
      community: '',
      author: '',
      title: '',
      image: '',
      community_title: '',
      permlink: '',
      lvl: ''
    },
  })

  console.log(data)

  useEffect(() => {
    form.setValues(data)

    return () => {
      form.reset()
    }
  }, [data])

  const userchoiceMutation = useMutation(mutation, {
    onSuccess: () => {
      queryCache.refetchQueries('userschoice-data')
      close()
      form.reset()
    },
    onError: (error) => {
      console.error(`Error ${action}  userchoice:`, error)
    },
  })

  const handleSubmit = async (values: any) => {
    try {
      await userchoiceMutation.mutateAsync(values)
    } catch (error) {
      console.error(`Error ${action}  userchoice:`, error)
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title={`${action} userchoice card`} zIndex={100000} size={'xl'}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput label="Community" placeholder="Community" {...form.getInputProps('community')} />
          <TextInput label="Author" placeholder="Author" {...form.getInputProps('author')} />
          <TextInput label="Title" placeholder="Title" {...form.getInputProps('title')} />
          <TextInput label="Image url" placeholder="Image url" {...form.getInputProps('image')} />
          <TextInput label="Community Title" placeholder="Community Title" {...form.getInputProps('community_title')} />
          <TextInput label="Permlink" placeholder="Permlink" {...form.getInputProps('permlink')} />
          <TextInput label="LvL" placeholder="LvL" {...form.getInputProps('lvl')} />
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
