import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  icon: {
    padding: '5px',
    color: '#072f37',
    fontSize: '1px',
    position: 'absolute',
    right: '0',
    '&:hover': {
      cursor: 'pointer',
      color: 'grey',
    },
  },
}))

export default useStyles
