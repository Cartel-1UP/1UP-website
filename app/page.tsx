"use client"

import { Grid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { CommunityGrid } from '../components/Grids/Community/Community';
import { ArticlesCardsGrid } from '../components/Grids/Default/DefaultSection';
import { Feed } from '../components/Grids/Default/Feed/Feed';
import { Recent } from '../components/Grids/Default/Recent/Recent';
import { Trending } from '../components/Grids/Default/Trending/Trending';
import { DefaultSnackbar } from '../components/Grids/DefaultSnackbar/DefaultSnackbar';
import { MainCardsGrid } from '../components/Grids/Main/MainSection';
import { RecommendedCardsGrid } from '../components/Grids/Recommended/RecommendedSection';
import { useAuthorizationStore } from '../zustand/stores/useAuthorizationStore';
import { useNotifiactionStore } from '../zustand/stores/useNotificationStore';

export const runtime = 'experimental-edge';

export default function Home() {
  const laptop = useMediaQuery(`(max-width: 1000px)`);
  const snackbars = useNotifiactionStore((state) => state.snackbars);
  const authorized = useAuthorizationStore((state: { authorized: boolean; }) => state.authorized)

  return (
    <>
      <MainCardsGrid />
      <CommunityGrid />
      <ArticlesCardsGrid>
        <Grid>
          <Grid.Col span={laptop ? 12 : 9}>
            {authorized ?
              <Feed /> : <Recent tag={'hive-102223'} />
            }

          </Grid.Col>
          <Grid.Col span={laptop ? 12 : 3}>
            <div style={{ position: 'sticky', top: '0' }}>
              <Trending tag={'hive-102223'} title={'Trending on 1UP'} />
            </div>
          </Grid.Col>
        </Grid>
      </ArticlesCardsGrid>
      <RecommendedCardsGrid />
      {snackbars.map((snackbar) => (
        <DefaultSnackbar
          key={snackbar.id}
          id={snackbar.id}
          title={snackbar.title}
          message={snackbar.message}
          queryKey={snackbar.queryKey}
        />
      ))}
    </>
  )
}
