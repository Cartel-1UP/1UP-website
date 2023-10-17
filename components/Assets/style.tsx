import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {

  },

  default: {
    backgroundColor: '#E9ECEF'
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },

  price: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 400,
    fontSize: 12,
  },
}))

export default useStyles
