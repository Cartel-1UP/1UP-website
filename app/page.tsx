import { CommunityGrid } from '../components/Grids/Community/Community';
import { ArticlesCardsGrid } from '../components/Grids/Default/DefaultSection';
import { MainCardsGrid } from '../components/Grids/Main/MainSection';
import { RecommendedCardsGrid } from '../components/Grids/Recommended/RecommendedSection';

export const runtime = 'experimental-edge';

export default function Home() {
  return (
    <div>
        <MainCardsGrid/>
        <CommunityGrid/>
        <ArticlesCardsGrid tag={'hive-102223'}/>
        <RecommendedCardsGrid tag={'hive-102223'}/>
    </div>

  )
}
