
import fs from 'fs';
import path from 'path';
import { createClient } from "@supabase/supabase-js";

// Manually load env
try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                process.env[match[1]] = match[2].replace(/^"(.*)"$/, '$1');
            }
        });
    }
} catch (e) {
    console.warn("Could not read .env.local", e);
}

async function testImages() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        console.error("Missing credentials.");
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const testCar = {
        make: "ImageTest",
        model: "Multi",
        year: 2025,
        price: 10000,
        price_aed: 36700,
        mileage: 100,
        fuel: "Petrol",
        transmission: "Automatic",
        image: "https://example.com/main.jpg",
        images: ["https://example.com/main.jpg", "https://example.com/side.jpg", "https://example.com/back.jpg"],
        type: "SUV",
        description: "Multi image test",
        status: "Available"
    };

    console.log("Inserting car with images...");

    const { data, error } = await supabase
        .from("cars")
        .insert(testCar)
        .select()
        .single();

    if (error) {
        console.error("Error inserting:", error);
        process.exit(1);
    }

    console.log("Inserted ID:", data.id);
    console.log("Returned Images:", data.images);

    if (!Array.isArray(data.images) || data.images.length !== 3) {
        console.error("FAILED to save images correctly!");
    } else {
        console.log("SUCCESS: Images saved correctly.");
    }

    // Cleanup
    await supabase.from("cars").delete().eq("id", data.id);
    console.log("Cleaned up.");
}

testImages().catch(console.error);
