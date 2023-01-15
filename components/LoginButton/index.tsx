import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({

    button:{
        backgroundColor: 'white',
        color: '#072f37',
        border: 0,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : '#eeeeee',
        }),

      }

}))

export default useStyles
