'use client'

import { showNotification } from '@mantine/notifications'
import { IconInfoCircle } from '@tabler/icons'
import { Timeline } from 'react-twitter-widgets'
import { NotificationText } from '../ui/ProgressBar/ProgressBar'
import useStyles from './style'

export default function XTimeline() {
  const { classes } = useStyles()
  return (
    <>
      <span className={classes.icon}>
        <IconInfoCircle
          size={'1rem'}
          onClick={() =>
            showNotification({
              autoClose: 7000,
              title: 'Info',
              message: (
                <NotificationText
                  message={<>You have to login to your Twitter account to see the Tweets!</>}
                  time={7000}
                />
              ),
              styles: (theme) => ({
                root: {
                  backgroundColor: '#072f37',
                  borderColor: '#072f37',
                  '&::before': { backgroundColor: theme.white },
                },
                title: { color: theme.white },
                description: { color: theme.white },
                closeButton: {
                  color: theme.white,
                  '&:hover': { backgroundColor: '#04191d' },
                },
              }),
              loading: false,
            })
          }
        />
      </span>
      <Timeline
        dataSource={{ sourceType: 'profile', screenName: 'CartelOneup' }}
        options={{ height: '400', chrome: 'noborders, transparent' }}
      />
    </>
  )
}
