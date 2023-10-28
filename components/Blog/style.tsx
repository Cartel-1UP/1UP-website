import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  default: {
    minHeight: '85vh',
  },

  cardHeader: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '5px 5px 0 0',
  },

  card: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
  },

  cardFooter: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '0 0 5px 5px',
  },

  text: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },

  avatar: {
    border: `2px solid ${theme.white}`,
  },

  metadataContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  price: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 400,
    fontSize: 20,
  },

  icon: {
    margin: '2px',
    color: 'grey',
    fontSize: '1px',
    '&:hover': {
      cursor: 'pointer',
      color: '#072f37',
    },
  },
}))

export default useStyles
