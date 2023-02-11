'use client'
import { AspectRatio, Image } from '@mantine/core';
import Link from 'next/link';
import useStyles from './style';


interface CardProps {
  image: string;
  tag: string
}

export default function CommunityCard({ image, tag}: CardProps) {
    const { classes } = useStyles();

    return (
    <AspectRatio ratio={1/1} sx={{maxWidth:'5em'}}>
      <Link href={'community/' + tag}>
        <Image src={image} className={classes.card}/>
      </Link>
    </AspectRatio>
    );
}

