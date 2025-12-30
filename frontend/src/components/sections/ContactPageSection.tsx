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
                        <a href="tel:+971564743456" className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors block">
                            Tel. +971 56 474 3456
                        </a>

                        <a href="mailto:info@kimchimotors.ae" className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                            info@kimchimotors.ae
                        </a>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6 fill-current text-emerald-600"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp Concierge</h3>
                        <p className="text-slate-500 mb-4 text-sm">
                            Instant responses for quick questions and support.
                        </p>
                        <a
                            href="https://wa.me/971564743456"
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
                                        <h4 className="font-bold text-lg mb-1">Ajman Showroom</h4>
                                        <p className="text-slate-400 text-sm">Ajman, UAE</p>
                                    </div>
                                </div>
                                <div className="h-48 rounded-xl overflow-hidden relative">
                                    <iframe
                                        title="Ajman Showroom Map"
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight={0}
                                        marginWidth={0}
                                        src="https://maps.google.com/maps?q=25.443475501231624,55.51327843713836&t=&z=13&ie=UTF8&iwloc=&output=embed"
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
