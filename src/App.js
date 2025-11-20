import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, serverTimestamp, addDoc, deleteDoc, doc } from 'firebase/firestore';

import { auth, db, appId } from './firebase/config';
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
  const [user, setAuthUser] = useState(null);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);

  // --- Firebase Logic ---

  // 1. Auth Init
  useEffect(() => {
    const initAuth = async () => {
        const initialAuthToken = process.env.REACT_APP_INITIAL_AUTH_TOKEN;
        if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
        } else {
            await signInAnonymously(auth);
        }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
        setAuthUser(u);
    });
    return () => unsubscribe();
  }, []);

  // 2. Data Fetching & Seeding
  useEffect(() => {
    if (!user) return;

    const carsRef = collection(db, 'cars');
    const unsubscribe = onSnapshot(query(carsRef, orderBy('timestamp', 'desc')), (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        if (data.length === 0) {
            // Auto-seed if empty
            INITIAL_CARS.forEach(async (car) => {
                await addDoc(carsRef, { ...car, timestamp: serverTimestamp() });
            });
        } else {
            setCars(data);
            setFilteredCars(data);
        }
    }, (error) => console.error("Firestore error:", error));

    return () => unsubscribe();
  }, [user]);

  // --- Navigation Logic ---

  const handleNavigate = (target) => {
      if (target === 'contact') {
        setLocationModalOpen(true); // Open modal instead of navigating to empty page
        return;
      }
      window.scrollTo(0,0);
      setPage(target);
      if(target !== 'detail') setSelectedCar(null);
  };

  const handleCarClick = (car) => {
      setSelectedCar(car);
      setPage('detail');
      window.scrollTo(0,0);
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

  // --- Admin Actions ---

  const handleAddCar = async (carData) => {
      if (!user) return;
      const carsRef = collection(db, 'cars');
      await addDoc(carsRef, { ...carData, timestamp: serverTimestamp() });
  };

  const handleDeleteCar = async (id) => {
      if (!user) return;
      await deleteDoc(doc(db, 'cars', id));
  };

  // --- Rendering ---

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onSearch={handleSearch} cars={cars} onCarClick={handleCarClick} onNavigate={handleNavigate} />;
      case 'listing':
        return <ListingPage cars={filteredCars} onCarClick={handleCarClick} onFilter={handleFilter} />;
      case 'detail':
        return <CarDetailsPage car={selectedCar} onBack={() => setPage('listing')} />;
      case 'admin':
        return <AdminPage isAdmin={isAdmin} onLogin={() => setIsAdmin(true)} onBack={() => setPage('home')} cars={cars} onAdd={handleAddCar} onDelete={handleDeleteCar} onLogout={() => {setIsAdmin(false); setPage('home')}} />;
      default:
        return <HomePage onSearch={handleSearch} cars={cars} onCarClick={handleCarClick} onNavigate={handleNavigate} />;
    }
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
