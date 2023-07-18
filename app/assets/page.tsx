import { AssetsPage } from "../../components/Grids/Assets/AssetsPage/AssetsPage";
import { AssetsSection } from "../../components/Grids/Assets/AssetsSection";


export const runtime = 'experimental-edge';

export default function Page({ params }: { params: { slug: string } }) {

  return (
    <div>
      <AssetsSection>
        <AssetsPage />
      </AssetsSection>
    </div>

  )
}
