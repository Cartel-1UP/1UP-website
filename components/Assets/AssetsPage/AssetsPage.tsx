'use client'
import { SimpleGrid, Space } from '@mantine/core'
import useStyles from '../style'

export function AssetsPage() {
  const { classes, theme } = useStyles()

  return (
    <>
      <Space h="xl" />
      <SimpleGrid cols={1} mt={0} spacing={0} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        Assets
      </SimpleGrid>
      <Space h="xl" />
    </>
  )
}
