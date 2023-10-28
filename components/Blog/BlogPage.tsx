'use client'

import { Container, Space } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { BlogContent } from './BlogContent'
import useStyles from './style'

interface Props {
  permlink: string
  author: string
}

export function BlogPage({ permlink, author }: Props) {
  const { classes, theme } = useStyles()
  const isSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

  return (
    <>
      {isSm ? (
        <div className={classes.default}>
          <BlogContent permlink={permlink} author={author} />
        </div>
      ) : (
        <Container fluid className={classes.default} bg={`linear-gradient(to bottom, #072f37 0%, #f3f3f3 20%, #f3f3f3 20%, #f3f3f3 100%)`}>
          <Container size="xl">
            <Space h="xl" />
            <BlogContent permlink={permlink} author={author} />
            <Space h="xl" />
          </Container>
        </Container>
      )}
    </>
  )
}
