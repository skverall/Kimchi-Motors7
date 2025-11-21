"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    {
      q: "Do you offer international shipping?",
      a: "Yes, we ship cars globally with full insurance coverage.",
    },
    {
      q: "Can I trade in my old car?",
      a: "Absolutely. We offer competitive market rates for trade-ins.",
    },
    {
      q: "Do you provide warranty?",
      a: "All our vehicles come with a minimum 1-year comprehensive warranty.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 hover:bg-slate-50"
              >
                {item.q}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="p-5 pt-0 text-slate-600 border-t border-slate-100 mt-2">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

