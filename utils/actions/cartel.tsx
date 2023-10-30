import { supabase } from '@/lib/supabaseClient'


export const addMaincard = async (maincardData: any) => {
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

export const editMaincard = async (maincardData: any) => {
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

export const deleteMaincard = async (permlink: string) => {
  try {
    const { data, error } = await supabase.from('maincards').delete()
      .eq('permlink', permlink)

    if (error) {
      throw new Error(error.message)
    }

    return data
  } catch (error: any) {
    alert(error.message)
  }
}
