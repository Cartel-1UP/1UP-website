import { useNotifiactionStore } from '@/zustand/stores/useNotificationStore'
import { Button, Container, Divider, Group, Slider, Space } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { KeychainSDK, Vote } from 'keychain-sdk'
import { Dispatch, SetStateAction, useState } from 'react'
import { useMutation } from 'react-query'
import { DefaultSnackbar } from '../../DefaultSnackbar/DefaultSnackbar'
import useStyles from './style'

type Props = {
  setIsVote?: Dispatch<SetStateAction<boolean>> | any
  permlink: string
  author: string
  setSuccessfullUpvoted?: Dispatch<SetStateAction<boolean>>
  queryKey?: string
}

export function VoteSlider({
  setIsVote,
  permlink,
  author,
  setSuccessfullUpvoted,
  queryKey,
}: Props) {
  const { classes, theme } = useStyles()
  const [value, setValue] = useState(50)
  const [endValue, setEndValue] = useState(50)
  const username = localStorage.getItem('username')
  const marks = [
    { value: 0, label: '0%' },
    { value: 20, label: '20%' },
    { value: 40, label: '40%' },
    { value: 60, label: '60%' },
    { value: 80, label: '80%' },
    { value: 100, label: '100%' },
  ]
  const laptop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)
  const snackbars = useNotifiactionStore((state) => state.snackbars)
  const addSnackbar = useNotifiactionStore((state) => state.addSnackbar)

  const handleRequestVote = useMutation<void, any, void, unknown>(
    async () => {
      const keychain = new KeychainSDK(window)
      const formParamsAsObject = {
        data: {
          username: username,
          permlink: permlink,
          author: author,
          weight: endValue * 100,
        },
      }
      return new Promise((resolve, reject) => {
        keychain.vote(formParamsAsObject.data as Vote).then((response: any) => {
          resolve(response)
        })
      })
    },
    {
      onSuccess: () => {
        addSnackbar({
          id: '1',
          title: 'Success',
          message: 'Your upvote was sent correctly',
          queryKey: queryKey,
        })

        const timeout = setTimeout(() => {
          setIsVote(false)
          setSuccessfullUpvoted && setSuccessfullUpvoted(true)
        }, 10500)
          ; () => clearTimeout(timeout)
      },
      onError: (e: any) => {
        console.log(e)
      },
    }
  )

  return (
    <>
      <Divider my="lg" />
      <Space h="xl" />
      <Container size={'sm'}>
        <Slider
          color={'dark'}
          marks={marks}
          value={value}
          onChange={setValue}
          onChangeEnd={setEndValue}
        />
      </Container>
      <Space h="xl" />
      <Space h="xl" />

      <Container size={'sm'}>
        <Group className={classes.buttonContainer}>
          <Button variant="outline" color="dark" onClick={() => handleRequestVote.mutate()}>
            Submit
          </Button>
          <Button variant="outline" color="dark" onClick={() => setIsVote(false)}>
            Cancel
          </Button>
        </Group>
      </Container>

      <>
        {snackbars.map((snackbar) => (
          <DefaultSnackbar
            key={snackbar.id}
            id={snackbar.id}
            title={snackbar.title}
            message={snackbar.message}
            queryKey={snackbar.queryKey}
          />
        ))}
      </>
    </>
  )
}
