"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CarDetails } from "@/components/cars/CarDetails";
import type { CarItem } from "@/types/car";

export default function CarPage() {
    const params = useParams();
    const router = useRouter();
    const [car, setCar] = useState<CarItem | null>(null);
    const [relatedCars, setRelatedCars] = useState<CarItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCarAndRelated = async () => {
            try {
                // 1. Fetch Main Car
                const response = await fetch(`/api/cars/${params.id}`);
                if (!response.ok) {
                    throw new Error("Car not found");
                }
                const carData = await response.json();

                // Helper to enrich car data (same as in main page)
                const enrichCar = (c: any): CarItem => ({
                    ...c,
                    // Ensure defaults for optional fields if missing from DB
                    engine: c.engine || "3500 cc",
                    shipping: c.shipping || "By Sea Shipping",
                    status: c.status || "Available",
                    priceAed: c.price_aed || c.priceAed,
                    images: (c.images && c.images.length > 0) ? c.images : (c.image ? [c.image] : []),
                    // New columns map automatically if names match, but ensure snake_case -> camelCase if needed
                    exteriorColor: c.exterior_color || c.exteriorColor,
                    interiorColor: c.interior_color || c.interiorColor,
                    bodyCheck: c.body_check || c.bodyCheck,
                    // features is JSONB in DB, so it should come as object.
                    features: c.features || undefined
                });

                const mainCar = enrichCar(carData.car);
                setCar(mainCar);

                // 2. Fetch Related Cars (Fetch all and pick 4 random excluding current)
                const relatedResponse = await fetch("/api/cars");
                if (relatedResponse.ok) {
                    const relatedBody = await relatedResponse.json();
                    const allCars = (relatedBody.cars as any[] || []).map(enrichCar);

                    // Filter out current car
                    const otherCars = allCars.filter(c => String(c.id) !== String(mainCar.id));

                    // Simple logic: prefer same make, then random
                    const sameMake = otherCars.filter(c => c.make === mainCar.make);
                    const others = otherCars.filter(c => c.make !== mainCar.make);

                    // Combine and slice
                    const related = [...sameMake, ...others].slice(0, 4);
                    setRelatedCars(related);
                }

            } catch (err) {
                setError("Failed to load car details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchCarAndRelated();
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
                <p className="text-red-500 font-semibold">{error || "Car not found"}</p>
                <button
                    onClick={() => router.push("/")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <CarDetails
            car={car}
            relatedCars={relatedCars}
            onBack={() => router.back()}
        />
    );
}
