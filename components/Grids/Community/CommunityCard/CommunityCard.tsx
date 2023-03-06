'use client'
import { AspectRatio, Image } from '@mantine/core';
import Link from 'next/link';
import useStyles from './style';

interface Props {
  image: string;
  tag: string
}

export default function CommunityCard({...props}: Props) {
    const { classes } = useStyles();

    return (
    <AspectRatio ratio={1/1} sx={{maxWidth:'5em'}}>
      <Link href={'community/' + props.tag}>
        <Image src={props.image} className={classes.card}/>
      </Link>
    </AspectRatio>
    );
}

