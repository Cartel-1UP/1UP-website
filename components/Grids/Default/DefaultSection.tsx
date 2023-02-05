'use client'
import { Container, Grid } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import useStyles from '.'
import { Recent } from './Recent/Recent'
import { Trending } from './Trending/Trending'

type Props = {
  tag: string

}

export function ArticlesCardsGrid({tag} : Props) {
  const { classes, theme } = useStyles()
  const laptop = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  return (
    <Container  fluid className={classes.default}>
    <Container size="xl">
      <Grid>
        <Grid.Col span={laptop ? 12 : 9}>
          <Recent tag={tag}/>
        </Grid.Col>
        <Grid.Col span={laptop ? 12 : 3}>
          <Trending tag={tag}/>
        </Grid.Col>
      </Grid>
    </Container>

    </Container>
      )
}

