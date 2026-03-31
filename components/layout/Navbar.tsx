'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrendingUp, Menu, X } from 'lucide-react'
import { track, EVENTS } from '@/lib/analytics'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Markets', href: '#markets' },
    { label: 'Pricing', href: '#pricing' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-navy/90 backdrop-blur-md border-b border-brand-border/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center glow-emerald group-hover:scale-110 transition-transform">
            <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg tracking-tight text-brand-text">
            Apex<span className="gradient-text">Signal</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-brand-muted hover:text-brand-text transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#waitlist"
            onClick={() => track(EVENTS.NAVBAR_CTA_CLICK)}
            className="px-5 py-2 text-sm font-semibold rounded-lg bg-brand-green text-white hover:bg-brand-green/90 transition-all duration-200 glow-emerald hover:scale-105"
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-brand-muted hover:text-brand-text p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-card/95 backdrop-blur-md border-t border-brand-border/50 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-brand-muted hover:text-brand-text transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="px-5 py-2.5 text-sm font-semibold rounded-lg bg-brand-green text-white text-center"
            onClick={() => setMobileOpen(false)}
          >
            Join Waitlist
          </a>
        </div>
      )}
    </header>
  )
}
