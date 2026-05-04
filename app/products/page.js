import Link from 'next/link'
import Image from 'next/image'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/lib/models'

export const revalidate = 60


const CATEGORIES = ['All', 'Tubes', 'Patches', 'Flaps', 'Gadgets', 'Tyre Sealants', 'Tyres']

const CAT_ICONS = {
  'Tubes':         'settings_input_component',
  'Patches':       'extension',
  'Flaps':         'layers',
  'Gadgets':       'construction',
  'Tyre Sealants': 'water_drop',
  'Tyres':         'tire_repair',
  'All':           'category',
}

async function getProducts(cat) {
  try {
    await connectDB()
    const query = cat && cat !== 'All' ? { category: cat } : {}
    const products = await Product.find(query).sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(products))
  } catch {
    return []
  }
}

async function getCounts() {
  try {
    await connectDB()
    const all = await Product.countDocuments()
    const counts = { All: all }
    for (const cat of CATEGORIES.slice(1)) {
      counts[cat] = await Product.countDocuments({ category: cat })
    }
    return counts
  } catch {
    return {}
  }
}

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const cat = resolvedSearchParams?.cat || 'All'
  return {
    title: `${cat === 'All' ? 'All Products' : cat} | Badol Tyre Ghar B2B Catalog`,
    description: `Browse wholesale ${cat === 'All' ? 'automotive products' : cat} from Badol Tyre Ghar. Best B2B prices in Bangladesh.`,
  }
}

export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const activeCat = resolvedSearchParams?.cat || 'All'
  const [products, counts] = await Promise.all([getProducts(activeCat), getCounts()])

  return (
    <div className="container-page py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-base opacity-30">chevron_right</span>
        <span className="text-slate-800 font-semibold">Product Catalog</span>
        {activeCat !== 'All' && (
          <>
            <span className="material-symbols-outlined text-base opacity-30">chevron_right</span>
            <span className="text-primary font-semibold">{activeCat}</span>
          </>
        )}
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sidebar-sticky flex flex-col gap-6">
            {/* Categories */}
            <div className="bg-white p-6 rounded-2xl border border-outline-variant shadow-sm">
              <h3 className="text-lg font-bold text-on-surface mb-1">Categories</h3>
              <p className="text-sm text-on-surface-variant mb-6">Wholesale Catalog</p>
              <nav className="flex flex-col gap-1">
                {CATEGORIES.map(cat => {
                  const isActive = activeCat === cat
                  return (
                    <Link
                      key={cat}
                      href={cat === 'All' ? '/products' : `/products?cat=${encodeURIComponent(cat)}`}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                        isActive
                          ? 'bg-primary/10 text-primary border-b-2 border-primary'
                          : 'text-slate-500 hover:text-primary hover:bg-surface-container'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{CAT_ICONS[cat]}</span>
                      <span>{cat}</span>
                      <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-primary/20 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                        {counts[cat] ?? 0}
                      </span>
                    </Link>
                  )
                })}
              </nav>
              <a
                href="https://wa.me/8801647794452?text=হোলসেল প্রাইস লিস্ট পাঠান"
                target="_blank" rel="noopener noreferrer"
                className="mt-6 w-full bg-slate-950 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined text-[18px]">description</span>
                Request Price List
              </a>
            </div>

            {/* B2B Support box */}
            <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl">
              <h4 className="font-bold text-primary mb-2 text-sm">B2B Priority Support</h4>
              <p className="text-sm text-slate-600 mb-4">Get direct quotes for bulk orders exceeding 500 units.</p>
              <Link href="/partner" className="text-sm font-bold text-primary underline">Become a Partner →</Link>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-grow">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-on-surface">
                {activeCat === 'All' ? 'All Products' : activeCat}
              </h1>
              <p className="text-on-surface-variant mt-1">
                Showing <strong>{products.length}</strong> products in our wholesale catalog
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-surface-container px-4 py-2 rounded-lg border border-outline-variant text-sm font-semibold">
              <span className="material-symbols-outlined text-[18px]">sort</span>
              Sort by Stock
            </div>
          </div>

          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product, index) => (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  className="group bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all"
                >
                  <div className="aspect-square bg-white overflow-hidden relative flex items-center justify-center p-4">
                    {product.images && product.images.length > 0 ? (
                        <Image 
                        src={encodeURI(product.images[0])} 
                        alt={product.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority={index < 8}
                        onError={(e) => { e.currentTarget.src = '/images/placeholders/placeholder img (1).jpeg' }}
                      />
                    ) : (
                      <span className="material-symbols-outlined text-slate-300 text-8xl group-hover:scale-110 transition-transform duration-500">tire_repair</span>
                    )}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full z-10">IN STOCK</div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">{product.category}</span>
                      <span className="text-xs text-on-surface-variant">{product.sku}</span>
                    </div>
                    <h4 className="font-bold text-on-surface mb-3">{product.name}</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[11px] font-bold rounded">{tag}</span>
                      ))}
                    </div>
                    <button className="w-full bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container transition-colors active:scale-95 text-sm">
                      <span className="material-symbols-outlined text-base">chat</span>
                      💬 WhatsApp Order
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-2xl border border-outline-variant">
              <span className="material-symbols-outlined text-7xl text-slate-300">inventory_2</span>
              <h3 className="text-xl font-bold text-slate-700 mt-4 mb-2">No products found</h3>
              <p className="text-slate-500 mb-6">This category is being stocked. Check back soon or contact us.</p>
              <a
                href="https://wa.me/8801647794452"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-wa text-white font-bold px-8 py-3 rounded-xl"
              >
                <span className="material-symbols-outlined">chat</span>
                Enquire via WhatsApp
              </a>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
