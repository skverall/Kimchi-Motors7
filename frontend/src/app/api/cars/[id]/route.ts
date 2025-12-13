import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabaseAdmin";
import { assertAdminRequest } from "@/lib/serverAuth";

function parseId(rawId: string) {
  const id = Number(rawId);
  if (Number.isNaN(id)) {
    throw new Error("Invalid id");
  }
  return id;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Public endpoint
    // const auth = await assertAdminRequest(request);
    // if (!auth.ok) return auth.response;

    const { id: rawId } = await context.params;
    const id = parseId(rawId);
    const supabase = getServiceSupabase();

    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return NextResponse.json(
      { car: data },
      {
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch car", error);
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await assertAdminRequest(request);
    if (!auth.ok) return auth.response;

    const { id: rawId } = await context.params;
    const id = parseId(rawId);
    const updates = await request.json();
    const supabase = getServiceSupabase();

    // Transform camelCase from frontend to snake_case for DB
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dbUpdates: Record<string, any> = {};

    // Copy known fields with proper mapping
    if (updates.make !== undefined) dbUpdates.make = updates.make;
    if (updates.model !== undefined) dbUpdates.model = updates.model;
    if (updates.year !== undefined) dbUpdates.year = updates.year;
    if (updates.price !== undefined) dbUpdates.price = updates.price;
    if (updates.priceAed !== undefined) dbUpdates.price_aed = updates.priceAed;
    if (updates.price_aed !== undefined) dbUpdates.price_aed = updates.price_aed;
    if (updates.mileage !== undefined) dbUpdates.mileage = updates.mileage;
    if (updates.fuel !== undefined) dbUpdates.fuel = updates.fuel;
    if (updates.transmission !== undefined) dbUpdates.transmission = updates.transmission;
    if (updates.image !== undefined) dbUpdates.image = updates.image;
    if (updates.images !== undefined) dbUpdates.images = updates.images;
    if (updates.type !== undefined) dbUpdates.type = updates.type;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.featured !== undefined) dbUpdates.featured = updates.featured;
    if (updates.mostWanted !== undefined) dbUpdates.mostWanted = updates.mostWanted;
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.youtubeUrl !== undefined) dbUpdates.youtube_url = updates.youtubeUrl;
    if (updates.chassis !== undefined) dbUpdates.chassis = updates.chassis;
    if (updates.engine !== undefined) dbUpdates.engine = updates.engine;
    if (updates.exteriorColor !== undefined) dbUpdates.exterior_color = updates.exteriorColor;
    if (updates.interiorColor !== undefined) dbUpdates.interior_color = updates.interiorColor;
    if (updates.bodyCheck !== undefined) dbUpdates.body_check = updates.bodyCheck;
    if (updates.features !== undefined) dbUpdates.features = updates.features;

    const { data, error } = await supabase
      .from("cars")
      // @ts-expect-error - Supabase types are fighting us here, but runtime is fine
      .update(dbUpdates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      throw error;
    }

    return NextResponse.json({ car: data });
  } catch (error) {
    console.error("Failed to update car", error);
    return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await assertAdminRequest(request);
    if (!auth.ok) return auth.response;

    const { id: rawId } = await context.params;
    const id = parseId(rawId);
    const supabase = getServiceSupabase();
    const { error } = await supabase.from("cars").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete car", error);
    return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
  }
}
