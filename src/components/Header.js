import React, { useState } from 'react';
import { Menu, X, Search, LogIn, Settings } from 'lucide-react';

const Header = ({ onNavigate, page }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300">
            <span className="text-white font-black text-sm">KM</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">KIMCHI<span className="text-blue-700">MOTORS</span></h1>
            <p className="text-[10px] text-slate-500 tracking-widest uppercase font-semibold">Luxury Showroom</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => onNavigate('home')} className={`text-sm font-medium hover:text-blue-700 transition ${page === 'home' ? 'text-blue-700' : 'text-slate-600'}`}>Home</button>
          <button onClick={() => onNavigate('listing')} className={`text-sm font-medium hover:text-blue-700 transition ${page === 'listing' ? 'text-blue-700' : 'text-slate-600'}`}>Inventory</button>
          <button onClick={() => onNavigate('about')} className={`text-sm font-medium hover:text-blue-700 transition ${page === 'about' ? 'text-blue-700' : 'text-slate-600'}`}>About</button>
          <button onClick={() => onNavigate('contact')} className={`text-sm font-medium hover:text-blue-700 transition ${page === 'contact' ? 'text-blue-700' : 'text-slate-600'}`}>Contact</button>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-200">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-24 text-slate-700 placeholder-slate-400" />
          </div>
          <button 
            onClick={() => onNavigate('admin')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all text-sm font-medium shadow-lg shadow-slate-200"
          >
            <LogIn className="w-4 h-4" /> Admin
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-4 flex flex-col gap-4 shadow-xl">
          <button onClick={() => {onNavigate('home'); setIsMenuOpen(false)}} className="text-left p-2 hover:bg-slate-50 font-medium">Home</button>
          <button onClick={() => {onNavigate('listing'); setIsMenuOpen(false)}} className="text-left p-2 hover:bg-slate-50 font-medium">Inventory</button>
          <button onClick={() => {onNavigate('admin'); setIsMenuOpen(false)}} className="text-left p-2 hover:bg-slate-50 font-medium flex items-center gap-2"><Settings className="w-4 h-4"/> Admin Panel</button>
        </div>
      )}
    </header>
  );
};

export default Header;