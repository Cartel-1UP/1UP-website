import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  comment: {
    // padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },

  cardFooter: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '0 0 10px 10px',
    width: '-webkit-fill-available',
  },
  price: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 400,
    fontSize: 14,
  },
  metadataContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'left',
  },
}))

export default useStyles
