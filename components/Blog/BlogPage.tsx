'use client'

import { Container } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { BlogContent } from './BlogContent'
import useStyles from './style'

interface Props {
  permlink: string
  author: string
}

export function BlogPage({ permlink, author }: Props) {
  const { classes, theme } = useStyles()
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

  return (
    <>
      {isMobile ? (
        <Container fluid className={classes.default}>
          <BlogContent permlink={permlink} author={author} />
        </Container>
      ) : (
        <Container fluid className={classes.default}>
          <Container size="xl">
            <BlogContent permlink={permlink} author={author} />
          </Container>
        </Container>
      )}
    </>
  )
}
