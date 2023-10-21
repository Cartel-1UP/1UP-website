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

  chartContainer: {
    minWidth: '100%',
    maxWidth: '100%',
    height: '350px',
    background: "#072f37",
    [theme.fn.smallerThan('sm')]: {
      height: '250px',
    }

  },

}))

export default useStyles
