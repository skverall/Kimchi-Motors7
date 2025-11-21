import { Hero } from '@/components/sections/Hero'
import { Brands } from '@/components/sections/Brands'
import { FeaturedCars } from '@/components/sections/FeaturedCars'
import { HowToBuy } from '@/components/sections/HowToBuy'
import { FAQ } from '@/components/sections/FAQ'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Brands />
      <FeaturedCars />
      <HowToBuy />
      <FAQ />
    </div>
  )
}
