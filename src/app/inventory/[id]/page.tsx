import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, MessageCircle, Calendar, Gauge, DollarSign, Check } from 'lucide-react'

// Revalidate this page every hour
export const revalidate = 3600

async function getCar(id: string) {
    const { data } = await supabase
        .from('cars')
        .select('*, brands(name)')
        .eq('id', id)
        .single()

    return data
}

async function getSimilarCars(brandId: string, currentCarId: string) {
    const { data } = await supabase
        .from('cars')
        .select('id, make, model, year, price, images')
        .eq('brand_id', brandId)
        .neq('id', currentCarId)
        .limit(4)

    return data || []
}

export default async function CarDetailsPage({ params }: { params: { id: string } }) {
    const car = await getCar(params.id)

    if (!car) {
        notFound()
    }

    const similarCars = await getSimilarCars(car.brand_id, car.id)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Image Gallery */}
                    <div className="overflow-hidden rounded-xl border bg-muted">
                        <div className="relative aspect-video">
                            {car.images && car.images[0] ? (
                                <Image
                                    src={car.images[0]}
                                    alt={`${car.make} ${car.model}`}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                    No Image Available
                                </div>
                            )}
                        </div>
                        {/* Thumbnails would go here */}
                        {car.images && car.images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto p-2">
                                {car.images.slice(1).map((img: string, i: number) => (
                                    <div key={i} className="relative h-20 w-32 shrink-0 overflow-hidden rounded-md border">
                                        <Image src={img} alt="Car view" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="rounded-xl border bg-card p-6">
                        <h2 className="mb-4 text-xl font-bold">Description</h2>
                        <div className="prose max-w-none dark:prose-invert">
                            <p className="whitespace-pre-line">{car.description || 'No description available.'}</p>
                        </div>
                    </div>

                    {/* Features */}
                    {car.features && Object.keys(car.features).length > 0 && (
                        <div className="rounded-xl border bg-card p-6">
                            <h2 className="mb-4 text-xl font-bold">Features</h2>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {/* This assumes features is a simple key-value or array. Adjust based on actual data structure */}
                                {/* For now, rendering dummy features if JSON is complex, or just listing keys */}
                                {Object.entries(car.features).map(([key, value]) => (
                                    <div key={key} className="flex items-center gap-2 text-sm">
                                        <Check className="h-4 w-4 text-primary" />
                                        <span className="capitalize">{key.replace(/_/g, ' ')}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Price & Title */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="mb-4">
                            <h1 className="text-2xl font-bold">{car.make} {car.model}</h1>
                            <p className="text-muted-foreground">{car.year} • {car.condition}</p>
                        </div>
                        <div className="mb-6 text-3xl font-bold text-primary">
                            ${car.price.toLocaleString()}
                        </div>

                        <div className="space-y-3">
                            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700">
                                <MessageCircle className="h-5 w-5" />
                                WhatsApp
                            </button>
                            <button className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 font-medium text-white hover:bg-primary/90">
                                <Phone className="h-5 w-5" />
                                Call Us
                            </button>
                        </div>
                    </div>

                    {/* Key Specs */}
                    <div className="rounded-xl border bg-card p-6">
                        <h3 className="mb-4 font-semibold">Key Specifications</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-3">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>Year</span>
                                </div>
                                <span className="font-medium">{car.year}</span>
                            </div>
                            <div className="flex items-center justify-between border-b pb-3">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Gauge className="h-4 w-4" />
                                    <span>Mileage</span>
                                </div>
                                <span className="font-medium">{car.mileage.toLocaleString()} km</span>
                            </div>
                            <div className="flex items-center justify-between border-b pb-3">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <DollarSign className="h-4 w-4" />
                                    <span>Price</span>
                                </div>
                                <span className="font-medium">${car.price.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between pt-1">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Check className="h-4 w-4" />
                                    <span>Status</span>
                                </div>
                                <span className="capitalize text-primary">{car.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Similar Cars */}
            {similarCars.length > 0 && (
                <div className="mt-16">
                    <h2 className="mb-6 text-2xl font-bold">Similar Vehicles</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {similarCars.map((similar) => (
                            <Link
                                key={similar.id}
                                href={`/inventory/${similar.id}`}
                                className="group block overflow-hidden rounded-lg border bg-card hover:shadow-md"
                            >
                                <div className="relative aspect-[16/10] bg-muted">
                                    {similar.images && similar.images[0] ? (
                                        <Image
                                            src={similar.images[0]}
                                            alt={`${similar.make} ${similar.model}`}
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
                                    <h3 className="truncate font-semibold">{similar.make} {similar.model}</h3>
                                    <p className="mt-1 font-bold text-primary">${similar.price.toLocaleString()}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
