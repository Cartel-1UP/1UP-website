import { supabase } from "@/lib/supabaseClient"

export const deleteMainCard = async (permlink: string) => {
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