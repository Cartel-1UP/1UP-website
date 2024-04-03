import apiBeeSwap from '@/utils/apiBeeSwap'
import { useQuery } from 'react-query'

export async function getTokenPrice(token: string, hivePrice: any) {
  try {
    const { data } = await apiBeeSwap.post('contracts', {
      jsonrpc: '2.0',
      id: 1709478462688,
      method: 'findOne',
      params: {
        contract: 'market',
        table: 'metrics',
        indexes: [{ index: '_id', descending: false }],
        query: {
          symbol: token,
        },
        limit: 1000,
      },
    })
    return { tokenPrice: data, hivePrice }
  } catch {
    // Handle error
  }
}

export async function getHivePrice() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=HIVE,HIVE_DOLLAR&vs_currencies=USD'
    )
    const data = await response.json()
    return data
  } catch {
    // Handle error
  }
}

export const useGetHivePrice = () => {
  const queryFn = async () => {
    const hivePrice = await getHivePrice()
    return hivePrice
  }
  return useQuery(['hivePrice'], queryFn, {
    refetchOnWindowFocus: false,
    retry: false,
    keepPreviousData: true,
  })
}

export const useGetTokenPrice = (token: string, hivePrice: string) => {
  const queryFn = async () => {
    return getTokenPrice(token, hivePrice)
  }
  return useQuery(['userprofile-data', token], queryFn, {
    refetchOnWindowFocus: false,
    retry: false,
    keepPreviousData: true,
  })
}
