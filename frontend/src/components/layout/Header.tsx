"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Settings } from "lucide-react";

interface HeaderProps {
  page: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, page }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-black text-xs">KM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none">
              KIMCHI<span className="text-blue-600">MOTORS</span>
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">
              Luxury Auto Gallery
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
          <button
            onClick={() => onNavigate("home")}
            className={`hover:text-blue-600 transition ${page === "home" ? "text-blue-600" : ""
              }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate("listing")}
            className={`hover:text-blue-600 transition ${page === "listing" ? "text-blue-600" : ""
              }`}
          >
            Inventory
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="hover:text-blue-600 transition"
          >
            Showrooms
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="hover:text-blue-600 transition"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden md:inline-flex items-center gap-2 text-xs font-semibold text-slate-700 border border-slate-200 rounded-full px-4 py-2 hover:border-blue-200 hover:text-blue-600 transition">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available 24/7</span>
          </button>

          <button
            onClick={() => onNavigate("admin")}
            className="hidden md:inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-slate-800 transition"
          >
            <Settings className="w-4 h-4" />
            <span>Admin Panel</span>
          </button>

          <button
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 text-slate-700"
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 space-y-2">
          <button
            onClick={() => {
              onNavigate("home");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left p-2 rounded hover:bg-slate-50 text-sm"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate("listing");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left p-2 rounded hover:bg-slate-50 text-sm"
          >
            Inventory
          </button>
          <button
            onClick={() => {
              onNavigate("contact");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left p-2 rounded hover:bg-slate-50 text-sm"
          >
            Showrooms
          </button>
          <button
            onClick={() => {
              onNavigate("admin");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left p-2 rounded hover:bg-slate-50 text-sm flex items-center gap-2"
          >
            <Settings className="w-4 h-4" /> Admin Panel
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

