"use client";

import { useState } from "react";
import type { CarItem } from "@/types/car";
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

  const [searchTerm, setSearchTerm] = useState("");

  // Filter cars based on search
  const filteredCars = cars.filter((car) => {
    const search = searchTerm.toLowerCase();
    return (
      car.make.toLowerCase().includes(search) ||
      car.model.toLowerCase().includes(search) ||
      car.year.toString().includes(search)
    );
  });

  // Calculate Stats
  const totalValue = cars.reduce((sum, car) => sum + car.price, 0);
  const totalCars = cars.length;
  const featuredCount = cars.filter(c => c.featured).length;
  const mostWantedCount = cars.filter(c => c.mostWanted).length;

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
    setEditingId(car.id ? String(car.id) : null);
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
        onUpdate(editingId, formData);
      } else {
        onAdd(formData as Omit<CarItem, "id">);
      }
      setModalOpen(false);
      setFormData(initialFormState);
      setEditingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-0">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-black text-xs">KM</span>
              </div>
              <span className="font-bold text-lg hidden md:block">Admin Dashboard</span>
              <span className="font-bold text-lg md:hidden">Admin</span>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={handleOpenAdd}
                className="bg-blue-600 text-white p-2 rounded-lg shadow-lg shadow-blue-200"
              >
                <Plus className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="text-slate-500 p-2"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-96 relative">
            <input
              type="text"
              placeholder="Search by make, model, or year..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 rounded-lg text-sm transition-all outline-none border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Tooltip content="Add a new vehicle to inventory">
              <button
                type="button"
                onClick={handleOpenAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-100"
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

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase mb-1">Total Inventory</div>
            <div className="text-2xl font-black text-slate-900">{totalCars}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase mb-1">Total Value</div>
            <div className="text-2xl font-black text-emerald-600">${(totalValue / 1000000).toFixed(1)}M</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase mb-1">Featured</div>
            <div className="text-2xl font-black text-yellow-600">{featuredCount}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
            <div className="text-xs text-slate-500 font-bold uppercase mb-1">Most Wanted</div>
            <div className="text-2xl font-black text-purple-600">{mostWantedCount}</div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
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
                {filteredCars.map((car, idx) => (
                  <tr key={car.id || idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 relative">
                          <img
                            src={car.image ? `${car.image}${car.image.includes("?") ? "&" : "?"}t=${Date.now()}` : ""}
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
                              onUpdate(String(car.id ?? idx), { featured: !car.featured })
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
                              onUpdate(String(car.id ?? idx), { mostWanted: !car.mostWanted })
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
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                        </Tooltip>
                        <Tooltip content="Delete Vehicle">
                          <button
                            type="button"
                            onClick={() => onDelete(String(car.id ?? idx))}
                            className="text-slate-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg"
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

        {/* Mobile Card View */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {filteredCars.map((car, idx) => (
            <div key={car.id || idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex gap-4">
              <div className="w-24 h-24 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                <img
                  src={car.image ? `${car.image}${car.image.includes("?") ? "&" : "?"}t=${Date.now()}` : ""}
                  alt={car.model}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900 truncate">{car.make} {car.model}</h3>
                      <p className="text-xs text-slate-500">{car.year} • {car.mileage.toLocaleString()} km</p>
                    </div>
                  </div>
                  <div className="font-bold text-blue-600 mt-1">${car.price.toLocaleString()}</div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                  <div className="flex gap-1">
                    <button
                      onClick={() => onUpdate(String(car.id ?? idx), { featured: !car.featured })}
                      className={`p-1.5 rounded-md ${car.featured ? "bg-yellow-100 text-yellow-600" : "text-slate-300 bg-slate-50"}`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => onUpdate(String(car.id ?? idx), { mostWanted: !car.mostWanted })}
                      className={`p-1.5 rounded-md ${car.mostWanted ? "bg-purple-100 text-purple-600" : "text-slate-300 bg-slate-50"}`}
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEdit(car)}
                      className="p-1.5 text-blue-600 bg-blue-50 rounded-md"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(String(car.id ?? idx))}
                      className="p-1.5 text-red-600 bg-red-50 rounded-md"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full h-[90vh] md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-2xl rounded-t-2xl overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10 shrink-0">
              <h2 className="text-lg md:text-xl font-bold">
                {editingId ? "Edit Vehicle" : "Add New Vehicle"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4 md:p-6">
              <form id="car-form" onSubmit={handleSubmit} className="space-y-4">
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
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image: "" })}
                            className="text-xs font-medium text-slate-500 hover:text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Info className="w-3 h-3" />
                          <span>or upload image file</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isUploading}
                          className="block w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) void handleImageUpload(file);
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
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none h-24 resize-none"
                    placeholder="Short description..."
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
              </form>
            </div>

            <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 shrink-0 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="car-form"
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg shadow-blue-100"
              >
                {editingId ? "Save Changes" : "Add Vehicle"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
