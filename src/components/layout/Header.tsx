'use client'

import Link from 'next/link'
import { Search, User, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? 'bg-background/80 backdrop-blur-lg border-b shadow-lg'
                : 'bg-transparent border-b border-transparent'
            }`}>
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center transform transition-transform group-hover:scale-110">
                        <span className="text-white font-bold text-lg">K</span>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                        KIMCHI MOTORS
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <Link
                        href="/"
                        className="relative py-2 transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                        Home
                    </Link>
                    <Link
                        href="/inventory"
                        className="relative py-2 transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                        Inventory
                    </Link>
                    <Link
                        href="/about"
                        className="relative py-2 transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/contact"
                        className="relative py-2 transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center relative">
                        <input
                            type="text"
                            placeholder="Search cars..."
                            className="h-10 w-48 rounded-lg border border-input bg-background/50 backdrop-blur-sm px-4 py-2 text-sm shadow-sm transition-all focus:w-64 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                        />
                        <Search className="absolute right-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>

                    <Link
                        href="/admin/login"
                        className="hidden md:flex items-center justify-center h-10 w-10 rounded-lg border border-primary/20 bg-primary/10 hover:bg-primary hover:text-white transition-all"
                    >
                        <User className="h-5 w-5" />
                        <span className="sr-only">Admin Login</span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background/95 backdrop-blur-lg">
                    <nav className="flex flex-col p-4 space-y-3">
                        <Link
                            href="/"
                            className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/inventory"
                            className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Inventory
                        </Link>
                        <Link
                            href="/about"
                            className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <div className="pt-2 border-t">
                            <Link
                                href="/admin/login"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary/10 hover:bg-primary hover:text-white transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User className="h-4 w-4" />
                                Admin Login
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}
