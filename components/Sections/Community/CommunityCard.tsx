import { useNotifiactionStore } from '@/zustand/stores/useNotificationStore';
import { AspectRatio, Image } from '@mantine/core';
import Link from 'next/link';
import useStyles from './style';

interface Props {
  image: string;
  tag: string
}

export default function CommunityCard({ image, tag }: Props) {
  const { classes } = useStyles();
  const addSnackbar = useNotifiactionStore((state) => state.addSnackbar);

  return (
    <AspectRatio ratio={1 / 1} sx={{ maxWidth: '5em' }}>
      {tag != 'none' ?
        <Link href={'community/' + tag}>
          <Image src={image} className={classes.card} />
        </Link>
        :
        <Image src={image} className={classes.card} onClick={() => {
          addSnackbar({
            id: '2',
            title: 'Warning',
            message: 'There is no community page!',
            queryKey: undefined,
            color: 'teal'
          })
        }
        } />
      }
    </AspectRatio>
  );
}

