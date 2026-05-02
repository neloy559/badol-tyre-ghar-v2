import { connectDB } from '@/lib/mongodb'
import { Shop } from '@/lib/models'

export const metadata = {
  title: 'Dealer Locator | Find Badol Tyre Ghar Outlets Near You',
  description: 'Find Badol Tyre Ghar dealer outlets and affiliated garages across Rangpur Division and beyond.',
}

async function getShops() {
  try {
    await connectDB()
    const shops = await Shop.find({}).sort({ district: 1 }).lean()
    return JSON.parse(JSON.stringify(shops))
  } catch {
    return []
  }
}

const DEFAULT_SHOPS = [
  { _id:'1', name:'Badol Tyre Ghar (HQ)', district:'রংপুর', thana:'রংপুর সদর', address:'স্টেশন রোড, রংপুর', phone:'01647-794452' },
  { _id:'2', name:'Badol Tyre – সৈয়দপুর', district:'নীলফামারী', thana:'সৈয়দপুর', address:'সৈয়দপুর বাসস্ট্যান্ড', phone:'01647-794452' },
]

export default async function ShopsPage() {
  const dbShops = await getShops()
  const shops = dbShops.length > 0 ? dbShops : DEFAULT_SHOPS

  // Group by district
  const byDistrict = shops.reduce((acc, shop) => {
    const key = shop.district || 'অন্যান্য'
    if (!acc[key]) acc[key] = []
    acc[key].push(shop)
    return acc
  }, {})

  return (
    <>
      <section className="bg-slate-950 py-16">
        <div className="container-page text-center">
          <span className="text-emerald-500 font-bold tracking-widest text-sm block mb-4 uppercase">Find Us Near You</span>
          <h1 className="text-4xl font-extrabold text-white mb-4">Dealer Locator</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Find Badol Tyre Ghar outlets and authorized dealers across Bangladesh.</p>
        </div>
      </section>

      <section className="container-page py-16">
        {Object.entries(byDistrict).map(([district, districtShops]) => (
          <div key={district} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <h2 className="text-xl font-bold text-slate-900">{district} জেলা</h2>
              <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">{districtShops.length} outlet{districtShops.length > 1 ? 's' : ''}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {districtShops.map(shop => (
                <div key={shop._id} className="bg-white border border-outline-variant rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">store</span>
                    </div>
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">OPEN</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{shop.name}</h3>
                  {shop.thana && <p className="text-xs text-on-surface-variant font-semibold mb-3">{shop.thana} থানা</p>}
                  {shop.address && (
                    <p className="flex items-start gap-2 text-sm text-slate-600 mb-3">
                      <span className="material-symbols-outlined text-slate-400 text-sm mt-0.5">place</span>
                      {shop.address}
                    </p>
                  )}
                  {shop.phone && (
                    <a href={`tel:+88${shop.phone}`} className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                      <span className="material-symbols-outlined text-sm">call</span>
                      {shop.phone}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 bg-primary/5 border border-primary/10 rounded-3xl p-10 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-3">Want to be listed as a dealer?</h3>
          <p className="text-slate-600 mb-6">Register as a partner and get your shop listed on our dealer network.</p>
          <a href="/partner" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-container transition-all">
            <span className="material-symbols-outlined">handshake</span>
            Become a Partner
          </a>
        </div>
      </section>
    </>
  )
}
