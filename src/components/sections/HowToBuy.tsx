import { Search, Phone, CheckCircle, Car } from 'lucide-react'

const STEPS = [
    {
        title: 'Choose Your Car',
        description: 'Browse our extensive inventory and find the vehicle that suits your needs.',
        icon: Search,
    },
    {
        title: 'Contact Us',
        description: 'Reach out to our team via phone or WhatsApp to discuss details.',
        icon: Phone,
    },
    {
        title: 'Visit Showroom',
        description: 'Come see the car in person and take it for a test drive.',
        icon: Car,
    },
    {
        title: 'Drive Away',
        description: 'Complete the paperwork and drive home in your new dream car.',
        icon: CheckCircle,
    },
]

export function HowToBuy() {
    return (
        <section className="py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How To Buy A Car?</h2>
                    <p className="mt-4 text-lg text-slate-400">
                        Simple steps to get you behind the wheel of your dream car.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {STEPS.map((step, index) => (
                        <div key={step.title} className="relative flex flex-col items-center text-center">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/25">
                                <step.icon className="h-8 w-8" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                            <p className="text-slate-400">{step.description}</p>

                            {/* Connector Line (Desktop only) */}
                            {index < STEPS.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-800 -z-10" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
