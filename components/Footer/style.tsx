import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({

    footer: {
        background: ' #072f37',
        [theme.fn.smallerThan('xl')]: {
          height: '15vh'
        },
      },
    
      inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: `${theme.spacing.md}px ${theme.spacing.md}px`,
    
        [theme.fn.smallerThan('sm')]: {
          flexDirection: 'column',
        },
      },
    
      links: {
        [theme.fn.smallerThan('sm')]: {
          marginTop: theme.spacing.lg,
          marginBottom: theme.spacing.sm,
        },
      },

      gradientBot: {
        background: 'linear-gradient(to bottom, white, #072f37);'
      }

}))

export default useStyles
