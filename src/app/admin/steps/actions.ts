'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function createStep(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const icon = formData.get('icon') as string
    const step_order = parseInt(formData.get('step_order') as string)

    const { error } = await supabaseAdmin
        .from('buying_steps')
        .insert({ title, description, icon, step_order })

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/steps')
    return { success: true }
}

export async function deleteStep(formData: FormData) {
    const id = formData.get('id') as string

    const { error } = await supabaseAdmin
        .from('buying_steps')
        .delete()
        .eq('id', id)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/steps')
    return { success: true }
}
