'use client'
import { useState } from 'react'

const FAQS = [
  { q: 'Minimum Order Quantity (MOQ) কত?', a: 'আমাদের কোনো কঠোর MOQ নেই। তবে বেশি পরিমাণে অর্ডার করলে আরও ভালো পাইকারি মূল্য পাওয়া যায়। ১০+ পিস থেকে ডিসকাউন্ট শুরু হয়।' },
  { q: 'ডেলিভারি কি সারা বাংলাদেশে পাওয়া যায়?', a: 'হ্যাঁ। রংপুর বিভাগে সেইম-ডে ডেলিভারি সম্ভব। ঢাকাসহ অন্যান্য জেলায় ২৪–৪৮ ঘণ্টার মধ্যে পৌঁছে দেওয়া হয়।' },
  { q: 'B2B ক্রেডিটে পণ্য নেওয়া যাবে কি?', a: 'হ্যাঁ। রেজিস্টার্ড ডিলার পার্টনাররা ৭–৩০ দিনের ক্রেডিট সুবিধা পেতে পারেন। এর জন্য পার্টনার রেজিস্ট্রেশন সম্পন্ন করতে হবে।' },
  { q: 'পণ্যগুলো কি ১০০% আসল?', a: 'অবশ্যই। আমরা সরাসরি ভেরিফাইড ম্যানুফ্যাকচারার ও অথোরাইজড ডিস্ট্রিবিউটর থেকে পণ্য সংগ্রহ করি। কোনো নকল পণ্য আমাদের ইনভেন্টরিতে নেই।' },
  { q: 'পণ্য রিটার্ন বা ওয়ারেন্টি দেওয়া হয় কি?', a: 'ডেলিভারির পর ৭ দিনের মধ্যে ত্রুটিপূর্ণ পণ্য রিটার্ন করা যাবে। ম্যানুফ্যাকচারিং ডিফেক্টের ক্ষেত্রে ওয়ারেন্টি প্রযোজ্য।' },
  { q: 'পেমেন্ট কোন কোন মাধ্যমে করা যাবে?', a: 'বিকাশ, নগদ, ক্যাশ এবং রেজিস্টার্ড পার্টনারদের জন্য B2B ক্রেডিট ট্রান্সফার গ্রহণযোগ্য।' },
  { q: 'নতুন পণ্য কখন আসে? স্টক আপডেট কীভাবে জানব?', a: 'নতুন স্টক আসলে আমরা আমাদের WhatsApp গ্রুপে জানিয়ে দিই। পার্টনার হলে আপনি অটোমেটিক আপডেট পাবেন।' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-outline-variant rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center p-6 text-left hover:bg-surface-container-low transition-colors">
        <span className="font-bold text-on-surface pr-4">{q}</span>
        <span className={`material-symbols-outlined text-primary flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      {open && (
        <div className="px-6 pb-6">
          <p className="text-slate-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function TermsPage() {
  return (
    <>
      <section className="bg-slate-950 py-16">
        <div className="container-page text-center">
          <span className="text-emerald-500 font-bold tracking-widest text-sm block mb-4 uppercase">সচরাচর জিজ্ঞাসা</span>
          <h1 className="text-4xl font-extrabold text-white mb-4">FAQ & B2B Trade Terms</h1>
          <p className="text-slate-400 max-w-xl mx-auto">পাইকারি অর্ডার সম্পর্কে সব সাধারণ প্রশ্নের উত্তর এখানে পাবেন।</p>
        </div>
      </section>

      <section className="container-page py-16 max-w-3xl">
        <div className="flex flex-col gap-4 mb-16">
          {FAQS.map(faq => <FAQItem key={faq.q} {...faq} />)}
        </div>

        {/* Trade Terms Summary */}
        <div className="bg-primary/5 border border-primary/10 rounded-3xl p-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">B2B Trade Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon:'timer',         title:'Payment Terms',   text:'Immediate cash / bKash, or 7–30 day credit for registered partners.' },
              { icon:'local_shipping',title:'Delivery',        text:'Same-day in Rangpur. 24–48 hours nationwide.' },
              { icon:'assignment_return',title:'Returns',      text:'7-day return policy for manufacturing defects.' },
              { icon:'verified',      title:'Authenticity',    text:'100% genuine from verified manufacturers.' },
            ].map(item => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-primary text-xl">{item.icon}</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1">{item.title}</p>
                  <p className="text-sm text-slate-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-primary/10">
            <p className="text-sm text-slate-500">Still have questions? <a href="https://wa.me/8801647794452" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">Chat with us on WhatsApp →</a></p>
          </div>
        </div>
      </section>
    </>
  )
}
