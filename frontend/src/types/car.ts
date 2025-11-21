export interface CarItem {
  id?: number | string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  image: string;
  type: string;
  description?: string;
  featured?: boolean;
  mostWanted?: boolean;
  // Optional client-only field to force image reloads after updates
  imageVersion?: number;
}
