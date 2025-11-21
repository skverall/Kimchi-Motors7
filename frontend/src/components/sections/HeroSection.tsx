"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BRANDS } from "@/constants/brands";

import { DualRangeSlider } from "@/components/ui/DualRangeSlider";

export interface SearchParams {
  make: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface HeroSectionProps {
  onSearch: (params: SearchParams) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    make: "",
    model: "",
    minPrice: 0,
    maxPrice: 2000000,
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

        <div className="bg-white p-4 rounded shadow-xl max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-4">
          {/* Make */}
          <div className="flex-1 w-full">
            <select
              className="w-full bg-slate-50 rounded px-4 py-3 text-sm border-none focus:ring-2 focus:ring-red-100 font-medium text-slate-700"
              value={searchParams.make}
              onChange={(e) =>
                setSearchParams({ ...searchParams, make: e.target.value })
              }
            >
              <option value="">Make</option>
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
              className="w-full bg-slate-50 rounded px-4 py-3 text-sm border-none focus:ring-2 focus:ring-red-100 font-medium text-slate-700"
              value={searchParams.model}
              onChange={(e) =>
                setSearchParams({ ...searchParams, model: e.target.value })
              }
            >
              <option value="">Model</option>
              {/* Placeholder for models - would typically be filtered by make */}
              <option value="911">911</option>
              <option value="Cullinan">Cullinan</option>
              <option value="Huracan">Huracan</option>
            </select>
          </div>

          {/* Price Slider */}
          <div className="flex-[2] w-full px-2">
            <label className="text-xs text-slate-500 font-medium mb-1 block">
              Price
            </label>
            <DualRangeSlider
              min={0}
              max={2000000}
              step={10000}
              value={[searchParams.minPrice || 0, searchParams.maxPrice || 2000000]}
              onChange={(value) =>
                setSearchParams({
                  ...searchParams,
                  minPrice: value[0],
                  maxPrice: value[1],
                })
              }
            />
          </div>

          {/* Search Button */}
          <button
            onClick={() => onSearch(searchParams)}
            className="w-full lg:w-auto bg-red-700 text-white px-10 py-3 rounded font-bold hover:bg-red-800 transition flex items-center justify-center gap-2 h-[50px]"
          >
            <Search className="w-5 h-5" /> Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

