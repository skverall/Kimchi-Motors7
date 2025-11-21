'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'

const STATIC_BRANDS = [
    { name: 'Toyota', gradient: 'from-red-500 to-red-600' },
    { name: 'BMW', gradient: 'from-blue-600 to-blue-700' },
    { name: 'Mercedes', gradient: 'from-gray-700 to-gray-900' },
    { name: 'Audi', gradient: 'from-red-600 to-red-700' },
    { name: 'Nissan', gradient: 'from-slate-700 to-slate-800' },
    { name: 'Hyundai', gradient: 'from-blue-600 to-indigo-700' },
    { name: 'Ford', gradient: 'from-blue-700 to-blue-900' },
    { name: 'Honda', gradient: 'from-red-700 to-red-800' },
]

export function Brands() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

            <div className="container mx-auto px-4 relative">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                        <Sparkles className="h-4 w-4" />
                        Top Brands
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight mb-4">
                        Browse by <span className="text-primary">Brands</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore our collection of premium vehicles from the world's leading automotive brands
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                    {STATIC_BRANDS.map((brand, index) => (
                        <div
                            key={brand.name}
                            className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <Link
                                href={`/inventory?make=${brand.name}`}
                                className="group block relative overflow-hidden rounded-xl border-2 border-transparent bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
                            >
                                {/* Gradient background on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                <div className="relative flex flex-col items-center justify-center">
                                    {/* Brand initial with gradient */}
                                    <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${brand.gradient} text-white shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                                        <span className="text-2xl font-bold">
                                            {brand.name.charAt(0)}
                                        </span>
                                    </div>

                                    <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                        {brand.name}
                                    </span>
                                </div>

                                {/* Shine effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
