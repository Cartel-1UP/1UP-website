'use client'
import { CommunityPage } from "@/components/Sections/CommunityPage/CommunityPage";
import { RecommendedCardsGrid } from "@/components/Sections/Recommended/RecommendedSection";

export const runtime = 'experimental-edge';

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <CommunityPage tag={params.slug} image={params.slug} />
      <RecommendedCardsGrid />
    </>
  )
}
