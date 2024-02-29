import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  hiddenMd: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  hiddenSm: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    position: 'sticky',
    top: '0',
    zIndex: 1000,
  },

  navbar: {
    padding: 0,
    paddingBottom: 0,
    [theme.fn.smallerThan('md')]: {
      paddingBottom: 10,
      paddingTop: 10,
    },
  },

  subLink: {
    width: '100%',
    borderRadius: theme.radius.md,
    color: '#ffffff',

    ...theme.fn.hover({
      backgroundColor: '#06272e',
    }),

    '&:active': theme.activeStyles,
  },

  item: {
    '&[data-hovered]': {
      backgroundColor: '#06272e',
      color: theme.white,
    },
  },

  drawer: {
    backgroundColor: '#06272e',
  },
}))

export default useStyles
