import { supabase } from '@/lib/supabaseClient'
import { UsersChoiceCard } from '@/types/blog.type'
import { useQuery } from 'react-query'

const getUsersChoice = async (): Promise<UsersChoiceCard[]> => {
  try {
    const { data } = await supabase.from('userschoice').select('*')

    if (data === null) {
      return []
    }

    return data
  } catch (error: any) {
    console.error('Error fetching userschoice cards:', error)
    return []
  }
}

export const useGetUsersChoice = () => {
  return useQuery({
    queryKey: 'userschoice-data',
    queryFn: getUsersChoice,
  })
}
