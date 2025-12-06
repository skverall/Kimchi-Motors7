
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

async function testAddCar() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log("URL:", supabaseUrl ? "Found" : "Missing");
    console.log("Key:", supabaseServiceKey ? "Found" : "Missing");

    if (!supabaseUrl || !supabaseServiceKey) {
        console.error("Missing credentials in environment variables.");
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const testCar = {
        make: "TestMake",
        model: "TestModel",
        year: 2024,
        price: 50000,
        price_aed: 180000, // Testing the field causing issues
        mileage: 100,
        fuel: "Petrol",
        transmission: "Automatic",
        image: "https://example.com/car.jpg",
        type: "Sedan",
        description: "Test car from script",
        featured: false,
        mostWanted: false,
        status: "Available"
    };

    console.log("Attempting to insert car:", testCar);

    const { data, error } = await supabase
        .from("cars")
        .insert(testCar)
        .select()
        .single();

    if (error) {
        console.error("FATAL ERROR inserting car:");
        console.error(JSON.stringify(error, null, 2));
    } else {
        console.log("SUCCESS! Car inserted:", data.id);
        // Cleanup
        await supabase.from("cars").delete().eq("id", data.id);
        console.log("Cleaned up test car.");
    }
}

testAddCar().catch(console.error);
