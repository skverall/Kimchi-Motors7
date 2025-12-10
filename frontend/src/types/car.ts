export interface CarItem {
  id?: number | string;
  make: string;
  model: string;
  year: number;
  price: number;
  priceAed?: number; // Price in UAE Dirhams
  mileage: number;
  fuel: string;
  transmission: string;
  image: string;
  images?: string[];
  type: string;
  description?: string;
  featured?: boolean;
  mostWanted?: boolean;
  engine?: string; // e.g., "3500 cc"
  shipping?: string; // e.g., "By Sea Shipping"
  status?: "Available" | "Sold" | "In Transit";
  // Optional client-only field to force image reloads after updates
  imageVersion?: number;
  youtubeUrl?: string;
  youtube_url?: string;
  chassis?: string;
  exteriorColor?: string;
  interiorColor?: string;
  bodyCheck?: string;
  features?: {
    safety?: string[];
    multimedia?: string[];
    interior?: string[];
    exteriorLights?: string[];
    exterior?: string[];
    electrical?: string[];
    [key: string]: string[] | undefined;
  };
}

