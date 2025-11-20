import React from 'react';
import { Shield, Wrench, Truck, DollarSign, CheckCircle } from 'lucide-react';

const ServicesPage = () => {
    const services = [
        {
            icon: Truck,
            title: "Global Shipping",
            description: "We handle all logistics, customs clearance, and delivery to your doorstep, anywhere in the world."
        },
        {
            icon: Shield,
            title: "Warranty & Protection",
            description: "Comprehensive warranty packages and ceramic coating protection services for your peace of mind."
        },
        {
            icon: Wrench,
            title: "Maintenance & Service",
            description: "Authorized service center with factory-trained technicians for all Korean luxury brands."
        },
        {
            icon: DollarSign,
            title: "Financing Solutions",
            description: "Tailored financial plans with competitive rates and flexible terms to suit your needs."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-20">
            <div className="bg-primary text-white py-24 mb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Our Services</h1>
                    <p className="text-slate-300 text-xl max-w-2xl mx-auto font-light">
                        Beyond just selling cars, we provide a complete ownership experience.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {services.map((service, idx) => (
                        <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                <service.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-primary mb-4">{service.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-lg">{service.description}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>
                    <h2 className="text-3xl font-serif font-bold text-primary mb-6">Ready to experience excellence?</h2>
                    <p className="text-slate-500 mb-8 max-w-2xl mx-auto">Contact our team today to discuss how we can assist you with your automotive journey.</p>
                    <button className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                        Contact Concierge
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
