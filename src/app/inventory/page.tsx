'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter } from 'lucide-react'

type Car = {
    id: string
    make: string
    model: string
    year: number
    price: number
    mileage: number
    images: string[]
    status: string
}

export default function InventoryPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const [cars, setCars] = useState<Car[]>([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        make: (searchParams.make as string) || '',
        minPrice: '',
        maxPrice: '',
    })

    useEffect(() => {
        async function fetchCars() {
            setLoading(true)
            let query = supabase
                .from('cars')
                .select('*')
                .eq('status', 'available')

            if (filters.make) {
                query = query.ilike('make', `%${filters.make}%`)
            }
            if (filters.minPrice) {
                query = query.gte('price', filters.minPrice)
            }
            if (filters.maxPrice) {
                query = query.lte('price', filters.maxPrice)
            }

            const { data, error } = await query

            if (!error && data) {
                setCars(data)
            }
            setLoading(false)
        }

        fetchCars()
    }, [filters])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-8 lg:flex-row">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 shrink-0 space-y-6">
                    <div className="rounded-lg border bg-card p-6">
                        <div className="mb-4 flex items-center gap-2 font-semibold">
                            <Filter className="h-5 w-5" />
                            Фильтры
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium">Марка</label>
                                <input
                                    type="text"
                                    placeholder="Например, Toyota"
                                    className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                    value={filters.make}
                                    onChange={(e) => setFilters({ ...filters, make: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium">Бюджет</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Мин."
                                        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                        value={filters.minPrice}
                                        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Макс."
                                        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                        value={filters.maxPrice}
                                        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Car Grid */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">Каталог</h1>
                        <p className="text-muted-foreground">{cars.length} авто найдено</p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-80 animate-pulse rounded-lg bg-muted" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {cars.map((car) => (
                                <Link
                                    key={car.id}
                                    href={`/inventory/${car.id}`}
                                    className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
                                >
                                    <div className="relative aspect-[16/10] bg-muted">
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
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-2 flex items-start justify-between">
                                            <div>
                                                <h3 className="font-semibold">{car.make} {car.model}</h3>
                                                <p className="text-sm text-muted-foreground">{car.year} • {car.mileage.toLocaleString()} km</p>
                                            </div>
                                        <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                                {car.status}
                                            </span>
                                        </div>
                                        <p className="text-xl font-bold text-primary">
                                            ${car.price.toLocaleString()}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {!loading && cars.length === 0 && (
                        <div className="py-20 text-center">
                            <p className="text-lg text-muted-foreground">Не найдено автомобилей по заданным параметрам.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
