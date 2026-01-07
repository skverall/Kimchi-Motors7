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
            visits: {
                Row: {
                    id: string
                    created_at: string
                    visitor_id: string
                    page: string | null
                    user_agent: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    visitor_id: string
                    page?: string | null
                    user_agent?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    visitor_id?: string
                    page?: string | null
                    user_agent?: string | null
                }
            }
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
                    chassis: string | null
                    exterior_color: string | null
                    interior_color: string | null
                    body_check: string | null
                    features: Json | null
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
                    chassis?: string | null
                    exterior_color?: string | null
                    interior_color?: string | null
                    body_check?: string | null
                    features?: Json | null
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
                    chassis?: string | null
                    exterior_color?: string | null
                    interior_color?: string | null
                    body_check?: string | null
                    features?: Json | null
                }
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
