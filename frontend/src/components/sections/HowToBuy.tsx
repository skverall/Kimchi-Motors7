"use client";

import { Search, MessageCircle, DollarSign, Check, ChevronRight } from "lucide-react";

export const HowToBuy: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16">
        How to Buy a Car?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          {
            icon: Search,
            title: "Choose Car",
            desc: "Browse our exclusive inventory and pick your dream vehicle.",
          },
          {
            icon: MessageCircle,
            title: "Contact Us",
            desc: "Get in touch with our agents via WhatsApp or Phone.",
          },
          {
            icon: DollarSign,
            title: "Payment",
            desc: "Secure financing options or direct bank transfer.",
          },
          {
            icon: Check,
            title: "Delivery",
            desc: "We deliver the car to your doorstep, anywhere.",
          },
        ].map((step, idx) => (
          <div
            key={idx}
            className="relative p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-slate-100 group"
          >
            <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <step.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
            <p className="text-slate-500 leading-relaxed">{step.desc}</p>
            {idx < 3 && (
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ChevronRight className="text-slate-300 w-8 h-8" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowToBuy;

