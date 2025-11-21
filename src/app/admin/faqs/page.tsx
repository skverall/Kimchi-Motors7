import { supabaseAdmin } from '@/lib/supabase'
import { Plus, Trash } from 'lucide-react'
import { deleteFaq, createFaq } from './actions'

export const revalidate = 0

export default async function AdminFaqsPage() {
    const { data: faqs } = await supabaseAdmin
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Manage FAQs</h1>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Add FAQ Form */}
                <div className="rounded-xl border bg-card p-6 h-fit">
                    <h2 className="mb-4 text-xl font-semibold">Add New FAQ</h2>
                    <form action={async (formData) => { 'use server'; await createFaq(formData) }} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Question</label>
                            <input
                                name="question"
                                required
                                className="w-full rounded-md border bg-background px-3 py-2"
                                placeholder="e.g. Do you offer warranty?"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Answer</label>
                            <textarea
                                name="answer"
                                required
                                className="h-32 w-full rounded-md border bg-background px-3 py-2"
                                placeholder="Enter the answer..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                        >
                            <Plus className="h-4 w-4" />
                            Add FAQ
                        </button>
                    </form>
                </div>

                {/* FAQs List */}
                <div className="space-y-4">
                    {faqs?.map((faq) => (
                        <div key={faq.id} className="rounded-lg border bg-card p-4">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold">{faq.question}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">{faq.answer}</p>
                                </div>
                                <form action={async (formData) => { 'use server'; await deleteFaq(formData) }}>
                                    <input type="hidden" name="id" value={faq.id} />
                                    <button className="rounded-md p-2 text-destructive hover:bg-destructive/10">
                                        <Trash className="h-4 w-4" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                    {(!faqs || faqs.length === 0) && (
                        <div className="p-8 text-center text-muted-foreground border rounded-lg bg-card">
                            No FAQs found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
