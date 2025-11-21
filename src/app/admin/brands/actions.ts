'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function createBrand(formData: FormData) {
    const name = formData.get('name') as string
    const logo_url = formData.get('logo_url') as string

    const { error } = await supabaseAdmin
        .from('brands')
        .insert({ name, logo_url })

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/brands')
    return { success: true }
}

export async function deleteBrand(formData: FormData) {
    const id = formData.get('id') as string

    const { error } = await supabaseAdmin
        .from('brands')
        .delete()
        .eq('id', id)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/brands')
    return { success: true }
}
