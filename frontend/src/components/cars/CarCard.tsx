"use client";

import { Gauge, Settings, Fuel } from "lucide-react";
import type { CarItem } from "@/types/car";

interface CarCardProps {
  car: CarItem;
  onClick: (car: CarItem) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => (
  <div
    onClick={() => onClick(car)}
    className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={car.imageVersion && car.image ? `${car.image}${car.image.includes("?") ? "&" : "?"}t=${car.imageVersion}` : car.image || ""}
        alt={car.model}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-900">
        {car.year}
      </div>

    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="text-xs text-blue-600 font-bold mb-1 uppercase tracking-widest">
        {car.make}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">
        {car.model}
      </h3>
      <div className="text-xl font-black text-slate-900 mb-4">
        ${car.price.toLocaleString()}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
          {/* Engine */}
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <Fuel className="w-4 h-4 text-slate-400" />
            <span>{car.fuel} {car.engine}</span>
          </div>

          {/* Mileage */}
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <Gauge className="w-4 h-4 text-slate-400" />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>

          {/* Shipping */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            {car.shipping}
          </div>

          {/* Status Badge - Moved here */}
          <div className="flex items-center">
            {car.status && (
              <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide text-white ${car.status === 'Sold' ? 'bg-red-500' :
                car.status === 'In Transit' ? 'bg-orange-500' :
                  'bg-emerald-500'
                }`}>
                {car.status}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CarCard;
