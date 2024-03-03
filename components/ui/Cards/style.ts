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
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'box-shadow 0.3s, background 0.4s',
    '&:hover': {
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', // Adjust shadow properties as needed
      background: 'linear-gradient(#2ecde6 -10%, #162947 60%)', // Adjust the gradient color slightly
    },
  },
}))

export default useStyles
