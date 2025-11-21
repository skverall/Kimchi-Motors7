import Image from 'next/image'
import Link from 'next/link'

const featuredCars = [
  {
    name: 'Porsche 911',
    price: '$150,000',
    image: '/images/porche 911.png',
    id: '1',
  },
  {
    name: 'BMW 7 Series',
    price: '$120,000',
    image: '/images/bmw 7 series.jpeg',
    id: '2',
  },
  {
    name: 'Rolls Royce',
    price: '$300,000',
    image: '/images/rollc royce.jpeg',
    id: '3',
  },
]

export function FeaturedCars() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <Link href={`/inventory/${car.id}`} key={car.id}>
              <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={car.image}
                    alt={car.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xl">{car.name}</h3>
                  <p className="text-gray-600">{car.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
