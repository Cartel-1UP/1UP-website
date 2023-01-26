import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0px 9px 8px -5px rgba(66, 68, 90, 1);',

    transition: 'transform 900ms ease, box-shadow 900ms ease, filter 900ms ease',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0px 9px 8px -5px rgba(66, 68, 90, 1);',
      filter: 'brightness(70%)'
    },

    [theme.fn.smallerThan('sm')]: {
      height: 300,
    },

  },




  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,

    
    [theme.fn.smallerThan('sm')]: {
      fontSize: 24,
    },

  },

  gradientBot: {
    background: 'linear-gradient(to top, #275c672d, #072f37);'
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
    paddingTop: '70%',

    [theme.fn.smallerThan('sm')]: {
      paddingTop: '12em',
    },

  },
}))

export default useStyles
