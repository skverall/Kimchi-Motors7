import React, { useState } from 'react';
import { Menu, X, Phone, Search, ShieldCheck, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ onNavigate, activePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'inventory', label: 'Inventory', path: '/inventory' },
    { id: 'services', label: 'Services', path: '/services' }, // Placeholder
    { id: 'about', label: 'About', path: '/about' }, // Placeholder
    { id: 'contact', label: 'Contact', path: '/contact' }, // Placeholder
  ];

  const isActive = (path) => {
    if (path === '/' && activePage === '/') return true;
    if (path !== '/' && activePage.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-black/90 backdrop-blur-md text-white sticky top-0 z-50 border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div onClick={() => onNavigate('home')} className="flex items-center gap-2 cursor-pointer group">
            {/* Replaced icon with text-based logo matching the brand */}
            <div>
              <h1 className="text-2xl font-sans font-black tracking-tighter italic">KIMCHI <span className="text-kimchi-red">MOTORS</span></h1>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 relative group ${isActive(item.path) ? 'text-kimchi-red' : 'text-gray-300 hover:text-white'}`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-kimchi-red transform origin-left transition-transform duration-300 ${isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-300 hover:text-kimchi-red transition-colors rounded-full hover:bg-white/5">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => onNavigate('admin')} className="p-2 text-gray-300 hover:text-kimchi-red transition-colors rounded-full hover:bg-white/5">
              <ShieldCheck className="w-5 h-5" />
            </button>
            <button onClick={() => onNavigate('contact')} className="bg-kimchi-red text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-red-700 transition-all duration-300 shadow-[0_0_20px_rgba(214,0,28,0.3)] hover:shadow-[0_0_30px_rgba(214,0,28,0.5)] flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Contact Us</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black border-b border-white/10 p-4 flex flex-col gap-4 shadow-xl">
          <button onClick={() => { onNavigate('home'); setIsMenuOpen(false) }} className="text-left p-2 hover:bg-white/5 font-medium text-white">Home</button>
          <button onClick={() => { onNavigate('listing'); setIsMenuOpen(false) }} className="text-left p-2 hover:bg-white/5 font-medium text-white">Inventory</button>
          <button onClick={() => { onNavigate('admin'); setIsMenuOpen(false) }} className="text-left p-2 hover:bg-white/5 font-medium flex items-center gap-2 text-white"><Settings className="w-4 h-4" /> Admin Panel</button>
        </div>
      )}
    </header>
  );
};

export default Header;