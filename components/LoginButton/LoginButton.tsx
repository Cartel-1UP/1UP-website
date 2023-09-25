'use client'

import loginKeychain from '@/utils/actions/login'
import { isKeychain } from '@/utils/methods/checkKeychain'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import { useNotifiactionStore } from '@/zustand/stores/useNotificationStore'
import { Button, Dialog, Group, Text, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import useStyles from './style'

function LoginButton() {
  const { classes, theme } = useStyles()

  const [opened, setOpened] = useState(false)
  const [value, setValue] = useState('')

  const authorized = useAuthorizationStore((state: { authorized: boolean }) => state.authorized)
  const addSnackbar = useNotifiactionStore((state) => state.addSnackbar)

  useEffect(() => {
    if (isKeychain() && localStorage.getItem('username') && !authorized) {
      let username = localStorage.getItem('username')
      loginKeychain(username)
    }
  }, [])

  const loginUser = async () => {
    if (isKeychain()) {
      loginKeychain(value)
    } else {
      addSnackbar({
        id: '1',
        title: 'Error',
        message: 'You have to install keychain!',
        queryKey: undefined,
        color: 'red',
      })
    }
  }

  return (
    <>
      <Group position="center">
        <Button className={classes.button} onClick={() => setOpened((o) => !o)}>
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
  )
}

export default LoginButton
