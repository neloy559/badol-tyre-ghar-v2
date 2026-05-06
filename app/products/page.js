import Link from 'next/link'
import Image from 'next/image'
import OptimizedImage from '@/components/OptimizedImage'
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

async function getProducts(cat, page = 1, sort = 'sku-asc', search = '') {
  const limit = 20
  const skip = (page - 1) * limit
  
  let sortQuery = { sku: 1 }
  if (sort === 'name-asc') sortQuery = { name: 1 }
  if (sort === 'name-desc') sortQuery = { name: -1 }
  if (sort === 'sku-desc') sortQuery = { sku: -1 }

  try {
    await connectDB()
    let query = cat && cat !== 'All' ? { category: cat } : {}
    if (search) {
      query = {
        ...query,
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { sku: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } }
        ]
      }
    }

    const products = await Product.find(query).sort(sortQuery).skip(skip).limit(limit).lean()
    const total = await Product.countDocuments(query)
    
    return {
      products: JSON.parse(JSON.stringify(products)),
      total,
      pages: Math.ceil(total / limit)
    }
  } catch {
    return { products: [], total: 0, pages: 0 }
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

export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = await searchParams
  const activeCat = resolvedSearchParams?.cat || 'All'
  const activePage = parseInt(resolvedSearchParams?.page || '1')
  const activeSort = resolvedSearchParams?.sort || 'sku-asc'
  const activeSearch = resolvedSearchParams?.q || ''

  const [{ products, total, pages }, counts] = await Promise.all([
    getProducts(activeCat, activePage, activeSort, activeSearch), 
    getCounts()
  ])

  return (
    <div className="container-page py-10">
      {/* Search Header */}
      <div className="mb-10">
        <form action="/products" className="relative max-w-2xl">
          <input 
            name="q"
            defaultValue={activeSearch}
            placeholder="Search products by name, SKU or brand..."
            className="w-full bg-white border border-outline-variant rounded-2xl px-6 py-4 pl-14 shadow-sm focus:ring-2 focus:ring-primary focus:outline-none text-on-surface"
          />
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          {activeCat !== 'All' && <input type="hidden" name="cat" value={activeCat} />}
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm">Search</button>
        </form>
      </div>

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
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-on-surface">
                {activeSearch ? `Search: "${activeSearch}"` : (activeCat === 'All' ? 'All Products' : activeCat)}
              </h1>
              <p className="text-on-surface-variant mt-1">
                Showing <strong>{products.length}</strong> of <strong>{total}</strong> products
              </p>
            </div>
            
            {/* Sort Control */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sort by:</span>
              <div className="flex bg-surface-container border border-outline-variant rounded-xl p-1 overflow-hidden">
                {[
                  { id: 'sku-asc',   label: 'SKU ↑' },
                  { id: 'name-asc',  label: 'A-Z' },
                ].map(opt => (
                  <Link
                    key={opt.id}
                    href={`/products?${new URLSearchParams({ ...resolvedSearchParams, sort: opt.id, page: 1 }).toString()}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeSort === opt.id ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {opt.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {products.length > 0 ? (
            <>
              <div className="product-grid">
                {products.map((product, index) => (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    className="group bg-white border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all"
                  >
                    <div className="aspect-square bg-white overflow-hidden relative flex items-center justify-center p-4">
                      {product.images && product.images.length > 0 ? (
                          <OptimizedImage 
                          src={product.images[0]} 
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          priority={index < 8}
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <span className="material-symbols-outlined text-slate-300 text-8xl group-hover:scale-110 transition-transform duration-500">tire_repair</span>
                      )}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full z-10">IN STOCK</div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{product.category}</span>
                          {product.segment && (
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border inline-block w-fit ${
                              product.segment === 'Premium' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                              product.segment === 'Balanced' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                              'bg-slate-50 text-slate-600 border-slate-200'
                            }`}>
                              {product.segment}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-on-surface-variant font-semibold">SKU: {product.sku}</span>
                      </div>
                      <h4 className="font-bold text-on-surface mb-2 text-sm leading-snug h-10 line-clamp-2">{product.name}</h4>
                      {product.brand && <p className="text-[11px] text-slate-500 mb-4 font-semibold">Brand: <span className="text-on-surface">{product.brand}</span></p>}
                      <button className="w-full bg-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container transition-colors active:scale-95 text-xs">
                        <span className="material-symbols-outlined text-base">chat</span>
                        WhatsApp Enquiry
                      </button>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  {activePage > 1 && (
                    <Link 
                      href={`/products?${new URLSearchParams({ ...resolvedSearchParams, page: activePage - 1 }).toString()}`}
                      className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container transition-all text-slate-600"
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </Link>
                  )}
                  
                  {Array.from({ length: pages }).map((_, i) => {
                    const p = i + 1
                    const isCurrent = p === activePage
                    return (
                      <Link
                        key={p}
                        href={`/products?${new URLSearchParams({ ...resolvedSearchParams, page: p }).toString()}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all ${
                          isCurrent ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'border border-outline-variant hover:bg-surface-container text-slate-500'
                        }`}
                      >
                        {p}
                      </Link>
                    )
                  })}

                  {activePage < pages && (
                    <Link 
                      href={`/products?${new URLSearchParams({ ...resolvedSearchParams, page: activePage + 1 }).toString()}`}
                      className="w-10 h-10 flex items-center justify-center rounded-xl border border-outline-variant hover:bg-surface-container transition-all text-slate-600"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24 bg-white rounded-2xl border border-outline-variant">
              <span className="material-symbols-outlined text-7xl text-slate-300">inventory_2</span>
              <h3 className="text-xl font-bold text-slate-700 mt-4 mb-2">No products found</h3>
              <p className="text-slate-500 mb-6">Try searching for a different term or clear the filter.</p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3 rounded-xl"
              >
                <span className="material-symbols-outlined text-base">close</span>
                Clear All Filters
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
