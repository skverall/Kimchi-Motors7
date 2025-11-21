import React from 'react';
import { Gauge, Settings, Fuel } from 'lucide-react';

const CarCard = ({ car, onClick }) => (
  <div
    onClick={() => onClick(car)}
    className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-sm hover:shadow-xl hover:border-kimchi-red/50 transition-all duration-300 cursor-pointer flex flex-col h-full"
  >
    <div className="relative h-56 overflow-hidden">
      <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white shadow-sm border border-white/10">
        {car.year}
      </div>
      {car.featured && (
        <div className="absolute top-3 left-3 bg-kimchi-red text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
          Featured
        </div>
      )}
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-widest">{car.make}</div>
      <h3 className="text-xl font-sans font-bold text-white mb-2 truncate group-hover:text-kimchi-red transition-colors">{car.model}</h3>
      <div className="text-2xl font-bold text-kimchi-red mb-6">${car.price.toLocaleString()}</div>

      <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 mt-auto text-xs text-gray-400 font-medium">
        <div className="flex flex-col items-center gap-1.5">
          <Gauge className="w-4 h-4 text-gray-500" />
          <span>{car.mileage.toLocaleString()} km</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 border-l border-white/10">
          <Settings className="w-4 h-4 text-gray-500" />
          <span>{car.transmission}</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 border-l border-white/10">
          <Fuel className="w-4 h-4 text-gray-500" />
          <span>{car.fuel}</span>
        </div>
      </div>
    </div>
  </div>
);

export default CarCard;
