import { Globe, File, PanelsTopLeft } from 'lucide-react'

const steps = [
  {
    icon: <Globe className="w-12 h-12 text-blue-500" />,
    title: 'Изучите каталог',
    description:
      'Просматривайте наш обширный каталог автомобилей со всего мира. Используйте фильтры, чтобы быстро подобрать идеальную модель.',
  },
  {
    icon: <File className="w-12 h-12 text-blue-500" />,
    title: 'Отправьте заявку',
    description:
      'Нашли подходящий автомобиль? Оставьте заявку в защищённой форме — мы свяжемся с вами в течение 24 часов.',
  },
  {
    icon: <PanelsTopLeft className="w-12 h-12 text-blue-500" />,
    title: 'Получите автомобиль',
    description:
      'После одобрения организуем доставку до дверей или самовывоз из ближайшего партнёрского центра.',
  },
]

export function HowToBuy() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Как купить авто мечты
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              {step.icon}
              <h3 className="font-bold text-xl mt-4">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
