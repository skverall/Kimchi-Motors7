"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection, { SearchParams } from "@/components/sections/HeroSection";

export default function Home() {
  const [page, setPage] = useState<string>("home");

  const handleSearch = (params: SearchParams) => {
    console.log("Search params", params);
    // TODO: connect with Supabase-powered filtering once data layer is migrated
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header page={page} onNavigate={setPage} />
      <main className="flex-1 bg-slate-950">
        {/* For now we only implement the home page UI; listing/admin will be ported next */}
        {page === "home" && <HeroSection onSearch={handleSearch} />}
      </main>
      <Footer onOpenLocation={() => {}} />
    </div>
  );
}
