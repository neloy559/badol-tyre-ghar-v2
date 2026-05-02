import Link from 'next/link'
import { notFound } from 'next/navigation'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/lib/models'
import ProductTabs from '@/components/ProductTabs'
import ProductGallery from '@/components/ProductGallery'

export const revalidate = 60


async function getProduct(id) {
  try {
    await connectDB()
    const product = await Product.findById(id).lean()
    if (!product) return null
    return JSON.parse(JSON.stringify(product))
  } catch (error) {
    console.error("getProduct error:", error)
    return null
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) return { title: 'Product Not Found | Badol Tyre Ghar' }
  return {
    title: `${product.name} | ${product.category} | Badol Tyre Ghar`,
    description: product.description || `Wholesale ${product.name} (SKU: ${product.sku}). Best B2B prices from Badol Tyre Ghar.`,
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) notFound()

  const waText = encodeURIComponent(`আমি ${product.name} (SKU: ${product.sku}) অর্ডার করতে চাই`)
  const waUrl = `https://wa.me/8801647794452?text=${waText}`

  return (
    <div className="container-page py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="material-symbols-outlined text-base opacity-30">chevron_right</span>
        <Link href="/products" className="hover:text-primary transition-colors">Catalog</Link>
        <span className="material-symbols-outlined text-base opacity-30">chevron_right</span>
        <Link href={`/products?cat=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">{product.category}</Link>
        <span className="material-symbols-outlined text-base opacity-30">chevron_right</span>
        <span className="text-primary font-semibold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Hero Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery */}
        <ProductGallery images={product.images} />

        {/* Info Panel */}
        <div className="flex flex-col">
          <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full w-fit mb-4">
            <span className="material-symbols-outlined text-sm">category</span>
            {product.category}
          </span>
          <h1 className="text-4xl font-extrabold text-on-surface mb-3 leading-tight">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-slate-500 text-sm font-semibold">SKU: {product.sku}</span>
            <span className={`flex items-center gap-1 text-sm font-bold ${product.inStock ? 'text-emerald-600' : 'text-red-500'}`}>
              <span className="material-symbols-outlined text-sm">{product.inStock ? 'check_circle' : 'cancel'}</span>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {product.brand && (
            <div className="mb-6 text-sm text-on-surface-variant font-semibold">
              Brand: <span className="text-on-surface font-bold">{product.brand}</span>
            </div>
          )}

          {/* B2B Pricing Tiers */}
          <div className="bg-surface-container-low border border-outline-variant rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-on-surface mb-4">B2B Wholesale Pricing</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { qty: '1–10 pcs',  label: 'Retail',    icon: 'person' },
                { qty: '10–50 pcs', label: 'Wholesale', icon: 'groups' },
                { qty: '50+ pcs',   label: 'Bulk',      icon: 'warehouse' },
              ].map(tier => (
                <div key={tier.qty} className="text-center bg-white border border-outline-variant rounded-xl p-4">
                  <span className="material-symbols-outlined text-primary text-2xl">{tier.icon}</span>
                  <p className="font-bold text-on-surface text-xs mt-1">{tier.qty}</p>
                  <p className="text-primary font-bold text-sm mt-1">{tier.label}</p>
                  <p className="text-xs text-slate-400 mt-1">On Request</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">Contact us for exact pricing via WhatsApp</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 mb-8">
            <a
              href={waUrl}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-wa text-white font-bold py-4 rounded-2xl hover:brightness-95 transition-all active:scale-[0.98] text-lg shadow-lg shadow-green-200"
            >
              <span className="material-symbols-outlined text-2xl">chat</span>
              💬 Order on WhatsApp
            </a>
            <a
              href="tel:+8801647794452"
              className="flex items-center justify-center gap-3 border-2 border-outline-variant text-on-surface font-bold py-4 rounded-2xl hover:bg-surface-container transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined">call</span>
              📞 Call for Bulk Order
            </a>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: 'verified',        label: '100% Genuine' },
              { icon: 'local_shipping',  label: 'Fast Dispatch' },
              { icon: 'handshake',       label: 'B2B Credit' },
            ].map(badge => (
              <div key={badge.label} className="flex flex-col items-center gap-1 bg-surface-container-low rounded-xl p-3 text-center">
                <span className="material-symbols-outlined text-primary text-2xl">{badge.icon}</span>
                <p className="text-xs font-bold text-on-surface">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <ProductTabs product={product} />

      {/* Related Nudge */}
      <div className="mt-16 bg-slate-950 rounded-3xl p-10 text-center">
        <h3 className="text-2xl font-bold text-white mb-3">Need more of this product?</h3>
        <p className="text-slate-400 mb-8">Get bulk pricing and priority stock allocation as a registered B2B partner.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/partner" className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-container transition-all">
            Become a Dealer Partner
          </Link>
          <Link href="/products" className="border border-white/20 text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-all">
            Browse Full Catalog
          </Link>
        </div>
      </div>
    </div>
  )
}
