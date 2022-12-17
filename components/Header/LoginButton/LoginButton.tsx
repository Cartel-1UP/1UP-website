'use client'

import { Button, Dialog, Group, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import loginKeychain from "../../../utils/actions/login";
import { logoutUser, useAuthorizationStore } from '../../../zustand/stores/useAuthorizationStore';

declare global {
  interface Window {
    hive_keychain: any; // 👈️ turn off type checking
  }
}

const isKeychain = () => {
  return !!window.hive_keychain
}


function LoginButton() {

  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState('');
  const authorized = useAuthorizationStore((state) => state.authorized)
  
  const loginUser = async () =>
  {
    if(isKeychain()){
      loginKeychain(value)

    }else{
      console.log("You have to install keychain")
    }
  };

  return (
    <>
    <Group position="center">
      <Button onClick={() => setOpened((o) => !o)}>Log in</Button>
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
        <TextInput placeholder="username" value={value} style={{ flex: 1 }} onChange={(event) => setValue(event.currentTarget.value)}/>
        {authorized ? <Button onClick={() => {logoutUser}}>Log out</Button> : <Button onClick={() => {setOpened(false); loginUser()}}>Log in</Button>}
      </Group>
    </Dialog>
    </>
  )
}

export default LoginButton
