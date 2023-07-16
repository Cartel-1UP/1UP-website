import { Container } from '@mantine/core'
import { ReactNode } from 'react'
import useStyles from './style'

type Props = {
  children: ReactNode

}
export function ArticlesCardsGrid({ children }: Props) {
  const { classes } = useStyles()

  return (
    <Container fluid className={classes.default}>
      <Container size="xl">
        {children}
      </Container>
    </Container>
  )
}