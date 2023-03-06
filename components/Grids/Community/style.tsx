import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({

  containerLogos: {
    background: 'linear-gradient(to bottom, #275c672d, #275c67bb);',
    [theme.fn.smallerThan('xl')]: {
      height: '15vh'
    },
  },
  
}))

export default useStyles
