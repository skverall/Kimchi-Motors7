import { supabaseAdmin } from '@/lib/supabase'
import { Plus, Trash } from 'lucide-react'
import { deleteStep, createStep } from './actions'

export const revalidate = 0

export default async function AdminStepsPage() {
    const { data: steps } = await supabaseAdmin
        .from('buying_steps')
        .select('*')
        .order('step_order', { ascending: true })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Этапы покупки</h1>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Add Step Form */}
                <div className="rounded-xl border bg-card p-6 h-fit">
                    <h2 className="mb-4 text-xl font-semibold">Добавить этап</h2>
                    <form action={async (formData) => { 'use server'; await createStep(formData) }} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Заголовок</label>
                            <input
                                name="title"
                                required
                                className="w-full rounded-md border bg-background px-3 py-2"
                                placeholder="Например: Выберите авто"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Описание</label>
                            <textarea
                                name="description"
                                required
                                className="h-24 w-full rounded-md border bg-background px-3 py-2"
                                placeholder="Описание этапа..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium">Имя иконки (Lucide)</label>
                                <input
                                    name="icon"
                                    required
                                    className="w-full rounded-md border bg-background px-3 py-2"
                                    placeholder="Например: Search"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium">Порядок</label>
                                <input
                                    name="step_order"
                                    type="number"
                                    required
                                    className="w-full rounded-md border bg-background px-3 py-2"
                                    placeholder="1"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                        >
                            <Plus className="h-4 w-4" />
                            Добавить
                        </button>
                    </form>
                </div>

                {/* Steps List */}
                <div className="space-y-4">
                    {steps?.map((step) => (
                        <div key={step.id} className="rounded-lg border bg-card p-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex gap-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                                        {step.step_order}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{step.title}</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">Icon: {step.icon}</p>
                                    </div>
                                </div>
                                <form action={async (formData) => { 'use server'; await deleteStep(formData) }}>
                                    <input type="hidden" name="id" value={step.id} />
                                    <button className="rounded-md p-2 text-destructive hover:bg-destructive/10">
                                        <Trash className="h-4 w-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                    {(!steps || steps.length === 0) && (
                        <div className="p-8 text-center text-muted-foreground border rounded-lg bg-card">
                            Этапы не найдены.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
