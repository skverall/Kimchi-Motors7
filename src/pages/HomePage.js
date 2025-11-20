import React, { useState } from 'react';
import { Search, ChevronRight, MessageCircle, DollarSign, Check, ChevronDown, ArrowRight, Star } from 'lucide-react';
import { BRANDS } from '../data/mockData';
import CarCard from '../components/CarCard';

const HeroSection = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({ make: '', model: '', maxPrice: '' });

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920"
          alt="Hero"
          className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
            Excellence in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Motion</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-xl mb-12 font-light leading-relaxed border-l-2 border-accent pl-6">
            Discover a curated collection of the world's finest vehicles.
            Where luxury meets performance, and service meets perfection.
          </p>

          {/* Search Box */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl max-w-3xl flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-xs text-slate-400 font-bold uppercase tracking-wider ml-2 mb-1 block">Brand</label>
              <select
                className="w-full bg-white/5 text-white rounded-xl p-3 text-sm border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                value={searchParams.make}
                onChange={(e) => setSearchParams({ ...searchParams, make: e.target.value })}
              >
                <option value="" className="text-slate-900">All Brands</option>
                {BRANDS.map(b => <option key={b.name} value={b.name} className="text-slate-900">{b.name}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs text-slate-400 font-bold uppercase tracking-wider ml-2 mb-1 block">Max Price</label>
              <select
                className="w-full bg-white/5 text-white rounded-xl p-3 text-sm border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                value={searchParams.maxPrice}
                onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
              >
                <option value="" className="text-slate-900">Any Price</option>
                <option value="500000" className="text-slate-900">Up to $500k</option>
                <option value="1000000" className="text-slate-900">Up to $1M</option>
                <option value="2000000" className="text-slate-900">Up to $2M</option>
              </select>
            </div>
            <button
              onClick={() => onSearch(searchParams)}
              className="bg-accent text-primary px-8 py-3 rounded-xl font-bold hover:bg-white transition-all flex items-center justify-center gap-2 mt-auto md:h-[66px] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              <Search className="w-5 h-5" /> Search
            </button>
          </div>
        </div>
      </div>
      <style>{`
            @keyframes slow-zoom {
                0% { transform: scale(1); }
                100% { transform: scale(1.1); }
            }
            .animate-slow-zoom {
                animation: slow-zoom 20s linear infinite alternate;
            }
        `}</style>
    </div>
  )
};

const Marquee = ({ cars, onClick }) => (
  <div className="py-16 bg-white overflow-hidden border-b border-slate-100">
    <div className="container mx-auto px-4 mb-10 flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-serif font-bold text-primary">Most Wanted</h2>
        <p className="text-slate-500 mt-2 font-light">The most desired vehicles in our collection</p>
      </div>
      <div className="hidden md:flex gap-2 items-center bg-red-50 px-3 py-1 rounded-full border border-red-100">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        <div className="text-xs font-bold text-red-600 uppercase tracking-wider">Live Feed</div>
      </div>
    </div>

    <div className="relative w-full group">
      <div className="flex animate-marquee gap-8 whitespace-nowrap px-4 group-hover:[animation-play-state:paused]">
        {[...cars, ...cars].map((car, idx) => (
          <div
            key={`${car.id}-${idx}`}
            onClick={() => onClick(car)}
            className="inline-block w-[320px] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex-shrink-0 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="h-48 relative overflow-hidden">
              <img src={car.image} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" alt={car.model} />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-primary shadow-sm">
                {car.year}
              </div>
            </div>
            <div className="p-5 whitespace-normal">
              <h4 className="font-bold text-lg text-primary truncate font-serif">{car.make} {car.model}</h4>
              <div className="flex justify-between items-center mt-2">
                <p className="text-accent font-bold text-lg">${car.price.toLocaleString()}</p>
                <p className="text-xs text-slate-400">{car.mileage.toLocaleString()} km</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <style>{`
      .animate-marquee {
        animation: marquee 40s linear infinite;
      }
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </div>
);

const HowToBuy = () => (
  <section className="py-24 bg-slate-50 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
    <div className="container mx-auto px-4 text-center relative z-10">
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Seamless Acquisition</h2>
      <p className="text-slate-500 mb-16 max-w-2xl mx-auto">Experience a purchasing process as refined as the vehicles we sell.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: Search, title: "Select", desc: "Choose from our curated inventory of premium vehicles." },
          { icon: MessageCircle, title: "Consult", desc: "Connect with our concierge for detailed specifications." },
          { icon: DollarSign, title: "Secure", desc: "Transparent pricing with flexible financing options." },
          { icon: Check, title: "Receive", desc: "White-glove delivery service to your preferred location." }
        ].map((step, idx) => (
          <div key={idx} className="relative p-8 rounded-3xl bg-white hover:shadow-2xl transition-all duration-300 border border-slate-100 group text-left">
            <div className="w-14 h-14 bg-slate-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-sm">
              <step.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3 font-serif">{step.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
            <div className="absolute top-6 right-6 text-slate-200 font-serif text-4xl font-bold opacity-20 group-hover:opacity-100 group-hover:text-slate-100 transition-all">
              0{idx + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q: "Do you offer international shipping?", a: "Yes, we facilitate global logistics with fully insured shipping to major ports worldwide." },
    { q: "Can I trade in my current vehicle?", a: "We offer competitive market valuations for premium trade-ins. Contact our team for an appraisal." },
    { q: "What warranty coverage is included?", a: "Every vehicle undergoes a 150-point inspection and includes a minimum 12-month comprehensive warranty." },
    { q: "Do you offer financing services?", a: "We partner with leading financial institutions to provide tailored financing solutions for our clients." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-serif font-bold text-primary mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-primary hover:text-accent transition-colors"
              >
                {item.q}
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-accent' : 'text-slate-400'}`} />
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/50">
                    {item.a}
                  </div>
                </div>
              </div>
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
      <div className="py-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">Trusted By The World's Best</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {BRANDS.map(brand => (
              <img key={brand.name} src={brand.logo} alt={brand.name} className="h-8 md:h-10 object-contain hover:scale-110 transition-transform cursor-pointer" />
            ))}
          </div>
        </div>
      </div>

      {/* Most Wanted Marquee */}
      <Marquee cars={cars.filter(c => c.mostWanted)} onClick={onCarClick} />

      {/* Explore Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">Featured Arrivals</h2>
            <p className="text-slate-500 font-light text-lg">Hand-picked for their exceptional quality and rarity.</p>
          </div>
          <button onClick={() => onNavigate('listing')} className="group flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors">
            View Full Inventory
            <span className="bg-primary text-white rounded-full p-1 group-hover:bg-accent transition-colors">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
        </div>

        {cars.filter(c => c.featured).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cars.filter(c => c.featured).slice(0, 4).map(car => (
              <CarCard key={car.id} car={car} onClick={onCarClick} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400">No featured vehicles available at the moment.</p>
          </div>
        )}
      </section>

      <HowToBuy />
      <FAQ />
    </>
  )
}

export default HomePage;
