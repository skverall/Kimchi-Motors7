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
    <header className="bg-primary/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div onClick={() => onNavigate('home')} className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <span className="text-primary font-serif font-bold text-xl">K</span>
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight">KIMCHI <span className="text-accent">MOTORS</span></h1>
              <p className="text-[0.65rem] text-slate-400 uppercase tracking-widest font-medium">Premium Korean Imports</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 relative group ${isActive(item.path) ? 'text-accent' : 'text-slate-300 hover:text-white'}`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform duration-300 ${isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-slate-300 hover:text-accent transition-colors rounded-full hover:bg-white/5">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => onNavigate('admin')} className="p-2 text-slate-300 hover:text-accent transition-colors rounded-full hover:bg-white/5">
              <ShieldCheck className="w-5 h-5" />
            </button>
            <button onClick={() => onNavigate('contact')} className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white hover:text-primary transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center gap-2">
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
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-4 flex flex-col gap-4 shadow-xl">
          <button onClick={() => { onNavigate('home'); setIsMenuOpen(false) }} className="text-left p-2 hover:bg-slate-50 font-medium">Home</button>
          <button onClick={() => { onNavigate('listing'); setIsMenuOpen(false) }} className="text-left p-2 hover:bg-slate-50 font-medium">Inventory</button>
          <button onClick={() => { onNavigate('admin'); setIsMenuOpen(false) }} className="text-left p-2 hover:bg-slate-50 font-medium flex items-center gap-2"><Settings className="w-4 h-4" /> Admin Panel</button>
        </div>
      )}
    </header>
  );
};

export default Header;