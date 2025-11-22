export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            cars: {
                Row: {
                    id: number
                    created_at: string
                    make: string
                    model: string
                    year: number
                    price: number
                    mileage: number
                    fuel: string
                    transmission: string
                    image: string | null
                    type: string
                    description: string | null
                    featured: boolean
                    most_wanted: boolean
                    engine: string | null
                    shipping: string | null
                    status: string | null
                    image_version: number | null
                }
                Insert: {
                    id?: number
                    created_at?: string
                    make: string
                    model: string
                    year: number
                    price: number
                    mileage: number
                    fuel: string
                    transmission: string
                    image?: string | null
                    type: string
                    description?: string | null
                    featured?: boolean
                    most_wanted?: boolean
                    engine?: string | null
                    shipping?: string | null
                    status?: string | null
                    image_version?: number | null
                }
                Update: {
                    id?: number
                    created_at?: string
                    make?: string
                    model?: string
                    year?: number
                    price?: number
                    mileage?: number
                    fuel?: string
                    transmission?: string
                    image?: string | null
                    type?: string
                    description?: string | null
                    featured?: boolean
                    most_wanted?: boolean
                    engine?: string | null
                    shipping?: string | null
                    status?: string | null
                    image_version?: number | null
                }
            }
        }
    }
}
