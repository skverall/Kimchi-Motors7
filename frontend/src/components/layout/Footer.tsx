"use client";

import { MapPin, Phone, MessageCircle, ArrowRight } from "lucide-react";

interface FooterProps {
  onOpenLocation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLocation }) => (
  <footer className="bg-slate-900 text-white pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-black text-xs">KM</span>
            </div>
            <h3 className="text-xl font-bold">
              KIMCHI<span className="text-blue-400">MOTORS</span>
            </h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            The premier destination for luxury and exotic vehicles. We provide an
            unmatched buying experience and a curated selection of the world's
            finest cars.
          </p>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
              >
                <ArrowRight className="w-3 h-3 -rotate-45" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li className="hover:text-white cursor-pointer transition">
              Latest Inventory
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Sell Your Car
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Financing
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Our Showrooms
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li
              className="flex items-start gap-3 cursor-pointer hover:text-blue-400 transition group"
              onClick={onOpenLocation}
            >
              <div className="bg-slate-800 p-1.5 rounded group-hover:bg-blue-600 transition">
                <MapPin className="w-4 h-4 text-blue-500 group-hover:text-white shrink-0" />
              </div>
              <span>
                <span className="block font-bold text-white mb-0.5 group-hover:underline">
                  Find Our Showrooms
                </span>
                Sheikh Zayed Road, Dubai & others
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-slate-800 p-1.5 rounded">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              </div>
              <span>+971 4 123 4567</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-slate-800 p-1.5 rounded">
                <MessageCircle className="w-4 h-4 text-blue-500 shrink-0" />
              </div>
              <span>info@kimchimotors.ae</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
          <p className="text-slate-400 text-sm mb-4">
            Subscribe to get the latest updates on new arrivals.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="bg-slate-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full text-sm"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>© 2025 Kimchi Motors. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Cookie Settings</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

