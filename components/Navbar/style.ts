import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  mobileStickyHeader: {
    [theme.fn.smallerThan('sm')]: {
    position: 'sticky', 
    top: '0' ,
    zIndex: 1000,
    }
  },

  navbar: {
    [theme.fn.smallerThan('sm')]: {
      paddingTop: 10,
      paddaingBottom: 25,
    }
  },

  hiddenMobileLogin: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
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
