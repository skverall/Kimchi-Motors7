"use client"
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

const images = [
  '/images/porche 911.png',
  '/images/bmw 7 series.jpeg',
  '/images/rollc royce.jpeg',
]

export function Hero() {
  const [emblaRef] = useEmblaCarousel()

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((src, index) => (
            <div className="relative flex-[0_0_100%] h-full" key={index}>
              <Image
                src={src}
                alt={`Carousel image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="brightness-50"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Find Your Dream Car</h1>
        <p className="mt-4 text-lg md:text-2xl">
          The best cars from South Korea at the best prices
        </p>
        <button className="mt-8 px-8 py-3 bg-white text-black font-semibold rounded-lg">
          Explore Inventory
        </button>
      </div>
    </section>
  )
}
