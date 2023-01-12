'use client'
import { Container, Grid } from '@mantine/core'
import useStyles from '.'
import { Latest } from './Latest/Latest'
import { Popular } from './Popular/Popular'

export function ArticlesCardsGrid() {
  const { classes, theme } = useStyles()

  return (

    <Container py="xl" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}>
      <Grid>
        <Grid.Col span={9}>
          <Popular/>
        </Grid.Col>
        <Grid.Col span={3}>
          <Latest/>
        </Grid.Col>
      </Grid>
    </Container>
  )
}
