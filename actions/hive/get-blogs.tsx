import { HiveArticle, Posts } from '@/types/blog.type'
import apiHive from '@/utils/apiHive'
import { useQuery } from 'react-query'

export const getFeedBlogs = async ({ ...props }: Posts): Promise<HiveArticle[]> => {
  try {
    const { data } = await apiHive.post('', {
      jsonrpc: '2.0',
      method: 'bridge.get_account_posts',
      params: {
        limit: props.limit,
        account: props.account,
        sort: props.sort,
        start_author: props.start_author,
        start_permlink: props.start_permlink,
      },
      id: 1,
    })
    return data.result
  } catch (error: any) {
    console.error(`Error fetching ${props.sort} cards:`, error)
    return []
  }
}

export const getRecentBlogs = async ({ ...props }: Posts): Promise<HiveArticle[]> => {
  try {
    const { data } = await apiHive.post('', {
      jsonrpc: '2.0',
      method: 'bridge.get_ranked_posts',
      params: {
        limit: props.limit,
        observer: props.observer,
        sort: props.sort,
        start_author: props.start_author,
        start_permlink: props.start_permlink,
        tag: props.tag,
      },
      id: 1,
    })
    return data.result
  } catch (error: any) {
    console.error(`Error fetching ${props.sort} cards:`, error)
    return []
  }
}

export const useGetBlogs = ({ ...props }: Posts) => {
  let queryFn: Promise<HiveArticle[]>

  switch (props.sort) {
    case 'feed':
      queryFn = getFeedBlogs({ ...props })
      break
    case 'created':
      queryFn = getRecentBlogs({ ...props })
      break
    default:
      break
  }

  return useQuery({
    queryKey: ['blogs-data', props.sort],
    queryFn: () => queryFn,
    refetchOnWindowFocus: false,
    retry: false,
    keepPreviousData: true,
  })
}
