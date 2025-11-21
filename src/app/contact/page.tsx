import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight">Свяжитесь с нами</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Есть вопросы? Мы будем рады помочь.
                </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="rounded-xl border bg-card p-8">
                        <h2 className="mb-6 text-2xl font-semibold">Контакты</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="h-6 w-6 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-medium">Посетите шоурум</h3>
                                    <p className="text-muted-foreground">123 Motor City Drive, Dubai, UAE</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="h-6 w-6 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-medium">Позвоните нам</h3>
                                    <p className="text-muted-foreground">+971 50 123 4567</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="h-6 w-6 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-medium">Напишите нам</h3>
                                    <p className="text-muted-foreground">info@kimchimotors.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Clock className="h-6 w-6 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-medium">График работы</h3>
                                    <p className="text-muted-foreground">Пн–Сб: 9:00 — 21:00</p>
                                    <p className="text-muted-foreground">Воскресенье: выходной</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="aspect-video w-full rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                        Здесь будет карта локации
                    </div>
                </div>

                {/* Contact Form */}
                <div className="rounded-xl border bg-card p-8">
                    <h2 className="mb-6 text-2xl font-semibold">Напишите нам</h2>
                    <form className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium">Имя</label>
                                <input type="text" className="w-full rounded-md border bg-background px-3 py-2" placeholder="Иван" />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium">Фамилия</label>
                                <input type="text" className="w-full rounded-md border bg-background px-3 py-2" placeholder="Иванов" />
                            </div>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Email</label>
                            <input type="email" className="w-full rounded-md border bg-background px-3 py-2" placeholder="ivan@example.com" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Телефон</label>
                            <input type="tel" className="w-full rounded-md border bg-background px-3 py-2" placeholder="+971 50 000 0000" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Сообщение</label>
                            <textarea className="h-32 w-full rounded-md border bg-background px-3 py-2" placeholder="Мне интересно..." />
                        </div>
                        <button type="submit" className="w-full rounded-md bg-primary px-4 py-3 font-medium text-white hover:bg-primary/90">
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
