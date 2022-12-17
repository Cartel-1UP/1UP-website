'use client'


import { ArticlesCardsGrid } from '../components/CardsGrid/CardsGrid';
import { MainCardsGrid } from '../components/MainCardsGrid/MainCardsGrid';
import { RecommendedCardsGrid } from '../components/RecommendedGrid/RecommendedGrid';

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
