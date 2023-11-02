import { supabase } from '@/lib/supabaseClient'

export const editMainCard = async (maincardData: any) => {
  try {
    const { data, error } = await supabase.from('maincards').upsert(maincardData)

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error: any) {
    alert(error.message)
  }
}
