import { supabase } from '@/lib/supabaseClient'
import { Maincard } from '@/types/blog.type'
import { useQuery } from 'react-query'

const getMainCards = async (): Promise<Maincard[]> => {
  try {
    const { data } = await supabase.from('maincards').select('*').order('id', { ascending: false })

    if (data === null) {
      return []
    }

    return data
  } catch (error: any) {
    console.error('Error fetching maincards:', error)
    return []
  }
}

export const useGetMaincards = () => {
  return useQuery({
    queryKey: 'maincards-data',
    queryFn: getMainCards,
  })
}
