import { HiveArticleComments, Post } from '@/types/blog.type'
import apiHive from '@/utils/apiHive'
import { useQuery } from 'react-query'

export const getComments = async ({ ...props }: Post): Promise<HiveArticleComments | []> => {
  try {
    const { data } = await apiHive.post('', {
      id: 21,
      jsonrpc: '2.0',
      method: 'bridge.get_discussion',
      params: {
        author: props.author,
        permlink: props.permlink,
      },
    })

    return data
  } catch (error) {
    console.error(`Error fetching comments:`, error)
    return []
  }
}

export const useGetComments = (props: Post) => {
  const queryFn = () => getComments(props)
  return useQuery(['comments-data', props.author, props.permlink], queryFn, {
    refetchOnWindowFocus: false,
    retry: false,
    keepPreviousData: true,
  })
}
