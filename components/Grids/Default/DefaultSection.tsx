'use client'
import { Container, Grid } from '@mantine/core'
import useStyles from '.'
import { Latest } from './Latest/Latest'
import { Popular } from './Popular/Popular'

type Props = {
  tag: string
}

export function ArticlesCardsGrid({tag} : Props) {
  const { classes, theme } = useStyles()
  console.log('test: ' + tag)
  return (
    <Container  fluid className={classes.default}>
    <Container size="xl" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} >
      <Grid>
        <Grid.Col span={9}>
          <Popular/>
        </Grid.Col>
        <Grid.Col span={3}>
          <Latest tag={tag}/>
        </Grid.Col>
      </Grid>
    </Container>

    </Container>
      )
}
