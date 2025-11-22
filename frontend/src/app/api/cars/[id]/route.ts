import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabaseAdmin";

function parseId(rawId: string) {
  const id = Number(rawId);
  if (Number.isNaN(id)) {
    throw new Error("Invalid id");
  }
  return id;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await context.params;
    const id = parseId(rawId);
    const supabase = getServiceSupabase();

    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return NextResponse.json({ car: data });
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
    const { id: rawId } = await context.params;
    const id = parseId(rawId);
    const updates = await request.json();
    const supabase = getServiceSupabase();

    const { data, error } = await supabase
      .from("cars")
      // @ts-ignore - Supabase types are fighting us here, but runtime is fine
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({ car: data });
  } catch (error) {
    console.error("Failed to update car", error);
    return NextResponse.json({ error: "Failed to update car" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
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
