'use client'
import Link from 'next/link'
import { useState } from 'react'

const CATEGORIES = [
  { label: 'Tubes',         icon: 'settings_input_component', href: '/products?cat=Tubes' },
  { label: 'Patches',       icon: 'extension',                href: '/products?cat=Patches' },
  { label: 'Flaps',         icon: 'layers',                   href: '/products?cat=Flaps' },
  { label: 'Gadgets',       icon: 'construction',             href: '/products?cat=Gadgets' },
  { label: 'Tyre Sealants', icon: 'water_drop',               href: '/products?cat=Tyre+Sealants' },
  { label: 'Tyres',         icon: 'tire_repair',              href: '/products?cat=Tyres' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top utility bar */}
      <div className="bg-slate-950 text-slate-400 text-xs py-2 px-8 flex justify-between items-center">
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-emerald-500">location_on</span>
          রংপুর, বাংলাদেশ
        </span>
        <div className="flex items-center gap-6">
          <a href="tel:+8801647794452" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
            <span className="material-symbols-outlined text-sm">call</span>
            01647-794452
          </a>
          <a
            href="https://wa.me/8801647794452"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className="flex justify-between items-center h-16 px-8 max-w-container mx-auto">
        <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2 font-jakarta">
          <span className="material-symbols-outlined text-2xl">tire_repair</span>
          Badol Tyre Ghar
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form action="/products" className="relative w-full">
            <input
              name="q"
              type="text"
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:outline-none focus:bg-surface-container-lowest transition-all"
              placeholder="Search tyres, tubes, sealants..."
            />
            <button type="submit" className="material-symbols-outlined absolute right-3 top-2 text-primary hover:scale-110 transition-transform">search</button>
          </form>
        </div>

        {/* Nav actions */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/shops" className="flex items-center gap-1 text-slate-600 hover:text-primary font-semibold text-sm transition-colors">
            <span className="material-symbols-outlined text-lg">store</span>
            Find Dealers
          </Link>
          <Link href="/partner" className="flex items-center gap-1 bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined text-lg">handshake</span>
            Become a Partner
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-slate-700" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Category sub-nav */}
      <nav className="hidden md:flex justify-center items-center gap-6 w-full h-10 border-t border-slate-100 bg-white overflow-x-auto whitespace-nowrap px-8">
        <Link href="/products" className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-all">
          All Products
        </Link>
        {CATEGORIES.map(cat => (
          <Link key={cat.label} href={cat.href} className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-all">
            <span className="material-symbols-outlined text-base">{cat.icon}</span>
            {cat.label}
          </Link>
        ))}
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-8 py-4 flex flex-col gap-3">
          <Link href="/products" onClick={() => setMenuOpen(false)} className="text-sm font-semibold text-slate-700">All Products</Link>
          {CATEGORIES.map(cat => (
            <Link key={cat.label} href={cat.href} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <span className="material-symbols-outlined text-base text-primary">{cat.icon}</span>
              {cat.label}
            </Link>
          ))}
          <Link href="/partner" className="mt-2 bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm text-center">Become a Partner</Link>
        </div>
      )}
    </header>
  )
}
