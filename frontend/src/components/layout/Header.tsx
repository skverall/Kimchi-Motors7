"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Settings } from "lucide-react";

export type PageName = "home" | "listing" | "detail" | "admin" | "admin-dashboard" | "contact" | "showrooms";

interface HeaderProps {
  page: PageName;
  onNavigate: (page: PageName) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, page }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("home");
            }}
          >
            <img
              src="/kimchi-logo-white.jpg"
              alt="Kimchi Motors"
              className="h-10 md:h-12 w-auto object-contain"
            />
            <div className="flex items-center text-lg md:text-2xl font-black tracking-tighter uppercase">
              <span className="text-slate-900">KIMCHI</span>
              <span className="text-blue-600">MOTORS</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { id: "home", label: "Home" },
            { id: "listing", label: "Inventory" },
            { id: "showrooms", label: "Showrooms" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as PageName)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${page === item.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:scale-105"
                }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden md:inline-flex items-center gap-2 text-xs font-semibold text-slate-700 border border-slate-200 rounded-full px-4 py-2 hover:border-blue-200 hover:text-blue-600 transition">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available 24/7</span>
          </button>

          <button
            onClick={() => onNavigate("admin")}
            className="hidden md:inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 px-4 py-2 rounded-full text-xs font-semibold border border-transparent hover:border-slate-200 hover:bg-slate-50 transition"
          >
            <Settings className="w-4 h-4" />
            <span>Admin Panel</span>
          </button>

          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg transition-all duration-300 ease-in-out origin-top ${isMenuOpen ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
          }`}
      >
        <div className="px-4 py-6 space-y-3">
          <button
            onClick={() => {
              onNavigate("home");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left p-3 rounded-xl hover:bg-slate-50 text-base font-medium text-slate-700 transition"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate("listing");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left p-3 rounded-xl hover:bg-slate-50 text-base font-medium text-slate-700 transition"
          >
            Inventory
          </button>
          <button
            onClick={() => {
              onNavigate("showrooms");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left p-3 rounded-xl hover:bg-slate-50 text-base font-medium text-slate-700 transition"
          >
            Showrooms
          </button>
          <button
            onClick={() => {
              onNavigate("contact");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left p-3 rounded-xl hover:bg-slate-50 text-base font-medium text-slate-700 transition"
          >
            Contact
          </button>
          <div className="h-px bg-slate-100 my-2" />
          <button
            onClick={() => {
              onNavigate("admin");
              setIsMenuOpen(false);
            }}
            className="block w-full text-left p-3 rounded-xl hover:bg-slate-50 text-base font-medium text-slate-700 flex items-center gap-2 transition"
          >
            <Settings className="w-4 h-4" /> Admin Panel
          </button>
        </div>
      </div>
    </header >
  );
};

export default Header;

