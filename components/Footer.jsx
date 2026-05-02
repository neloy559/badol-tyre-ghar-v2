import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-950 w-full pt-16 pb-8 border-t border-slate-800 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-container mx-auto px-8">
        {/* Brand */}
        <div>
          <div className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500">tire_repair</span>
            Badol Tyre Ghar
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Bangladesh's most trusted B2B tyre wholesale network. Serving 500+ garage partners across Rangpur Division since 2004.
          </p>
          <div className="mt-6 flex gap-2 flex-wrap">
            <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold px-3 py-1 rounded">bKash</span>
            <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold px-3 py-1 rounded">Cash</span>
            <span className="bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold px-3 py-1 rounded">B2B Credit</span>
          </div>
        </div>

        {/* Brand Info */}
        <div>
          <h5 className="text-emerald-500 font-bold text-sm tracking-widest uppercase mb-6">Brand Info</h5>
          <ul className="flex flex-col gap-3 text-slate-300 text-sm">
            <li><Link href="/about" className="hover:text-emerald-400 hover:underline transition-all">About Our History</Link></li>
            <li><Link href="/shops" className="hover:text-emerald-400 hover:underline transition-all">Dealer Locator</Link></li>
            <li><Link href="/terms" className="hover:text-emerald-400 hover:underline transition-all">Trade Terms & FAQ</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-emerald-500 font-bold text-sm tracking-widest uppercase mb-6">Quick Links</h5>
          <ul className="flex flex-col gap-3 text-slate-300 text-sm">
            <li><Link href="/products" className="hover:text-emerald-400 hover:underline transition-all">Product Catalog</Link></li>
            <li><Link href="/partner" className="hover:text-emerald-400 hover:underline transition-all">Partner Registration</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-400 hover:underline transition-all">Contact Sales</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-emerald-500 font-bold text-sm tracking-widest uppercase mb-6">Contact Details</h5>
          <ul className="flex flex-col gap-3 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-emerald-500 text-sm mt-0.5">location_on</span>
              স্টেশন রোড, রংপুর, বাংলাদেশ
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-500 text-sm">call</span>
              <a href="tel:+8801647794452" className="hover:text-emerald-400 transition-colors">01647-794452</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-500 text-sm">chat</span>
              <a href="https://wa.me/8801647794452" className="hover:text-emerald-400 transition-colors">WhatsApp Sales</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-container mx-auto px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
        <p>© 2024 Badol Tyre Ghar. All Rights Reserved.</p>
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
        </div>
      </div>
    </footer>
  )
}
