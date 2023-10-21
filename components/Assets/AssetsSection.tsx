'use client'
import { Container } from '@mantine/core'
import useStyles from './style'

type Props = {
  children: React.ReactNode
}

export function AssetsSection({ children }: Props) {
  const { classes, theme } = useStyles()

  return (
    <Container fluid className={classes.default}>
      <Container size="xl" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}>
        {children}
      </Container>
    </Container >
  )
}
