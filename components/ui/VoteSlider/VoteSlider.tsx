'use client'

import { Button, Container, Divider, Group, Slider, Space } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { KeychainSDK, Vote } from 'keychain-sdk'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { NotificationText } from '../ProgressBar/ProgressBar'
import useStyles from './style'

type Props = {
  setIsVote?: Dispatch<SetStateAction<boolean>>
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
  const queryCache = useQueryClient()
  const { classes, theme } = useStyles()
  const [value, setValue] = useState(50)
  const [endValue, setEndValue] = useState(50)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const user = localStorage.getItem('username')
    if (user) {
      setUsername(user)
    }
  }, [])

  const marks = [
    { value: 0, label: '0%' },
    { value: 20, label: '20%' },
    { value: 40, label: '40%' },
    { value: 60, label: '60%' },
    { value: 80, label: '80%' },
    { value: 100, label: '100%' },
  ]

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
        keychain
          .vote(formParamsAsObject.data as Vote)
          .then((response: any) => {
            resolve(response)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },
    {
      onSuccess: () => {
        showNotification({
          autoClose: 7000,
          title: 'Success',
          message: <NotificationText message={`Your upvote was sent correctly`} time={7000} />,
          styles: (theme) => ({
            root: {
              backgroundColor: '#072f37',
              borderColor: '#072f37',
              '&::before': { backgroundColor: theme.white },
            },
            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: '#04191d' },
            },
          }),
          loading: false,
          onClose: () => {
            queryCache.refetchQueries(queryKey)
          },
        })

        const timeout = setTimeout(() => {
          setIsVote && setIsVote(false)
          setSuccessfullUpvoted && setSuccessfullUpvoted(true)
        }, 10500)
        ;() => clearTimeout(timeout)
      },
      onError: (e: any) => {
        showNotification({
          autoClose: 3000,
          title: 'Error',
          message: (
            <NotificationText
              message={`You already upvoted this post wit same wieght!`}
              time={3000}
            />
          ),
          styles: (theme) => ({
            root: {
              backgroundColor: '#072f37',
              borderColor: '#072f37',
              '&::before': { backgroundColor: theme.white },
            },
            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: '#04191d' },
            },
          }),
          loading: false,
        })
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
          <Button variant="outline" color="dark" onClick={() => setIsVote && setIsVote(false)}>
            Cancel
          </Button>
        </Group>
      </Container>
    </>
  )
}
