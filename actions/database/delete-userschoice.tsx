import { supabase } from '@/lib/supabaseClient'

export const deleteUsersChoiceCard = async (permlink: string) => {
  try {
    const { data, error } = await supabase.from('userschoice').delete().eq('permlink', permlink)

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error: any) {
    alert(error.message)
  }
}
