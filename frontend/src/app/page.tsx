"use client";

import { useEffect, useState } from "react";
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

import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import type { CarItem } from "@/components/cars/CarCard";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [page, setPage] = useState<"home" | "listing" | "detail" | "admin" | "admin-dashboard">("home");
  const [cars, setCars] = useState<CarItem[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sync page with URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view");
    if (view && ["home", "listing", "detail", "admin", "admin-dashboard"].includes(view)) {
      setPage(view as any);
    }
  }, []);

  // Update URL when page changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("view") !== page) {
      url.searchParams.set("view", page);
      window.history.pushState({}, "", url);
    }
  }, [page]);

  // Load cars from Supabase on mount
  useEffect(() => {
    const loadCars = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .order("id", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          setCars(data as CarItem[]);
          setFilteredCars(data as CarItem[]);
        } else {
          // If table is empty, seed with INITIAL_CARS
          const { error: seedError } = await supabase
            .from("cars")
            .insert(INITIAL_CARS);

          if (seedError) throw seedError;

          const { data: seeded } = await supabase
            .from("cars")
            .select("*")
            .order("id", { ascending: false });

          if (seeded) {
            setCars(seeded as CarItem[]);
            setFilteredCars(seeded as CarItem[]);
          }
        }
      } catch (err) {
        console.error("Error loading cars from Supabase", err);
        setError("Failed to load cars. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCars();
  }, []);


  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);
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

  // Admin Handlers
  const handleAddCar = async (newCar: Omit<CarItem, "id">) => {
    const { data, error } = await supabase
      .from("cars")
      .insert(newCar)
      .select("*")
      .single();

    if (error) {
      console.error("Error adding car", error);
      return;
    }

    if (data) {
      const carWithId = data as CarItem;
      setCars([carWithId, ...cars]);
      setFilteredCars([carWithId, ...cars]);
    }
  };

  const handleDeleteCar = async (id: string) => {
    const numericId = Number(id);
    const { error } = await supabase.from("cars").delete().eq("id", numericId);

    if (error) {
      console.error("Error deleting car", error);
      return;
    }

    const updated = cars.filter((c) => String(c.id) !== String(id));
    setCars(updated);
    setFilteredCars(updated);
  };

  const handleUpdateCar = async (id: string, updates: Partial<CarItem>) => {
    const numericId = Number(id);
    const { data, error } = await supabase
      .from("cars")
      .update(updates)
      .eq("id", numericId)
      .select("*")
      .single();

    if (error) {
      console.error("Error updating car", error);
      return;
    }

    if (data) {
      const updatedCar = data as CarItem;
      const updated = cars.map((c) =>
        String(c.id) === String(id) ? { ...c, ...updatedCar } : c
      );
      setCars(updated);
      setFilteredCars(updated);
    }
  };

  if (page === "admin") {
    return (
      <AdminLogin
        onLogin={() => setPage("admin-dashboard")}
        onBack={() => setPage("home")}
      />
    );
  }

  if (page === "admin-dashboard") {
    return (
      <AdminDashboard
        cars={cars}
        onAdd={handleAddCar}
        onDelete={handleDeleteCar}
        onUpdate={handleUpdateCar}
        onLogout={() => setPage("home")}
      />
    );
  }

  if (page === "detail" && selectedCar) {
    return (
      <>
        <CarDetails car={selectedCar} onBack={() => setPage("listing")} />
        <FloatingWhatsApp />
        <LocationModal
          isOpen={isLocationModalOpen}
          onClose={() => setLocationModalOpen(false)}
        />
        <Footer
          onOpenLocation={() => setLocationModalOpen(true)}
          onNavigate={handleNavigate}
        />
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
      <Footer
        onOpenLocation={() => setLocationModalOpen(true)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
