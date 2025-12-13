"use client";


import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { PageName } from "@/components/layout/Header";
import HeroSection, { SearchParams } from "@/components/sections/HeroSection";
import { CarCard } from "@/components/cars/CarCard";
import { HowToBuy } from "@/components/sections/HowToBuy";
import { FAQ } from "@/components/sections/FAQ";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { MostWantedMarquee } from "@/components/sections/MostWantedMarquee";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { INITIAL_CARS } from "@/constants/initialCars";
import type { InventoryFilters } from "@/components/sections/InventorySection";

import type { CarItem } from "@/types/car";

const buildSeedCars = () => INITIAL_CARS.map((car, index) => ({ ...car, id: `seed-${index}` }));

let supabasePromise: Promise<typeof import("@/lib/supabaseClient")> | null = null;
const getSupabase = async () => {
  supabasePromise ??= import("@/lib/supabaseClient");
  const mod = await supabasePromise;
  return mod.supabase;
};

const InventorySection = dynamic(
  () => import("@/components/sections/InventorySection").then((mod) => mod.InventorySection),
  {
    loading: () => (
      <div className="py-16 text-center text-slate-500">Loading inventory…</div>
    ),
  }
);

const ShowroomsSection = dynamic(
  () => import("@/components/sections/ShowroomsSection").then((mod) => mod.ShowroomsSection),
  {
    loading: () => (
      <div className="py-16 text-center text-slate-500">Loading showrooms…</div>
    ),
  }
);

const ContactPageSection = dynamic(
  () => import("@/components/sections/ContactPageSection").then((mod) => mod.ContactPageSection),
  {
    loading: () => (
      <div className="py-16 text-center text-slate-500">Loading contact…</div>
    ),
  }
);

const AdminLogin = dynamic(
  () => import("@/components/admin/AdminLogin").then((mod) => mod.AdminLogin),
  {
    loading: () => (
      <div className="py-16 text-center text-slate-500">Loading admin…</div>
    ),
  }
);

const AdminDashboard = dynamic(
  () => import("@/components/admin/AdminDashboard").then((mod) => mod.AdminDashboard),
  {
    loading: () => (
      <div className="py-16 text-center text-slate-500">Loading dashboard…</div>
    ),
  }
);

const getInitialPage = (): PageName => {
  if (typeof window === "undefined") return "home";
  const params = new URLSearchParams(window.location.search);
  const view = params.get("view");
  if (view && ["home", "listing", "detail", "admin", "admin-dashboard", "contact", "showrooms"].includes(view)) {
    return view as PageName;
  }
  return "home";
};

export default function Home() {
  const [page, setPage] = useState<PageName>(getInitialPage);
  const [cars, setCars] = useState<CarItem[]>(() => buildSeedCars());

  const [inventoryFilters, setInventoryFilters] = useState<InventoryFilters | undefined>(undefined);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Update URL when page changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("view") !== page) {
      url.searchParams.set("view", page);
      window.history.pushState({}, "", url);
    }
  }, [page]);

  // Track Supabase auth session (lazy-loaded; only for admin views)
  useEffect(() => {
    if (page !== "admin" && page !== "admin-dashboard") return;

    let isActive = true;
    let unsubscribe: (() => void) | null = null;

    const initAuth = async () => {
      const supabase = await getSupabase();
      if (!isActive) return;

      const { data } = await supabase.auth.getSession();
      if (!isActive) return;

      const token = data.session?.access_token ?? null;
      setAccessToken(token);
      setIsAuthenticated(!!token);

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

      if (!isActive) {
        listener?.subscription.unsubscribe();
        return;
      }

      unsubscribe = () => listener?.subscription.unsubscribe();
    };

    initAuth();

    return () => {
      isActive = false;
      unsubscribe?.();
    };
  }, [page]);

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
          // Map DB snake_case to frontend camelCase if needed,
          // though Supabase JS client usually returns what's in DB.
          // If DB has price_aed, we need to ensure it maps to priceAed
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          priceAed: (car as any).price_aed || car.priceAed,
          // Ensure images array exists, fallback to legacy image if needed
          images: (car.images && car.images.length > 0) ? car.images : (car.image ? [car.image] : []),
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

  const handleBrandClick = (brandName: string) => {
    setInventoryFilters({ make: brandName });
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
        body: JSON.stringify({
          ...newCar,
          // Map frontend camelCase to DB snake_case
          price_aed: newCar.priceAed,
        }),
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
        body: JSON.stringify({
          ...updates,
          // Map frontend camelCase to DB snake_case if it exists in updates
          ...(updates.priceAed !== undefined && { price_aed: updates.priceAed }),
        }),
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
    const supabase = await getSupabase();
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
              <div id="brands-section">
                <BrandsSection onBrandClick={handleBrandClick} />
              </div>
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
                .slice(0, 12)
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
