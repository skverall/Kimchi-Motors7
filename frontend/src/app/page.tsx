"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection, { SearchParams } from "@/components/sections/HeroSection";
import { CarCard } from "@/components/cars/CarCard";
import { CarDetails } from "@/components/cars/CarDetails";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { FAQ } from "@/components/sections/FAQ";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { LocationModal } from "@/components/modals/LocationModal";
import { BRANDS } from "@/constants/brands";
import { INITIAL_CARS } from "@/constants/initialCars";

export default function Home() {
  const [page, setPage] = useState<string>("home");
  const [cars] = useState(INITIAL_CARS);
  const [selectedCar, setSelectedCar] = useState<typeof INITIAL_CARS[0] | null>(null);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);

  const handleNavigate = (target: string) => {
    if (target === "contact") {
      setLocationModalOpen(true);
      return;
    }
    window.scrollTo(0, 0);
    setPage(target);
    if (target !== "detail") setSelectedCar(null);
  };

  const handleCarClick = (car: typeof INITIAL_CARS[0]) => {
    setSelectedCar(car);
    setPage("detail");
    window.scrollTo(0, 0);
  };

  const handleSearch = (params: SearchParams) => {
    console.log("Search params", params);
    // фильтрацию и Supabase подключим позже
  };

  if (page === "detail" && selectedCar) {
    return (
      <>
        <CarDetails car={selectedCar} onBack={() => setPage("listing")} />
        <FloatingWhatsApp />
        <LocationModal isOpen={isLocationModalOpen} onClose={() => setLocationModalOpen(false)} />
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
          <div className="py-16 container mx-auto px-4">
            {/* Brands Grid 1:1 */}
          </div>
          {/* Здесь же позже добавим Marquee, Featured и т.п., как в main */}
          <HowToBuy />
          <FAQ />
        </>
      )}

      {/* placeholder для listing — позже подключим Supabase и фильтры */}

      <FloatingWhatsApp />
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setLocationModalOpen(false)} />
      <Footer onOpenLocation={() => setLocationModalOpen(true)} />
    </div>
  );
}
