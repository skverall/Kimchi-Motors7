'use client'

import { useState } from 'react'
import { createCar, updateCar } from '@/app/admin/cars/actions'
import Link from 'next/link'

// Helper to handle form submission with ID for update
export function CarForm({ car }: { car?: any }) {
    const isEdit = !!car

    // We need to wrap the server action to pass the ID if editing
    const action = async (formData: FormData) => {
        if (isEdit) {
            await updateCar(car.id, formData)
        } else {
            await createCar(formData)
        }
    }

    return (
        <form action={action} className="space-y-8 max-w-2xl">
            <div className="grid gap-6 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium">Make</label>
                    <input
                        name="make"
                        defaultValue={car?.make}
                        required
                        className="w-full rounded-md border bg-background px-3 py-2"
                        placeholder="Toyota"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium">Model</label>
                    <input
                        name="model"
                        defaultValue={car?.model}
                        required
                        className="w-full rounded-md border bg-background px-3 py-2"
                        placeholder="Camry"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium">Year</label>
                    <input
                        name="year"
                        type="number"
                        defaultValue={car?.year}
                        required
                        className="w-full rounded-md border bg-background px-3 py-2"
                        placeholder="2023"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium">Price ($)</label>
                    <input
                        name="price"
                        type="number"
                        defaultValue={car?.price}
                        required
                        className="w-full rounded-md border bg-background px-3 py-2"
                        placeholder="25000"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium">Mileage (km)</label>
                    <input
                        name="mileage"
                        type="number"
                        defaultValue={car?.mileage}
                        required
                        className="w-full rounded-md border bg-background px-3 py-2"
                        placeholder="10000"
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium">Condition</label>
                    <select
                        name="condition"
                        defaultValue={car?.condition || 'Used'}
                        className="w-full rounded-md border bg-background px-3 py-2"
                    >
                        <option value="New">New</option>
                        <option value="Used">Used</option>
                    </select>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium">Status</label>
                    <select
                        name="status"
                        defaultValue={car?.status || 'available'}
                        className="w-full rounded-md border bg-background px-3 py-2"
                    >
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Image URLs (comma separated)</label>
                <textarea
                    name="images"
                    defaultValue={car?.images?.join(', ')}
                    className="h-20 w-full rounded-md border bg-background px-3 py-2"
                    placeholder="https://example.com/car1.jpg, https://example.com/car2.jpg"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                    For this demo, please paste direct image URLs. In a full version, we would implement file upload.
                </p>
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium">Description</label>
                <textarea
                    name="description"
                    defaultValue={car?.description}
                    className="h-32 w-full rounded-md border bg-background px-3 py-2"
                    placeholder="Enter car description..."
                />
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="is_featured"
                    id="is_featured"
                    defaultChecked={car?.is_featured}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="is_featured" className="text-sm font-medium">
                    Mark as Featured (Most Wanted)
                </label>
            </div>

            <div className="flex gap-4">
                <Link
                    href="/admin/cars"
                    className="flex-1 rounded-md border px-4 py-2 text-center text-sm font-medium hover:bg-muted"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="flex-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
                >
                    {isEdit ? 'Update Car' : 'Create Car'}
                </button>
            </div>
        </form>
    )
}
