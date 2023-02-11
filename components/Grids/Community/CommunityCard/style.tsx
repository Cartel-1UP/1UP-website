import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 900ms ease, box-shadow 900ms ease, filter 900ms ease',
    '&:hover': {
      transform: 'scale(1.02)',
      filter: 'brightness(70%)'
    },
  },
}))

export default useStyles
