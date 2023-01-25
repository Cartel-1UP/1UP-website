import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme !== 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.md,
    borderRadius: theme.radius.xs,



    ...theme.fn.hover({
      color: theme.colorScheme !== 'dark' ? theme.colors.gray[4] : '#06272e',
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,
    //color zastepczy 095261
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#06272e',
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? '#06272e' : '#06272e',
    color: theme.colorScheme === 'dark' ? '#031013' : '#031013',
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? '#031418' : '#031418'
    }`,
  },


  dropdownBody: {
    backgroundColor: theme.colorScheme === 'dark' ? '#072f37' : '#072f37',
    borderColor: theme.colorScheme === 'dark' ? '#031013' : '#031013',
  },

  loginPanel:{
    backgroundColor: theme.colorScheme === 'dark' ? '#072f37' : '#072f37',
    borderColor: theme.colorScheme === 'dark' ? '#031013' : '#031013',
  },

  item: {
    '&[data-hovered]': {
      backgroundColor: '#06272e',
      color: theme.white,
    },
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenMobileLogin: {
    [theme.fn.smallerThan('lg')]: {
      display: 'none',
    },

    backgroundColord: 'red',
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  moblieDrawer: {
    backgroundColor: theme.colorScheme === 'dark' ? '#072f37' : '#072f37',
    borderColor: theme.colorScheme === 'dark' ? '#031418' : '#031418',
    color: 'white',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header:{
    backgroundColor: '#072f37',
    border: 0
  },
}))

export default useStyles
