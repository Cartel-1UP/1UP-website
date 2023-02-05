import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme, _params, getRef) => ({

  card: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
  },

  image: {
    ref: getRef('image'),
    display: 'block',
    width: '500px',
    height: '300px',
    objectFit: 'cover',
    transition: '0.5s linear',
  },



  gradientBot: {
    background: 'linear-gradient(to top, #275c672d, #072f37);'
  },

  default: {
    backgroundColor: theme.colors.gray[2] 
    // background: 'linear-gradient(to top, white, #275c67bb);',
  },

}))

export default useStyles
