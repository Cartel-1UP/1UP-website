import { BlogPage } from "../../../../../../components/Blog/BlogPage";

export const runtime = 'experimental-edge';

export default function Page({params}: {params: { id: string, username: string}}) {

  return (
    <div>
      <BlogPage id={params.id} username={params.username}/>
    </div>
  )
}
