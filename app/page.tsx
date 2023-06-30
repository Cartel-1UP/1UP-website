"use client"

import { Grid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { CommunityGrid } from '../components/Grids/Community/Community';
import { ArticlesCardsGrid } from '../components/Grids/Default/DefaultSection';
import { Recent } from '../components/Grids/Default/Recent/Recent';
import { Trending } from '../components/Grids/Default/Trending/Trending';
import { MainCardsGrid } from '../components/Grids/Main/MainSection';
import { RecommendedCardsGrid } from '../components/Grids/Recommended/RecommendedSection';

export const runtime = 'experimental-edge';

export default function Home() {

  const laptop = useMediaQuery(`(max-width: 1000px)`);


  return (
    <>
      <MainCardsGrid />
      <CommunityGrid />
      <ArticlesCardsGrid>
        <Grid>
          <Grid.Col span={laptop ? 12 : 9}>
            <Recent tag={'hive-102223'} />
          </Grid.Col>
          <Grid.Col span={laptop ? 12 : 3}>
            <div style={{ position: 'sticky', top: '0' }}>
              <Trending tag={'hive-102223'} />
            </div>
          </Grid.Col>
        </Grid>
      </ArticlesCardsGrid>
      <RecommendedCardsGrid />

    </>
  )
}
