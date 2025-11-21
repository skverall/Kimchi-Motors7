import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabaseAdmin";
import { INITIAL_CARS } from "@/constants/initialCars";

export async function GET() {
  try {
    const supabase = getServiceSupabase();

    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    let cars = data ?? [];

    if (cars.length === 0) {
      const { error: seedError } = await supabase.from("cars").insert(INITIAL_CARS);
      if (seedError) throw seedError;

      const { data: seeded, error: reloadError } = await supabase
        .from("cars")
        .select("*")
        .order("id", { ascending: false });

      if (reloadError) throw reloadError;
      cars = seeded ?? [];
    }

    return NextResponse.json({ cars });
  } catch (error) {
    console.error("Failed to load cars", error);
    return NextResponse.json({ error: "Failed to load cars" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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
