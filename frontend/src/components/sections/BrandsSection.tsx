"use client";

import { BRANDS } from "@/constants/brands";

export const BrandsSection = () => {
    return (
        <section className="py-16 container mx-auto px-4 overflow-hidden">
            <h2 className="text-2xl font-bold mb-8 text-center md:text-left">Browse by brands</h2>

            {/* Desktop View - Grid (Hidden on Mobile) */}
            <div className="hidden md:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {BRANDS.slice(0, 8).map((brand) => (
                    <div
                        key={brand.name}
                        className="group border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer h-32"
                    >
                        <img
                            src={brand.logo}
                            alt={brand.name}
                            className="h-12 w-auto object-contain mb-3 group-hover:scale-110 transition-transform duration-300 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                        />
                        <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                            {brand.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Mobile View - Marquee (Hidden on Desktop) */}
            <div className="md:hidden relative">
                {/* Gradient Masks for smooth fade */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />

                <div className="flex gap-4 animate-[marquee_20s_linear_infinite]">
                    {/* Duplicate list for seamless loop */}
                    {[...BRANDS, ...BRANDS].map((brand, index) => (
                        <div
                            key={`${brand.name}-${index}`}
                            className="flex-shrink-0 w-32 h-32 border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center bg-white shadow-sm"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-10 w-auto object-contain mb-2 grayscale opacity-80"
                            />
                            <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wide text-center">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
