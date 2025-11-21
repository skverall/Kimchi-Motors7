import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabaseAdmin";

function parseId(rawId: string) {
  const id = Number(rawId);
  if (Number.isNaN(id)) {
    throw new Error("Invalid id");
  }
  return id;
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseId(params.id);
    const updates = await request.json();
    const supabase = getServiceSupabase();

    const { data, error } = await supabase
      .from("cars")
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

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseId(params.id);
    const supabase = getServiceSupabase();
    const { error } = await supabase.from("cars").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete car", error);
    return NextResponse.json({ error: "Failed to delete car" }, { status: 500 });
  }
}
