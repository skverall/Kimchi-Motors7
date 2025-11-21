'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

// Static FAQs for now, will fetch from DB later
const FAQS = [
    {
        question: 'Do you offer financing options?',
        answer: 'Yes, we work with leading banks to provide competitive financing rates for our customers.',
    },
    {
        question: 'Can I trade in my old car?',
        answer: 'Absolutely! We offer fair market value for trade-ins. Bring your car for an evaluation.',
    },
    {
        question: 'Do the cars come with a warranty?',
        answer: 'Most of our vehicles come with a dealer warranty. Extended warranty packages are also available.',
    },
    {
        question: 'How can I book a test drive?',
        answer: 'You can book a test drive by contacting us via phone, WhatsApp, or visiting our showroom directly.',
    },
]

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
                    <p className="mt-2 text-muted-foreground">
                        Find answers to common questions about buying a car from us.
                    </p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-lg border bg-card transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium transition-colors hover:bg-muted/50"
                            >
                                <span>{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                )}
                            </button>

                            <div
                                className={`px-6 text-muted-foreground transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                                    }`}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
