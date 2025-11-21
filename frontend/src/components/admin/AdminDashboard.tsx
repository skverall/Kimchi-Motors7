"use client";

import { useState } from "react";
import type { CarItem } from "@/components/cars/CarCard";
import { Plus, Trash2, LogOut, Star, Zap, X, Pencil, Info } from "lucide-react";

interface AdminDashboardProps {
  cars: CarItem[];
  onAdd: (car: Omit<CarItem, "id">) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<CarItem>) => void;
  onLogout: () => void;
}

// Simple Tooltip Component
const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => (
  <div className="group relative flex items-center justify-center">
    {children}
    <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center whitespace-nowrap z-50">
      <div className="bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl">
        {content}
      </div>
      <div className="w-2 h-2 -mt-1 rotate-45 bg-slate-900"></div>
    </div>
  </div>
);

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  cars,
  onAdd,
  onDelete,
  onUpdate,
  onLogout,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialFormState = {
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuel: "Petrol",
    transmission: "Automatic",
    image: "",
    type: "Sedan",
    featured: false,
    mostWanted: false,
    description: "",
  };

  const [formData, setFormData] = useState<Partial<Omit<CarItem, "id">>>(initialFormState);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setUploadError(null);
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Upload failed");
      }

      const data = await res.json();
      if (data?.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      }
    } catch (error) {
      console.error("Image upload error", error);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };



  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setModalOpen(true);
  };

  const handleOpenEdit = (car: CarItem) => {
    setEditingId(car.id || null); // Ensure we have an ID
    setFormData({
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      fuel: car.fuel,
      transmission: car.transmission,
      image: car.image,
      type: car.type,
      featured: car.featured,
      mostWanted: car.mostWanted,
      description: car.description,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.make && formData.model && formData.price) {
      if (editingId) {
        // Update existing
        onUpdate(editingId, formData);
      } else {
        // Add new
        onAdd(formData as Omit<CarItem, "id">);
      }
      setModalOpen(false);
      setFormData(initialFormState);
      setEditingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-black text-xs">KM</span>
            </div>
            <span className="font-bold text-lg">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Tooltip content="Add a new vehicle to inventory">
              <button
                type="button"
                onClick={handleOpenAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Vehicle
              </button>
            </Tooltip>
            <Tooltip content="Logout">
              <button
                type="button"
                onClick={onLogout}
                className="text-slate-500 hover:text-red-600 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cars.map((car, idx) => (
                  <tr key={car.id || idx} className="hover:bg-slate-50/50">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                          <img
                            src={car.image ? `${car.image}?t=${Date.now()}` : ""}
                            alt={car.model}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">
                            {car.make} {car.model}
                          </div>
                          <div className="text-xs text-slate-500">
                            {car.year} • {car.mileage.toLocaleString()} km
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold">
                      ${car.price.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Tooltip content={car.featured ? "Remove from Featured" : "Add to Featured"}>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdate(car.id || `${idx}`, { featured: !car.featured })
                            }
                            className={`p-1.5 rounded-md transition ${car.featured
                              ? "bg-yellow-100 text-yellow-600"
                              : "text-slate-300 hover:bg-slate-100"
                              }`}
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </button>
                        </Tooltip>
                        <Tooltip content={car.mostWanted ? "Remove from Most Wanted" : "Add to Most Wanted"}>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdate(car.id || `${idx}`, { mostWanted: !car.mostWanted })
                            }
                            className={`p-1.5 rounded-md transition ${car.mostWanted
                              ? "bg-purple-100 text-purple-600"
                              : "text-slate-300 hover:bg-slate-100"
                              }`}
                          >
                            <Zap className="w-4 h-4 fill-current" />
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Tooltip content="Edit Vehicle Details">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(car)}
                            className="text-slate-400 hover:text-blue-600 transition p-2 hover:bg-blue-50 rounded-lg"
                            aria-label="Edit vehicle details"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        </Tooltip>
                        <Tooltip content="Delete Vehicle">
                          <button
                            type="button"
                            onClick={() => onDelete(car.id || `${idx}`)}
                            className="text-slate-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg"
                            aria-label="Delete vehicle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Vehicle" : "Add New Vehicle"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Make
                  </label>
                  <input
                    required
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    value={formData.make}
                    onChange={(e) =>
                      setFormData({ ...formData, make: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Model
                  </label>
                  <input
                    required
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Mileage (km)
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    value={formData.mileage}
                    onChange={(e) =>
                      setFormData({ ...formData, mileage: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Image URL
                  </label>
                  <input
                    required
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://..."
                  />
                  <div className="mt-2 space-y-2">
                    {formData.image && (
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100">
                          <img
                            src={formData.image}
                            alt="Current vehicle image preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: "" })}
                          className="text-xs font-medium text-slate-500 hover:text-red-600 hover:underline"
                        >
                          Remove image
                        </button>
                      </div>
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Info className="w-3 h-3" />
                        <span>or upload image file</span>
                      </div>
                      <input
                        id="car-image-file"
                        type="file"
                        accept="image/*"
                        disabled={isUploading}
                        className="block w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                        aria-label="Upload vehicle image file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            void handleImageUpload(file);
                          }
                        }}
                      />
                      {isUploading && (
                        <p className="text-xs text-slate-500">Uploading image...</p>
                      )}
                      {uploadError && (
                        <p className="text-xs text-red-500">{uploadError}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="block text-xs font-bold text-slate-500 uppercase mb-1"
                  htmlFor="car-description"
                >
                  Description
                </label>
                <textarea
                  id="car-description"
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none h-24 resize-none"
                  placeholder="Short description of the vehicle, package, condition..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">Featured Arrival</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.mostWanted}
                    onChange={(e) =>
                      setFormData({ ...formData, mostWanted: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">Most Wanted</span>
                </label>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                >
                  {editingId ? "Save Changes" : "Add Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

