import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme, _params, getRef) => ({
  card: {
    borderColor: '#e2e8f0d2',
    borderWidth: 1,
  },

  default: {
    background: `linear-gradient(to bottom, #072f37 0%, #E9ECEF 10%, #E9ECEF 10%, #E9ECEF 100%)`,
  },
}))

export default useStyles
