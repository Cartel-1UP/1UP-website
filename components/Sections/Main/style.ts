import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    position: 'relative',
    height: 400,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-end',
    alignItems: 'flex-end',

    [`&:hover .${getRef('overlay')}`]: {
      transition: '0.3s linear',
      opacity: 1,
    },

    [`&:hover .${getRef('image')}`]: {
      transition: '0.3s linear',
      filter: 'brightness(60%)',
      boxShadow: '0 0 10px 0 #00000081',
    },
  },

  image: {
    ref: getRef('image'),
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    borderRadius: '5px',
    boxShadow: '0 0 4px 0 #00000081',
    transition: '0.5s linear',
  },

  overlay: {
    ref: getRef('overlay'),
    position: 'absolute',
    bottom: 0,
    background: 'rgba(0, 0, 0, 1)',
    width: '100%',
    transition: '0.5s linear',
    opacity: '0.75',
    fontSize: '20px',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '0 0 10px 10px',
  },

  title: {
    ref: getRef('title'),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 24,
    },
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}))

export default useStyles
