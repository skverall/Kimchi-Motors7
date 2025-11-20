import React from 'react';
import { Filter, Car } from 'lucide-react';
import CarCard from '../components/CarCard';
import { BRANDS } from '../data/mockData';

const ListingPage = ({ cars, onCarClick, onFilter }) => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="w-full md:w-64 shrink-0 space-y-6">
                    <div className="flex items-center gap-2 text-lg font-bold mb-4"><Filter className="w-5 h-5" /> Filters</div>
                    
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Brand</label>
                        <select onChange={(e) => onFilter({make: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded">
                            <option value="">All Brands</option>
                            {BRANDS.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Max Price</label>
                        <input type="range" min="0" max="3000000" step="100000" className="w-full accent-blue-600" onChange={(e) => onFilter({maxPrice: e.target.value})} />
                        <div className="flex justify-between text-xs text-slate-500 mt-1">
                            <span>$0</span>
                            <span>$3M+</span>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1">
                     <h1 className="text-2xl font-bold mb-6">Inventory ({cars.length})</h1>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {cars.map(car => (
                            <CarCard key={car.id} car={car} onClick={onCarClick} />
                        ))}
                        {cars.length === 0 && (
                            <div className="col-span-3 text-center py-20 text-slate-400">
                                <Car className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                No vehicles found matching your criteria.
                            </div>
                        )}
                     </div>
                </div>
            </div>
        </div>
    )
};

export default ListingPage;
