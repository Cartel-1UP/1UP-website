import apiHive from '@/utils/apiHive'
import { useQuery } from 'react-query'

export const getCommunity = async (community: string) => {
    try {
        const { data } = await apiHive.post('', {
            jsonrpc: '2.0',
            method: 'bridge.get_community',
            params: {
                name: community,
            },
            id: 1,
        })
        return { data }
    } catch (error) {
        return { data: [] }
    }
}

export const useGetCommunity = (community: string) => {
    const queryFn = () => getCommunity(community)
    return useQuery(['community-data'], queryFn, {
        refetchOnWindowFocus: false,
        retry: false,
        keepPreviousData: true,
    })
}
