import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Gauge, Settings, Fuel, Calendar, CheckCircle, Phone, MessageCircle, Share2, MapPin } from 'lucide-react';

const CarDetailsPage = ({ cars, onBack }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cars.length > 0) {
      const foundCar = cars.find(c => c.id === parseInt(id));
      setCar(foundCar);
      setLoading(false);
    }
  }, [id, cars]);

  const handleBack = () => {
    if (onBack) onBack();
    navigate(-1);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-16 h-16 border-4 border-slate-200 border-t-accent rounded-full animate-spin"></div>
    </div>
  );

  if (!car) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h2 className="text-2xl font-bold text-primary mb-4">Vehicle Not Found</h2>
      <button onClick={handleBack} className="text-accent font-bold hover:underline">Return to Inventory</button>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Image */}
      <div className="relative h-[60vh] md:h-[70vh] bg-slate-900">
        <img src={car.image} alt={car.model} className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

        <button
          onClick={handleBack}
          className="absolute top-24 left-4 md:left-8 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white hover:text-primary transition-all z-10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 bg-gradient-to-t from-slate-900 to-transparent">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-accent text-primary px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">In Stock</span>
                  {car.featured && <span className="bg-white/20 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider backdrop-blur-sm">Featured</span>}
                </div>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2">{car.make} {car.model}</h1>
                <p className="text-slate-300 text-lg">{car.year} • {car.mileage.toLocaleString()} km</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Price</p>
                <p className="text-4xl md:text-5xl font-bold text-accent">${car.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specs Grid */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Mileage</span>
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <Gauge className="w-5 h-5 text-accent" /> {car.mileage.toLocaleString()} km
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Transmission</span>
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <Settings className="w-5 h-5 text-accent" /> {car.transmission}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Fuel Type</span>
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <Fuel className="w-5 h-5 text-accent" /> {car.fuel}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Year</span>
                <div className="flex items-center gap-2 text-primary font-bold text-lg">
                  <Calendar className="w-5 h-5 text-accent" /> {car.year}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-2xl font-serif font-bold text-primary mb-6">Vehicle Overview</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Experience the pinnacle of automotive engineering with this {car.year} {car.make} {car.model}.
                Meticulously maintained and presented in showroom condition, this vehicle represents a unique opportunity
                to own a piece of automotive excellence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['One Owner', 'Full Service History', 'Accident Free', 'Warranty Included', '2 Keys', 'Ceramic Coated'].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle className="w-5 h-5 text-green-500" /> {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
              <h3 className="text-xl font-serif font-bold text-primary mb-6">Interested in this car?</h3>

              <div className="space-y-4">
                <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors shadow-lg shadow-green-100">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Inquiry
                </button>
                <button className="w-full bg-primary hover:bg-slate-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors shadow-lg shadow-slate-200">
                  <Phone className="w-5 h-5" /> Call Showroom
                </button>
                <button className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors">
                  <Share2 className="w-5 h-5" /> Share Vehicle
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0 text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">Visit our Showroom</p>
                    <p className="text-sm text-slate-500 mt-1">123 Gangnam-daero, Seoul</p>
                    <p className="text-xs text-accent font-bold mt-2 uppercase tracking-wider">Open 9AM - 8PM Daily</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
