"use client";

import { useState, useEffect } from "react";
import type { CarItem } from "@/types/car";
import { Plus, Trash2, LogOut, Star, Zap, X, Pencil, Info, UploadCloud } from "lucide-react";

interface AdminDashboardProps {
  cars: CarItem[];
  onAdd: (car: Omit<CarItem, "id">) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<CarItem>) => void;
  onLogout: () => void;
  authToken?: string | null;
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
  authToken,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialFormState = {
    make: "",
    model: "",
    year: new Date().getFullYear() as number | "",
    price: "" as number | "",
    priceAed: "" as number | "",
    mileage: "" as number | "",
    fuel: "Petrol",
    transmission: "Automatic",
    image: "",
    images: [] as string[],
    type: "Sedan",
    featured: false,
    mostWanted: false,
    description: "",
    status: "Available" as "Available" | "In Transit" | "Sold",
    youtubeUrl: "",
  };

  type CarFormData = typeof initialFormState;

  // Helper to safely parse numbers
  const safeParseInt = (val: string | number): number => {
    if (val === "" || val === undefined || val === null) return 0;
    const items = val.toString().replace(/,/g, '');
    const num = parseInt(items);
    return isNaN(num) ? 0 : num;
  };

  const [formData, setFormData] = useState<CarFormData>(initialFormState);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Available" | "In Transit" | "Sold">("All");
  const [sortBy, setSortBy] = useState<"newest" | "price_asc" | "price_desc" | "year_newest" | "mileage_asc">("newest");
  const [isConnected, setIsConnected] = useState(true); // Optimistic default

  // Check connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        if (!authToken) {
          setIsConnected(false);
          return;
        }
        const res = await fetch("/api/cars?limit=1", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setIsConnected(res.ok);
      } catch (e) {
        setIsConnected(false);
      }
    };
    checkConnection();
  }, [authToken]);

  // Filter and Sort Logic
  const filteredCars = cars
    .filter((car) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        car.make.toLowerCase().includes(search) ||
        car.model.toLowerCase().includes(search) ||
        car.year.toString().includes(search);

      const matchesStatus = statusFilter === "All" || (car.status || "Available") === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_asc": return a.price - b.price;
        case "price_desc": return b.price - a.price;
        case "year_newest": return b.year - a.year;
        case "mileage_asc": return a.mileage - b.mileage;
        default: return 0; // Keep original order
      }
    });

  // Calculate Stats
  const totalValue = cars.reduce((sum, car) => sum + car.price, 0);
  const totalCars = cars.length;
  const featuredCount = cars.filter(c => c.featured).length;
  const mostWantedCount = cars.filter(c => c.mostWanted).length;

  // Currency Conversion Rate
  const USD_TO_AED = 3.67;

  const handlePriceChange = (value: string, type: "USD" | "AED") => {
    // fast update state
    if (value === "") {
      setFormData(prev => ({ ...prev, price: "", priceAed: "" }));
      return;
    }

    // Allow typing, but filter non-digits
    const cleanValue = value.replace(/[^0-9]/g, '');
    const numValue = parseInt(cleanValue);

    if (isNaN(numValue)) return;

    if (type === "USD") {
      setFormData(prev => ({
        ...prev,
        price: numValue,
        priceAed: Math.round(numValue * USD_TO_AED)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        priceAed: numValue,
        price: Math.round(numValue / USD_TO_AED)
      }));
    }
  };

  // Client-side image compression
  const compressImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1920;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(img.src);
          return reject(new Error("Failed to get canvas context"));
        }
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              URL.revokeObjectURL(img.src);
              return reject(new Error("Compression failed"));
            }
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            URL.revokeObjectURL(img.src);
            resolve(compressedFile);
          },
          "image/jpeg",
          0.8
        );
      };
      img.onerror = (error) => {
        URL.revokeObjectURL(img.src);
        reject(error);
      };
    });
  };

  const handleImageUpload = async (file: File) => {
    setUploadError(null);
    setIsUploading(true);
    if (!authToken) {
      setUploadError("You must be logged in to upload images.");
      setIsUploading(false);
      return;
    }
    try {
      // Compress before upload
      const compressedFile = await compressImage(file);

      const uploadFormData = new FormData();
      uploadFormData.append("file", compressedFile);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: uploadFormData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Upload failed");
      }

      const data = await res.json();
      if (data?.url) {
        setFormData((prev) => {
          const currentImages = prev.images || [];
          const newImages = [...currentImages, data.url];
          // Ensure main image is set if empty
          const mainImage = prev.image || data.url;
          return { ...prev, images: newImages, image: mainImage };
        });
      }
    } catch (error) {
      console.error("Image upload error", error);
      setUploadError("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleMultipleImageUpload = async (files: FileList) => {
    setUploadError(null);
    setIsUploading(true);
    if (!authToken) {
      setUploadError("You must be logged in to upload images.");
      setIsUploading(false);
      return;
    }

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Compress before upload
        const compressedFile = await compressImage(file);

        const uploadFormData = new FormData();
        uploadFormData.append("file", compressedFile);

        const res = await fetch("/api/upload-image", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: uploadFormData,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || "Upload failed");
        }
        const data = await res.json();
        return data.url as string;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      if (uploadedUrls.length > 0) {
        setFormData((prev) => {
          const currentImages = prev.images || [];
          const newImages = [...currentImages, ...uploadedUrls];
          // Ensure main image is set if empty
          const mainImage = prev.image || uploadedUrls[0];
          return { ...prev, images: newImages, image: mainImage };
        });
      }
    } catch (error) {
      console.error("Image upload error", error);
      setUploadError("Failed to upload one or more images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => {
      const currentImages = prev.images || [];
      const newImages = currentImages.filter((_, idx) => idx !== indexToRemove);
      // If we removed the main image (first one usually), update it
      let newMainImage = prev.image;
      if (newImages.length > 0) {
        // If the main image was the one removed, or just to be safe, sync with the first one 
        // but usually user might want to select main. For simplicity, let's just keep first as main if main is gone.
        if (!newImages.includes(newMainImage || "")) {
          newMainImage = newImages[0];
        }
      } else {
        newMainImage = "";
      }
      return { ...prev, images: newImages, image: newMainImage };
    });
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
      priceAed: car.priceAed || "", // If 0 or undefined, effectively handled but empty string is safer for UI if we want empty
      mileage: car.mileage,
      fuel: car.fuel,
      transmission: car.transmission,
      image: car.image,
      images: car.images || (car.image ? [car.image] : []),
      type: car.type,
      featured: car.featured || false,
      mostWanted: car.mostWanted || false,
      description: car.description || "",
      status: car.status || "Available",
      youtubeUrl: car.youtubeUrl || car.youtube_url || "",
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.make && formData.model && formData.price) {
      const submissionData = {
        ...formData,
        price: safeParseInt(formData.price || 0),
        priceAed: safeParseInt(formData.priceAed || 0),
        mileage: safeParseInt(formData.mileage || 0),
        year: safeParseInt(formData.year || 0),
      };

      if (editingId) {
        onUpdate(editingId, submissionData);
      } else {
        onAdd(submissionData as Omit<CarItem, "id">);
      }
      setModalOpen(false);
      setFormData(initialFormState);
      setEditingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-10">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
            </div>
            {/* Mobile Logout */}
            <button onClick={onLogout} className="md:hidden p-2 text-slate-400 hover:text-slate-600">
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Connection Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {isConnected ? "Database Connected" : "Database Offline"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-64">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </div>
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-sm transition-all outline-none"
              />
            </div>
            <button
              onClick={handleOpenAdd}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Add Vehicle</span>
              <span className="md:hidden">Add New</span>
            </button>
            <button onClick={onLogout} className="hidden md:flex items-center gap-2 text-slate-500 hover:text-slate-800 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Inventory</div>
            <div className="text-2xl font-black text-slate-900">{totalCars}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Value</div>
            <div className="text-2xl font-black text-emerald-600">${(totalValue / 1000000).toFixed(1)}M</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Featured</div>
            <div className="text-2xl font-black text-yellow-600">{featuredCount}</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Most Wanted</div>
            <div className="text-2xl font-black text-purple-600">{mostWantedCount}</div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            {(["All", "Available", "In Transit", "Sold"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${statusFilter === status
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full md:w-auto bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none font-semibold cursor-pointer"
            >
              <option value="newest">Newest Added</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="year_newest">Year: Newest</option>
              <option value="mileage_asc">Mileage: Low to High</option>
            </select>
          </div>
        </div>

        {/* Responsive Card Grid (All Screens) */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCars.map((car, idx) => (
              <div key={car.id || idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="w-full h-48 rounded-lg bg-slate-100 overflow-hidden shrink-0 relative">
                  <img
                    src={car.image ? `${car.image}${car.image.includes("?") ? "&" : "?"}t=${Date.now()}` : ""}
                    alt={car.model}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => onUpdate(String(car.id ?? idx), { featured: !car.featured })}
                      className={`p-1.5 rounded-md backdrop-blur-md ${car.featured ? "bg-yellow-100/90 text-yellow-600" : "bg-white/90 text-slate-400 hover:text-yellow-500"}`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => onUpdate(String(car.id ?? idx), { mostWanted: !car.mostWanted })}
                      className={`p-1.5 rounded-md backdrop-blur-md ${car.mostWanted ? "bg-purple-100/90 text-purple-600" : "bg-white/90 text-slate-400 hover:text-purple-500"}`}
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                  {/* Status Badge Overlay */}
                  <div className="absolute bottom-2 left-2">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wide backdrop-blur-md ${car.status === 'Sold' ? 'bg-red-500/90 text-white' :
                      car.status === 'In Transit' ? 'bg-orange-500/90 text-white' :
                        'bg-emerald-500/90 text-white'
                      }`}>
                      {car.status || "Available"}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg truncate">{car.make} {car.model}</h3>
                        <p className="text-xs text-slate-500 font-medium">{car.year} • {car.mileage.toLocaleString()} km</p>
                      </div>
                    </div>
                    <div className="font-black text-xl text-slate-900">${car.price.toLocaleString()}</div>
                    {car.priceAed && car.priceAed > 0 && (
                      <div className="text-sm font-semibold text-slate-500">AED {car.priceAed.toLocaleString()}</div>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-slate-50">
                    <button
                      onClick={() => handleOpenEdit(car)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => onDelete(String(car.id ?? idx))}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-slate-100 p-6 rounded-full mb-4">
              <div className="text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No vehicles found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearchTerm(""); setStatusFilter("All"); }}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
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
                        setFormData({ ...formData, year: e.target.value === "" ? "" : parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Price ($)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                      value={formData.price}
                      onChange={(e) => handlePriceChange(e.target.value, "USD")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Price (AED)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                      value={formData.priceAed}
                      onChange={(e) => handlePriceChange(e.target.value, "AED")}
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
                        setFormData({ ...formData, mileage: e.target.value === "" ? "" : parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Status
                    </label>
                    <select
                      className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                      value={formData.status || "Available"}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as "Available" | "In Transit" | "Sold" })
                      }
                    >
                      <option value="Available">Available</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-bold text-slate-500 uppercase">
                        Vehicle Photos
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          // Toggle manual entry visibility or just clear it
                          // For now, let's keep it simple: just show a label
                        }}
                        className="text-[10px] text-blue-600 font-semibold hover:underline"
                      >
                        {/* Optional: Add toggle for manual URL if needed */}
                      </button>
                    </div>

                    {/* Image Grid */}
                    {formData.images && formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {formData.images.map((img, idx) => (
                          <div
                            key={idx}
                            onClick={() => setFormData({ ...formData, image: img })}
                            className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 ${img === formData.image ? 'ring-2 ring-blue-600 ring-offset-2' : 'hover:ring-2 hover:ring-slate-300 hover:ring-offset-1'
                              }`}
                          >
                            <img src={img} alt={`Car ${idx}`} className="w-full h-full object-cover" />

                            {/* Actions Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(idx);
                              }}
                              className="absolute top-2 right-2 bg-white/90 text-red-500 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-red-600 shadow-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            {img === formData.image && (
                              <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                                Main Photo
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Drag & Drop Zone */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                          void handleMultipleImageUpload(e.dataTransfer.files);
                        }
                      }}
                      onClick={() => document.getElementById('hidden-file-input')?.click()}
                      className={`border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-400 hover:bg-slate-50 transition-all group ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <input
                        id="hidden-file-input"
                        type="file"
                        accept="image/*"
                        multiple
                        disabled={isUploading}
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            void handleMultipleImageUpload(e.target.files);
                          }
                        }}
                      />

                      {isUploading ? (
                        <div className="animate-pulse flex flex-col items-center">
                          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3" />
                          <p className="text-sm font-semibold text-slate-600">Uploading photos...</p>
                        </div>
                      ) : (
                        <>
                          <div className="bg-slate-100 p-4 rounded-full mb-3 group-hover:bg-blue-100 transition-colors">
                            <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-blue-600" />
                          </div>
                          <p className="text-sm font-bold text-slate-700 mb-1">
                            Click or drag photos here
                          </p>
                          <p className="text-xs text-slate-400">
                            Updates automatically. Click a photo to set as main.
                          </p>
                        </>
                      )}

                      {uploadError && (
                        <p className="mt-4 text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full">
                          {uploadError}
                        </p>
                      )}
                    </div>

                    {/* Fallback Manual Input (Collapsible or Small) */}
                    <div className="pt-2">
                      <details className="text-xs text-slate-500">
                        <summary className="cursor-pointer hover:text-blue-600 font-medium list-none flex items-center gap-1">
                          <span className="text-[10px]">▶</span> Enter Image URL manually
                        </summary>
                        <div className="mt-2 pl-4 border-l-2 border-slate-100">
                          <input
                            className="w-full border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-blue-100 outline-none"
                            value={formData.image}
                            onChange={(e) =>
                              setFormData({ ...formData, image: e.target.value })
                            }
                            placeholder="https://example.com/image.jpg"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">Useful for external hosted images.</p>
                        </div>
                      </details>
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
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    YouTube Video URL
                  </label>
                  <input
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                    placeholder="https://youtu.be/..."
                    value={formData.youtubeUrl || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, youtubeUrl: e.target.value })
                    }
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Paste the full YouTube video link here.</p>
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
