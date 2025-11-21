"use client";

import { useState } from "react";
import type { CarItem } from "@/components/cars/CarCard";

import { Plus, Trash2, LogOut, Star, Zap, X } from "lucide-react";

interface AdminDashboardProps {
  cars: CarItem[];
  onAdd: (car: Omit<CarItem, "id">) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<CarItem>) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  cars,
  onAdd,
  onDelete,
  onUpdate,
  onLogout,
}) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newCar, setNewCar] = useState<Partial<Omit<CarItem, "id">>>({
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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCar.make && newCar.model && newCar.price) {
      onAdd(newCar as Omit<CarItem, "id">);
      setAddModalOpen(false);
      setNewCar({
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
      });
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
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Vehicle
            </button>
            <button
              onClick={onLogout}
              className="text-slate-500 hover:text-red-600 transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
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
                  <tr key={`${car.make}-${car.model}-${idx}`} className="hover:bg-slate-50/50">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                          <img
                            src={car.image}
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
                        <button
                          onClick={() =>
                            onUpdate(car.id || `${idx}`, { featured: !car.featured })
                          }
                          className={`p-1.5 rounded-md transition ${car.featured
                              ? "bg-yellow-100 text-yellow-600"
                              : "text-slate-300 hover:bg-slate-100"
                            }`}
                          title="Toggle Featured"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                        <button
                          onClick={() =>
                            onUpdate(car.id || `${idx}`, { mostWanted: !car.mostWanted })
                          }
                          className={`p-1.5 rounded-md transition ${car.mostWanted
                              ? "bg-purple-100 text-purple-600"
                              : "text-slate-300 hover:bg-slate-100"
                            }`}
                          title="Toggle Most Wanted"
                        >
                          <Zap className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onDelete(car.id || `${idx}`)}
                        className="text-slate-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-lg"
                        title="Delete Vehicle"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold">Add New Vehicle</h2>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition"
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
                    value={newCar.make}
                    onChange={(e) =>
                      setNewCar({ ...newCar, make: e.target.value })
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
                    value={newCar.model}
                    onChange={(e) =>
                      setNewCar({ ...newCar, model: e.target.value })
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
                    value={newCar.year}
                    onChange={(e) =>
                      setNewCar({ ...newCar, year: parseInt(e.target.value) })
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
                    value={newCar.price}
                    onChange={(e) =>
                      setNewCar({ ...newCar, price: parseInt(e.target.value) })
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
                    value={newCar.mileage}
                    onChange={(e) =>
                      setNewCar({ ...newCar, mileage: parseInt(e.target.value) })
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
                    value={newCar.image}
                    onChange={(e) =>
                      setNewCar({ ...newCar, image: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Description
                </label>
                <textarea
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-100 outline-none h-24 resize-none"
                  value={newCar.description}
                  onChange={(e) =>
                    setNewCar({ ...newCar, description: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newCar.featured}
                    onChange={(e) =>
                      setNewCar({ ...newCar, featured: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">Featured Arrival</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newCar.mostWanted}
                    onChange={(e) =>
                      setNewCar({ ...newCar, mostWanted: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">Most Wanted</span>
                </label>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                >
                  Add Vehicle
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

