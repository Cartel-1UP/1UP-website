'use client'

import { Suspense } from "react";
import { CommunityGrid } from "../../components/Grids/Community/Community";
import { ArticlesCardsGrid } from "../../components/Grids/Default/DefaultSection";
import { MainCardsGrid } from "../../components/Grids/Main/MainSection";
import { RecommendedCardsGrid } from "../../components/Grids/Recommended/RecommendedSection";



export const runtime = 'experimental-edge';

export default function Home() {
  return (
    <div>
        <Suspense fallback={<p>Loading feed...</p>}>
        <MainCardsGrid/>
        <CommunityGrid/>
        <ArticlesCardsGrid tag={'hive-13323'}/>
        <RecommendedCardsGrid/>
        </Suspense>
    </div>

  )
}
