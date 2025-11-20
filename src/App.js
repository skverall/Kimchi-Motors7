import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useCars } from './hooks/useCars';

import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import LocationModal from './components/LocationModal';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import CarDetailsPage from './pages/CarDetailsPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const { cars, isLoading, addCar, deleteCar } = useCars();
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // --- Navigation Logic ---

  const handleNavigate = (target) => {
    if (target === 'contact') {
      setLocationModalOpen(true);
      return;
    }
    navigate(target === 'home' ? '/' : `/${target}`);
    window.scrollTo(0, 0);
  };

  const handleCarClick = (car) => {
    navigate(`/inventory/${car.id}`);
    window.scrollTo(0, 0);
  };

  const handleSearch = (params) => {
    navigate('/inventory');
    let result = cars;
    if (params.make) result = result.filter(c => c.make === params.make);
    if (params.maxPrice) result = result.filter(c => c.price <= parseInt(params.maxPrice));
    setFilteredCars(result);
  };

  const handleFilter = (params) => {
    let result = cars;
    if (params.make) result = result.filter(c => c.make === params.make);
    if (params.maxPrice) result = result.filter(c => c.price <= parseInt(params.maxPrice));
    setFilteredCars(result);
  };

  // Reset filters when cars change or on initial load
  useEffect(() => {
    setFilteredCars(cars);
  }, [cars]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Kimchi Motors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header onNavigate={handleNavigate} activePage={location.pathname} />

      <Routes>
        <Route path="/" element={<HomePage onSearch={handleSearch} cars={cars} onCarClick={handleCarClick} onNavigate={handleNavigate} />} />
        <Route path="/inventory" element={<ListingPage cars={filteredCars} onCarClick={handleCarClick} onFilter={handleFilter} />} />
        <Route path="/inventory/:id" element={<CarDetailsPage cars={cars} onBack={() => navigate('/inventory')} />} />
        <Route path="/admin" element={<AdminPage onBack={() => navigate('/')} cars={cars} onAdd={addCar} onDelete={deleteCar} />} />
        <Route path="*" element={<HomePage onSearch={handleSearch} cars={cars} onCarClick={handleCarClick} onNavigate={handleNavigate} />} />
      </Routes>

      <FloatingWhatsApp />
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setLocationModalOpen(false)} />
      <Footer onOpenLocation={() => setLocationModalOpen(true)} />
    </div>
  );
}
