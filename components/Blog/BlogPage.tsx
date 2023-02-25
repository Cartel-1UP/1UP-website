
import useStyles from './style';

interface Props{
  id: string
}

export function BlogPage({id}: Props) {
  const { classes } = useStyles();

  return (
    <div>
      Blog {id}
    </div>

  );
}
