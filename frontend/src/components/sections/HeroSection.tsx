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
    minPrice: MIN_PRICE,
    maxPrice: MAX_PRICE,
  });

  const formatPriceValue = (value?: number) =>
    value !== undefined && value !== null ? value.toLocaleString() : "";

  const formatRangeLabel = (min?: number, max?: number) => {
    const minLabel = min !== undefined ? `$${min.toLocaleString()}` : "No min";
    const maxLabel = max !== undefined ? `$${max.toLocaleString()}` : "No max";
    return `${minLabel} — ${maxLabel}`;
  };

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
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              FIND YOUR
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                {" "}
                DREAM CAR
              </span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Explore our exclusive collection of premium vehicles. Luxury, performance,
              and elegance in every mile.
            </p>
          </div>

          {/* Search Container */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">

              {/* Make & Model */}
              <div className="lg:col-span-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Make */}
                  <div className="space-y-2">
                    <div className="relative">
                      <select
                        className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3.5 text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                  </div>

                  {/* Model */}
                  <div className="space-y-2">
                    <div className="relative">
                      <select
                        className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3.5 text-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="lg:col-span-6">
                <label className="text-sm text-white font-semibold mb-3 block">Price range</label>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Min */}
                    <div>
                      <div className="flex justify-between text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                        <span>Min</span>
                        <span>Entry Price</span>
                      </div>
                      <div className="relative group">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">$</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={formatPriceValue(searchParams.minPrice)}
                          onChange={(e) => handleMinPriceChange(e.target.value)}
                          className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 pl-7 pr-3 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    {/* Max */}
                    <div>
                      <div className="flex justify-between text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                        <span>Max</span>
                        <span>Dream Cap</span>
                      </div>
                      <div className="relative group">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">$</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={formatPriceValue(searchParams.maxPrice)}
                          onChange={(e) => handleMaxPriceChange(e.target.value)}
                          className="w-full bg-slate-800/50 border border-white/10 rounded-lg py-2 pl-7 pr-3 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Selected Range Bar */}
                  <div className="bg-slate-800/50 rounded-lg p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400">Selected Range</span>
                    </div>
                    <span className="text-xs font-bold text-white">{formatRangeLabel(searchParams.minPrice, searchParams.maxPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:col-span-2">
                <button
                  onClick={() => onSearch(searchParams)}
                  className="w-full h-[136px] bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-600/20 flex flex-col items-center justify-center gap-2 group"
                >
                  <Search className="w-8 h-8 group-hover:scale-110 transition-transform" />
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
