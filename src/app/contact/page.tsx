import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Have questions? We'd love to hear from you.
                </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="rounded-xl border bg-card p-8">
                        <h2 className="mb-6 text-2xl font-semibold">Get in Touch</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-medium">Visit Our Showroom</h3>
                                    <p className="text-muted-foreground">123 Motor City Drive, Dubai, UAE</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-medium">Call Us</h3>
                                    <p className="text-muted-foreground">+971 50 123 4567</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-medium">Email Us</h3>
                                    <p className="text-muted-foreground">info@kimchimotors.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Clock className="h-6 w-6 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-medium">Working Hours</h3>
                                    <p className="text-muted-foreground">Mon - Sat: 9:00 AM - 9:00 PM</p>
                                    <p className="text-muted-foreground">Sunday: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="aspect-video w-full rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                        Map Integration Placeholder
                    </div>
                </div>

                {/* Contact Form */}
                <div className="rounded-xl border bg-card p-8">
                    <h2 className="mb-6 text-2xl font-semibold">Send us a Message</h2>
                    <form className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium">First Name</label>
                                <input type="text" className="w-full rounded-md border bg-background px-3 py-2" placeholder="John" />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium">Last Name</label>
                                <input type="text" className="w-full rounded-md border bg-background px-3 py-2" placeholder="Doe" />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Email</label>
                            <input type="email" className="w-full rounded-md border bg-background px-3 py-2" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Phone</label>
                            <input type="tel" className="w-full rounded-md border bg-background px-3 py-2" placeholder="+971 50 000 0000" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Message</label>
                            <textarea className="h-32 w-full rounded-md border bg-background px-3 py-2" placeholder="I'm interested in..." />
                        </div>
                        <button type="submit" className="w-full rounded-md bg-primary px-4 py-3 font-medium text-white hover:bg-primary/90">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
