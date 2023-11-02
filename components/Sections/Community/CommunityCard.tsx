import { NotificationText } from '@/components/ui/ProgressBar/ProgressBar'
import { AspectRatio, Image } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import Link from 'next/link'
import useStyles from './style'

interface Props {
  image: string
  tag: string
}

export default function CommunityCard({ image, tag }: Props) {
  const { classes } = useStyles()

  return (
    <AspectRatio ratio={1 / 1} sx={{ maxWidth: '5em' }}>
      {tag != 'none' ? (
        <Link href={'community/' + tag}>
          <Image src={image} className={classes.card} />
        </Link>
      ) : (
        <Image
          src={image}
          className={classes.card}
          onClick={() => {
            showNotification({
              autoClose: 3000,
              title: 'Warning',
              message: <NotificationText message="There is no comunity page!" time={3000} />,
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
          }}
        />
      )}
    </AspectRatio>
  )
}
