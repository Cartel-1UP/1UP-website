import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 450ms ease, box-shadow 450ms ease',

    '&:hover': {
      transform: 'scale(1.03)',
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },

  price: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 400,
    fontSize: 12
  },

  gradient: {
    background: 'linear-gradient(to bottom, white, #072f37);'
}
}))

export default useStyles
