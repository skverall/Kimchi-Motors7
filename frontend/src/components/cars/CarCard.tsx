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
      {car.status && (
        <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold text-white ${car.status === 'Sold' ? 'bg-red-500' :
            car.status === 'In Transit' ? 'bg-orange-500' :
              'bg-emerald-500'
          }`}>
          {car.status}
        </div>
      )}
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="text-xs text-blue-600 font-semibold mb-1 uppercase tracking-wider">
        {car.make}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">
        {car.model}
      </h3>
      <div className="text-xl font-bold text-slate-900 mb-4">
        ${car.price.toLocaleString()}
      </div>

      <div className="space-y-2 border-t border-gray-100 pt-4 mt-auto">
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Fuel className="w-4 h-4 text-slate-400" />
            <span>{car.fuel} {car.engine}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-slate-400" />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>
        </div>
        {car.shipping && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            {car.shipping}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default CarCard;
