import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'box-shadow 0.3s, background 0.4s',
    '&:hover': {
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', // Adjust shadow properties as needed
      background: 'linear-gradient(#2ecde6 -100%, #162947 60%)', // Adjust the gradient color slightly
    },
  },

  card2: {
    perspective: '1000px' /* Define the perspective for 3D effect */,
  },

  cardInner: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'linear-gradient(#2ecde6 -20%, #162947 100%)',
  },

  cardHover: {
    transform: 'rotateY(180deg)',
  },
}))

export default useStyles
