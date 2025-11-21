"use client";

import { Gauge, Settings, Fuel } from "lucide-react";

export interface CarItem {
  id?: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  image: string;
  type: string;
  description?: string;
  featured?: boolean;
  mostWanted?: boolean;
}

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
        src={car.image}
        alt={car.model}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-900">
        {car.year}
      </div>
      {car.featured && (
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
          Featured
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

      <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-4 mt-auto text-xs text-slate-500">
        <div className="flex flex-col items-center gap-1">
          <Gauge className="w-4 h-4 text-slate-400" />
          <span>{car.mileage.toLocaleString()} km</span>
        </div>
        <div className="flex flex-col items-center gap-1 border-l border-gray-100">
          <Settings className="w-4 h-4 text-slate-400" />
          <span>{car.transmission}</span>
        </div>
        <div className="flex flex-col items-center gap-1 border-l border-gray-100">
          <Fuel className="w-4 h-4 text-slate-400" />
          <span>{car.fuel}</span>
        </div>
      </div>
    </div>
  </div>
);

export default CarCard;

