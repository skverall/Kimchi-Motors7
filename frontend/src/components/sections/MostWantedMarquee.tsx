"use client";

import { ChevronRight } from "lucide-react";
import type { CarItem } from "@/components/cars/CarCard";

interface MostWantedMarqueeProps {
  cars: CarItem[];
  onClick: (car: CarItem) => void;
}

export const MostWantedMarquee: React.FC<MostWantedMarqueeProps> = ({
  cars,
  onClick,
}) => {
  if (!cars.length) return null;

  return (
    <section className="py-10 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-[0.25em] uppercase text-slate-400">
          Most Wanted
        </h2>
        <span className="text-xs text-slate-500 flex items-center gap-1">
          Premium inventory in motion
          <ChevronRight className="w-3 h-3" />
        </span>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-900 to-transparent z-10" />
        <div className="flex gap-6 animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused]">
          {[...cars, ...cars].map((car, idx) => (
            <button
              key={`${car.make}-${car.model}-${idx}`}
              type="button"
              onClick={() => onClick(car)}
              className="min-w-[260px] bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-4 hover:bg-white/10 hover:border-white/30 transition-colors cursor-pointer"
            >
              <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0">
                <img
                  src={car.imageVersion && car.image ? `${car.image}${car.image.includes("?") ? "&" : "?"}t=${car.imageVersion}` : car.image || ""}
                  alt={car.model}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {car.make}
                </div>
                <div className="text-sm font-semibold text-white truncate">
                  {car.model}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  ${car.price.toLocaleString()} · {car.year}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostWantedMarquee;

