import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  default: {
    background: `linear-gradient(to bottom, #072f37 0%, #E9ECEF 20%, #E9ECEF 20%, #E9ECEF 100%)`,
    minHeight: '85vh',
  },

  cardHeader: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '10px 10px 0 0',
  },

  card: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
  },

  cardFooter: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '0 0 10px 10px',
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
