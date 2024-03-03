import { useMediaQuery } from '@mantine/hooks'

const useSettings = () => {
  const isMd = useMediaQuery(`(max-width: 1000px)`)
  const isSm = useMediaQuery(`(max-width: 768px)`)

  const settings = {
    isMd,
    isSm,
  }

  return settings
}

export default useSettings
