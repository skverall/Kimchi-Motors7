import { CarForm } from '@/components/admin/CarForm'
import { supabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export default async function EditCarPage({ params }: { params: { id: string } }) {
    const { data: car } = await supabaseAdmin
        .from('cars')
        .select('*')
        .eq('id', params.id)
        .single()

    if (!car) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Редактировать автомобиль</h1>
            <div className="rounded-xl border bg-card p-6">
                <CarForm car={car} />
            </div>
        </div>
    )
}
