import Link from 'next/link'

export const metadata = {
  title: 'About Us | Badol Tyre Ghar - 20+ Years of Tyre Wholesale Excellence',
  description: 'Learn about Badol Tyre Ghar, Bangladesh\'s trusted B2B tyre wholesaler since 2004. Our history, mission, and dealer network in Rangpur Division.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 py-20">
        <div className="container-page text-center">
          <span className="text-emerald-500 font-bold tracking-widest text-sm block mb-4 uppercase">Our Story</span>
          <h1 className="text-5xl font-extrabold text-white mb-6">20 Years of Trust, One Tyre at a Time</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From a small roadside shop in Rangpur to Bangladesh's leading B2B tyre wholesale network — this is our story.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="container-page py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-primary font-bold tracking-widest text-sm block mb-3 uppercase">Our History</span>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Founded with a Vision for Bangladesh's Roads</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Badol Tyre Ghar was founded with a single vision: to provide genuine, high-quality automotive tyres and accessories to every garage and workshop across Rangpur Division at the best wholesale prices.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            What started as a small retail operation quickly grew into one of the most trusted B2B wholesale networks in Northern Bangladesh. Our commitment to genuine products, fair pricing, and reliable delivery has earned us the loyalty of 500+ active garage partners.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Today, we carry an extensive inventory of Tubes, Patches, Flaps, Tyres, Gadgets, and Sealants — sourced directly from verified manufacturers and made available to our partners with same-day dispatch.
          </p>
        </div>
        <div className="bg-gradient-to-br from-primary to-slate-800 rounded-3xl h-80 flex items-center justify-center">
          <div className="text-center text-white">
            <span className="material-symbols-outlined text-8xl text-emerald-300">warehouse</span>
            <p className="font-bold text-2xl mt-4">Est. 2004</p>
            <p className="text-emerald-300 text-sm">Rangpur, Bangladesh</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-surface-container-low py-20">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Mission & Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon:'my_location', title:'Our Mission', text:'To empower every garage, auto-shop, and transport company in Bangladesh with access to genuine, affordable automotive products through a reliable and transparent B2B supply chain.' },
              { icon:'visibility',  title:'Our Vision',  text:'To become the #1 wholesale automotive partner for 10,000+ businesses across Bangladesh, building a supply ecosystem that prioritizes quality, speed, and fair trade.' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-3xl p-10 border border-outline-variant shadow-sm">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="container-page py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Our Network, By the Numbers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num:'20+',  label:'Years in Business' },
            { num:'500+', label:'Active Garage Partners' },
            { num:'85+',  label:'Products in Catalog' },
            { num:'8',    label:'Districts Covered' },
          ].map(s => (
            <div key={s.label} className="text-center bg-primary/5 border border-primary/10 rounded-2xl p-8">
              <p className="text-4xl font-extrabold text-primary mb-2">{s.num}</p>
              <p className="text-slate-600 font-semibold text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="bg-slate-950 rounded-3xl p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to join our wholesale family?</h3>
          <p className="text-slate-400 mb-8">Become a dealer and get exclusive B2B pricing, priority stock access, and dedicated support.</p>
          <Link href="/partner" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-10 py-4 rounded-2xl hover:bg-primary-container transition-all">
            <span className="material-symbols-outlined">handshake</span>
            Become a Partner
          </Link>
        </div>
      </section>
    </>
  )
}
