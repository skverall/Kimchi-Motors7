import Image from 'next/image'

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight">About Kimchi Motors</h1>
                    <p className="text-lg text-muted-foreground">
                        Welcome to Kimchi Motors, your premier destination for luxury and performance vehicles.
                        Established with a passion for automotive excellence, we have been serving car enthusiasts
                        and discerning buyers for over a decade.
                    </p>
                    <p className="text-muted-foreground">
                        Our mission is simple: to provide an unparalleled car buying experience. We carefully curate
                        our inventory to ensure every vehicle meets our rigorous standards of quality, performance,
                        and style. Whether you're looking for a sleek sports car, a comfortable family SUV, or a
                        luxury sedan, we have something for everyone.
                    </p>
                    <p className="text-muted-foreground">
                        At Kimchi Motors, we believe in transparency, integrity, and customer satisfaction. Our
                        knowledgeable team is dedicated to helping you find the perfect vehicle that fits your
                        lifestyle and budget.
                    </p>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                    {/* Placeholder for showroom image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-muted-foreground">
                        Showroom Image Placeholder
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <h2 className="mb-10 text-center text-3xl font-bold">Why Choose Us?</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-8 text-center">
                        <h3 className="mb-3 text-xl font-semibold">Premium Selection</h3>
                        <p className="text-muted-foreground">
                            Hand-picked vehicles from top global brands, ensuring quality and reliability.
                        </p>
                    </div>
                    <div className="rounded-lg border bg-card p-8 text-center">
                        <h3 className="mb-3 text-xl font-semibold">Expert Team</h3>
                        <p className="text-muted-foreground">
                            Our automotive experts are here to guide you through every step of the process.
                        </p>
                    </div>
                    <div className="rounded-lg border bg-card p-8 text-center">
                        <h3 className="mb-3 text-xl font-semibold">After-Sales Support</h3>
                        <p className="text-muted-foreground">
                            We stand by our cars with comprehensive warranty options and service support.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
