import Link from 'next/link'
import { Car } from 'lucide-react' // Fallback icon

// We will eventually fetch these from the DB, but for static layout:
const STATIC_BRANDS = [
    { name: 'Toyota', logo: null },
    { name: 'BMW', logo: null },
    { name: 'Mercedes', logo: null },
    { name: 'Audi', logo: null },
    { name: 'Nissan', logo: null },
    { name: 'Hyundai', logo: null },
]

export function Brands() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">Browse by Brands</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                    {STATIC_BRANDS.map((brand) => (
                        <Link
                            key={brand.name}
                            href={`/inventory?make=${brand.name}`}
                            className="flex flex-col items-center justify-center rounded-lg border bg-card p-6 transition-colors hover:border-primary hover:bg-accent"
                        >
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                <Car className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <span className="font-medium">{brand.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
