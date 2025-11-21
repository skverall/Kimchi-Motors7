import Link from 'next/link'
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-200">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">KIMCHI MOTORS</h3>
                        <p className="text-sm text-slate-400">
                            Your trusted partner in finding the perfect vehicle. Premium cars, exceptional service, and a seamless buying experience.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-white"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-white"><Twitter className="h-5 w-5" /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-white">Home</Link></li>
                            <li><Link href="/inventory" className="hover:text-white">Inventory</Link></li>
                            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Showroom Locations */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-white">Our Showrooms</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start space-x-2">
                                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                                <span>123 Motor City Drive,<br />Dubai, UAE</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                                <span>456 Auto Avenue,<br />Abu Dhabi, UAE</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-white">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center space-x-2">
                                <Phone className="h-5 w-5 text-primary" />
                                <span>+971 50 123 4567</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail className="h-5 w-5 text-primary" />
                                <span>info@kimchimotors.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Kimchi Motors. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
