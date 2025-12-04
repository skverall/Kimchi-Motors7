"use client";


import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { PageName } from "@/components/layout/Header";
import HeroSection, { SearchParams } from "@/components/sections/HeroSection";
import { CarCard } from "@/components/cars/CarCard";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { FAQ } from "@/components/sections/FAQ";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ShowroomsSection } from "@/components/sections/ShowroomsSection";
import { ContactPageSection } from "@/components/sections/ContactPageSection";
import { MostWantedMarquee } from "@/components/sections/MostWantedMarquee";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { INITIAL_CARS } from "@/constants/initialCars";
import { InventorySection, type InventoryFilters } from "@/components/sections/InventorySection";
import { supabase } from "@/lib/supabaseClient";

import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import type { CarItem } from "@/types/car";

const buildSeedCars = () => INITIAL_CARS.map((car, index) => ({ ...car, id: `seed-${index}` }));

export default function Home() {
  const [page, setPage] = useState<PageName>("home");
  const [cars, setCars] = useState<CarItem[]>(() => buildSeedCars());

  const [inventoryFilters, setInventoryFilters] = useState<InventoryFilters | undefined>(undefined);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

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

  // Track Supabase auth session
  useEffect(() => {
    let isActive = true;
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isActive) return;

      const token = data.session?.access_token ?? null;
      setAccessToken(token);
      setIsAuthenticated(!!token);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const token = session?.access_token ?? null;
      setAccessToken(token);
      setIsAuthenticated(!!token);
      if (!session) {
        setPage("home");
        setCars(buildSeedCars());
        if (typeof window !== "undefined") {
          localStorage.removeItem("km_cached_cars_v2");
        }
      }
    });

    initAuth();

    return () => {
      isActive = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  const persistCars = useCallback((nextCars: CarItem[]) => {
    setCars(nextCars);
    if (typeof window !== "undefined") {
      if (isAuthenticated) {
        localStorage.setItem("km_cached_cars_v2", JSON.stringify(nextCars));
      } else {
        localStorage.removeItem("km_cached_cars_v2");
      }
    }
  }, [isAuthenticated]);

  // Load cars from Supabase via server API when authenticated
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("km_cached_cars_v2");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length) {
            setCars(parsed);
          }
        } catch (err) {
          console.warn("Failed to parse cached cars", err);
        }
      }
    }

    const loadCars = async () => {
      // Allow public access to cars
      // if (!accessToken) {
      //   setError("Login to view live inventory data. Showing demo cars.");
      //   setIsSyncing(false);
      //   return;
      // }

      try {
        setIsSyncing(true);
        setError(null);

        const headers: HeadersInit = { "Content-Type": "application/json" };
        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
        }

        const response = await fetch("/api/cars", {
          cache: "no-store",
          headers,
        });
        const body = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(body?.error || "Failed to load cars");
        }

        const fetchedCars = (body?.cars as CarItem[]) || [];

        // Inject missing fields for existing data
        const enrichedCars = fetchedCars.map((car) => ({
          ...car,
          engine: car.engine || "3500 cc",
          shipping: car.shipping || "By Sea Shipping",
          status: car.status || "Available",
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
  }, [accessToken, persistCars]);


  const router = useRouter();

  const handleNavigate = (target: PageName) => {
    window.scrollTo(0, 0);
    setPage(target as typeof page);
  };

  const handleCarClick = (car: CarItem) => {
    // Navigate to the separate subpage
    router.push(`/inventory/${car.id}`);
  };

  const handleSearch = (params: SearchParams) => {
    const filters: InventoryFilters = {
      make: params.make,
      model: params.model,
    };

    // Parse Price Range
    if (params.priceRange) {
      if (params.priceRange === "Under $50,000") {
        filters.maxPrice = "50000";
      } else if (params.priceRange === "$50,000 - $100,000") {
        filters.minPrice = "50000";
        filters.maxPrice = "100000";
      } else if (params.priceRange === "$100,000 - $200,000") {
        filters.minPrice = "100000";
        filters.maxPrice = "200000";
      } else if (params.priceRange === "$200,000 - $500,000") {
        filters.minPrice = "200000";
        filters.maxPrice = "500000";
      } else if (params.priceRange === "$500,000+") {
        filters.minPrice = "500000";
      }
    }

    // Parse Year
    if (params.year) {
      if (params.year === "Before 2015") {
        filters.maxYear = "2014";
      } else {
        filters.minYear = params.year;
        filters.maxYear = params.year;
      }
    }

    setInventoryFilters(filters);
    setPage("listing");
    window.scrollTo(0, 0);
  };

  // Admin Handlers
  const handleAddCar = async (newCar: Omit<CarItem, "id">) => {
    try {
      if (!accessToken) {
        setError("You must be logged in to add a car.");
        return;
      }

      const response = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
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
      if (!accessToken) {
        setError("You must be logged in to delete a car.");
        return;
      }

      const response = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
      });
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
      if (!accessToken) {
        setError("You must be logged in to update a car.");
        return;
      }

      const response = await fetch(`/api/cars/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAccessToken(null);
    setIsAuthenticated(false);
    setCars(buildSeedCars());
    if (typeof window !== "undefined") {
      localStorage.removeItem("km_cached_cars_v2");
    }
    handleNavigate("home");
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
        <InventorySection
          cars={cars}
          onCarClick={handleCarClick}
          initialFilters={inventoryFilters}
          // Force re-mount when filters change to reset state
          key={JSON.stringify(inventoryFilters)}
        />
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
          authToken={accessToken}
          onLogout={handleLogout}
        />
      )}

      <FloatingWhatsApp />
      <Footer
        onNavigate={handleNavigate}
      />
    </main>
  );
}
