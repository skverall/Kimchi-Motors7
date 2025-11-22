"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Car } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { PageName } from "@/components/layout/Header";
import HeroSection, { SearchParams } from "@/components/sections/HeroSection";
import { CarCard } from "@/components/cars/CarCard";
import { CarDetails } from "@/components/cars/CarDetails";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { FAQ } from "@/components/sections/FAQ";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ShowroomsSection } from "@/components/sections/ShowroomsSection";
import { ContactPageSection } from "@/components/sections/ContactPageSection";
import { MostWantedMarquee } from "@/components/sections/MostWantedMarquee";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { BRANDS } from "@/constants/brands";
import { INITIAL_CARS } from "@/constants/initialCars";

import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import type { CarItem } from "@/types/car";

export default function Home() {
  const [page, setPage] = useState<PageName>("home");
  const [cars, setCars] = useState<CarItem[]>(() =>
    INITIAL_CARS.map((car, index) => ({ ...car, id: `seed-${index}` }))
  );
  const [filteredCars, setFilteredCars] = useState<CarItem[]>(() =>
    INITIAL_CARS.map((car, index) => ({ ...car, id: `seed-${index}` }))
  );
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync page with URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get("view");
    if (view && ["home", "listing", "detail", "admin", "admin-dashboard", "contact"].includes(view)) {
      setPage(view as typeof page);
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

  const persistCars = (nextCars: CarItem[]) => {
    setCars(nextCars);
    setFilteredCars(nextCars);
    if (typeof window !== "undefined") {
      localStorage.setItem("km_cached_cars_v2", JSON.stringify(nextCars));
    }
  };

  // Load cars from Supabase via server API on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("km_cached_cars_v2");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length) {
            setCars(parsed);
            setFilteredCars(parsed);
          }
        } catch (err) {
          console.warn("Failed to parse cached cars", err);
        }
      }
    }

    const loadCars = async () => {
      try {
        setIsSyncing(true);
        setError(null);

        const response = await fetch("/api/cars", { cache: "no-store" });
        const body = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(body?.error || "Failed to load cars");
        }

        const fetchedCars = (body?.cars as CarItem[]) || [];

        // Inject missing fields for existing data
        const enrichedCars = fetchedCars.map(car => ({
          ...car,
          engine: car.engine || "3500 cc",
          shipping: car.shipping || "By Sea Shipping",
          status: car.status || "Available"
        }));

        persistCars(enrichedCars);
      } catch (err) {
        console.error("Error loading cars from Supabase", err);
        setError("Failed to load cars. Please try again later.");
      } finally {
        setIsSyncing(false);
      }
    };

    loadCars();
  }, []);


  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);

  const handleNavigate = (target: PageName) => {
    window.scrollTo(0, 0);
    setPage(target as typeof page);
    if (target !== "detail") setSelectedCar(null);
  };

  const handleCarClick = (car: CarItem) => {
    setSelectedCar(car);
    setPage("detail");
    window.scrollTo(0, 0);
  };

  const handleSearch = (params: SearchParams) => {
    let result = cars;

    // Filter by Make
    if (params.make) {
      result = result.filter((c) => c.make === params.make);
    }

    // Filter by Model
    if (params.model) {
      result = result.filter((c) => c.model === params.model);
    }

    // Filter by Price Range
    if (params.priceRange) {
      const price = params.priceRange;
      if (price === "Under $50,000") {
        result = result.filter((c) => c.price < 50000);
      } else if (price === "$50,000 - $100,000") {
        result = result.filter((c) => c.price >= 50000 && c.price <= 100000);
      } else if (price === "$100,000 - $200,000") {
        result = result.filter((c) => c.price >= 100000 && c.price <= 200000);
      } else if (price === "$200,000 - $500,000") {
        result = result.filter((c) => c.price >= 200000 && c.price <= 500000);
      } else if (price === "$500,000+") {
        result = result.filter((c) => c.price > 500000);
      }
    }

    // Filter by Year
    if (params.year) {
      if (params.year === "Before 2015") {
        result = result.filter((c) => c.year < 2015);
      } else {
        const year = parseInt(params.year);
        if (!isNaN(year)) {
          result = result.filter((c) => c.year === year);
        }
      }
    }

    setFilteredCars(result);
    setPage("listing");
    window.scrollTo(0, 0);
  };

  // Admin Handlers
  const handleAddCar = async (newCar: Omit<CarItem, "id">) => {
    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok || !body?.car) {
        throw new Error(body?.error || "Failed to add car");
      }

      const carWithId = body.car as CarItem;
      persistCars([carWithId, ...cars]);
    } catch (err) {
      console.error("Error adding car", err);
      setError("Failed to add car. Please try again later.");
    }
  };

  const handleDeleteCar = async (id: string) => {
    try {
      const response = await fetch(`/api/cars/${id}`, { method: "DELETE" });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(body?.error || "Failed to delete car");
      }

      const updated = cars.filter((c) => String(c.id) !== String(id));
      persistCars(updated);
    } catch (err) {
      console.error("Error deleting car", err);
      setError("Failed to delete car. Please try again later.");
    }
  };

  const handleUpdateCar = async (id: string, updates: Partial<CarItem>) => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok || !body?.car) {
        throw new Error(body?.error || "Failed to update car");
      }

      const updatedCar = body.car as CarItem;
      const updated = cars.map((c) =>
        String(c.id) === String(id)
          ? {
            ...c,
            ...updatedCar,
            imageVersion: updates.image ? Date.now() : c.imageVersion,
          }
          : c
      );
      persistCars(updated);
    } catch (err) {
      console.error("Error updating car", err);
      setError("Failed to update car. Please try again later.");
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      <Header onNavigate={handleNavigate} page={page} />
      {isSyncing && (
        <div className="bg-blue-50 text-blue-700 border border-blue-100 px-4 py-3 text-sm text-center">
          Syncing latest inventory...
        </div>
      )}
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-100 px-4 py-3 text-sm text-center">
          {error}
        </div>
      )}

      {page === "home" && (
        <>
          <HeroSection onSearch={handleSearch} />
          <div id="brands-section">
            <div id="brands-section">
              <BrandsSection />
            </div>
          </div>

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
                    handleSearch({ make: e.target.value, model: "" })
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

      {page === "showrooms" && <ShowroomsSection />}
      {page === "contact" && <ContactPageSection />}

      {page === "admin" && (
        <AdminLogin
          onLogin={() => handleNavigate("admin-dashboard")}
          onBack={() => handleNavigate("home")}
        />
      )}

      {page === "admin-dashboard" && (
        <AdminDashboard
          cars={cars}
          onAdd={handleAddCar}
          onDelete={handleDeleteCar}
          onUpdate={handleUpdateCar}
          onLogout={() => handleNavigate("home")}
        />
      )}

      {page === "detail" && selectedCar && (
        <CarDetails
          car={selectedCar}
          onBack={() => handleNavigate("listing")}
        />
      )}

      <FloatingWhatsApp />
      <Footer
        onNavigate={handleNavigate}
      />
    </main>
  );
}
