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
}

export function DefaultSnackbar({ id, title, message, queryKey, color }: Props) {
  const { classes, theme } = useStyles()
  const { removeSnackbar } = useNotifiactionStore((state) => state)
  const queryCache = useQueryClient()

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeSnackbar(id)
      queryKey ? queryCache.invalidateQueries(queryKey) : null
    }, 10000)

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
