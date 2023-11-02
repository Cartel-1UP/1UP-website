import { supabase } from '@/lib/supabaseClient'

export const editUsersChoiceCard = async (cardData: any) => {
  try {
    const { data, error } = await supabase.from('userschoice').upsert(cardData)

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error: any) {
    alert(error.message)
  }
}
