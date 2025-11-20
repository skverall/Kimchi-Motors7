import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-white pt-20 pb-20">
            {/* Header */}
            <div className="bg-slate-900 text-white py-20 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Get in Touch</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Our concierge team is available 24/7 to assist you with your automotive needs.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <h3 className="text-2xl font-serif font-bold text-primary mb-6">Showroom Information</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-sm shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary text-lg">Main Showroom</h4>
                                        <p className="text-slate-500 leading-relaxed">123 Gangnam-daero, Gangnam-gu<br />Seoul, South Korea</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-sm shrink-0">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary text-lg">Phone</h4>
                                        <p className="text-slate-500">+82 2-1234-5678</p>
                                        <p className="text-slate-400 text-sm">Mon-Sun, 9am - 8pm</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent shadow-sm shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary text-lg">Email</h4>
                                        <p className="text-slate-500">concierge@kimchimotors.com</p>
                                        <p className="text-slate-500">sales@kimchimotors.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-[300px] bg-slate-200 rounded-2xl overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000"
                                alt="Map Location"
                                className="w-full h-full object-cover grayscale opacity-60"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="bg-white text-primary px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-accent" /> View on Google Maps
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg">
                        <h3 className="text-2xl font-serif font-bold text-primary mb-2">Send us a Message</h3>
                        <p className="text-slate-500 mb-8">We typically respond within 2 hours.</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors">
                                    <option>General Inquiry</option>
                                    <option>Vehicle Availability</option>
                                    <option>Sell My Car</option>
                                    <option>Financing</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                                <textarea rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" placeholder="How can we help you?"></textarea>
                            </div>

                            <button type="button" className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200">
                                <Send className="w-5 h-5" /> Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
