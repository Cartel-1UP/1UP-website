import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
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
}))

export default useStyles
