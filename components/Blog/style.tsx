import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
      default: {
        backgroundColor: theme.colors.gray[2] 
      },
      card: {
        borderColor: '#e2e8f0d2',
        borderWidth: 1,
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
}))

export default useStyles
