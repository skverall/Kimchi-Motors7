'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

type Car = {
    id: string
    make: string
    model: string
    year: number
    price: number
    images: string[]
    is_featured?: boolean
}

export function FeaturedCars() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        skipSnaps: false
    })
    const [cars, setCars] = useState<Car[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index)
    }, [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return

        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on('select', onSelect)
        onSelect()

        // Auto-play
        const autoplay = setInterval(() => {
            if (emblaApi && cars.length > 0) {
                emblaApi.scrollNext()
            }
        }, 5000)

        return () => {
            clearInterval(autoplay)
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi, onSelect, cars.length])

    useEffect(() => {
        async function fetchFeaturedCars() {
            const { data, error } = await supabase
                .from('cars')
                .select('id, make, model, year, price, images, is_featured')
                .limit(10)
                .order('created_at', { ascending: false })

            if (!error && data) {
                setCars(data)
            }
            setLoading(false)
        }

        fetchFeaturedCars()
    }, [])

    if (loading) {
        return (
            <div className="py-20 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        )
    }

    if (cars.length === 0) {
        return null
    }

    return (
        <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />

            <div className="container mx-auto px-4 relative">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold tracking-tight mb-4">
                        Most Wanted <span className="text-primary">Cars</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Handpicked selection of our finest vehicles. Quality, performance, and luxury in every drive.
                    </p>
                </div>

                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {cars.map((car) => (
                                <div
                                    className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]"
                                    key={car.id}
                                >
                                    <Link href={`/inventory/${car.id}`} className="group block h-full">
                                        <div className="h-full overflow-hidden rounded-xl border bg-card shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                            {/* Image container */}
                                            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                                                {car.images && car.images[0] ? (
                                                    <>
                                                        <Image
                                                            src={car.images[0]}
                                                            alt={`${car.make} ${car.model}`}
                                                            fill
                                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        {/* Gradient overlay */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    </>
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-muted-foreground">
                                                        No Image
                                                    </div>
                                                )}

                                                {/* Year badge */}
                                                <div className="absolute bottom-3 right-3 rounded-lg bg-black/70 backdrop-blur-sm px-3 py-1.5 text-sm font-bold text-white shadow-lg">
                                                    {car.year}
                                                </div>

                                                {/* Featured badge */}
                                                {car.is_featured && (
                                                    <div className="absolute top-3 left-3 rounded-lg bg-gradient-to-r from-primary to-purple-500 px-3 py-1.5 flex items-center gap-1 text-sm font-semibold text-white shadow-lg">
                                                        <Star className="h-3 w-3 fill-current" />
                                                        Featured
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card content */}
                                            <div className="p-5">
                                                <h3 className="text-lg font-bold truncate mb-2 group-hover:text-primary transition-colors">
                                                    {car.make} {car.model}
                                                </h3>
                                                <p className="text-2xl font-bold text-primary">
                                                    ${car.price.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-12 w-12 rounded-full bg-white dark:bg-slate-800 shadow-xl border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110 disabled:opacity-50"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-12 w-12 rounded-full bg-white dark:bg-slate-800 shadow-xl border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110 disabled:opacity-50"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`h-2 rounded-full transition-all ${index === selectedIndex
                                    ? 'w-8 bg-primary'
                                    : 'w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* View all link */}
                <div className="text-center mt-8">
                    <Link
                        href="/inventory"
                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
                    >
                        View All Inventory
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
