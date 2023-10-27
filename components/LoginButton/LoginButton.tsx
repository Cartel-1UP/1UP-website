'use client'

import loginKeychain from '@/utils/actions/login'
import { isKeychain } from '@/utils/methods/checkKeychain'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import { Button, Container, Dialog, Group, Stack, Text, TextInput } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import { NotificationText } from '../ui/ProgressBar/ProgressBar'
import useStyles from './style'

type Props = {
  closeDrawer?: () => void
}

function LoginButton({ closeDrawer }: Props) {
  const { classes, theme } = useStyles()

  const [opened, setOpened] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const authorized = useAuthorizationStore((state: { authorized: boolean }) => state.authorized)


  const isSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

  useEffect(() => {
    if (isKeychain() && localStorage.getItem('username') && !authorized) {
      let username = localStorage.getItem('username')
      loginKeychain(username)
    }
  }, [])

  const loginUser = async () => {
    if (!value) {
      setError(true)
      return
    }

    if (isKeychain()) {
      loginKeychain(value)
    } else {
      showNotification({
        autoClose: 3000,
        title: "Keychain isn't installed",
        message: <NotificationText message="You have to install keychain extension" time={3000} />,
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
    }
  }

  return (
    <>
      {isSm ?
        <Container size={'xs'} pt={25}>
          <Stack spacing="xl">
            <TextInput
              placeholder="Hive username"
              size="md"
              onChange={(event) => {
                setError(false)
                setValue(event.currentTarget.value)
              }}
              error={error ? 'Username is required' : false}
            />
            <Button
              className={classes.button}
              fullWidth
              variant="outline"
              onClick={() => {
                closeDrawer && closeDrawer()
                loginUser()
              }}
              color="gray"
            >
              Log in
            </Button>
          </Stack>
        </Container>
        :
        <>
          <Group position="center">
            <Button
              variant='outline'
              className={classes.button}
              onClick={() => setOpened((o) => !o)}
            >
              Log in
            </Button>
          </Group>
          <Dialog
            opened={opened}
            withCloseButton
            onClose={() => setOpened(false)}
            size="lg"
            radius="md"
            position={{ top: 10, right: 10 }}
          >
            <Text size="sm" style={{ marginBottom: 10 }} weight={500}>
              Put your Hive username
            </Text>
            <Group align="flex-end">
              <TextInput
                placeholder="Username"
                value={value}
                style={{ flex: 1 }}
                onChange={(event) => setValue(event.currentTarget.value)}
              />
              <Button
                variant='outline'
                className={classes.buttonLogin}
                onClick={() => {
                  setOpened(false)
                  loginUser()
                }}
              >
                Log in
              </Button>
            </Group>
          </Dialog>
        </>
      }
    </>
  )
}

export default LoginButton
