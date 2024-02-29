import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme, _params) => ({
  card: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    transition: 'box-shadow 0.3s, background 0.4s',
    '&:hover': {
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', // Adjust shadow properties as needed
      background: 'radial-gradient(#2fcde7 20%, #172848 110%)', // Adjust the gradient color slightly
    },
  },

  card2: {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'box-shadow 0.3s, background 0.4s',
    '&:hover': {
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', // Adjust shadow properties as needed
      background: 'linear-gradient(#2fcde7 10%, #172848 70%)', // Adjust the gradient color slightly
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
