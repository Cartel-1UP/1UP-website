'use client'

import { Container, Grid } from '@mantine/core'
import useStyles from './style'

type Props = {
  children: React.ReactNode
}

export function AdminPanel({ children }: Props) {
  const { classes, theme } = useStyles()

  return (
    <>
      <Container fluid className={classes.default}>
        <Container size="xl" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}>
          <Grid>
            <Grid.Col span={12}>{children}</Grid.Col>
          </Grid>
        </Container>
      </Container>
    </>
  )
}
