'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function createFaq(formData: FormData) {
    const question = formData.get('question') as string
    const answer = formData.get('answer') as string

    const { error } = await supabaseAdmin
        .from('faqs')
        .insert({ question, answer })

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/faqs')
    return { success: true }
}

export async function deleteFaq(formData: FormData) {
    const id = formData.get('id') as string

    const { error } = await supabaseAdmin
        .from('faqs')
        .delete()
        .eq('id', id)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/faqs')
    return { success: true }
}
