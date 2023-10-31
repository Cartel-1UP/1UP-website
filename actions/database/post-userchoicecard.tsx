import { supabase } from '@/lib/supabaseClient'


export const addUserChoiceCard = async (cardData: any) => {
    try {
        const { data, error } = await supabase.from('userschoice').insert(cardData)

        if (error) {
            throw new Error(error.message)
        }

        return data
    } catch (error: any) {
        alert(error.message)
    }
}
