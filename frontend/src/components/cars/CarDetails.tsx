"use client";

import { useState, useCallback, useEffect } from "react";
import { ArrowRight, Gauge, Fuel, Settings, MessageCircle, Phone, X, ChevronLeft, ChevronRight, Share2, Printer, Heart, CheckCircle2, CarFront, FileText, Palette, Shield, Music, Zap, Sun, Lightbulb, Check } from "lucide-react";
import type { CarItem } from "@/types/car";
import { CarCard } from "./CarCard";
import { FadeInImage } from "@/components/ui/FadeInImage";

interface CarDetailsProps {
  car: CarItem;
  relatedCars?: CarItem[];
  onBack: () => void;
}

export const CarDetails: React.FC<CarDetailsProps> = ({ car, relatedCars = [], onBack }) => {
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

  // Keyboard navigation for lightbox
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

  // Derived Values
  const basePrice = Math.round(car.price * 0.98); // Mock breakdown
  const brokerage = car.price - basePrice;
  const priceAed = car.priceAed || Math.round(car.price * 3.67);

  // Feature Section Helpers
  const renderFeatureSection = (title: string, icon: React.ReactNode, items?: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-8">
        <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          {icon} {title}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-red-100 transition-colors">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                <Check className="w-3 h-3 text-white stroke-[3]" />
              </div>
              <span className="text-sm font-semibold text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white animate-fade-in pb-20">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 py-4 sticky top-0 z-30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-900 hover:text-blue-600 font-bold transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-50">
                <ChevronLeft className="w-5 h-5" />
              </div>
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={onBack} className="hover:text-blue-600">Car List</button>
            <button className="hover:text-blue-600">FAQ</button>
            <button className="hover:text-blue-600">About us</button>
            <button className="hover:text-blue-600">Contact us</button>
            <div className="h-4 w-px bg-gray-300"></div>
            <button className="text-red-500 border border-red-500 px-4 py-1.5 rounded hover:bg-red-50 transition">Login</button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb / Title area */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-medium"
          >
            <div className="p-2 bg-slate-100 rounded-full group-hover:bg-red-50 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" />
            </div>
            Back to Inventory
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image */}
            <div
              className="aspect-[4/3] rounded-sm overflow-hidden bg-gray-100 relative cursor-pointer group"
              onClick={() => openLightbox(0)}
            >
              {allImages[0] ? (
                <FadeInImage
                  src={allImages[0]}
                  alt={car.model}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200" aria-hidden="true" />
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <button className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
                <span className="sr-only">Expand</span>
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m0 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
              </button>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {allImages.slice(0, 10).map((img, i) => (
                  <div
                    key={i}
                    onClick={() => openLightbox(i)}
                    className={`relative aspect-[4/3] rounded-sm overflow-hidden bg-gray-100 cursor-pointer border-2 ${i === 0 ? 'border-red-500' : 'border-transparent'} hover:border-red-300 transition-all`}
                  >
                    <FadeInImage src={img} alt="" fill sizes="20vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Info & Specs */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{car.make} {car.model} {car.year}</h1>
              <div className="text-sm text-slate-500 mb-4">SKU: {car.id}</div>

              <div className="flex justify-between items-end mb-6">
                <div className="text-3xl font-bold text-red-600">{priceAed.toLocaleString()} AED</div>
                <div className="text-lg font-bold text-slate-500">${car.price.toLocaleString()}</div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-900 font-medium">Base Price:</span>
                  <span className="font-bold text-slate-900 text-base">{basePrice.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-900 font-medium">Brokerage (VAT incl.):</span>
                  <span className="font-bold text-slate-900 text-base">{brokerage.toLocaleString()} USD</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-base font-bold text-red-600">
                  <span>Total: Vehicle value + Customs + Port Fees</span>
                  <div className="text-right">
                    <div>{priceAed.toLocaleString()} AED</div>
                    <div className="text-xs text-slate-500 font-medium">approx ${Math.round(priceAed / 3.67).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-900 font-medium">Car Location</span>
                  <span className="font-bold text-slate-900">Ajman Exhibition</span>
                </div>
                <div className="flex justify-end pt-2">
                  <button className="text-red-500 text-xs font-bold hover:underline">Show Details</button>
                </div>
              </div>

              {/* Specifications Grid */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="font-bold text-slate-900 mb-4">Vehicle Specifications</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <div className="text-xs text-slate-900 font-bold mb-1 flex items-center gap-1"><CarFront className="w-3 h-3" /> Manufacturer</div>
                    <div className="font-semibold text-slate-900">{car.make}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-900 font-bold mb-1 flex items-center gap-1"><FileText className="w-3 h-3" /> Year</div>
                    <div className="font-semibold text-slate-900">{car.year}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-900 font-bold mb-1 flex items-center gap-1"><Gauge className="w-3 h-3" /> Odometer</div>
                    <div className="font-semibold text-slate-900">{car.mileage.toLocaleString()} Km</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-900 font-bold mb-1 flex items-center gap-1"><FileText className="w-3 h-3" /> Chassis</div>
                    <div className="font-semibold text-slate-900 text-xs truncate" title={car.chassis || "N/A"}>{car.chassis || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-900 font-bold mb-1 flex items-center gap-1"><Palette className="w-3 h-3" /> Exterior Color</div>
                    <div className="font-semibold text-slate-900">{car.exteriorColor || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-900 font-bold mb-1 flex items-center gap-1"><Palette className="w-3 h-3" /> Interior Color</div>
                    <div className="font-semibold text-slate-900">{car.interiorColor || "N/A"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-900 font-bold mb-1 flex items-center gap-1"><Fuel className="w-3 h-3" /> Engine Type</div>
                    <div className="font-semibold text-slate-900">{car.fuel} {car.engine || ""}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-slate-900 font-bold mb-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Body Check</div>
                    <div className="font-semibold text-slate-900 text-sm">{car.bodyCheck || "N/A"}</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    const message = `Hi, I am interested in the ${car.year} ${car.make} ${car.model} (SKU: ${car.id}).`;
                    window.open(`https://wa.me/971564743456?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded shadow-md transition-colors uppercase tracking-wide flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </button>
                <button
                  onClick={() => window.open('tel:+971564743456')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded shadow-md transition-colors uppercase tracking-wide flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" /> +971 56 474 3456
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Features Section */}
        <div className="mt-12 bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
          {car.features ? (
            <>
              {renderFeatureSection("Safety & Security Features", <Shield className="w-5 h-5 text-red-600" />, car.features.safety)}
              {renderFeatureSection("Multimedia & Screens", <Music className="w-5 h-5 text-red-600" />, car.features.multimedia)}
              {renderFeatureSection("Interior Features", <Settings className="w-5 h-5 text-red-600" />, car.features.interior)}
              {renderFeatureSection("Exterior / Interior Lights", <Sun className="w-5 h-5 text-red-600" />, car.features.exteriorLights)}
              {renderFeatureSection("Exterior Features", <CarFront className="w-5 h-5 text-red-600" />, car.features.exterior)}
              {renderFeatureSection("Electrical Controls", <Zap className="w-5 h-5 text-red-600" />, car.features.electrical)}
            </>
          ) : (
            <div className="text-center text-slate-500 italic py-10">Detailed features not available for this vehicle.</div>
          )}
        </div>

        {/* Video Review Section */}
        {(car.youtubeUrl || car.youtube_url) && (
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center justify-center gap-2">
              <span className="text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
              </span>
              Video Review
            </h3>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${(car.youtubeUrl || car.youtube_url || "").split('v=')[1]?.split('&')[0] || (car.youtubeUrl || car.youtube_url || "").split('/').pop()}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Explore More Vehicles Section */}
        {relatedCars.length > 0 && (
          <div className="mt-20 border-t border-gray-100 pt-16">
            <div className="text-center mb-10">
              <h3 className="text-red-500 font-bold uppercase tracking-wider mb-2">Vehicles</h3>
              <h2 className="text-3xl font-bold text-slate-900">Explore More Vehicles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCars.map((relatedCar, idx) => (
                <CarCard
                  key={relatedCar.id || idx}
                  car={relatedCar}
                  onClick={() => window.location.href = `/inventory/${relatedCar.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && allImages.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition z-50"
          >
            <X className="w-8 h-8" />
          </button>

          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 transition z-50"
              >
                <ChevronLeft className="w-12 h-12" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 transition z-50"
              >
                <ChevronRight className="w-12 h-12" />
              </button>
            </>
          )}

          <div
            className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allImages[lightboxIndex]}
              alt={`${car.model} - ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
};
