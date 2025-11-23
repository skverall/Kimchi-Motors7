"use client";

import { BRANDS } from "@/constants/brands";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export const BrandsSection = () => {
    return (
        <section className="py-20 container mx-auto px-4 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-center md:text-left"
            >
                <h2 className="text-3xl font-bold text-slate-900">Browse by brands</h2>
                <p className="text-slate-500 mt-2">Explore our collection of premium vehicles</p>
            </motion.div>

            {/* Desktop View - Grid (Hidden on Mobile) */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="hidden md:grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6"
            >
                {BRANDS.slice(0, 8).map((brand) => (
                    <motion.div
                        key={brand.name}
                        variants={itemVariants}
                        className="group relative bg-white rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-xl border border-slate-100 hover:border-blue-500/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="h-14 w-14 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
                                />
                            </div>
                            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
                                {brand.name}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Mobile View - Marquee (Hidden on Desktop) */}
            <div className="md:hidden relative mt-8">
                {/* Gradient Masks for smooth fade */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />

                <div className="flex gap-4 animate-[marquee_25s_linear_infinite]">
                    {/* Duplicate list for seamless loop */}
                    {[...BRANDS, ...BRANDS].map((brand, index) => (
                        <div
                            key={`${brand.name}-${index}`}
                            className="flex-shrink-0 w-36 h-36 bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-12 w-auto object-contain mb-3 grayscale opacity-80"
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
