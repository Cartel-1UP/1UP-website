import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme, _params, getRef) => ({

  card: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
  },

  default: {
    backgroundColor: theme.colors.gray[2] 
  },

}))

export default useStyles
