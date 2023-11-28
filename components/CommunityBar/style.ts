import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    [theme.fn.largerThan('md')]: {
      borderRadius: 5,
    },
  },
}))

export default useStyles
