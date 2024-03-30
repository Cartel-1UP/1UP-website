import apiHive from '@/utils/apiHive'
import { useQuery } from 'react-query'

export const getPools = async (): Promise<any> => {
  try {
    const { data } = await apiHive.post('', {
      "id": 0,
      "jsonrpc": "2.0",
      "method": "find",
      "params": {
        "contract": "marketpools",
        "table": "liquidityPositions",
        "query": {},
        "limit": 1000,
        "offset": 5000
      }
    })
    return { data }
  } catch (error) {
    console.error(`Error fetching pools:`, error)
    return { data: [] }
  }
}

export const useGetPools = () => {
  const queryFn = () => getPools()
  return useQuery(['pools-data'], queryFn, {
    refetchOnWindowFocus: false,
    retry: false,
    keepPreviousData: true,
  })
}
