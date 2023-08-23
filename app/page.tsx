"use client"

import { ArticlesCardsGrid } from '@/components/Grids/Default/DefaultSection';
import { Feed } from '@/components/Grids/Default/Feed/Feed';
import { Recent } from '@/components/Grids/Default/Recent/Recent';
import { Trending } from '@/components/Grids/Default/Trending/Trending';
import { RecommendedCardsGrid } from '@/components/Grids/Recommended/RecommendedSection';
import { Community } from '@/components/Sections/Community/Community';
import { MainCards } from '@/components/Sections/Main/MainCards';
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore';
import { Grid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const runtime = 'experimental-edge';

export default function Home() {
  const isMd = useMediaQuery(`(max-width: 1000px)`);
  const authorized = useAuthorizationStore((state: { authorized: boolean; }) => state.authorized)
  return (
    <>
      <MainCards />
      <Community />
      <ArticlesCardsGrid>
        <Grid>
          <Grid.Col span={isMd ? 12 : 9}>
            {authorized ?
              <Feed /> : <Recent tag={'hive-102223'} />
            }
          </Grid.Col>
          <Grid.Col span={isMd ? 12 : 3}>
            <div style={{ position: 'sticky', top: '0' }}>
              <Trending tag={'hive-102223'} title={'Trending on 1UP'} />
            </div>
          </Grid.Col>
        </Grid>
      </ArticlesCardsGrid>
      <RecommendedCardsGrid />
    </>
  )
}
