import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServiceSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase service key or URL is not configured");
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

let bucketInitialized = false;

async function ensureBucket(supabase: ReturnType<typeof getServiceSupabase>) {
  if (bucketInitialized) return;

  const { data: buckets, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error("Failed to list storage buckets", error);
    throw error;
  }

  const exists = buckets?.some((b) => b.name === "car-images");

  if (!exists) {
    const { error: createError } = await supabase.storage.createBucket(
      "car-images",
      { public: true }
    );

    if (createError) {
      console.error("Failed to create storage bucket", createError);
      throw createError;
    }
  }

  bucketInitialized = true;
}

export async function POST(request: Request) {
  try {
    const supabase = getServiceSupabase();
    await ensureBucket(supabase);

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filePath = `cars/${fileName}`;

    const { data, error } = await supabase.storage
      .from("car-images")
      .upload(filePath, file, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });

    if (error || !data) {
      console.error("Error uploading image", error);
      return NextResponse.json(
        { error: error?.message ?? "Upload failed" },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("car-images")
      .getPublicUrl(data.path);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (error) {
    console.error("Unexpected error in upload-image route", error);
    return NextResponse.json(
      { error: "Unexpected error while uploading image" },
      { status: 500 }
    );
  }
}

