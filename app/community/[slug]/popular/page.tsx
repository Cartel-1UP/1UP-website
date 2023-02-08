'use client'

import { Suspense } from "react";
import { CommunityGrid } from "../../../../components/Grids/Community/Community";
import { DirectSection } from "../../../../components/Grids/Direct/DirectSection";



export const runtime = 'experimental-edge';

export default function Page({params}: {params: { slug: string}}) {


  
  return (
    <div>
        <Suspense>
        <CommunityGrid/>
        <DirectSection tag={params.slug} type={'trending'} name={'Popular'}/>
        </Suspense>
    </div>

  )
}
