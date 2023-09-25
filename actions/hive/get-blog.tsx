import { HiveArticle, Post } from '@/types/blog.type'
import { readTime } from '@/utils/actions/posts'
import apiHive from '@/utils/apiHive'
import { useQuery } from 'react-query'

export const getBlog = async ({
  author,
  permlink,
}: Post): Promise<{ data: HiveArticle | any; time: number }> => {
  try {
    const { data } = await apiHive.post('', {
      id: 21,
      jsonrpc: '2.0',
      method: 'bridge.get_post',
      params: {
        author,
        permlink,
      },
    })
    const dataTime = data.result.body
    const time = readTime(dataTime)
    return { data, time }
  } catch (error) {
    console.error(`Error fetching post:`, error)
    return { data: [], time: 0 }
  }
}

export const useGetBlog = ({ author, permlink }: Post) => {
  const queryFn = () => getBlog({ author, permlink })
  return useQuery(['blog-data'], queryFn, {
    refetchOnWindowFocus: false,
    retry: false,
    keepPreviousData: true,
  })
}
