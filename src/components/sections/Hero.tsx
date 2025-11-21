'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Hero() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section className="relative h-[90vh] w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

            <div className="container relative mx-auto flex h-full flex-col justify-center px-4">
                <div className="max-w-3xl space-y-8">
                    {/* Main heading with animation */}
                    <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl">
                            Find Your{' '}
                            <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent animate-gradient">
                                Dream Car
                            </span>
                        </h1>
                    </div>

                    {/* Subtitle with delay */}
                    <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <p className="text-xl text-slate-300 leading-relaxed">
                            Discover our exclusive collection of premium vehicles. Quality, performance, and luxury in every drive.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                <div className="flex items-center gap-2 text-primary">
                                    <CheckCircle className="h-5 w-5" />
                                    <span className="text-2xl font-bold">500+</span>
                                </div>
                                <p className="mt-1 text-sm text-slate-400">Premium Cars</p>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                <div className="flex items-center gap-2 text-purple-400">
                                    <Users className="h-5 w-5" />
                                    <span className="text-2xl font-bold">2K+</span>
                                </div>
                                <p className="mt-1 text-sm text-slate-400">Happy Clients</p>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                <div className="flex items-center gap-2 text-yellow-400">
                                    <Star className="h-5 w-5" />
                                    <span className="text-2xl font-bold">98%</span>
                                </div>
                                <p className="mt-1 text-sm text-slate-400">Satisfaction</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/inventory"
                                className="group inline-flex h-14 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-purple-500 px-8 text-base font-semibold text-white shadow-lg shadow-primary/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/60"
                            >
                                Browse Inventory
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex h-14 items-center justify-center rounded-lg border-2 border-white/20 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/30"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="h-10 w-6 rounded-full border-2 border-white/30">
                    <div className="mx-auto mt-2 h-2 w-1 rounded-full bg-white/50 animate-pulse" />
                </div>
            </div>
        </section>
    )
}
