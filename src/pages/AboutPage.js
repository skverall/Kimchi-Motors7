import React from 'react';
import { Award, Users, Globe } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white pt-20 pb-20">
            {/* Hero */}
            <div className="relative py-32 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1562519819-016930ada31b?auto=format&fit=crop&q=80&w=1920" alt="Office" className="w-full h-full object-cover" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">About Kimchi Motors</h1>
                    <p className="text-slate-300 text-xl max-w-2xl mx-auto font-light">
                        Redefining the luxury automotive export industry since 2010.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Story</h2>
                        <p className="text-slate-600 leading-loose text-lg mb-6">
                            Kimchi Motors began with a simple vision: to share the excellence of Korean automotive engineering with the world. What started as a small boutique exporter has grown into a global leader in luxury vehicle sourcing and logistics.
                        </p>
                        <p className="text-slate-600 leading-loose text-lg">
                            We pride ourselves on transparency, quality, and an unwavering commitment to customer satisfaction. Every vehicle we sell is hand-selected, rigorously inspected, and prepared to showroom standards before it ever leaves our facility.
                        </p>
                    </div>
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1000" alt="Showroom" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-8 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-accent">
                            <Award className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3">Excellence</h3>
                        <p className="text-slate-500">Award-winning service and premium vehicle selection.</p>
                    </div>
                    <div className="text-center p-8 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-accent">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3">Client Focus</h3>
                        <p className="text-slate-500">Dedicated concierge team for every client.</p>
                    </div>
                    <div className="text-center p-8 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-accent">
                            <Globe className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-primary mb-3">Global Reach</h3>
                        <p className="text-slate-500">Serving clients in over 50 countries worldwide.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
