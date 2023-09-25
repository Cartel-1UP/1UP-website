import { User } from '@/types/user.type'
import apiHive from '@/utils/apiHive'
import { useQuery } from 'react-query'

export const getUserProfile = async (username: string): Promise<User> => {
  try {
    const { data } = await apiHive.post('', {
      jsonrpc: '2.0',
      method: 'bridge.get_profile',
      params: {
        account: username,
      },
      id: 1,
    })

    return data
  } catch (error) {
    console.error(`Error fetching comments:`, error)
    return {
      id: 1,
    }
  }
}

export const useGetUserProfile = (username: string) => {
  const queryFn = () => getUserProfile(username)
  return useQuery(['userprofile-data', username], queryFn, {
    refetchOnWindowFocus: false,
    retry: false,
    keepPreviousData: true,
  })
}
