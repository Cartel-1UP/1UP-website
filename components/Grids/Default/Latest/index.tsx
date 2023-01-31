import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',
    boxShadow: theme.shadows.md,
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows.md,
    },
    padding: 0, 
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
    maxHeight: '3em'
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

  '&:hover': {
    color: '#000000bd',
  },
}

}))

export default useStyles
