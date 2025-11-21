'use client'

import Link from 'next/link'
import { Search, User, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">KIMCHI MOTORS</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary">Home</Link>
                    <Link href="/inventory" className="transition-colors hover:text-primary">Inventory</Link>
                    <Link href="/about" className="transition-colors hover:text-primary">About Us</Link>
                    <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="h-9 w-40 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Search className="absolute right-2 h-4 w-4 text-muted-foreground" />
                    </div>

                    <Link href="/admin/login" className="hidden md:flex items-center justify-center h-9 w-9 rounded-md border hover:bg-accent">
                        <User className="h-4 w-4" />
                        <span className="sr-only">Admin Login</span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background p-4">
                    <nav className="flex flex-col space-y-4">
                        <Link href="/" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link href="/inventory" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Inventory</Link>
                        <Link href="/about" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                        <Link href="/admin/login" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Admin Login</Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
