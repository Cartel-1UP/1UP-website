import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({

  cardHeader: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '10px 10px 0 0'
  },

  card: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    backgroundColor: '#ffff'
  },

  cardFooter: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '0 0 10px 10px',
  },

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
    textOverflow: 'ellipsis',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto',
    whiteSpace: 'normal',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    maxHeight: '3.5em'
  },

  price: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 400,
    fontSize: 12
  },

  metadataContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'left'
  },
}))

export default useStyles
