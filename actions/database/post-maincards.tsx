import { supabase } from '@/lib/supabaseClient'

export const addMainCard = async (maincardData: any) => {
  try {
    const { data, error } = await supabase.from('maincards').insert(maincardData)

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error: any) {
    alert(error.message)
  }
}
