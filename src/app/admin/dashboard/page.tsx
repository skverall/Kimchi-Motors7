import { supabaseAdmin } from '@/lib/supabase'
import { Car, Tag, HelpCircle, DollarSign } from 'lucide-react'

export const revalidate = 0

async function getStats() {
    const { count: carsCount } = await supabaseAdmin.from('cars').select('*', { count: 'exact', head: true })
    const { count: brandsCount } = await supabaseAdmin.from('brands').select('*', { count: 'exact', head: true })
    const { count: faqsCount } = await supabaseAdmin.from('faqs').select('*', { count: 'exact', head: true })

    // Calculate total value (approximate)
    const { data: cars } = await supabaseAdmin.from('cars').select('price')
    const totalValue = cars?.reduce((sum, car) => sum + (car.price || 0), 0) || 0

    return {
        carsCount: carsCount || 0,
        brandsCount: brandsCount || 0,
        faqsCount: faqsCount || 0,
        totalValue
    }
}

export default async function AdminDashboard() {
    const stats = await getStats()

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Обзор панели</h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Всего авто</p>
                            <h3 className="text-2xl font-bold">{stats.carsCount}</h3>
                        </div>
                        <div className="rounded-full bg-primary/10 p-3 text-primary">
                            <Car className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Марок</p>
                            <h3 className="text-2xl font-bold">{stats.brandsCount}</h3>
                        </div>
                        <div className="rounded-full bg-blue-500/10 p-3 text-blue-500">
                            <Tag className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Стоимость склада</p>
                            <h3 className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</h3>
                        </div>
                        <div className="rounded-full bg-green-500/10 p-3 text-green-500">
                            <DollarSign className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">FAQ</p>
                            <h3 className="text-2xl font-bold">{stats.faqsCount}</h3>
                        </div>
                        <div className="rounded-full bg-orange-500/10 p-3 text-orange-500">
                            <HelpCircle className="h-6 w-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
