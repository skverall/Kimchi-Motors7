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
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920"
          alt="Hero"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center mt-10">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
          FIND YOUR
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            {" "}
            DREAM CAR
          </span>
        </h1>
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
          Explore our exclusive collection of premium vehicles. Luxury, performance,
          and elegance in every mile.
        </p>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto flex flex-col lg:flex-row items-end gap-6">
          {/* Make */}
          <div className="flex-1 w-full">
            <select
              className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all [&>option]:text-slate-900"
              value={searchParams.make}
              onChange={(e) =>
                setSearchParams({ ...searchParams, make: e.target.value })
              }
            >
              <option value="" className="text-slate-500">Make</option>
              {BRANDS.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Model */}
          <div className="flex-1 w-full">
            <select
              className="w-full bg-transparent border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all [&>option]:text-slate-900"
              value={searchParams.model}
              onChange={(e) =>
                setSearchParams({ ...searchParams, model: e.target.value })
              }
            >
              <option value="" className="text-slate-500">Model</option>
              {/* Placeholder for models - would typically be filtered by make */}
              <option value="911">911</option>
              <option value="Cullinan">Cullinan</option>
              <option value="Huracan">Huracan</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="flex-[2] w-full px-2">
            <label className="text-sm text-white font-semibold mb-3 block text-left">
              Price range
            </label>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl shadow-blue-500/15 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="group relative">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-white/60 mb-1">
                    <span>Min</span>
                    <span className="text-white/40">Entry price</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-blue-100/80">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="0"
                      value={formatPriceValue(searchParams.minPrice)}
                      onChange={(e) => handleMinPriceChange(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-xl pl-7 pr-3 py-3 text-white font-semibold placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="group relative">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-white/60 mb-1">
                    <span>Max</span>
                    <span className="text-white/40">Dream cap</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-blue-100/80">$</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder={MAX_PRICE.toLocaleString()}
                      value={formatPriceValue(searchParams.maxPrice)}
                      onChange={(e) => handleMaxPriceChange(e.target.value)}
                      className="w-full bg-white/5 border border-white/20 rounded-xl pl-7 pr-3 py-3 text-white font-semibold placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse" />
                  <span className="uppercase tracking-[0.16em] text-[10px]">
                    Selected range
                  </span>
                </div>
                <span className="text-white font-semibold">
                  {formatRangeLabel(searchParams.minPrice, searchParams.maxPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={() => onSearch(searchParams)}
            className="w-full lg:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 h-[50px] mb-1"
          >
            <Search className="w-5 h-5" /> Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
