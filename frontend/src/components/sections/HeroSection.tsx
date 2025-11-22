"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BRANDS } from "@/constants/brands";

export interface SearchParams {
  make: string;
  model?: string;
  priceRange?: string;
  year?: string;
}

interface HeroSectionProps {
  onSearch: (params: SearchParams) => void;
}

const PRICE_RANGES = [
  "Under $50,000",
  "$50,000 - $100,000",
  "$100,000 - $200,000",
  "$200,000 - $500,000",
  "$500,000+",
];

const YEARS = Array.from({ length: 11 }, (_, i) => (2025 - i).toString()).concat(["Before 2015"]);

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    make: "",
    model: "",
    priceRange: "",
    year: "",
  });

  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0D0F12] pt-0">
      {/* Ambient Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#1A4AFF] opacity-10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#1A4AFF] opacity-5 blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">

          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center pt-10 lg:pt-0">
            <div className="mb-8 relative">
              <div className="inline-block px-3 py-1 mb-6 border border-[#1A4AFF]/30 rounded-full bg-[#1A4AFF]/5 backdrop-blur-sm">
                <span className="text-[#1A4AFF] text-xs font-bold tracking-widest uppercase">
                  Premium Inventory
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                DRIVE WHAT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  DEFINES YOU
                </span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl max-w-xl font-light leading-relaxed border-l-2 border-[#1A4AFF] pl-6">
                Curated for the exceptional. Experience a collection where engineering meets art.
              </p>
            </div>

            {/* Search Bar - Material Design */}
            <div className="bg-[#111317] border border-white/5 rounded-2xl p-6 shadow-2xl shadow-black/50 max-w-3xl relative overflow-hidden group">
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A4AFF]/0 via-[#1A4AFF]/5 to-[#1A4AFF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10">
                {/* Make */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Make</label>
                  <div className="relative">
                    <select
                      className="w-full h-12 bg-[#0D0F12] border border-white/10 rounded-lg px-4 text-white appearance-none focus:border-[#1A4AFF] focus:ring-1 focus:ring-[#1A4AFF] outline-none transition-all text-sm font-medium"
                      value={searchParams.make}
                      onChange={(e) => setSearchParams({ ...searchParams, make: e.target.value, model: "" })}
                    >
                      <option value="" className="text-slate-500">All Makes</option>
                      {BRANDS.map((b) => (
                        <option key={b.name} value={b.name} className="text-white bg-[#0D0F12]">
                          {b.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Model */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Model</label>
                  <div className="relative">
                    <select
                      className="w-full h-12 bg-[#0D0F12] border border-white/10 rounded-lg px-4 text-white appearance-none focus:border-[#1A4AFF] focus:ring-1 focus:ring-[#1A4AFF] outline-none transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      value={searchParams.model}
                      onChange={(e) => setSearchParams({ ...searchParams, model: e.target.value })}
                      disabled={!searchParams.make}
                    >
                      <option value="" className="text-slate-500">All Models</option>
                      {searchParams.make && BRANDS.find(b => b.name === searchParams.make)?.models.map((model) => (
                        <option key={model} value={model} className="text-white bg-[#0D0F12]">
                          {model}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Price</label>
                  <div className="relative">
                    <select
                      className="w-full h-12 bg-[#0D0F12] border border-white/10 rounded-lg px-4 text-white appearance-none focus:border-[#1A4AFF] focus:ring-1 focus:ring-[#1A4AFF] outline-none transition-all text-sm font-medium"
                      value={searchParams.priceRange}
                      onChange={(e) => setSearchParams({ ...searchParams, priceRange: e.target.value })}
                    >
                      <option value="" className="text-slate-500">Any Price</option>
                      {PRICE_RANGES.map((range) => (
                        <option key={range} value={range} className="text-white bg-[#0D0F12]">
                          {range}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <div className="md:col-span-3 flex items-end">
                  <button
                    onClick={() => onSearch(searchParams)}
                    className="w-full h-12 bg-[#1A4AFF] hover:bg-[#1539cc] text-white rounded-lg font-bold text-sm transition-all shadow-lg shadow-[#1A4AFF]/25 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Search</span>
                    <Search className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image - Asymmetric & Overlapping */}
          <div className="lg:col-span-5 relative h-[300px] md:h-[400px] lg:h-[800px] w-full flex items-center justify-center lg:justify-end pointer-events-none mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-transparent z-10 lg:hidden" />
            <div className="relative w-full lg:w-[180%] max-w-lg lg:max-w-none lg:right-[-40%] z-0 flex justify-center lg:block">
              {/* Background Text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-[60%] lg:-translate-x-[60%] lg:-translate-y-[70%] z-0 pointer-events-none whitespace-nowrap">
                <h2 className="text-[60px] md:text-[100px] lg:text-[180px] font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white/5 to-white/0 transform -rotate-6 skew-x-12 tracking-tighter select-none">
                  KIMCHI <br className="hidden lg:block" /> MOTORS
                </h2>
              </div>

              <img
                src="/hero-car.png"
                alt="2025 Hyundai Santa Fe"
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl transform scale-110 lg:scale-100"
              />
              {/* Reflection/Glow under the car */}
              <div className="absolute -bottom-4 lg:-bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[60px] lg:h-[100px] bg-[#1A4AFF] opacity-20 blur-[60px] lg:blur-[80px] z-0" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
