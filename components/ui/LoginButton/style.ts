import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
    button:{
        backgroundColor: 'white',
        color: '#072f37',
        border: 0,

        ...theme.fn.hover({
            backgroundColor: '#eeeeee',
        }),

      },
    buttonLogin:{
        backgroundColor: '#072f37',
        border: 0,
        
        ...theme.fn.hover({
            backgroundColor: '#0b4b57',
        }),
    }

}))

export default useStyles
