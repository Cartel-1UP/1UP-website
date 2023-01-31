'use client'
import { Container, Grid } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import useStyles from '.'
import { Latest } from './Latest/Latest'
import { Popular } from './Popular/Popular'

type Props = {
  tag: string

}

export function ArticlesCardsGrid({tag} : Props) {
  const { classes, theme } = useStyles()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

  return (
    <Container  fluid className={classes.default}>
    <Container size="xl" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} >
      <Grid>
        <Grid.Col span={mobile ? 12 : 9}>
          <Popular tag={tag}/>
        </Grid.Col>
        <Grid.Col span={mobile ? 12 : 3}>
          <Latest tag={tag}/>
        </Grid.Col>
      </Grid>
    </Container>

    </Container>
      )
}

