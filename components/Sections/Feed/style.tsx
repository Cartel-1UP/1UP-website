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
    borderRadius: '10px 10px 0 0'
  },

  cardFooter: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '0 0 10px 10px',

  },

  link: {
    textDecoration: 'none',
    color: '#000000',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
      color: '#16093fbc',
    },
  },

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
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
    maxHeight: '4.5em'
  },

  metadataContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'right'
  },

  icon: {
    margin: '2px',
    color: 'grey',
    fontSize: '1px',
    '&:hover': {
      cursor: 'pointer',
      color: '#072f37'
    },
  }

}))

export default useStyles
