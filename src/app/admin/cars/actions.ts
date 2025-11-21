'use server'

import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createCar(formData: FormData) {
    const rawFormData = {
        make: formData.get('make'),
        model: formData.get('model'),
        year: Number(formData.get('year')),
        price: Number(formData.get('price')),
        mileage: Number(formData.get('mileage')),
        condition: formData.get('condition'),
        status: formData.get('status'),
        description: formData.get('description'),
        // For simplicity, we'll handle images separately or assume URLs for now
        // In a real app, we'd handle file uploads to storage here
        images: formData.get('images')?.toString().split(',').map(s => s.trim()).filter(Boolean) || [],
    }

    const { error } = await supabaseAdmin.from('cars').insert(rawFormData)

    if (error) {
        console.error('Error creating car:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/cars')
    revalidatePath('/inventory')
    redirect('/admin/cars')
}

export async function updateCar(id: string, formData: FormData) {
    const make = formData.get('make')
    const model = formData.get('model')
    const year = Number(formData.get('year'))
    const price = Number(formData.get('price'))
    const mileage = Number(formData.get('mileage'))
    const condition = formData.get('condition')
    const status = formData.get('status')
    const description = formData.get('description') as string
    const is_featured = formData.get('is_featured') === 'on'

    // Parse images
    const images = (formData.get('images') as string)
        ?.split(',')
        .map((url) => url.trim())
        .filter((url) => url.length > 0) || []

    const { error } = await supabaseAdmin
        .from('cars')
        .update({
            make,
            model,
            year,
            price,
            mileage,
            condition,
            status,
            description,
            images,
            is_featured,
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating car:', error)
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/cars')
    revalidatePath('/inventory')
    redirect('/admin/cars')
}

export async function deleteCar(formData: FormData) {
    const id = formData.get('id') as string

    const { error } = await supabaseAdmin
        .from('cars')
        .delete()
        .eq('id', id)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath('/admin/cars')
    revalidatePath('/inventory')
    return { success: true }
}
