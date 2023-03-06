import { CommunityPage } from "../../../components/Grids/CommunityPage/CommunityPage";
import { RecommendedCardsGrid } from "../../../components/Grids/Recommended/RecommendedSection";

export const runtime = 'experimental-edge';

export default function Page({params}: {params: { slug: string}}) {
  
  return (
    <>
        <CommunityPage tag={params.slug}  image={params.slug}/>
        <RecommendedCardsGrid tag={params.slug}/>
    </>

  )
}
