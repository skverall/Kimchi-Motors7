"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BRANDS } from "@/constants/brands";

export interface SearchParams {
  make: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface HeroSectionProps {
  onSearch: (params: SearchParams) => void;
}

const MIN_PRICE = 0;
const MAX_PRICE = 2000000;

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    make: "",
    model: "",
    minPrice: undefined,
    maxPrice: undefined,
  });

  const formatPriceValue = (value?: number) =>
    value !== undefined && value !== null ? value.toLocaleString() : "";

  const clampPrice = (value?: number) => {
    if (value === undefined) return undefined;
    return Math.min(Math.max(value, MIN_PRICE), MAX_PRICE);
  };

  const handleMinPriceChange = (rawInput: string) => {
    const numericOnly = rawInput.replace(/[^\d]/g, "");
    const parsed = numericOnly ? clampPrice(Number(numericOnly)) : undefined;

    setSearchParams((prev) => {
      const minPrice = parsed;
      const maxPrice =
        prev.maxPrice !== undefined &&
          parsed !== undefined &&
          parsed > prev.maxPrice
          ? parsed
          : prev.maxPrice;

      return { ...prev, minPrice, maxPrice };
    });
  };

  const handleMaxPriceChange = (rawInput: string) => {
    const numericOnly = rawInput.replace(/[^\d]/g, "");
    const parsed = numericOnly ? clampPrice(Number(numericOnly)) : undefined;

    setSearchParams((prev) => {
      const maxPrice = parsed;
      const minPrice =
        prev.minPrice !== undefined &&
          parsed !== undefined &&
          parsed < prev.minPrice
          ? parsed
          : prev.minPrice;

      return { ...prev, minPrice, maxPrice };
    });
  };

  return (
    <div className="relative min-h-[800px] flex items-center justify-center overflow-hidden bg-slate-900 py-20">
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920"
          alt="Hero"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 tracking-tight">
              FIND YOUR
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                {" "}
                DREAM CAR
              </span>
            </h1>
            <p className="text-slate-300 text-base md:text-xl max-w-2xl mx-auto font-light px-4">
              Explore our exclusive collection of premium vehicles. Luxury, performance,
              and elegance in every mile.
            </p>
          </div>

          {/* Search Container */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">

              {/* Make */}
              <div className="md:col-span-3 relative">
                <select
                  className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl px-4 text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  value={searchParams.make}
                  onChange={(e) => setSearchParams({ ...searchParams, make: e.target.value })}
                >
                  <option value="" className="text-slate-400">Make</option>
                  {BRANDS.map((b) => (
                    <option key={b.name} value={b.name} className="text-slate-900">
                      {b.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Model */}
              <div className="md:col-span-3 relative">
                <select
                  className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl px-4 text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                  value={searchParams.model}
                  onChange={(e) => setSearchParams({ ...searchParams, model: e.target.value })}
                >
                  <option value="" className="text-slate-400">Model</option>
                  <option value="911" className="text-slate-900">911</option>
                  <option value="Cullinan" className="text-slate-900">Cullinan</option>
                  <option value="Huracan" className="text-slate-900">Huracan</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Min Price */}
              <div className="md:col-span-2 relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors text-sm">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatPriceValue(searchParams.minPrice)}
                  onChange={(e) => handleMinPriceChange(e.target.value)}
                  className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl pl-7 pr-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm placeholder-slate-400"
                  placeholder="Min Price"
                />
              </div>

              {/* Max Price */}
              <div className="md:col-span-2 relative group">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors text-sm">$</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={formatPriceValue(searchParams.maxPrice)}
                  onChange={(e) => handleMaxPriceChange(e.target.value)}
                  className="w-full h-12 bg-slate-800/50 border border-white/10 rounded-xl pl-7 pr-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm placeholder-slate-400"
                  placeholder="Max Price"
                />
              </div>

              {/* Search Button */}
              <div className="md:col-span-2">
                <button
                  onClick={() => onSearch(searchParams)}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
