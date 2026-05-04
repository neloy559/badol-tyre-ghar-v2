import Link from 'next/link'
import Image from 'next/image'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/lib/models'

export const revalidate = 60 // Enable ISR caching for 60 seconds

async function getFeaturedProducts() {
  try {
    await connectDB()
    // Prefer Tyre Sealants with actual images first, then others
    const products = await Product.find({ 
      inStock: true, 
      isPlaceholder: false 
    }).sort({ category: -1 }).limit(8).lean() 
    return JSON.parse(JSON.stringify(products))
  } catch {
    return []
  }
}

const CATEGORIES = [
  { label: 'Tubes',         icon: 'settings_input_component', href: '/products?cat=Tubes',         count: '28+' },
  { label: 'Patches',       icon: 'extension',                href: '/products?cat=Patches',        count: '17+' },
  { label: 'Flaps',         icon: 'layers',                   href: '/products?cat=Flaps',          count: '3+'  },
  { label: 'Gadgets',       icon: 'construction',             href: '/products?cat=Gadgets',        count: '11+' },
  { label: 'Tyre Sealants', icon: 'water_drop',               href: '/products?cat=Tyre+Sealants',  count: '20+' },
  { label: 'Tyres',         icon: 'tire_repair',              href: '/products?cat=Tyres',          count: '6+'  },
]

export const metadata = {
  title: 'Badol Tyre Ghar | Bangladesh\'s #1 B2B Tyre Wholesale Portal',
  description: 'Wholesale tyres, tubes, patches, sealants & more. 20+ years. 500+ garage partners. Rangpur, Bangladesh.',
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      {/* Hero */}
      <section className="relative h-[640px] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        <div className="relative z-10 container-page w-full">
          <div className="max-w-2xl">
            <span className="text-emerald-500 text-sm font-bold mb-4 block tracking-widest uppercase">Established 2004 · Rangpur, Bangladesh</span>
            <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
              Bangladesh's Most Trusted Tyre Wholesale Network
            </h1>
            <p className="text-lg text-slate-300 mb-10 max-w-lg leading-relaxed">
              Empowering 500+ garage partners with premium tyre brands, genuine spare parts, and unmatched logistics speed across Rangpur Division.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/products" className="bg-primary hover:bg-primary-container text-white px-8 py-4 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2">
                EXPLORE CATALOG
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link href="/partner" className="border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition-all backdrop-blur-sm">
                PARTNER WITH US
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Trust Bar */}
      <section className="bg-white border-b border-slate-100 py-12">
        <div className="container-page grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: 'history',         title: '20+ Years',         sub: 'Of industry expertise' },
            { icon: 'groups',          title: '500+ Partners',     sub: 'Active garage network' },
            { icon: 'local_shipping',  title: 'Same-Day Dispatch', sub: 'Priority wholesale shipping' },
          ].map((stat) => (
            <div key={stat.title} className="flex items-center gap-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-emerald-600 text-3xl">{stat.icon}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{stat.title}</h3>
                <p className="text-slate-500 text-sm">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 container-page">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary text-sm font-bold tracking-widest mb-2 block uppercase">Departmental Search</span>
            <h2 className="text-3xl font-bold text-slate-900">Wholesale Categories</h2>
          </div>
          <Link href="/products" className="text-primary font-bold flex items-center gap-1 hover:underline text-sm">
            VIEW ALL <span className="material-symbols-outlined text-base">chevron_right</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat) => (
            <Link key={cat.label} href={cat.href} className="group cursor-pointer">
              <div className="bg-white rounded-3xl aspect-square flex flex-col items-center justify-center border border-slate-100 shadow-sm group-hover:border-primary/20 group-hover:shadow-lg transition-all duration-300 mb-3">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors text-5xl">{cat.icon}</span>
                <span className="text-xs font-bold text-slate-500 group-hover:text-primary mt-1">{cat.count}</span>
              </div>
              <p className="text-center font-bold text-slate-900 text-sm">{cat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-surface-container-low py-20">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Top Wholesale Products</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Instant stock updates for our most requested high-performance automotive essentials.</p>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <Link key={product._id} href={`/product/${product._id}`} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
                  <div className="aspect-square relative bg-white overflow-hidden p-4">
                    {product.images && product.images.length > 0 ? (
                      <Image 
                        src={encodeURI(product.images[0])} 
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority={index < 4}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-300 text-7xl">tire_repair</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full z-10">IN STOCK</div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{product.category}</span>
                    <h4 className="font-bold text-slate-900 mt-1 mb-3">{product.name}</h4>
                    <span className="text-xs text-slate-500">SKU: {product.sku}</span>
                    <button className="w-full mt-4 bg-wa text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-95 transition-all text-sm">
                      <span className="material-symbols-outlined text-base">chat</span>
                      QUOTE VIA WHATSAPP
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-6xl text-slate-300">inventory_2</span>
              <p className="text-slate-500 mt-4">Products loading from catalog...</p>
              <Link href="/products" className="mt-6 inline-block bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-container transition-colors">
                View Full Catalog
              </Link>
            </div>
          )}
          <div className="text-center mt-12">
            <Link href="/products" className="inline-flex items-center gap-2 border-2 border-primary text-primary font-bold px-10 py-4 rounded-xl hover:bg-primary hover:text-white transition-all">
              View All Products <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 container-page grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl">
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-[28px] h-72 flex items-center justify-center">
            <span className="material-symbols-outlined text-8xl text-emerald-400">warehouse</span>
          </div>
          <div className="mt-6 bg-primary/5 border border-primary/10 rounded-2xl p-5 flex items-center gap-4">
            <div className="flex gap-1 text-yellow-400">
              {Array(5).fill(0).map((_, i) => <span key={i} className="material-symbols-outlined text-lg" style={{fontVariationSettings:"'FILL' 1"}}>star</span>)}
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Top Rated Wholesaler</p>
              <p className="text-slate-500 text-xs">Recognized for excellence since 2004</p>
            </div>
          </div>
        </div>
        <div>
          <span className="text-primary font-bold tracking-widest mb-4 block uppercase text-sm">Our Edge</span>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-8">Decades of Reliability in Every Delivery</h2>
          <div className="space-y-8">
            {[
              { icon: 'verified',   title: '100% Genuine Inventory',      desc: 'Direct sourcing from world-renowned tyre manufacturers ensuring zero counterfeits.' },
              { icon: 'inventory_2',title: 'B2B Credit Facility',         desc: 'Flexible payment solutions and credit terms for established long-term garage partners.' },
              { icon: 'speed',      title: 'Priority Logistics Support',  desc: 'Our own fleet ensures your stock is replenished within hours across Rangpur Division.' },
            ].map(item => (
              <div key={item.title} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container-page pb-20">
        <div className="bg-slate-950 rounded-[48px] p-16 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,107,45,0.2)_0%,_transparent_70%)]" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to scale your business?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
              Join our wholesale network and get instant access to special B2B pricing and priority inventory allocations.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/partner" className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-container transition-all">
                BECOME A PARTNER
              </Link>
              <a
                href="https://wa.me/8801647794452?text=আমি পাইকারি প্রাইস লিস্ট চাই"
                target="_blank" rel="noopener noreferrer"
                className="px-10 py-4 bg-wa text-white font-bold rounded-2xl hover:brightness-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">chat</span>
                REQUEST PRICE LIST
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
