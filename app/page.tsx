'use client'


import { ArticlesCardsGrid } from '../components/Grids/Default/DefaultSection';
import { MainCardsGrid } from '../components/Grids/Main/MainSection';
import { RecommendedCardsGrid } from '../components/Grids/Recommended/RecommendedSection';

export const runtime = 'experimental-edge';

export default function Home() {
  return (
    <div>
        <MainCardsGrid/>
        <ArticlesCardsGrid />
        <RecommendedCardsGrid/>
    </div>

  )
}
