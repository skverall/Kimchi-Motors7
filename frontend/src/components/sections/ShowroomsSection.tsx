"use client";

import { useState } from "react";
import Image from "next/image";
import { SHOWROOM_LOCATIONS } from "@/constants/locations";
import { MapPin, Phone, Clock, Globe, ArrowRight, Mail } from "lucide-react";

export const ShowroomsSection = () => {
    const [activeLocation, setActiveLocation] = useState(SHOWROOM_LOCATIONS[0]);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            {/* Hero Header */}
            <div className="container mx-auto px-4 mb-12">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight uppercase">
                    Global <span className="text-blue-600">Presence</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl">
                    Experience our premium collection in person. Visit one of our flagship showrooms to view our exclusive inventory and speak with our automotive specialists.
                </p>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Location Navigation */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
                            {SHOWROOM_LOCATIONS.map((location) => (
                                <button
                                    key={location.id}
                                    onClick={() => setActiveLocation(location)}
                                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between group ${activeLocation.id === location.id
                                        ? "bg-slate-900 text-white shadow-lg scale-[1.02]"
                                        : "hover:bg-slate-50 text-slate-600"
                                        }`}
                                >
                                    <div>
                                        <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${activeLocation.id === location.id ? "text-blue-400" : "text-slate-400"
                                            }`}>
                                            {location.country}
                                        </span>
                                        <span className="text-xl font-bold">{location.city}</span>
                                    </div>
                                    <ArrowRight className={`w-5 h-5 transition-transform ${activeLocation.id === location.id
                                        ? "opacity-100 translate-x-0"
                                        : "opacity-0 -translate-x-4 group-hover:opacity-50 group-hover:-translate-x-2"
                                        }`} />
                                </button>
                            ))}
                        </div>

                        {/* Global Contact Info */}
                        <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

                            <h3 className="text-xl font-bold mb-6 relative z-10">Global Support</h3>
                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-blue-200 uppercase font-bold">24/7 Hotline</p>
                                        <p className="font-mono text-lg">+1 (800) KIMCHI-KM</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-blue-200 uppercase font-bold">Email Us</p>
                                        <p className="font-medium">concierge@kimchi.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Location Detail */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 h-full flex flex-col">
                            {/* Image Hero */}
                            <div className="relative h-64 md:h-96 shrink-0 overflow-hidden group">
                                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10"></div>
                                <Image
                                    src={activeLocation.image}
                                    alt={`${activeLocation.city} Showroom`}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent z-20">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <h2 className="text-3xl md:text-5xl font-black text-white mb-2">
                                                {activeLocation.city}
                                            </h2>
                                            <div className="flex items-center gap-2 text-slate-200">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm md:text-base">{activeLocation.address}</span>
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-bold border border-white/30">
                                                <Globe className="w-4 h-4" />
                                                Flagship Store
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details & Map */}
                            <div className="flex-1 flex flex-col md:flex-row">
                                {/* Info Column */}
                                <div className="p-8 md:w-1/3 space-y-8 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2 text-slate-400">
                                            <Phone className="w-5 h-5" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Direct Line</span>
                                        </div>
                                        <p className="text-lg font-bold text-slate-900">{activeLocation.phone}</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3 mb-2 text-slate-400">
                                            <Clock className="w-5 h-5" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Opening Hours</span>
                                        </div>
                                        <p className="text-lg font-bold text-slate-900">{activeLocation.hours}</p>
                                        <p className="text-sm text-slate-500 mt-1">Open 7 days a week</p>
                                    </div>

                                    <a
                                        href={`https://wa.me/${activeLocation.phone.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 group"
                                    >
                                        Book Appointment
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>

                                {/* Map Column */}
                                <div className="flex-1 min-h-[300px] bg-slate-100 relative">
                                    <iframe
                                        title={`${activeLocation.city} map`}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight={0}
                                        marginWidth={0}
                                        src={`https://maps.google.com/maps?q=${activeLocation.mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                        className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold shadow-sm pointer-events-none">
                                        Interactive Map
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
