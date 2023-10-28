import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {

  },

  item: {

    '&:focus': {
      backgroundColor: '#165865',
    },
  },

  frame: {
    display: 'inline-block',
    position: 'relative',
    width: 'fit-content',

    '*::before': {
      content: '""',
      position: 'absolute',
      top: '-4px', /* Adjust the top offset as needed */
      left: '-4px', /* Adjust the left offset as needed */
      right: '-4px', /* Adjust the right offset as needed */
      bottom: '-4px', /* Adjust the bottom offset as needed */
      border: '5px solid transparent', /* Set the border to transparent */
      borderImage: `linear-gradient(to bottom, #165865, #80aab3) 1`,
      pointerEvents: 'none',
      clipPath: `polygon(
        0 3%,
        2% 0,
        98% 0,
        100% 3%,
        100% 97%,
        98% 100%,
        2% 100%,
        0% 97%,
        0% 2%
      )
    }`,
    },
  },

  default: {
    backgroundColor: '#f3f3f3'
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },

  price: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 400,
    fontSize: 12,
  },

  chartContainer: {
    minWidth: '100%',
    maxWidth: '100%',
    height: '300px',
    background: "#072f37",
    [theme.fn.smallerThan('sm')]: {
      height: '250px',
    }

  },

}))

export default useStyles
