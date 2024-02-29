import { Box, Text, Title } from '@mantine/core'
import Link from 'next/link'
import useStyles from './style'

type Props = {
  image: string
  title: string
  category: string
  permlink: string
  author: string
  community?: string
}

export function Card({ image, title, category, author, permlink, community }: Props) {
  const { classes } = useStyles()

  const communityLink = community ? community : ''

  return (
    <Link href={`/${communityLink}/@${author}/${permlink}`}>
      <Box
        mt={30}
        mb={30}
        mr={10}
        ml={10}
        className={classes.container}
        style={{ cursor: 'pointer' }}
      >
        {image ? (
          <img src={image} alt={'Main'} className={classes.image} />
        ) : (
          <div className={classes.image} style={{ backgroundColor: '#072f37' }}></div>
        )}
        <div className={classes.overlay}>
          <Text className={classes.category} size="xs">
            {category}
          </Text>
          <Title order={3} className={classes.title}>
            {title}
          </Title>
        </div>
      </Box>
    </Link>
  )
}
