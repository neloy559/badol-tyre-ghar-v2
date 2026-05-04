'use client'
import { useState } from 'react'

const DISTRICTS = ['রংপুর','গাইবান্ধা','কুড়িগ্রাম','লালমনিরহাট','নীলফামারী','দিনাজপুর','ঠাকুরগাঁও','পঞ্চগড়','বগুড়া','ঢাকা','অন্যান্য']
const VOLUMES  = ['১–১০ পিস/মাস','১০–৫০ পিস/মাস','৫০–২০০ পিস/মাস','২০০+ পিস/মাস']

export default function PartnerPage() {
  const [form, setForm] = useState({ businessName:'', ownerName:'', phone:'', district:'', volume:'', message:'' })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/partner', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 py-20">
        <div className="container-page text-center">
          <span className="text-emerald-500 font-bold tracking-widest text-sm block mb-4 uppercase">Join Our Network</span>
          <h1 className="text-5xl font-extrabold text-white mb-6">Become a Dealer Partner</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Join 500+ successful garage owners and retailers who trust Badol Tyre Ghar for their wholesale automotive needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            {[
              { icon:'discount',       title:'Wholesale Pricing',   sub:'Best B2B rates in the market' },
              { icon:'inventory_2',    title:'Priority Stock',      sub:'Get stock before retail customers' },
              { icon:'support_agent',  title:'Dedicated Support',   sub:'Personal sales rep assigned' },
            ].map(b => (
              <div key={b.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <span className="material-symbols-outlined text-emerald-400 text-3xl">{b.icon}</span>
                <h4 className="font-bold text-white mt-3 mb-1">{b.title}</h4>
                <p className="text-slate-400 text-sm">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container-page py-16 max-w-2xl">
        <div className="bg-white rounded-3xl border border-outline-variant shadow-xl p-10">
          <h2 className="text-2xl font-bold text-on-surface mb-2">Partner Registration Form</h2>
          <p className="text-on-surface-variant text-sm mb-8">Fill in your business details and we'll get back to you within 24 hours.</p>

          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-5xl" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">আবেদন পাঠানো হয়েছে!</h3>
              <p className="text-slate-600 mb-8 text-lg">আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে। ২৪ ঘণ্টার মধ্যে আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবে।</p>
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <a href={`https://wa.me/8801647794452?text=আমি পার্টনার ফর্ম সাবমিট করেছি - ${form.businessName}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                  <span className="material-symbols-outlined">chat</span>
                  WhatsApp এ ফলো-আপ করুন
                </a>
                <button onClick={() => setStatus(null)} className="text-slate-500 text-sm font-semibold hover:underline">নতুন আবেদন করুন</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">Business Name *</label>
                  <input name="businessName" required value={form.businessName} onChange={handleChange}
                    placeholder="Your garage / shop name"
                    className="w-full border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none bg-surface-container-low" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">Owner Name *</label>
                  <input name="ownerName" required value={form.ownerName} onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none bg-surface-container-low" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">Phone Number *</label>
                  <input name="phone" required type="tel" value={form.phone} onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    className="w-full border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none bg-surface-container-low" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-2">District *</label>
                  <select name="district" required value={form.district} onChange={handleChange}
                    className="w-full border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none bg-surface-container-low">
                    <option value="">Select District</option>
                    {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">Expected Monthly Volume</label>
                <select name="volume" value={form.volume} onChange={handleChange}
                  className="w-full border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none bg-surface-container-low">
                  <option value="">Select volume range</option>
                  {VOLUMES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface mb-2">Message (Optional)</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                  placeholder="Tell us about your business or what products you need..."
                  className="w-full border border-outline-variant rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none bg-surface-container-low resize-none" />
              </div>
              {status === 'error' && <p className="text-red-500 text-sm font-semibold">Something went wrong. Please try again or contact us via WhatsApp.</p>}
              <button type="submit" disabled={status === 'loading'}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-container transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                {status === 'loading' ? <><span className="material-symbols-outlined animate-spin">autorenew</span> Submitting...</> : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
