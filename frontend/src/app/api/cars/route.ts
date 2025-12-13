import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabaseAdmin";
import { INITIAL_CARS } from "@/constants/initialCars";
import { assertAdminRequest } from "@/lib/serverAuth";
import type { Database } from "@/types/supabase";

export async function GET(request: Request) {
  try {
    // Public endpoint, no auth required for GET
    // const auth = await assertAdminRequest(request);
    // if (!auth.ok) return auth.response;

    const supabase = getServiceSupabase();

    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    let cars = data ?? [];

    if (cars.length === 0) {
      // Note: In a real production app, auto-seeding might be dangerous.
      // Consider moving this to a dedicated seed script.
      // For now, we map INITIAL_CARS to match the DB schema if needed.
      const { error: seedError } = await supabase
        .from("cars")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .insert(INITIAL_CARS as any);
      if (seedError) throw seedError;

      const { data: seeded, error: reloadError } = await supabase
        .from("cars")
        .select("*")
        .order("id", { ascending: false });

      if (reloadError) throw reloadError;
      cars = seeded ?? [];
    }

    // Cache for 60 seconds, revalidate in background
    return NextResponse.json({ cars }, {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("Failed to load cars", error);
    return NextResponse.json({ error: "Failed to load cars" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = await assertAdminRequest(request);
    if (!auth.ok) return auth.response;

    const supabase = getServiceSupabase();
    const payload = await request.json();

    // Transform camelCase from frontend to snake_case for DB
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dbPayload: Record<string, any> = {
      make: payload.make,
      model: payload.model,
      year: payload.year,
      price: payload.price,
      price_aed: payload.priceAed ?? payload.price_aed ?? null,
      mileage: payload.mileage,
      fuel: payload.fuel,
      transmission: payload.transmission,
      image: payload.image,
      images: payload.images ?? [],
      type: payload.type,
      description: payload.description ?? null,
      featured: payload.featured ?? false,
      mostWanted: payload.mostWanted ?? false, // DB column is camelCase
      status: payload.status ?? "Available",
      youtube_url: payload.youtubeUrl ?? null,
      chassis: payload.chassis ?? null,
      engine: payload.engine ?? null,
      exterior_color: payload.exteriorColor ?? null,
      interior_color: payload.interiorColor ?? null,
      body_check: payload.bodyCheck ?? null,
      features: payload.features ?? null,
    };

    const { data, error } = await supabase
      .from("cars")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(dbPayload as any)
      .select("*")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    return NextResponse.json({ car: data });
  } catch (error) {
    console.error("Failed to add car", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to add car" },
      { status: 500 }
    );
  }
}
