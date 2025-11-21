import { CarForm } from '@/components/admin/CarForm'

export default function NewCarPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Add New Car</h1>
            <div className="rounded-xl border bg-card p-6">
                <CarForm />
            </div>
        </div>
    )
}
