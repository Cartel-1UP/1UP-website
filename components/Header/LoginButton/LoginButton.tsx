'use client'

import { Button, Dialog, Group, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import api from "../../../utils/api";

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

function LoginButton() {
  
  const [state, setState] = useState<Login>({username:'', error:'', loginType:''})
  const [opened, setOpened] = useState(false);
  

  const sendLoginToken = async () =>
  {

      let keychain = window.hive_keychain;
      let memo = (await api.post('/auth', {username: state.username})).data;

      if (memo.status === "ok")
      {
          keychain.requestVerifyKey(state.username, memo.message, "Posting", (response: { success?: boolean; result?: any; }) => {
              if (response.success === true)
              {
                console.log("Login")
              }
          });
      } else
      {
        setState({error : "There was an error with the backend server, please try again"});
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
        <TextInput placeholder="username" style={{ flex: 1 }} />
        <Button onClick={() => {setOpened(false); sendLoginToken()}}>Log in</Button>
      </Group>
    </Dialog>
    </>
  )
}

export default LoginButton
