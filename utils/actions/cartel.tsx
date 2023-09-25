import { supabase } from '../../lib/supabaseClient'

export const fetchMaincards = async () => {
  try {
    const { data } = await supabase.from('maincards').select('*')

    return data
  } catch (error: any) {
    alert(error.message)
  }
}

export const fetchRecommendedPosts = async () => {
  try {
    const { data } = await supabase.from('userschoice').select('*')

    return data
  } catch (error: any) {
    alert(error.message)
  }
}

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
