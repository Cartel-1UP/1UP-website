import { useNotifiactionStore } from '@/zustand/stores/useNotificationStore'
import { Notification, Progress } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import useStyles from './style'

interface Props {
  id: string
  title: string
  message: string
  queryKey?: string
  color?: string
  time?: number
}

export function DefaultSnackbar({ id, title, message, queryKey, color, time = 10000 }: Props) {
  const { classes, theme } = useStyles()
  const { removeSnackbar } = useNotifiactionStore((state) => state)
  const queryCache = useQueryClient()

  const [progressValue, setProgressValue] = useState(100); // State to store the progress value
  const incrementInterval = 50; // Interval for incrementing the progress value (1 second)

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeSnackbar(id);
      queryKey ? queryCache.invalidateQueries(queryKey) : null;
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
  }, [id, removeSnackbar, queryCache, queryKey, time]);

  return (
    <div className={classes.snackbarContainer}>
      <Notification title={title} color={color} disallowClose>
        {message}
        <Progress value={progressValue} mt={10} radius="xs" size="sm" color={'#578e98'} />
      </Notification>
    </div>
  )
}
