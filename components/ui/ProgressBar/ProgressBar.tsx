import { Progress, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import useStyles from './style'

interface Props {
  message: string
  time?: number
}

export function NotificationText({ message, time = 10000 }: Props) {
  const { classes, theme } = useStyles()


  const [progressValue, setProgressValue] = useState(100);
  const incrementInterval = 50;

  useEffect(() => {
    const timeout = setTimeout(() => {

    }, time);

    const interval = setInterval(() => {
      // Increment the progress value by the percentage of the time passed
      const elapsedTime = incrementInterval / time;
      setProgressValue((prevValue) => prevValue - elapsedTime * 100);
    }, incrementInterval);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    }
  }, [time]);

  return (
    <>
      <Text>{message}</Text>
      <Progress value={progressValue} mt={10} radius="xs" size="sm" color={'#578e98'} />
    </>
  )
}
