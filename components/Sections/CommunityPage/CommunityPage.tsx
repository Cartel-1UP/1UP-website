
import { CommunityBar } from '@/components/CommunityBar/CommunityBar';
import { Feed } from '@/components/Sections/Feed/Feed';
import { Container, Grid, Space } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { comumnityData } from '../../../data/communityData';

import useStyles from './style';

interface Props {
  image: string
  tag: string
}

export function CommunityPage({ image, tag }: Props) {
  const { classes, theme } = useStyles()
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const result = comumnityData.filter(data => data.tag === tag)[0];


  return (
    <Container fluid className={classes.default}>
      <Container size="xl">
        <Grid>
          <Grid.Col span={isMd ? 12 : 9}>
            <Feed sort={'created'} tag={tag} isCommunity={true} />
          </Grid.Col>
          <Grid.Col span={isMd ? 12 : 3}>
            <div style={{ position: 'sticky', top: '0' }}>
              <Space h="xl" />
              <CommunityBar communityLogo={result.image} tag={result.tag} />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </Container>
  );
}