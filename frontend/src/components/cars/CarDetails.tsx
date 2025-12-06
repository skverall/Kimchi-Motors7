"use client";

import { useState, useCallback, useEffect } from "react";
import { ArrowRight, Gauge, Fuel, Settings, MessageCircle, Phone, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { CarItem } from "@/types/car";

interface CarDetailsProps {
  car: CarItem;
  onBack: () => void;
}

export const CarDetails: React.FC<CarDetailsProps> = ({ car, onBack }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Build the images array for the gallery
  const allImages = car.images && car.images.length > 0
    ? car.images
    : car.image
      ? [car.image]
      : [];

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      <div className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm hover:text-blue-400 transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Inventory
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image - clickable */}
            <div
              className="aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-lg cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              <img
                src={allImages[0] || car.image || ""}
                alt={car.model}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Thumbnail gallery - colorful and clickable */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {allImages.slice(0, 12).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => openLightbox(i)}
                    className="aspect-video rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all shadow-sm"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      alt={`${car.model} - ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-lg sticky top-24">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                    {car.make}
                  </h2>
                  <h1 className="text-3xl font-bold text-slate-900">{car.model}</h1>
                </div>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                  {car.year}
                </div>
              </div>

              <div className="text-4xl font-black text-slate-900">
                ${car.price.toLocaleString()}
              </div>
              <div className="text-xl font-bold text-slate-500 mb-8">
                AED {(car.priceAed || Math.round(car.price * 3.67)).toLocaleString()}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Gauge className="w-4 h-4" /> Mileage
                  </span>
                  <span className="font-semibold">
                    {car.mileage.toLocaleString()} km
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Fuel className="w-4 h-4" /> Fuel Type
                  </span>
                  <span className="font-semibold">{car.fuel}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Settings className="w-4 h-4" /> Transmission
                  </span>
                  <span className="font-semibold">{car.transmission}</span>
                </div>
                {car.engine && (
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Engine
                    </span>
                    <span className="font-semibold">{car.engine}</span>
                  </div>
                )}
                {car.shipping && (
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Shipping
                    </span>
                    <span className="font-semibold">{car.shipping}</span>
                  </div>
                )}
                {car.status && (
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Status
                    </span>
                    <span className={`font-bold px-2 py-0.5 rounded text-white text-xs ${car.status === 'Sold' ? 'bg-red-500' :
                      car.status === 'In Transit' ? 'bg-orange-500' :
                        'bg-emerald-500'
                      }`}>
                      {car.status}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/971564742456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-green-100"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp Inquiry
                </a>
                <a
                  href="tel:+971564742456"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-slate-200"
                >
                  <Phone className="w-5 h-5" /> Call Showroom
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-4xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Vehicle Description
          </h3>
          <p className="text-slate-600 leading-loose text-lg">
            {car.description ||
              `Experience the pinnacle of engineering with this ${car.year} ${car.make} ${car.model}. Finished in stunning condition, this vehicle represents the perfect blend of luxury and performance.`}
          </p>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && allImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition z-50"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition z-50"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition z-50"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Main Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allImages[lightboxIndex]}
              alt={`${car.model} - ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
