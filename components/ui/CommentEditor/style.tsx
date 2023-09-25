import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
  },

  cardHeader: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '10px 10px 0 0',
  },

  cardSticky: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '0 0 0 0',
  },
  avatar: {
    border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
  },
  text: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },

  metadataContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  price: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 400,
    fontSize: 20,
  },

  headingOptions: {
    position: 'absolute',
    zIndex: 1,
    marginTop: '10px',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
    padding: '4px',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

export default useStyles
