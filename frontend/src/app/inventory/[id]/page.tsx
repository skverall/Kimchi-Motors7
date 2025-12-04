"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CarDetails } from "@/components/cars/CarDetails";
import type { CarItem } from "@/types/car";
import { supabase } from "@/lib/supabaseClient";

export default function CarPage() {
    const params = useParams();
    const router = useRouter();
    const [car, setCar] = useState<CarItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                const token = data.session?.access_token;
                if (!token) {
                    setError("Please log in to view this vehicle.");
                    return;
                }

                const response = await fetch(`/api/cars/${params.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) {
                    throw new Error("Car not found");
                }
                const carData = await response.json();
                setCar(carData.car);
            } catch (err) {
                setError("Failed to load car details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchCar();
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
            onBack={() => router.back()}
        />
    );
}
