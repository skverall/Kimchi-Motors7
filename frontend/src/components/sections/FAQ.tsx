"use client";

import { useState } from "react";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "Do you offer international shipping?", a: "Yes, we ship cars globally with full insurance coverage." },
    { q: "Can I trade in my old car?", a: "Absolutely. We offer competitive market rates for trade-ins." },
    { q: "Do you provide warranty?", a: "All our vehicles come with a minimum 1-year comprehensive warranty." },
  ];

  return (
    <section className="py-20 bg-slate-50">
      {/* Полный JSX 1:1 из main: аккордеон с вопросами */}
    </section>
  );
};

export default FAQ;

