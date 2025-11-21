import React, { useState } from 'react';
import { Search, ChevronRight, MessageCircle, DollarSign, Check, ChevronDown, ArrowRight, Star } from 'lucide-react';
import { BRANDS } from '../data/mockData';
import CarCard from '../components/CarCard';

const HeroSection = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({ make: '', model: '', maxPrice: '' });

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Pattern - Abstract Red/Blue/Black */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-kimchi-blue/20 to-transparent skew-x-12 transform origin-top-right"></div>
        <div className="absolute bottom-0 left-0 w-3/4 h-full bg-gradient-to-r from-kimchi-red/20 to-transparent -skew-x-12 transform origin-bottom-left"></div>
        {/* Geometric shapes mimicking the 'Firm Pattern' */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-kimchi-red/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-kimchi-blue/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-left">
          <div className="inline-block mb-4 px-4 py-1 border border-kimchi-red/50 rounded-full bg-kimchi-red/10 backdrop-blur-sm">
            <span className="text-kimchi-red font-bold tracking-widest text-xs uppercase">Premium Korean Imports</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter italic leading-none">
            KIMCHI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kimchi-red to-red-600">MOTORS</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl max-w-lg mb-10 font-light leading-relaxed">
            Experience the thrill of driving.
            <span className="block text-white font-medium mt-2">Kia K5 • Kia Soul • Hyundai Tucson</span>
          </p>

          {/* Search Box - Compact & Stylish */}
          <div className="bg-white/5 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-2xl max-w-md">
            <div className="flex gap-2">
              <select
                className="flex-1 bg-transparent text-white px-4 py-3 outline-none font-medium appearance-none cursor-pointer hover:bg-white/5 rounded-xl transition-colors"
                value={searchParams.make}
                onChange={(e) => setSearchParams({ ...searchParams, make: e.target.value })}
              >
                <option value="" className="bg-black text-gray-400">All Brands</option>
                {BRANDS.map(b => <option key={b.name} value={b.name} className="bg-black text-white">{b.name}</option>)}
              </select>
              <div className="w-px bg-white/10 my-2"></div>
              <button
                onClick={() => onSearch(searchParams)}
                className="bg-kimchi-red text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-kimchi-red/20"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="relative hidden lg:block">
          {/* Placeholder for a cool car image, maybe a Kia K5 if available, otherwise generic cool car */}
          <div className="relative z-10 transform hover:scale-105 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000"
              alt="Kia K5 Style Car"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
          {/* Decorative elements behind car */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-kimchi-blue/20 to-kimchi-red/20 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </div>
  )
};

const Marquee = ({ cars, onClick }) => (
  <div className="py-16 bg-black overflow-hidden border-b border-white/10">
    <div className="container mx-auto px-4 mb-10 flex justify-between items-end">
      <div>
        <h2 className="text-3xl font-sans font-bold text-white">Most Wanted</h2>
        <p className="text-gray-400 mt-2 font-light">The most desired vehicles in our collection</p>
      </div>
      <div className="hidden md:flex gap-2 items-center bg-kimchi-red/10 px-3 py-1 rounded-full border border-kimchi-red/20">
        <div className="w-2 h-2 rounded-full bg-kimchi-red animate-pulse"></div>
        <div className="text-xs font-bold text-kimchi-red uppercase tracking-wider">Live Feed</div>
      </div>
    </div>

    <div className="relative w-full group">
      <div className="flex animate-marquee gap-8 whitespace-nowrap px-4 group-hover:[animation-play-state:paused]">
        {[...cars, ...cars].map((car, idx) => (
          <div
            key={`${car.id}-${idx}`}
            onClick={() => onClick(car)}
            className="inline-block w-[320px] bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex-shrink-0 cursor-pointer hover:-translate-y-1 hover:border-kimchi-red/50 transition-all duration-300"
          >
            <div className="h-48 relative overflow-hidden">
              <img src={car.image} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" alt={car.model} />
              <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-white shadow-sm border border-white/10">
                {car.year}
              </div>
            </div>
            <div className="p-5 whitespace-normal">
              <h4 className="font-bold text-lg text-white truncate font-sans">{car.make} {car.model}</h4>
              <div className="flex justify-between items-center mt-2">
                <p className="text-kimchi-red font-bold text-lg">${car.price.toLocaleString()}</p>
                <p className="text-xs text-gray-400">{car.mileage.toLocaleString()} km</p>
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
  <section className="py-24 bg-black relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    <div className="container mx-auto px-4 text-center relative z-10">
      <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4">Seamless Acquisition</h2>
      <p className="text-gray-400 mb-16 max-w-2xl mx-auto">Experience a purchasing process as refined as the vehicles we sell.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: Search, title: "Select", desc: "Choose from our curated inventory of premium vehicles." },
          { icon: MessageCircle, title: "Consult", desc: "Connect with our concierge for detailed specifications." },
          { icon: DollarSign, title: "Secure", desc: "Transparent pricing with flexible financing options." },
          { icon: Check, title: "Receive", desc: "White-glove delivery service to your preferred location." }
        ].map((step, idx) => (
          <div key={idx} className="relative p-8 rounded-3xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-kimchi-red/30 group text-left">
            <div className="w-14 h-14 bg-white/5 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-kimchi-red group-hover:text-white transition-colors duration-300 shadow-sm">
              <step.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-sans">{step.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{step.desc}</p>
            <div className="absolute top-6 right-6 text-white/5 font-sans text-4xl font-bold opacity-20 group-hover:opacity-100 group-hover:text-white/10 transition-all">
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
    <section className="py-24 bg-black border-t border-white/10">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-sans font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={idx} className="bg-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 border border-white/5">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-white hover:text-kimchi-red transition-colors"
              >
                {item.q}
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-kimchi-red' : 'text-gray-400'}`} />
              </button>
              <div className={`grid transition-all duration-300 ease-in-out ${openIndex === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
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
  const [searchParams, setSearchParams] = useState({ make: '', model: '', maxPrice: '' });
  return (
    <div className="bg-white text-slate-900">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-kimchi-blue/20 to-transparent transform skew-x-12"></div>
          <div className="absolute bottom-0 left-0 w-2/3 h-full bg-gradient-to-r from-kimchi-red/20 to-transparent transform -skew-x-12"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-sans font-black text-slate-900 mb-6 tracking-tighter leading-none">
              EXCELLENCE IN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kimchi-red to-kimchi-blue italic pr-4">MOTION</span>
            </h1>
            <p className="text-slate-500 text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              Discover a curated collection of the world's finest vehicles.
              Where luxury meets performance, and service meets perfection.
            </p>

            {/* Car Image Placeholder */}
            <div className="relative w-full max-w-4xl mx-auto mb-12 group">
              <div className="absolute inset-0 bg-gradient-to-b from-kimchi-blue/20 to-kimchi-red/20 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
              <img
                src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200"
                alt="Hero Car"
                className="relative z-10 w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-700 drop-shadow-2xl"
              />
            </div>

            {/* Search Box */}
            <div className="bg-white/80 backdrop-blur-xl p-4 rounded-full border border-slate-200 shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
              <select
                className="bg-transparent text-slate-900 px-6 py-3 outline-none border-r border-slate-200 w-full md:w-1/3 font-medium"
                value={searchParams.make}
                onChange={(e) => setSearchParams({ ...searchParams, make: e.target.value })}
              >
                <option value="">All Brands</option>
                {BRANDS.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
              </select>
              <select
                className="bg-transparent text-slate-900 px-6 py-3 outline-none w-full md:w-1/3 font-medium"
                value={searchParams.maxPrice}
                onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
              >
                <option value="">Any Price</option>
                <option value="500000">Up to $500k</option>
                <option value="1000000">Up to $1M</option>
                <option value="2000000">Up to $2M</option>
              </select>
              <button
                onClick={() => onSearch(searchParams)}
                className="bg-kimchi-red text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 shadow-lg w-full md:w-auto"
              >
                <Search className="w-5 h-5" /> Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="py-20 bg-white overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-4 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-sans font-black text-slate-900 tracking-tight">Most Wanted</h2>
            <p className="text-slate-500 mt-2 font-light text-lg">The most desired vehicles in our collection</p>
          </div>
          <div className="hidden md:flex gap-2 items-center bg-red-50 px-4 py-1.5 rounded-full border border-red-100">
            <div className="w-2 h-2 rounded-full bg-kimchi-red animate-pulse"></div>
            <div className="text-xs font-bold text-kimchi-red uppercase tracking-wider">Live Feed</div>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-8 animate-marquee whitespace-nowrap px-4">
            {[...cars, ...cars].map((car, idx) => (
              <div
                key={`${car.id}-${idx}`}
                onClick={() => onCarClick(car)}
                className="inline-block w-80 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 cursor-pointer group hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-900 shadow-sm">
                    {car.year}
                  </div>
                </div>
                <div className="p-5 whitespace-normal">
                  <h4 className="font-bold text-lg text-slate-900 truncate font-sans group-hover:text-kimchi-red transition-colors">{car.make} {car.model}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-kimchi-red font-bold text-lg">${car.price.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">{car.mileage.toLocaleString()} km</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Section */}
      {/* ... (Assuming Featured Section is handled by ListingPage or similar, skipping explicit re-implementation here if not present in original view, but keeping structure consistent) */}

      {/* How It Works */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-sans font-black text-slate-900 mb-4 tracking-tight">Seamless Acquisition</h2>
          <p className="text-slate-500 mb-16 max-w-2xl mx-auto text-lg">Experience a purchasing process as refined as the vehicles we sell.</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Search, title: "Select", desc: "Choose from our curated inventory of premium vehicles." },
              { icon: MessageCircle, title: "Consult", desc: "Connect with our concierge for detailed specifications." },
              { icon: DollarSign, title: "Secure", desc: "Transparent pricing with flexible financing options." },
              { icon: Check, title: "Receive", desc: "White-glove delivery service to your preferred location." }
            ].map((step, idx) => (
              <div key={idx} className="relative p-8 rounded-3xl bg-white hover:shadow-2xl transition-all duration-300 border border-slate-100 group text-left hover:-translate-y-2">
                <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-kimchi-red group-hover:text-white transition-colors duration-300 shadow-sm">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-sans">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-sans font-black text-slate-900 mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Do you offer international shipping?", a: "Yes, we provide fully insured white-glove delivery to major cities worldwide." },
              { q: "Are all vehicles certified?", a: "Every vehicle undergoes a rigorous 150-point inspection by certified master technicians." },
              { q: "Can I trade in my current vehicle?", a: "We offer competitive trade-in valuations for luxury and exotic vehicles." },
              { q: "What financing options are available?", a: "We partner with premier financial institutions to offer bespoke leasing and financing solutions." }
            ].map((faq, idx) => (
              <div key={idx} className="group border border-slate-100 rounded-2xl overflow-hidden hover:border-kimchi-red/30 transition-colors bg-slate-50">
                <details className="p-6 cursor-pointer">
                  <summary className="font-bold text-lg text-slate-900 flex justify-between items-center list-none">
                    {faq.q}
                    <span className="text-kimchi-red transform group-open:rotate-180 transition-transform duration-300">
                      <ArrowRight className="w-5 h-5 rotate-90" />
                    </span>
                  </summary>
                  <p className="mt-4 text-slate-500 leading-relaxed">{faq.a}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {BRANDS.map(brand => (
              <img key={brand.name} src={brand.logo} alt={brand.name} className="h-12 md:h-16 object-contain hover:scale-110 transition-transform duration-300" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-sans font-black text-white mb-8 tracking-tight">Ready to Drive Your Dream?</h2>
          <p className="text-slate-300 text-xl mb-12 max-w-2xl mx-auto">Visit our showroom or schedule a private viewing today.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button onClick={() => onNavigate('listing')} className="bg-kimchi-red text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-red-900/50">
              View Inventory
            </button>
            <button onClick={() => onNavigate('contact')} className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-lg">
              Contact Concierge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
