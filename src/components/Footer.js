import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-white text-slate-900 pt-20 pb-10 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div>
                <h2 className="text-2xl font-sans font-black tracking-tighter italic">KIMCHI <span className="text-kimchi-red">MOTORS</span></h2>
              </div>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Premier destination for luxury Korean vehicles. We bring the finest automotive engineering directly to you with white-glove service.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-kimchi-red hover:text-white transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-sans">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: 'Inventory', path: 'inventory' },
                { label: 'Services', path: 'services' },
                { label: 'About Us', path: 'about' },
                { label: 'Contact', path: 'contact' }
              ].map(item => (
                <li key={item.label}>
                  <button onClick={() => onNavigate(item.path)} className="text-slate-500 hover:text-kimchi-red transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-kimchi-red opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-sans">Visit Showroom</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 text-kimchi-red">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Main Showroom</p>
                  <p className="text-slate-500 text-sm">123 Gangnam-daero, Seoul, South Korea</p>
                  <button onClick={() => onNavigate('contact')} className="text-kimchi-red text-xs font-bold mt-1 hover:underline">View Location</button>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 text-kimchi-red">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Call Us</p>
                  <p className="text-slate-500 text-sm">+82 2-1234-5678</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 text-kimchi-red">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Email Us</p>
                  <p className="text-slate-500 text-sm">concierge@kimchimotors.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 font-sans">Newsletter</h3>
            <p className="text-slate-500 mb-6">Subscribe to receive updates on new arrivals and exclusive offers.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 px-6 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-kimchi-red transition-colors"
              />
              <button className="absolute right-1.5 top-1.5 w-10 h-10 bg-kimchi-red rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2024 Kimchi Motors. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
