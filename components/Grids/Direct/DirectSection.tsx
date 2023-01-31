'use client'
import { Container, Grid } from '@mantine/core'
import useStyles from '.'
import { DirectPage } from './DirectPage/DirestPage'

type Props = {
    tag: string
    type: string
    name: string
}

export function DirectSection({tag, type, name} : Props) {
  const { classes, theme } = useStyles()

  return (
    <Container  fluid className={classes.default}>
        <Container size="xl" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} >
        <Grid>
            <Grid.Col span={12}>
                <DirectPage tag={tag} type={type} name={name}/>
            </Grid.Col>
        </Grid>
        </Container>
    </Container>
    )
}

