"use client";

import { Gauge, Settings, Fuel, Ship, CheckCircle2 } from "lucide-react";
import type { CarItem } from "@/types/car";
import { Button } from "@/components/ui/Button";

interface CarCardProps {
  car: CarItem;
  onClick: (car: CarItem) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onClick }) => (
  <div
    className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
  >
    {/* Image Section - Clickable */}
    <div
      className="relative h-48 overflow-hidden cursor-pointer"
      onClick={() => onClick(car)}
    >
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
      <h3
        className="text-lg font-bold text-slate-900 mb-2 truncate cursor-pointer hover:text-blue-600 transition-colors"
        onClick={() => onClick(car)}
      >
        {car.model}
      </h3>
      <div className="text-xl font-black text-slate-900 mb-4">
        ${car.price.toLocaleString()}
      </div>

      <div className="mt-auto pt-3 border-t border-gray-100 space-y-4">
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          {/* Engine */}
          <div className="flex items-center gap-1.5">
            <Fuel className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[11px] font-medium text-gray-600">{car.fuel} {car.engine}</span>
          </div>

          {/* Mileage */}
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[11px] font-medium text-gray-600">{car.mileage.toLocaleString()} km</span>
          </div>

          {/* Shipping */}
          <div className="flex items-center gap-1.5">
            <Ship className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[11px] font-medium text-gray-600">{car.shipping || "By sea shipping"}</span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5">
            <CheckCircle2
              className={`w-3.5 h-3.5 ${car.status === 'Sold' ? 'text-red-500' :
                car.status === 'In Transit' ? 'text-orange-500' :
                  'text-emerald-500'
                }`}
            />
            <span className={`text-[11px] font-bold ${car.status === 'Sold' ? 'text-red-600' :
              car.status === 'In Transit' ? 'text-orange-600' :
                'text-emerald-600'
              }`}>
              {car.status || "Available"}
            </span>
          </div>
        </div>

        <Button
          onClick={() => onClick(car)}
          fullWidth
          variant="outline"
          size="sm"
          className="group-hover:bg-[#1A4AFF] group-hover:text-white group-hover:border-[#1A4AFF]"
        >
          View Details
        </Button>
      </div>
    </div>
  </div>
);

export default CarCard;
