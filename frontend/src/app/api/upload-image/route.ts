import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { getServiceSupabase } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const MAX_DIMENSION = 1920;
const OUTPUT_QUALITY = 82;

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

export async function POST(request: NextRequest) {
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

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Resize and convert to webp to keep uploads lightweight and consistent
    const optimizedBuffer = await sharp(inputBuffer)
      .rotate()
      .resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .toFormat("webp", { quality: OUTPUT_QUALITY, effort: 4 })
      .toBuffer();

    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;
    const filePath = `cars/${fileName}`;

    const { data, error } = await supabase.storage
      .from("car-images")
      .upload(filePath, optimizedBuffer, {
        contentType: "image/webp",
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
