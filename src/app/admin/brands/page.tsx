import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import { Plus, Trash } from 'lucide-react'
import { deleteBrand, createBrand } from './actions'

export const revalidate = 0

export default async function AdminBrandsPage() {
    const { data: brands } = await supabaseAdmin
        .from('brands')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Manage Brands</h1>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Add Brand Form */}
                <div className="rounded-xl border bg-card p-6 h-fit">
                    <h2 className="mb-4 text-xl font-semibold">Add New Brand</h2>
                    <form action={async (formData) => { 'use server'; await createBrand(formData) }} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Brand Name</label>
                            <input
                                name="name"
                                required
                                className="w-full rounded-md border bg-background px-3 py-2"
                                placeholder="e.g. Toyota"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Logo URL</label>
                            <input
                                name="logo_url"
                                className="w-full rounded-md border bg-background px-3 py-2"
                                placeholder="https://example.com/logo.png"
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                        >
                            <Plus className="h-4 w-4" />
                            Add Brand
                        </button>
                    </form>
                </div>

                {/* Brands List */}
                <div className="rounded-md border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {brands?.map((brand) => (
                                    <tr key={brand.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium">{brand.name}</td>
                                        <td className="p-4 align-middle text-right">
                                            <form action={async (formData) => { 'use server'; await deleteBrand(formData) }} className="inline-block">
                                                <input type="hidden" name="id" value={brand.id} />
                                                <button className="rounded-md p-2 text-destructive hover:bg-destructive/10">
                                                    <Trash className="h-4 w-4" />
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))}
                                {(!brands || brands.length === 0) && (
                                    <tr>
                                        <td colSpan={2} className="p-4 text-center text-muted-foreground">
                                            No brands found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
