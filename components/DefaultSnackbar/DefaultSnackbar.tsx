import { useNotifiactionStore } from '@/zustand/stores/useNotificationStore'
import { Notification } from '@mantine/core'
import { useEffect } from 'react'
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

export function DefaultSnackbar({ id, title, message, queryKey, color, time }: Props) {
  const { classes, theme } = useStyles()
  const { removeSnackbar } = useNotifiactionStore((state) => state)
  const queryCache = useQueryClient()

  console.log(time)

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeSnackbar(id)
      queryKey ? queryCache.invalidateQueries(queryKey) : null
    }, time ? time : 10000)

    return () => {
      clearTimeout(timeout)
    }
  }, [id, removeSnackbar, queryCache, queryKey])

  return (
    <div className={classes.snackbarContainer}>
      <Notification title={title} color={color}>
        {message}
      </Notification>
    </div>
  )
}
