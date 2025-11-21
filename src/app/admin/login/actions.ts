'use server'

import { cookies } from 'next/headers'

export async function login(formData: FormData) {
    const username = formData.get('username')
    const password = formData.get('password')

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        // Set a simple cookie for session
        (await cookies()).set('admin_session', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        })
        return { success: true }
    }

    return { success: false, error: 'Invalid username or password' }
}

export async function logout() {
    (await cookies()).delete('admin_session')
    return { success: true }
}
