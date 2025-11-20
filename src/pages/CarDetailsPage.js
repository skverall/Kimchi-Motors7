import React from 'react';
import { ArrowRight, Gauge, Fuel, Settings, MessageCircle, Phone } from 'lucide-react';

const CarDetailsPage = ({ car, onBack }) => (
  <div className="min-h-screen bg-white animate-fade-in">
    <div className="bg-slate-900 text-white py-4">
      <div className="container mx-auto px-4">
        <button onClick={onBack} className="flex items-center gap-2 text-sm hover:text-blue-400 transition">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Inventory
        </button>
      </div>
    </div>

    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Images */}
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
            <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* Mock Gallery */}
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-video rounded-lg overflow-hidden bg-gray-100 cursor-pointer opacity-70 hover:opacity-100 transition">
                <img src={car.image} alt={`${car.model} gallery ${i}`} className="w-full h-full object-cover grayscale hover:grayscale-0 transition" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg sticky top-24">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-slate-500 text-sm font-bold uppercase tracking-widest">{car.make}</h2>
                <h1 className="text-3xl font-bold text-slate-900">{car.model}</h1>
              </div>
              <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">{car.year}</div>
            </div>

            <div className="text-4xl font-black text-slate-900 mb-8">${car.price.toLocaleString()}</div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-slate-500 flex items-center gap-2"><Gauge className="w-4 h-4" /> Mileage</span>
                <span className="font-semibold">{car.mileage.toLocaleString()} km</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-slate-500 flex items-center gap-2"><Fuel className="w-4 h-4" /> Fuel Type</span>
                <span className="font-semibold">{car.fuel}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-slate-500 flex items-center gap-2"><Settings className="w-4 h-4" /> Transmission</span>
                <span className="font-semibold">{car.transmission}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-green-100">
                <MessageCircle className="w-5 h-5" /> WhatsApp Inquiry
              </button>
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-slate-200">
                <Phone className="w-5 h-5" /> Call Showroom
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-4xl">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Vehicle Description</h3>
        <p className="text-slate-600 leading-loose text-lg">
          {car.description || `Experience the pinnacle of engineering with this ${car.year} ${car.make} ${car.model}. Finished in stunning condition, this vehicle represents the perfect blend of luxury and performance.`}
        </p>
      </div>
    </div>
  </div>
);

export default CarDetailsPage;
