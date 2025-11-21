import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden bg-slate-900">
            {/* Background Image (Placeholder for now) */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                style={{ backgroundImage: 'url(/images/hero-car.jpg)' }} // We need to ensure this image exists or use a placeholder
            >
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent" />
            </div>

            <div className="container relative mx-auto flex h-full flex-col justify-center px-4">
                <div className="max-w-2xl space-y-6">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
                        Find Your <span className="text-primary">Dream Car</span> Today
                    </h1>
                    <p className="text-xl text-slate-300">
                        Discover our exclusive collection of premium vehicles. Quality, performance, and luxury in every drive.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/inventory"
                            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-white transition-colors hover:bg-primary/90"
                        >
                            Browse Inventory
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 bg-white/10 px-8 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
