'use client'

import { Suspense } from "react";
import { CommunityPage } from "../../../components/Grids/CommunityPage/CommunityPage";
import { RecommendedCardsGrid } from "../../../components/Grids/Recommended/RecommendedSection";



export const runtime = 'experimental-edge';

export default function Page({params}: {params: { slug: string}}) {


  
  return (
    <div>
        <Suspense>
        <CommunityPage tag={params.slug}  image={params.slug}/>
        <RecommendedCardsGrid tag={params.slug}/>
        </Suspense>
    </div>

  )
}
