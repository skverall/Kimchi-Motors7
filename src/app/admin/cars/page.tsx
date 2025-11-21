import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'
import { Plus, Edit, Trash } from 'lucide-react'
import { deleteCar } from './actions'

export const revalidate = 0

export default async function AdminCarsPage() {
    const { data: cars } = await supabaseAdmin
        .from('cars')
        .select('*, brands(name)')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Manage Cars</h1>
                <Link
                    href="/admin/cars/new"
                    className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                    <Plus className="h-4 w-4" />
                    Add New Car
                </Link>
            </div>

            <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Make & Model</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Year</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {cars?.map((car) => (
                                <tr key={car.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{car.make} {car.model}</td>
                                    <td className="p-4 align-middle">{car.year}</td>
                                    <td className="p-4 align-middle">${car.price.toLocaleString()}</td>
                                    <td className="p-4 align-middle">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${car.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {car.status}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/cars/${car.id}`}
                                                className="rounded-md p-2 hover:bg-muted"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                            <form action={async (formData) => { 'use server'; await deleteCar(formData) }}>
                                                <input type="hidden" name="id" value={car.id} />
                                                <button className="rounded-md p-2 text-destructive hover:bg-destructive/10">
                                                    <Trash className="h-4 w-4" />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {(!cars || cars.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                        No cars found. Add your first car!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
