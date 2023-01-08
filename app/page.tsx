'use client'


import { Space } from '@mantine/core';
import { Suspense } from 'react';
import { CommunityGrid } from '../components/Grids/Community/Community';
import { ArticlesCardsGrid } from '../components/Grids/Default/DefaultSection';
import { MainCardsGrid } from '../components/Grids/Main/MainSection';
import { RecommendedCardsGrid } from '../components/Grids/Recommended/RecommendedSection';

export const runtime = 'experimental-edge';

export default function Home() {
  return (
    <div>
        <CommunityGrid/>
        <Space h="xl" />
        <MainCardsGrid/>
        <Suspense fallback={<p>Loading feed...</p>}>
        <ArticlesCardsGrid />
        </Suspense>
        <RecommendedCardsGrid/>
    </div>

  )
}
