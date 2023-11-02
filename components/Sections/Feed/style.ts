import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    transition: 'backgroundColor 0.3s',
    '&:hover': {
      backgroundColor: '#f8f9fc',
    },
  },

  cardHeader: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '5px 5px 0 0',
    [theme.fn.smallerThan('md')]: {
      borderRadius: 0,
    },
  },

  cardFooter: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '0 0 5px 5px',
    [theme.fn.smallerThan('md')]: {
      borderRadius: 0,
    },
  },

  link: {
    textDecoration: 'none',
    color: '#000000',

    '&:hover': {
      color: '#16093fbc',
      cursor: 'pointer',
    },
  },

  peakdLink: {
    color: '#228be6',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  turncate: {
    textOverflow: 'ellipsis',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto',
    whiteSpace: 'normal',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    maxHeight: '4.5em',
  },

  metadataContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'right',
  },

  icon: {
    paddingTop: 1.5,
    margin: '2px',
    color: 'grey',
    fontSize: '0',
    '&:hover': {
      cursor: 'pointer',
      color: '#072f37',
    },
  },
}))

export default useStyles
