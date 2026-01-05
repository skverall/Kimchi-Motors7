"use client";

import { MapPin, Phone, MessageCircle, ArrowRight } from "lucide-react";

import type { PageName } from "./Header";

interface FooterProps {
  onNavigate: (page: PageName) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => (
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
            unmatched buying experience and a curated selection of the world&apos;s
            finest cars.
          </p>
          <div className="flex gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/kimchimotors/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 transition cursor-pointer"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/kimchimotors/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition cursor-pointer"
              aria-label="Follow us on Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/971564743456"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-500 transition cursor-pointer"
              aria-label="Contact us on WhatsApp"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@kimchimotors"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
              aria-label="Subscribe to our YouTube channel"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li
              className="hover:text-white cursor-pointer transition"
              onClick={() => onNavigate("listing")}
            >
              Latest Inventory
            </li>
            <li
              className="hover:text-white cursor-pointer transition"
              onClick={() => onNavigate("contact")}
            >
              Sell Your Car
            </li>
            <li
              className="hover:text-white cursor-pointer transition"
              onClick={() => onNavigate("contact")}
            >
              Financing
            </li>
            <li
              className="hover:text-white cursor-pointer transition"
              onClick={() => onNavigate("contact")}
            >
              Our Showrooms
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li
              className="flex items-start gap-3 cursor-pointer hover:text-blue-400 transition group"
              onClick={() => onNavigate("contact")}
            >
              <div className="bg-slate-800 p-1.5 rounded group-hover:bg-blue-600 transition">
                <MapPin className="w-4 h-4 text-blue-500 group-hover:text-white shrink-0" />
              </div>
              <span>
                <span className="block font-bold text-white mb-0.5 group-hover:underline">
                  Find Our Showrooms
                </span>
                Ajman car Souq, Showroom 230
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-slate-800 p-1.5 rounded">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              </div>
              <div className="flex flex-col">
                <a href="tel:+971564743456" className="hover:text-white transition">
                  Tel. +971 56 474 3456
                </a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-slate-800 p-1.5 rounded">
                <MessageCircle className="w-4 h-4 text-blue-500 shrink-0" />
              </div>
              <a
                href="mailto:info@kimchimotors.ae"
                className="hover:text-white transition"
              >
                office@kimchimotors.net
              </a>
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
            <button
              type="button"
              aria-label="Subscribe to newsletter"
              className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} Kimchi Motors. All rights reserved.
        </p>
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

