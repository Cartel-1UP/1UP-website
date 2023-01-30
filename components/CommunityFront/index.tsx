import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme, _params, getRef) => ({


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


}))

export default useStyles
