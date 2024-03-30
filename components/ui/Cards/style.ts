import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: '8px',
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
}))

export default useStyles
