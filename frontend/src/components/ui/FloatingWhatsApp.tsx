"use client";

import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp: React.FC = () => (
  <a
    href="https://wa.me/97141234567"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle className="w-8 h-8" />
    <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
      Chat with us 👋
    </span>
    <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping pointer-events-none" />
  </a>
);

export default FloatingWhatsApp;

