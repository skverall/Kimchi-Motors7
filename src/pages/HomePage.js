import React, { useState } from 'react';
import { Search, ChevronRight, MessageCircle, DollarSign, Check, ChevronDown, ArrowRight } from 'lucide-react';
import { BRANDS } from '../data/mockData';
import CarCard from '../components/CarCard';

const HeroSection = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState({ make: '', model: '', maxPrice: '' });

    return (
    <div className="relative h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920" 
                alt="Hero" 
                className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center mt-10">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                FIND YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">DREAM CAR</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
                Explore our exclusive collection of premium vehicles. Luxury, performance, and elegance in every mile.
            </p>

            {/* Search Box */}
            <div className="bg-white p-4 rounded-2xl shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
                <div className="flex-1 text-left">
                    <label className="text-xs text-slate-500 font-semibold ml-2">Brand</label>
                    <select 
                        className="w-full bg-slate-50 rounded-lg p-3 text-sm border-none focus:ring-2 focus:ring-blue-100 font-medium text-slate-900"
                        value={searchParams.make}
                        onChange={(e) => setSearchParams({...searchParams, make: e.target.value})}
                    >
                        <option value="">All Brands</option>
                        {BRANDS.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                    </select>
                </div>
                <div className="flex-1 text-left">
                    <label className="text-xs text-slate-500 font-semibold ml-2">Max Price</label>
                    <select 
                         className="w-full bg-slate-50 rounded-lg p-3 text-sm border-none focus:ring-2 focus:ring-blue-100 font-medium text-slate-900"
                         value={searchParams.maxPrice}
                         onChange={(e) => setSearchParams({...searchParams, maxPrice: e.target.value})}
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
)};

const Marquee = ({ cars, onClick }) => (
  <div className="py-12 bg-slate-50 overflow-hidden border-b border-slate-200">
    <div className="container mx-auto px-4 mb-8 flex justify-between items-end">
       <div>
          <h2 className="text-3xl font-bold text-slate-900">Most Wanted</h2>
          <p className="text-slate-500 mt-2">The most desired vehicles in our collection</p>
       </div>
       <div className="hidden md:flex gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
            <div className="text-xs font-bold text-blue-600 uppercase">Live Feed</div>
       </div>
    </div>
    
    <div className="relative w-full">
      <div className="flex animate-marquee gap-6 whitespace-nowrap px-4">
        {[...cars, ...cars].map((car, idx) => (
          <div 
            key={`${car.id}-${idx}`} 
            onClick={() => onClick(car)}
            className="inline-block w-[300px] bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex-shrink-0 cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <div className="h-40">
                <img src={car.image} className="w-full h-full object-cover" alt={car.model}/>
            </div>
            <div className="p-4 whitespace-normal">
                <h4 className="font-bold text-slate-900 truncate">{car.make} {car.model}</h4>
                <p className="text-blue-600 font-semibold text-sm mt-1">${car.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      .animate-marquee {
        animation: marquee 30s linear infinite;
      }
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </div>
);

const HowToBuy = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16">How to Buy a Car?</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: Search, title: "Choose Car", desc: "Browse our exclusive inventory and pick your dream vehicle." },
          { icon: MessageCircle, title: "Contact Us", desc: "Get in touch with our agents via WhatsApp or Phone." },
          { icon: DollarSign, title: "Payment", desc: "Secure financing options or direct bank transfer." },
          { icon: Check, title: "Delivery", desc: "We deliver the car to your doorstep, anywhere." }
        ].map((step, idx) => (
          <div key={idx} className="relative p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-slate-100 group">
            <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <step.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
            <p className="text-slate-500 leading-relaxed">{step.desc}</p>
            {idx < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ChevronRight className="text-slate-300 w-8 h-8" />
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q: "Do you offer international shipping?", a: "Yes, we ship cars globally with full insurance coverage." },
    { q: "Can I trade in my old car?", a: "Absolutely. We offer competitive market rates for trade-ins." },
    { q: "Do you provide warranty?", a: "All our vehicles come with a minimum 1-year comprehensive warranty." },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:bg-slate-50"
              >
                {item.q}
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === idx && (
                <div className="p-5 pt-0 text-slate-600 border-t border-slate-100 mt-2">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const HomePage = ({ onSearch, cars, onCarClick, onNavigate }) => {
    return (
        <>
            <HeroSection onSearch={onSearch} />
            
            {/* Brands Grid */}
            <div className="py-16 container mx-auto px-4">
                <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Browse Premium Brands</h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {BRANDS.map(brand => (
                        <img key={brand.name} src={brand.logo} alt={brand.name} className="h-12 md:h-16 object-contain hover:scale-110 transition-transform cursor-pointer" />
                    ))}
                </div>
            </div>

            {/* Most Wanted Marquee */}
            <Marquee cars={cars.filter(c => c.mostWanted)} onClick={onCarClick} />

            {/* Explore Section */}
            <section className="py-20 container mx-auto px-4">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Featured Arrivals</h2>
                        <p className="text-slate-500">Fresh from the port to our showroom.</p>
                    </div>
                    <button onClick={() => onNavigate('listing')} className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        View All Inventory <ArrowRight className="w-4 h-4"/>
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {cars.filter(c => c.featured).slice(0, 4).map(car => (
                        <CarCard key={car.id} car={car} onClick={onCarClick} />
                    ))}
                </div>
            </section>

            <HowToBuy />
            <FAQ />
        </>
    )
}

export default HomePage;
