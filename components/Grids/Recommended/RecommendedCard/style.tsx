import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    borderColor: '#e2e8f0d2',
    borderWidth: 0.1,
    transition: 'backgroundColor 0.3s',
    '&:hover': {
      backgroundColor: '#f8f9fc',
    },
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

  gradient: {
    background: 'linear-gradient(to bottom, #E9ECEF, #072f37);'
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

  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  metadataContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'left'
  },

  link: {
    textDecoration: 'none',
    color: '#000000',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
      color: '#000000bd',
    },
  },


}))

export default useStyles
