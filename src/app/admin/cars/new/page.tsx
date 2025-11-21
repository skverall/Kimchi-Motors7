import { CarForm } from '@/components/admin/CarForm'

export default function NewCarPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Добавить автомобиль</h1>
            <div className="rounded-xl border bg-card p-6">
                <CarForm />
            </div>
        </div>
    )
}
