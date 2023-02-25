'use client'

import { BlogPage } from "../../../../../components/Blog/BlogPage";

export const runtime = 'experimental-edge';

export default function Page({params}: {params: { id: string}}) {

  return (
    <div>
      <BlogPage id={params.id}/>
    </div>

  )
}
