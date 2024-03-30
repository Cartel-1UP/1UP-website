import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme, _params) => ({
  card: {
    background: ' rgba(255, 255, 255, 0.25)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'box-shadow 0.3s, background 0.4s',
    '&:hover': {
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', // Adjust shadow properties as needed
      background: 'radial-gradient(rgba(47,205,231,0.8) 20%, rgba(23,40,72,0.8) 110%)',
    },
  },

  glassmorphismCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    transition: 'box-shadow 0.3s, background 0.4s',
    '&:hover': {
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)', // Adjust shadow properties as needed
    },
  },

  glassMorphicButton: {
    border: 0,
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    borderRadius: '5px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
    transition: 'box-shadow 0.3s, background 0.4s',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.7)', // Adjust shadow properties as needed
    },
  },

  textButton1: {
    border: 0,
    background: 'linear-gradient(-45deg, #162947, #2ecde6)',
    '&:hover': {
      background: 'linear-gradient(-45deg, #162947 10%, #2ecde6 140%)',
    },
  },

  card2: {
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'box-shadow 0.3s, background 0.4s',
    '&:hover': {
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', // Adjust shadow properties as needed
      background: 'linear-gradient(#2ecde6 -10%, #162947 60%)', // Adjust the gradient color slightly
    },
  },

  link: {
    textDecoration: 'underline',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

export default useStyles
