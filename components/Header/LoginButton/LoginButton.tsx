'use client'

import { Button, Dialog, Group, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import loginKeychain from "../../../utils/actions/login";

declare global {
  interface Window {
    hive_keychain: any; // 👈️ turn off type checking
  }
}

type Login = {
  username? : string,
  error?: string,
  loginType?: string
}

const isKeychain = () => {
  return !!window.hive_keychain
}



function LoginButton() {

  const queryClient = useQueryClient()
  const mutation = useMutation('auth', () =>
  fetch('/api/auth').then(res =>
    res.json()
  ),{
    onSuccess: () => {
      queryClient.invalidateQueries('auth')
    },
  })

  
  const [state, setState] = useState<Login>({username:'', error:'', loginType:''})
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState('');
  


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
        <Button onClick={() => {setOpened(false); loginUser()}}>Log in</Button>
      </Group>
    </Dialog>
    </>
  )
}

export default LoginButton
