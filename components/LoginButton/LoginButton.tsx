'use client'

import { Button, Dialog, Group, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import useStyles from ".";
import loginKeychain from "../../utils/actions/login";
import { useAuthorizationStore } from "../../zustand/stores/useAuthorizationStore";



declare global {
  interface Window {
    hive_keychain: any; // 👈️ turn off type checking
  }
}

const isKeychain = () => {
  return !!window.hive_keychain
}


function LoginButton() {
  const { classes, theme } = useStyles()
  const authorized = useAuthorizationStore((state: { authorized: any; }) => state.authorized)
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (isKeychain() && localStorage.getItem('username') && !authorized) {
      const username = localStorage.getItem('username')
      loginKeychain(username)
    }
  }, [])



  const loginUser = async () => {
    if (isKeychain()) {
      loginKeychain(value)

    } else {
      console.log("You have to install keychain")
    }
  };

  return (
    <>
      <Group position="center">
        <Button className={classes.button} onClick={() => setOpened((o) => !o)}>Log in</Button>
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
          <TextInput placeholder="username" value={value} style={{ flex: 1 }} onChange={(event) => setValue(event.currentTarget.value)} />
          <Button onClick={() => { setOpened(false); loginUser() }}>Log in</Button>
        </Group>
      </Dialog>
    </>
  )
}

export default LoginButton
