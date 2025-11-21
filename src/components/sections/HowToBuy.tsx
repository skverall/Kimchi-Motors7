'use client'

import { Search, Phone, CheckCircle, Car } from 'lucide-react'
import { useEffect, useState } from 'react'

const STEPS = [
    {
        title: 'Choose Your Car',
        description: 'Browse our extensive inventory and find the vehicle that suits your needs.',
        icon: Search,
        color: 'from-blue-500 to-blue-600',
    },
    {
        title: 'Contact Us',
        description: 'Reach out to our team via phone or WhatsApp to discuss details.',
        icon: Phone,
        color: 'from-green-500 to-green-600',
    },
    {
        title: 'Visit Showroom',
        description: 'Come see the car in person and take it for a test drive.',
        icon: Car,
        color: 'from-purple-500 to-purple-600',
    },
    {
        title: 'Drive Away',
        description: 'Complete the paperwork and drive home in your new dream car.',
        icon: CheckCircle,
        color: 'from-primary to-indigo-600',
    },
]

export function HowToBuy() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container mx-auto px-4 relative">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                        How To Buy A <span className="text-primary">Car</span>?
                    </h2>
                    <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto">
                        Simple steps to get you behind the wheel of your dream car.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon
                        return (
                            <div
                                key={step.title}
                                className={`relative transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    }`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                {/* Card */}
                                <div className="group relative flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
                                    {/* Step number */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-sm font-bold shadow-lg">
                                        {index + 1}
                                    </div>

                                    {/* Icon */}
                                    <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg shadow-${step.color}/50 transform transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                                        <Icon className="h-10 w-10 text-white" />
                                    </div>

                                    <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                                    <p className="text-slate-300 leading-relaxed">{step.description}</p>

                                    {/* Connector arrow (Desktop only) */}
                                    {index < STEPS.length - 1 && (
                                        <div className="hidden lg:block absolute top-10 left-full w-full h-0.5">
                                            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
                                            <div className="absolute top-1/2 right-0 w-3 h-3 -translate-y-1/2 rotate-45 border-t-2 border-r-2 border-primary/50" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <p className="text-lg text-slate-300 mb-6">Ready to get started?</p>
                    <a
                        href="/inventory"
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-purple-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform"
                    >
                        Browse Our Inventory
                        <Car className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </section>
    )
}
