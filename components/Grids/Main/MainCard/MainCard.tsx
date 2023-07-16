'use client'
import { Box, Text, Title } from '@mantine/core';
import useStyles from './style';

interface CardProps {
  image: string;
  title: string;
  category: string;
  permlink: string;
  author: string
}

export function Card({ image, title, category, author, permlink }: CardProps) {
  const { classes } = useStyles();

  const handleGoToPage = () => {
    // Navigate to the specified URL
    window.location.href = `community/cartel/post/${author}/${permlink}`;
  };

  return (
    <Box
      mt={30}
      mb={30}
      mr={10}
      ml={10}
      className={classes.container}
      onClick={() => handleGoToPage()}
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
  );
}
