import { Globe, File, Window } from 'lucide-react'

const steps = [
  {
    icon: <Globe className="w-12 h-12 text-blue-500" />,
    title: 'Explore Our Inventory',
    description:
      'Browse our extensive inventory of cars from all over the world. Use our advanced search filters to find the perfect car for you.',
  },
  {
    icon: <File className="w-12 h-12 text-blue-500" />,
    title: 'Submit an Application',
    description:
      'Once you have found your dream car, submit an application through our secure online portal. We will review your application and get back to you within 24 hours.',
  },
  {
    icon: <Window className="w-12 h-12 text-blue-500" />,
    title: 'Receive Your Car',
    description:
      'After your application is approved, we will arrange for your car to be delivered to your doorstep. You can also choose to pick it up from one of our partner locations.',
  },
]

export function HowToBuy() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          How to Buy Your Dream Car
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
