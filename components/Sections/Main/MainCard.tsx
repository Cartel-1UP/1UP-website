import { Box, Text, Title } from '@mantine/core';
import Link from 'next/link';
import useStyles from './style';

interface Props {
  image: string;
  title: string;
  category: string;
  permlink: string;
  author: string
}

export function Card({ image, title, category, author, permlink }: Props) {
  const { classes } = useStyles();

  return (
    <Link href={`community/hive-102223/post/` + author + '/' + permlink} >
      <Box
        mt={30}
        mb={30}
        mr={10}
        ml={10}
        className={classes.container}
        style={{ cursor: 'pointer' }}>
        <img src={image} alt={'Main'} className={classes.image} />
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
  );
}
