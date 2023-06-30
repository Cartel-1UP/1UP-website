import {
  Button,
  Container, Divider, Group,
  Slider,
  Space
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from 'react-query';
import { useNotifiactionStore } from '../../zustand/stores/useNotificationStore';
import { DefaultSnackbar } from '../Grids/DefaultSnackbar/DefaultSnackbar';
import useStyles from './style';

interface Props {
  setIsVote: Dispatch<SetStateAction<boolean>>;
  permlink: string;
  author: string;
}

declare global {
  interface Window {
    hive_keychain: any;
  }
}

export function VoteSlider({ setIsVote, permlink, author }: Props) {
  const username = localStorage.getItem('username');
  const marks = [
    { value: 0, label: '0%' },
    { value: 20, label: '20%' },
    { value: 40, label: '40%' },
    { value: 60, label: '60%' },
    { value: 80, label: '80%' },
    { value: 100, label: '100%' },
  ];

  const [value, setValue] = useState(50);
  const [endValue, setEndValue] = useState(50);

  const { classes, theme } = useStyles();
  const laptop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const snackbars = useNotifiactionStore((state) => state.snackbars);
  const addSnackbar = useNotifiactionStore((state) => state.addSnackbar);

  const handleRequestVote = useMutation<void, any, void, unknown>(
    async () => {
      return new Promise((resolve, reject) => {
        window.hive_keychain.requestVote(username, permlink, author, endValue * 100, (response: any) => {
          resolve(response);
        });
      });
    },
    {
      onSuccess: () => {
        addSnackbar({
          id: '1',
          title: 'Success',
          message: 'Your upvote was sent correctly',
          queryKey: 'recentData'
        });
        const timeout = setTimeout(() => {
          setIsVote(false);
        }, 3000);
        () => clearTimeout(timeout);
      },
      onError: (e: any) => {
        console.log(e);
      }
    }
  );

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
      <Container size={'sm'} className={classes.buttonContainer}>
        <Group>
          <Button variant="outline" color="dark" onClick={() => setIsVote(false)}>
            Cancel
          </Button>
          <Button variant="outline" color="dark" onClick={() => handleRequestVote.mutate()}>
            Submit
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
  );
}
