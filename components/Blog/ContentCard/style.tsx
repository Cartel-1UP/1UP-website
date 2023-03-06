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
  avatar: {
    border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
  },
  text: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}))

export default useStyles
