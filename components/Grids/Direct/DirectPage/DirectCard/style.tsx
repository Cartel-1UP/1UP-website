import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {

    borderColor: '#e2e8f0d2',
    borderWidth: 1,

    // transition: 'transform 150ms ease, box-shadow 150ms ease',

    // '&:hover': {
    //   transform: 'scale(1.01)',
    //   boxShadow: theme.shadows.md,
    // },
  },

  headerContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  imageContainer:{
    display: 'flex',
    alignItems: 'center'
  },

  metadataContainer:{
    display: 'flex',
    alignItems: 'center',
    alignContent: 'right'
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

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },

  price: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 400,
    fontSize: 14
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

  link: {
    textDecoration: 'none',
    color: '#000000',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
      color: '#16093fbc',
    },
  }

}))

export default useStyles
