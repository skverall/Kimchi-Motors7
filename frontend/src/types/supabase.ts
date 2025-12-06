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
                    price_aed: number | null
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
                    price_aed?: number | null
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
                    price_aed?: number | null
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
            Views: {
                [_ in never]: never
            }
            Functions: {
                [_ in never]: never
            }
            Enums: {
                [_ in never]: never
            }
            CompositeTypes: {
                [_ in never]: never
            }
        }
    }
}
