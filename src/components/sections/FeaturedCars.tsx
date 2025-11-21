'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

// Define a type for our car data
type Car = {
    id: string
    make: string
    model: string
    year: number
    price: number
    images: string[]
}

export function FeaturedCars() {
    const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' })
    const [cars, setCars] = useState<Car[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchFeaturedCars() {
            // For now, just fetch the latest 5 cars as "Most Wanted"
            // In a real app, we might have a 'is_featured' flag
            const { data, error } = await supabase
                .from('cars')
                .select('id, make, model, year, price, images')
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
        return <div className="py-20 text-center">Loading featured cars...</div>
    }

    if (cars.length === 0) {
        return null // Don't show section if no cars
    }

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4">
                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Most Wanted Cars</h2>
                        <p className="mt-2 text-muted-foreground">Handpicked selection of our finest vehicles.</p>
                    </div>
                    <Link href="/inventory" className="text-sm font-medium text-primary hover:underline">
                        View all cars
                    </Link>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4">
                        {cars.map((car) => (
                            <div className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]" key={car.id}>
                                <Link href={`/inventory/${car.id}`} className="group block h-full overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg">
                                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                                        {car.images && car.images[0] ? (
                                            <Image
                                                src={car.images[0]}
                                                alt={`${car.make} ${car.model}`}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-muted-foreground">
                                                No Image
                                            </div>
                                        )}
                                        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs font-bold text-white">
                                            {car.year}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="truncate text-lg font-semibold">{car.make} {car.model}</h3>
                                        <p className="mt-2 text-xl font-bold text-primary">
                                            ${car.price.toLocaleString()}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
