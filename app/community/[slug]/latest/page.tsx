import { DirectPage } from "../../../../components/Grids/Direct/DirectPage/DirectPage";
import { DirectSection } from "../../../../components/Grids/Direct/DirectSection";

export const runtime = 'experimental-edge';

export default function Page({params}: {params: { slug: string}}) {
  
  return (
    <div>
        <DirectSection>
          <DirectPage tag={params.slug} type={'created'} name={'Latest'}/>
        </DirectSection>
    </div>

  )
}
