import React, { useState } from 'react';
import { Filter, X, Search } from 'lucide-react';
import { BRANDS } from '../data/mockData';
import CarCard from '../components/CarCard';

const ListingPage = ({ cars, onCarClick, onFilter }) => {
    const [filters, setFilters] = useState({ make: '', maxPrice: '' });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    const clearFilters = () => {
        setFilters({ make: '', maxPrice: '' });
        onFilter({ make: '', maxPrice: '' });
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-8 pb-20">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sidebar Filters (Desktop) */}
                    <div className="hidden md:block w-64 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-serif font-bold text-xl text-primary">Filters</h3>
                            {(filters.make || filters.maxPrice) && (
                                <button onClick={clearFilters} className="text-xs text-red-500 font-bold hover:underline">Clear All</button>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Brand</label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="brand"
                                            checked={filters.make === ''}
                                            onChange={() => handleFilterChange('make', '')}
                                            className="accent-accent"
                                        />
                                        <span className={`text-sm ${filters.make === '' ? 'text-primary font-bold' : 'text-slate-500 group-hover:text-primary'}`}>All Brands</span>
                                    </label>
                                    {BRANDS.map(brand => (
                                        <label key={brand.name} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="brand"
                                                checked={filters.make === brand.name}
                                                onChange={() => handleFilterChange('make', brand.name)}
                                                className="accent-accent"
                                            />
                                            <span className={`text-sm ${filters.make === brand.name ? 'text-primary font-bold' : 'text-slate-500 group-hover:text-primary'}`}>{brand.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Max Price</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                >
                                    <option value="">Any Price</option>
                                    <option value="500000">Up to $500k</option>
                                    <option value="1000000">Up to $1M</option>
                                    <option value="2000000">Up to $2M</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-serif font-bold text-primary">Inventory <span className="text-slate-400 text-lg font-sans font-normal">({cars.length} vehicles)</span></h1>

                            {/* Mobile Filter Toggle */}
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="md:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm text-sm font-bold text-primary"
                            >
                                <Filter className="w-4 h-4" /> Filters
                            </button>
                        </div>

                        {cars.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cars.map(car => (
                                    <CarCard key={car.id} car={car} onClick={onCarClick} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-2">No vehicles found</h3>
                                <p className="text-slate-500 mb-6">Try adjusting your filters to see more results.</p>
                                <button onClick={clearFilters} className="text-accent font-bold hover:underline">Clear all filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Modal */}
            {isFilterOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex justify-end backdrop-blur-sm">
                    <div className="bg-white w-80 h-full p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-serif font-bold text-xl text-primary">Filters</h3>
                            <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">Brand</label>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="mobile-brand"
                                            checked={filters.make === ''}
                                            onChange={() => handleFilterChange('make', '')}
                                            className="w-5 h-5 accent-accent"
                                        />
                                        <span className="font-medium text-slate-700">All Brands</span>
                                    </label>
                                    {BRANDS.map(brand => (
                                        <label key={brand.name} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="mobile-brand"
                                                checked={filters.make === brand.name}
                                                onChange={() => handleFilterChange('make', brand.name)}
                                                className="w-5 h-5 accent-accent"
                                            />
                                            <span className="font-medium text-slate-700">{brand.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">Max Price</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                >
                                    <option value="">Any Price</option>
                                    <option value="500000">Up to $500k</option>
                                    <option value="1000000">Up to $1M</option>
                                    <option value="2000000">Up to $2M</option>
                                </select>
                            </div>

                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition"
                            >
                                Show Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListingPage;
