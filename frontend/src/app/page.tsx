"use client";

import { useState } from "react";
import { ArrowRight, Car } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection, { SearchParams } from "@/components/sections/HeroSection";
import { CarCard } from "@/components/cars/CarCard";
import { CarDetails } from "@/components/cars/CarDetails";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { FAQ } from "@/components/sections/FAQ";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { LocationModal } from "@/components/modals/LocationModal";
import { MostWantedMarquee } from "@/components/sections/MostWantedMarquee";
import { BRANDS } from "@/constants/brands";
import { INITIAL_CARS } from "@/constants/initialCars";

export default function Home() {
  const [page, setPage] = useState<"home" | "listing" | "detail" | "admin">("home");
  const [cars] = useState(INITIAL_CARS);
  const [filteredCars, setFilteredCars] = useState<typeof INITIAL_CARS>(INITIAL_CARS);
  const [selectedCar, setSelectedCar] = useState<(typeof INITIAL_CARS)[number] | null>(null);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);

  const handleNavigate = (target: string) => {
    if (target === "contact") {
      setLocationModalOpen(true);
      return;
    }
    window.scrollTo(0, 0);
    setPage(target as typeof page);
    if (target !== "detail") setSelectedCar(null);
  };

  const handleCarClick = (car: (typeof INITIAL_CARS)[number]) => {
    setSelectedCar(car);
    setPage("detail");
    window.scrollTo(0, 0);
  };

  const handleSearch = (params: SearchParams) => {
    let result = cars;
    if (params.make) {
      result = result.filter((c) => c.make === params.make);
    }
    if (params.maxPrice) {
      const max = parseInt(params.maxPrice, 10);
      if (!Number.isNaN(max)) {
        result = result.filter((c) => c.price <= max);
      }
    }
    setFilteredCars(result);
    setPage("listing");
    window.scrollTo(0, 0);
  };

  if (page === "detail" && selectedCar) {
    return (
      <>
        <CarDetails car={selectedCar} onBack={() => setPage("listing")} />
        <FloatingWhatsApp />
        <LocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setLocationModalOpen(false)}
        />
        <Footer onOpenLocation={() => setLocationModalOpen(true)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header onNavigate={handleNavigate} page={page} />

      {page === "home" && (
        <>
          <HeroSection onSearch={handleSearch} />

          {/* Brands grid */}
          <section className="py-16 container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Our Brands</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {BRANDS.map((brand) => (
                <div
                  key={brand.name}
                  className="border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-center bg-white/80 shadow-sm"
                >
                  <span className="text-sm font-semibold text-slate-700">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Most Wanted Marquee */}
          <MostWantedMarquee
            cars={cars.filter((c) => c.mostWanted)}
            onClick={handleCarClick}
          />

          {/* Featured Arrivals */}
          <section className="py-20 container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Arrivals</h2>
                <p className="text-slate-500">
                  Fresh from the port to our showroom.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleNavigate("listing")}
                className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
              >
                View All Inventory <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {cars
                .filter((c) => c.featured)
                .slice(0, 4)
                .map((car, index) => (
                  <CarCard
                    key={`${car.make}-${car.model}-${index}`}
                    car={car}
                    onClick={handleCarClick}
                  />
                ))}
            </div>
          </section>

          <HowToBuy />
          <FAQ />
        </>
      )}

      {page === "listing" && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
            {/* Sidebar filters */}
            <aside className="w-full md:w-64 space-y-4">
              <h2 className="text-xl font-bold mb-2">Filter</h2>
              <div>
                <label className="text-xs text-slate-500 font-semibold ml-1">
                  Brand
                </label>
                <select
                  aria-label="Filter by brand"
                  className="mt-1 w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm"
                  defaultValue=""
                  onChange={(e) =>
                    handleSearch({ make: e.target.value, maxPrice: "", model: "" })
                  }
                >
                  <option value="">All brands</option>
                  {BRANDS.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            </aside>

            {/* Inventory grid */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-6">
                Inventory ({filteredCars.length})
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredCars.map((car, index) => (
                  <CarCard
                    key={`${car.make}-${car.model}-${index}`}
                    car={car}
                    onClick={handleCarClick}
                  />
                ))}
              </div>
              {filteredCars.length === 0 && (
                <div className="col-span-3 text-center py-20 text-slate-400">
                  <Car className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  No vehicles found matching your criteria.
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <FloatingWhatsApp />
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setLocationModalOpen(false)}
      />
      <Footer onOpenLocation={() => setLocationModalOpen(true)} />
    </div>
  );
}
