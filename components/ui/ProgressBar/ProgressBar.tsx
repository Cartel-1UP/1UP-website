import { Progress, Text } from '@mantine/core'
import { useEffect, useState } from 'react'
import useStyles from './style'

type Props = {
  message: any
  time?: number
}

export function NotificationText({ message, time = 7000 }: Props) {
  const { classes, theme } = useStyles()

  const [progressValue, setProgressValue] = useState(100)
  const incrementInterval = 50

  useEffect(() => {
    const timeout = setTimeout(() => {}, time)

    const interval = setInterval(() => {
      const elapsedTime = incrementInterval / time
      setProgressValue((prevValue) => prevValue - elapsedTime * 100)
    }, incrementInterval)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [time])

  return (
    <>
      <Text>{message}</Text>
      <Progress value={progressValue} mt={10} radius="xs" size="sm" color={'#578e98'} />
    </>
  )
}
