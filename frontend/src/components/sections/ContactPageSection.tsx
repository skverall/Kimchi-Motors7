"use client";

import { Mail, Phone, MessageCircle, Send, MapPin } from "lucide-react";

export const ContactPageSection = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                {/* Hero Header */}
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight uppercase">
                        Let&apos;s Start a <span className="text-blue-600">Conversation</span>
                    </h1>
                    <p className="text-lg text-slate-600">
                        Whether you&apos;re looking to buy your dream car, sell your current vehicle, or just have a question, our team is here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Contact Cards */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                            <Phone className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Sales Department</h3>
                        <p className="text-slate-500 mb-4 text-sm">
                            For inquiries about our inventory or to schedule a viewing.
                        </p>
                        <a href="tel:+97141234567" className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors block">
                            +971 4 123 4567
                        </a>
                        <a href="mailto:sales@kimchimotors.ae" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                            sales@kimchimotors.ae
                        </a>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                            <MessageCircle className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp Concierge</h3>
                        <p className="text-slate-500 mb-4 text-sm">
                            Instant responses for quick questions and support.
                        </p>
                        <a
                            href="https://wa.me/97141234567"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors w-full justify-center"
                        >
                            Chat on WhatsApp
                        </a>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                            <Mail className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">General Inquiries</h3>
                        <p className="text-slate-500 mb-4 text-sm">
                            For partnership opportunities, careers, and other questions.
                        </p>
                        <a href="mailto:info@kimchimotors.ae" className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors block">
                            info@kimchimotors.ae
                        </a>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                                <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all">
                                    <option>I want to buy a car</option>
                                    <option>I want to sell my car</option>
                                    <option>Financing inquiry</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="How can we help you?"></textarea>
                            </div>

                            <button type="button" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                                Send Message
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    <div className="space-y-8 lg:pt-12">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Visit our Flagship Store</h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Experience automotive excellence firsthand. Our flagship showroom in Dubai features our most exclusive collection of luxury and exotic vehicles.
                            </p>
                            <div className="bg-slate-900 rounded-2xl p-6 text-white">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-1">Dubai Showroom</h4>
                                        <p className="text-slate-400 text-sm">Sheikh Zayed Road, Al Quoz 3<br />Dubai, United Arab Emirates</p>
                                    </div>
                                </div>
                                <div className="h-48 rounded-xl overflow-hidden relative">
                                    <iframe
                                        title="Dubai Showroom Map"
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight={0}
                                        marginWidth={0}
                                        src="https://maps.google.com/maps?q=Sheikh%20Zayed%20Road%20Dubai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                        className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
