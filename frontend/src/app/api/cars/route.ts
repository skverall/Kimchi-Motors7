import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabaseAdmin";
import { INITIAL_CARS } from "@/constants/initialCars";
import { assertAdminRequest } from "@/lib/serverAuth";
import type { Database } from "@/types/supabase";

export async function GET(request: Request) {
  try {
    const auth = await assertAdminRequest(request);
    if (!auth.ok) return auth.response;

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
        .insert(INITIAL_CARS as Database["public"]["Tables"]["cars"]["Insert"][]);
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
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
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

    const { data, error } = await supabase
      .from("cars")
      .insert(payload)
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({ car: data });
  } catch (error) {
    console.error("Failed to add car", error);
    return NextResponse.json({ error: "Failed to add car" }, { status: 500 });
  }
}
