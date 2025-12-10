"use client";

import { useState, useMemo } from "react";
import { Search, Filter, SlidersHorizontal, Heart, X, ChevronDown, MessageCircle, Phone } from "lucide-react";
import { CarCard } from "@/components/cars/CarCard";
import { BRANDS } from "@/constants/brands";
import type { CarItem } from "@/types/car";
import { useFavorites } from "@/hooks/useFavorites";

export interface InventoryFilters {
    make?: string;
    model?: string;
    minPrice?: string;
    maxPrice?: string;
    minYear?: string;
    maxYear?: string;
    searchQuery?: string;
}

interface InventorySectionProps {
    cars: CarItem[];
    onCarClick: (car: CarItem) => void;
    initialFilters?: InventoryFilters;
}

type SortOption = "newest" | "price_asc" | "price_desc" | "year_desc" | "year_asc";

export const InventorySection: React.FC<InventorySectionProps> = ({ cars, onCarClick, initialFilters }) => {
    const { isFavorite } = useFavorites();

    // Filter States
    const [searchQuery, setSearchQuery] = useState(initialFilters?.searchQuery || "");
    const [selectedMake, setSelectedMake] = useState(initialFilters?.make || "");
    const [selectedModel, setSelectedModel] = useState(initialFilters?.model || "");
    const [minPrice, setMinPrice] = useState(initialFilters?.minPrice || "");
    const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || "");
    const [minYear, setMinYear] = useState(initialFilters?.minYear || "");
    const [maxYear, setMaxYear] = useState(initialFilters?.maxYear || "");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Derived Models based on Make
    const availableModels = useMemo(() => {
        if (!selectedMake) return [];
        const brand = BRANDS.find(b => b.name === selectedMake);
        return brand ? brand.models : [];
    }, [selectedMake]);

    // Filtering Logic
    const filteredCars = useMemo(() => {
        return cars.filter(car => {
            // Search Query
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const match =
                    car.make.toLowerCase().includes(query) ||
                    car.model.toLowerCase().includes(query) ||
                    String(car.year).includes(query);
                if (!match) return false;
            }

            // Make & Model
            if (selectedMake && car.make !== selectedMake) return false;
            if (selectedModel && car.model !== selectedModel) return false;

            // Price
            if (minPrice && car.price < Number(minPrice)) return false;
            if (maxPrice && car.price > Number(maxPrice)) return false;

            // Year
            if (minYear && car.year < Number(minYear)) return false;
            if (maxYear && car.year > Number(maxYear)) return false;

            // Favorites
            if (showFavoritesOnly && !isFavorite(String(car.id))) return false;

            return true;
        });
    }, [cars, searchQuery, selectedMake, selectedModel, minPrice, maxPrice, minYear, maxYear, showFavoritesOnly, isFavorite]);

    // Sorting Logic
    const sortedCars = useMemo(() => {
        return [...filteredCars].sort((a, b) => {
            switch (sortBy) {
                case "price_asc": return a.price - b.price;
                case "price_desc": return b.price - a.price;
                case "year_desc": return b.year - a.year;
                case "year_asc": return a.year - b.year;
                case "newest": default: return 0; // Assuming default order is newest/relevant
            }
        });
    }, [filteredCars, sortBy]);

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedMake("");
        setSelectedModel("");
        setMinPrice("");
        setMaxPrice("");
        setMinYear("");
        setMaxYear("");
        setShowFavoritesOnly(false);
        setSortBy("newest");
    };

    return (
        <section className="py-12 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4">

                {/* Header & Search */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Inventory</h1>
                            <p className="text-slate-500 mt-1">
                                Showing {sortedCars.length} vehicles
                                {showFavoritesOnly && <span className="ml-2 text-red-500 font-medium">(Favorites)</span>}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search make, model, or year..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <button
                                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                                className="md:hidden p-2.5 bg-white border border-slate-200 rounded-full text-slate-600"
                            >
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Active Filters Tags (Optional - could be added later) */}
                </div>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <aside className={`
            md:w-72 space-y-8
            ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}
          `}>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 sticky top-24">
                            <div className="flex items-center justify-between">
                                <h2 className="font-bold text-lg flex items-center gap-2">
                                    <SlidersHorizontal className="w-4 h-4" /> Filters
                                </h2>
                                <button
                                    onClick={clearFilters}
                                    className="text-xs text-blue-600 font-semibold hover:underline"
                                >
                                    Reset All
                                </button>
                            </div>

                            {/* Favorites Toggle */}
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Heart className={`w-4 h-4 ${showFavoritesOnly ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
                                    Favorites Only
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={showFavoritesOnly}
                                        onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                                    />
                                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            {/* Make & Model */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Make</label>
                                    <div className="relative">
                                        <select
                                            value={selectedMake}
                                            onChange={(e) => {
                                                setSelectedMake(e.target.value);
                                                setSelectedModel("");
                                            }}
                                            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">All Makes</option>
                                            {BRANDS.map(b => (
                                                <option key={b.name} value={b.name}>{b.name}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Model</label>
                                    <div className="relative">
                                        <select
                                            value={selectedModel}
                                            onChange={(e) => setSelectedModel(e.target.value)}
                                            disabled={!selectedMake}
                                            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <option value="">All Models</option>
                                            {availableModels.map(m => (
                                                <option key={m} value={m}>{m}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Price Range</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Year Range */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Year Range</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        placeholder="From"
                                        value={minYear}
                                        onChange={(e) => setMinYear(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="number"
                                        placeholder="To"
                                        value={maxYear}
                                        onChange={(e) => setMaxYear(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Sorting Bar */}
                        <div className="flex justify-end mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-slate-500">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="year_desc">Year: Newest</option>
                                    <option value="year_asc">Year: Oldest</option>
                                </select>
                            </div>
                        </div>

                        {/* Grid */}
                        {sortedCars.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedCars.map((car, index) => (
                                    <CarCard
                                        key={`${car.id}-${index}`}
                                        car={car}
                                        onClick={onCarClick}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 border-dashed">
                                {
                                    selectedMake ? (
                                        <>
                                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Search className="w-8 h-8 text-blue-300" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                                No {selectedMake} available
                                            </h3>
                                            <p className="text-slate-500 max-w-sm mx-auto mb-8">
                                                We don't have these cars in stock right now, but you can always order one through us.
                                            </p>
                                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                                <button
                                                    onClick={() => {
                                                        const message = `Hi, I am looking for a ${selectedMake}, but I see it's not in stock. Can I order one?`;
                                                        window.open(`https://wa.me/971564742456?text=${encodeURIComponent(message)}`, '_blank');
                                                    }}
                                                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                                                >
                                                    <MessageCircle className="w-4 h-4" /> Write in WhatsApp
                                                </button>
                                                <button
                                                    onClick={() => window.open('tel:+971564742456')}
                                                    className="flex items-center gap-2 bg-white border border-slate-200 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition"
                                                >
                                                    <Phone className="w-4 h-4" /> +971 56 474 2456
                                                </button>
                                            </div>
                                            <button
                                                onClick={clearFilters}
                                                className="mt-8 text-sm text-slate-400 font-medium hover:text-slate-600 hover:underline"
                                            >
                                                View all other vehicles
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Search className="w-8 h-8 text-slate-300" />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-1">No vehicles found</h3>
                                            <p className="text-slate-500 mb-6">Try adjusting your filters or search query.</p>
                                            <button
                                                onClick={clearFilters}
                                                className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition"
                                            >
                                                Clear All Filters
                                            </button>
                                        </>
                                    )}
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </section >
    );
};
