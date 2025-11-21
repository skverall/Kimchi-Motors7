'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'
import { login } from './actions'

export default function AdminLoginPage() {
    const [error, setError] = useState('')
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        const result = await login(formData)
        if (result.success) {
            router.push('/admin/dashboard')
        } else {
            setError(result.error || 'Invalid credentials')
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
            <div className="w-full max-w-md space-y-8 rounded-xl border bg-card p-10 shadow-lg">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">Admin Login</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enter your credentials to access the dashboard
                    </p>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            className="w-full rounded-md border bg-background px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full rounded-md border bg-background px-3 py-2"
                        />
                    </div>

                    {error && (
                        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-md bg-primary px-4 py-3 font-medium text-white hover:bg-primary/90"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}
