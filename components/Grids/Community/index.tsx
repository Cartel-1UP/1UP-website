import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  card: {
    // height: 80,
    // width: 80,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'flex-start',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',

    transition: 'transform 900ms ease, box-shadow 900ms ease, filter 900ms ease',
    '&:hover': {
      transform: 'scale(1.02)',
      filter: 'brightness(70%)'
    },
  },

  containerLogos: {
    backgroundColor: '#e2f6fa',
    maxHeight: '5em',
  }


}))

export default useStyles
