import Image from 'next/image'

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight">О Kimchi Motors</h1>
                    <p className="text-lg text-muted-foreground">
                        Добро пожаловать в Kimchi Motors — ваш премиальный пункт назначения для роскошных и динамичных авто.
                        Мы работаем больше десяти лет, объединяя страсть к совершенству с безупречным сервисом.
                    </p>
                    <p className="text-muted-foreground">
                        Наша миссия проста: дарить непревзойдённый опыт покупки. Мы тщательно отбираем автомобили, чтобы каждая машина
                        соответствовала нашим строгим стандартам качества, мощности и стиля. Нужен спортивный купе, семейный SUV
                        или представительский седан — найдём вариант именно для вас.
                    </p>
                    <p className="text-muted-foreground">
                        В Kimchi Motors мы ценим прозрачность, честность и заботу о клиентах. Наша команда экспертов помогает подобрать
                        автомобиль под ваш образ жизни и бюджет.
                    </p>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                    {/* Placeholder for showroom image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-muted-foreground">
                        Здесь будет фото шоурума
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <h2 className="mb-10 text-center text-3xl font-bold">Почему выбирают нас</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-8 text-center">
                        <h3 className="mb-3 text-xl font-semibold">Премиальный отбор</h3>
                        <p className="text-muted-foreground">
                            Автомобили лучших мировых брендов с тщательной проверкой качества и надёжности.
                        </p>
                    </div>
                    <div className="rounded-lg border bg-card p-8 text-center">
                        <h3 className="mb-3 text-xl font-semibold">Экспертная команда</h3>
                        <p className="text-muted-foreground">
                            Автоэксперты сопровождают вас на каждом этапе и дают честные рекомендации.
                        </p>
                    </div>
                    <div className="rounded-lg border bg-card p-8 text-center">
                        <h3 className="mb-3 text-xl font-semibold">Поддержка после покупки</h3>
                        <p className="text-muted-foreground">
                            Мы поддерживаем клиентов гарантийными программами и сервисом после покупки.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
