import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,

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
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    maxHeight: '4.5em'
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

  metadataContainer:{
    display: 'flex',
    alignItems: 'center',
    alignContent: 'left'
  },

  headerContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  price: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 400,
    fontSize: 12
  },

  image: {
    width: '100%', /* Change to 50% to take up half of the card's width */
    objectFit: 'cover', /* Scale the image to cover the entire width without distorting it */
    padding: 0, /* Remove any padding */
    margin: 0, /* Remove any margin */
    border: 0, /* Remove any border */
},

link: {
  textDecoration: 'none',
  color: '#000000',
  display: 'flex',
  alignItems: 'center',

  '&:hover': {
    color: '#000000bd',
  },
}

}))

export default useStyles
