"use client";

import { useState } from "react";
import { X, Globe, MapPin, Phone, Clock } from "lucide-react";
import { SHOWROOM_LOCATIONS } from "@/constants/locations";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState(SHOWROOM_LOCATIONS[0]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white animate-fade-in" aria-modal="true" role="dialog">
      <div className="w-full h-full flex flex-col md:flex-row relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close locations"
          className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/40 backdrop-blur p-2 rounded-full text-slate-900 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full md:w-1/3 bg-slate-50 border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Globe className="text-blue-600" /> Our Locations
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Select a showroom to view details
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {SHOWROOM_LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedLocation.id === loc.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-[1.02]"
                  : "bg-white hover:bg-gray-100 border-gray-100 text-slate-600"
                  }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{loc.city}</h3>
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider opacity-80 ${selectedLocation.id === loc.id
                        ? "text-blue-100"
                        : "text-slate-400"
                        }`}
                    >
                      {loc.country}
                    </p>
                  </div>
                  {selectedLocation.id === loc.id && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-slate-900 text-white text-center">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-2">
              Global Support
            </p>
            <p className="font-mono text-lg">+1 (800) KIMCHI-KM</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col h-full overflow-y-auto relative">
          <div className="relative h-48 md:h-64 shrink-0">
            <img
              src={selectedLocation.image}
              className="w-full h-full object-cover"
              alt={selectedLocation.city}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  {selectedLocation.city} Showroom
                </h1>
                <p className="text-slate-300 flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4" /> {selectedLocation.address}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Phone
                  </p>
                  <a
                    href={`tel:${selectedLocation.phone.replace(/\s/g, "")}`}
                    className="font-semibold text-slate-900 hover:text-blue-600 transition"
                  >
                    {selectedLocation.phone}
                  </a>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">
                    Opening Hours
                  </p>
                  <p className="font-semibold text-slate-900">
                    {selectedLocation.hours}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 relative min-h-[250px]">
              <iframe
                title={`${selectedLocation.city} map`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src={`https://maps.google.com/maps?q=${selectedLocation.mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg text-xs font-bold text-slate-900 pointer-events-none">
                Google Maps View
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;

