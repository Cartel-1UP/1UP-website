import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({

  default: {
    background: `linear-gradient(to bottom, #072f37 0%, #E9ECEF 20%, #E9ECEF 20%, #E9ECEF 100%)`,
    minHeight: '85vh',
  },


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
    borderRadius: '10px 10px 0 0',
  },

  cardFooter: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
    borderRadius: '0 0 10px 10px',
  },

  link: {
    textDecoration: 'none',
    color: '#000000',

    '&:hover': {
      color: '#16093fbc',
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
    paddingTop: 2.1,
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
