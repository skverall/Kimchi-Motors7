import React, { useState, useEffect } from 'react';
import { supabase } from './supabase/config';
import { INITIAL_CARS } from './data/mockData';

import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import LocationModal from './components/LocationModal';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import CarDetailsPage from './pages/CarDetailsPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // --- Supabase Logic ---

  useEffect(() => {
    const fetchAndSeedCars = async () => {
      setIsLoading(true);
      // 1. Fetch data
      const { data: carsData, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error);
        setIsLoading(false);
        return;
      }

      // 2. Check if seeding is needed
      if (carsData && carsData.length === 0) {
        console.log("No cars found, seeding database...");
        // Remove Firebase-specific serverTimestamp from mock data before inserting
        const carsToSeed = INITIAL_CARS.map(({ timestamp, ...car }) => car);
        const { error: insertError } = await supabase.from('cars').insert(carsToSeed);
        if (insertError) {
          console.error("Supabase seed error:", insertError);
        } else {
          // After seeding, refetch the data to get IDs and created_at timestamps
          const { data: newCarsData } = await supabase.from('cars').select('*').order('created_at', { ascending: false });
          if (newCarsData) {
            setCars(newCarsData);
            setFilteredCars(newCarsData);
          }
        }
      } else if (carsData) {
        setCars(carsData);
        setFilteredCars(carsData);
      }
      setIsLoading(false);
    };

    fetchAndSeedCars();

    // 3. Set up real-time subscription
    const channel = supabase
      .channel('public:cars')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cars' }, (payload) => {
        console.log('Change received!', payload);
        fetchAndSeedCars(); // Refetch data on any change
      })
      .subscribe();

    // Cleanup function to remove the channel subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // --- Navigation Logic ---

  const handleNavigate = (target) => {
    if (target === 'contact') {
      setLocationModalOpen(true);
      return;
    }
    window.scrollTo(0, 0);
    setPage(target);
    if (target !== 'detail') setSelectedCar(null);
  };

  const handleCarClick = (car) => {
    setSelectedCar(car);
    setPage('detail');
    window.scrollTo(0, 0);
  };

  const handleSearch = (params) => {
    handleNavigate('listing');
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

  // --- Admin Actions (Supabase) ---

  const handleAddCar = async (carData) => {
    // Remove Firebase-specific timestamp if it exists
    const { timestamp, ...restOfCarData } = carData;
    const { error } = await supabase.from('cars').insert([restOfCarData]);
    if (error) console.error("Error adding car:", error);
  };

  const handleDeleteCar = async (id) => {
    const { error } = await supabase.from('cars').delete().eq('id', id);
    if (error) console.error("Error deleting car:", error);
  };

  // --- Rendering ---

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onSearch={handleSearch} cars={cars} onCarClick={handleCarClick} onNavigate={handleNavigate} />;
      case 'listing':
        return <ListingPage cars={filteredCars} onCarClick={handleCarClick} onFilter={handleFilter} />;
      case 'detail':
        // Ensure selectedCar is not null before rendering details page
        return selectedCar ? <CarDetailsPage car={selectedCar} onBack={() => setPage('listing')} /> : <ListingPage cars={filteredCars} onCarClick={handleCarClick} onFilter={handleFilter} />;
      case 'admin':
        return <AdminPage isAdmin={isAdmin} onLogin={() => setIsAdmin(true)} onBack={() => setPage('home')} cars={cars} onAdd={handleAddCar} onDelete={handleDeleteCar} onLogout={() => { setIsAdmin(false); setPage('home') }} />;
      default:
        return <HomePage onSearch={handleSearch} cars={cars} onCarClick={handleCarClick} onNavigate={handleNavigate} />;
    }
  }

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
      <Header onNavigate={handleNavigate} page={page} />

      {renderPage()}

      <FloatingWhatsApp />
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setLocationModalOpen(false)} />
      <Footer onOpenLocation={() => setLocationModalOpen(true)} />
    </div>
  );
}
