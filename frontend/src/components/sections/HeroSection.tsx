"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BRANDS } from "@/constants/brands";

export interface SearchParams {
  make: string;
  model?: string;
  maxPrice: string;
}

interface HeroSectionProps {
  onSearch: (params: SearchParams) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    make: "",
    model: "",
    maxPrice: "",
  });

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

        <div className="bg-white p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="flex-1 text-left">
            <label className="text-xs text-slate-500 font-semibold ml-2">Brand</label>
            <select
              className="w-full bg-slate-50 rounded-lg p-3 text-sm border-none focus:ring-2 focus:ring-blue-100 font-medium text-slate-900"
              value={searchParams.make}
              onChange={(e) =>
                setSearchParams({ ...searchParams, make: e.target.value })
              }
            >
              <option value="">All Brands</option>
              {BRANDS.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 text-left">
            <label className="text-xs text-slate-500 font-semibold ml-2">
              Max Price
            </label>
            <select
              className="w-full bg-slate-50 rounded-lg p-3 text-sm border-none focus:ring-2 focus:ring-blue-100 font-medium text-slate-900"
              value={searchParams.maxPrice}
              onChange={(e) =>
                setSearchParams({ ...searchParams, maxPrice: e.target.value })
              }
            >
              <option value="">Any Price</option>
              <option value="500000">Up to $500k</option>
              <option value="1000000">Up to $1M</option>
              <option value="2000000">Up to $2M</option>
            </select>
          </div>
          <button
            onClick={() => onSearch(searchParams)}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2 mt-auto md:h-[66px]"
          >
            <Search className="w-5 h-5" /> Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

