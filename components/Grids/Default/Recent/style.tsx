import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
  },

  cardHeader: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '10px 10px 0 0'
  },

  cardFooter: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '0 0 10px 10px',

  },

  link: {
    textDecoration: 'none',
    color: '#000000',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
      color: '#16093fbc',
    },
  }

}))

export default useStyles
