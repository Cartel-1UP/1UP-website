'use client'

import { Suspense } from "react";
import { MainPage } from "../../../components/CommunityFront/CommunityFront";
import { CommunityGrid } from "../../../components/Grids/Community/Community";
import { ArticlesCardsGrid } from "../../../components/Grids/Default/DefaultSection";
import { RecommendedCardsGrid } from "../../../components/Grids/Recommended/RecommendedSection";



export const runtime = 'experimental-edge';

export default function Page({params}: {params: { slug: string}}) {


  
  return (
    <div>
        <Suspense>
        <MainPage  image={params.slug}/>
        <CommunityGrid/>
        <ArticlesCardsGrid tag={params.slug}/>
        <RecommendedCardsGrid tag={params.slug}/>
        </Suspense>
    </div>

  )
}
