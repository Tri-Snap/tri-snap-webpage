"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/tri-snap-logo.png"
              alt="Tri-Snap Logo"
              width={150}
              height={50}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-secondary hover:text-primary font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-secondary hover:text-primary font-medium transition-colors">
              About
            </Link>
            <Link
              href="#early-access"
              className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Get Early Access
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-secondary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 flex flex-col">
            <Link
              href="/"
              className="text-secondary hover:text-primary font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-secondary hover:text-primary font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#early-access"
              className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-md font-medium transition-colors w-fit"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Early Access
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
