export const metadata = {
  title: 'Contact Us | Badol Tyre Ghar - Rangpur B2B Tyre Supplier',
  description: 'Contact Badol Tyre Ghar for wholesale tyre orders. Located in Rangpur, Bangladesh. Call, WhatsApp or visit us.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-slate-950 py-16">
        <div className="container-page text-center">
          <span className="text-emerald-500 font-bold tracking-widest text-sm block mb-4 uppercase">Get In Touch</span>
          <h1 className="text-4xl font-extrabold text-white mb-4">Contact Sales & Support</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Whether you have a bulk order, a product query, or want to visit our depot — we're here to help.</p>
        </div>
      </section>

      <section className="container-page py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Reach Us Directly</h2>
          <div className="flex flex-col gap-6">
            {[
              { icon:'location_on', label:'Head Office', value:'স্টেশন রোড, রংপুর, বাংলাদেশ', link:null },
              { icon:'call',        label:'Phone',      value:'01647-794452', link:'tel:+8801647794452' },
              { icon:'chat',        label:'WhatsApp',   value:'Chat with Sales (24/7)', link:'https://wa.me/8801647794452' },
              { icon:'schedule',    label:'Office Hours',value:'Saturday–Thursday: 9AM–8PM', link:null },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-outline-variant shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
                  {item.link ? (
                    <a href={item.link} target={item.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="font-bold text-primary hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-semibold text-slate-800">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Map embed placeholder */}
          <div className="mt-8 bg-slate-100 rounded-2xl h-64 flex items-center justify-center border border-outline-variant overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58020.63076437376!2d89.22064!3d25.74621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e321c95de98a43%3A0x17efa0025dfa2b74!2sRangpur!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%" height="100%" style={{ border: 0 }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Quick CTA Buttons */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Quick Contact Options</h2>
          <div className="flex flex-col gap-5">
            <a href="https://wa.me/8801647794452?text=হোলসেল প্রাইস লিস্ট পাঠান" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-5 bg-wa/10 border-2 border-wa/20 hover:border-wa rounded-2xl p-6 transition-all group">
              <div className="w-14 h-14 bg-wa rounded-2xl flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-2xl">chat</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 mb-1">WhatsApp for Price List</p>
                <p className="text-sm text-slate-500">Get instant wholesale pricing</p>
              </div>
              <span className="ml-auto material-symbols-outlined text-slate-400 group-hover:text-wa transition-colors">arrow_forward</span>
            </a>

            <a href="tel:+8801647794452"
              className="flex items-center gap-5 bg-primary/5 border-2 border-primary/10 hover:border-primary rounded-2xl p-6 transition-all group">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-2xl">call</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 mb-1">Call Sales Directly</p>
                <p className="text-sm text-slate-500">01647-794452</p>
              </div>
              <span className="ml-auto material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">arrow_forward</span>
            </a>

            <a href="/partner"
              className="flex items-center gap-5 bg-slate-50 border-2 border-slate-200 hover:border-slate-400 rounded-2xl p-6 transition-all group">
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-2xl">handshake</span>
              </div>
              <div>
                <p className="font-bold text-slate-900 mb-1">Apply for Dealership</p>
                <p className="text-sm text-slate-500">Join our partner network</p>
              </div>
              <span className="ml-auto material-symbols-outlined text-slate-400 group-hover:text-slate-800 transition-colors">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
