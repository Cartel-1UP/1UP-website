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
      top: '0' ,
      zIndex: 1000,
  },

  navbar: {
    padding: 0,
    paddingBottom: 0,
    [theme.fn.smallerThan('md')]: {
      padding: 5,
      paddingBottom: 15,
      paddingTop: 10,
      paddaingBottom: 25,
    }
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
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
  }

}))

export default useStyles
