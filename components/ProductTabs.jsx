export default function ProductTabs({ product }) {
  const sections = [
    { id: 'overview',      label: 'Product Overview',       icon: 'info',          content: product.content?.overview || product.description },
    { id: 'engineering',   label: 'Core Engineering',      icon: 'construction',  content: product.content?.engineering },
    { id: 'performance',   label: 'Performance Metrics',    icon: 'speed',         content: product.content?.specifications }, // mapping to specs
    { id: 'compatibility', label: 'Application & Compatibility', icon: 'settings_input_component', content: product.content?.compatibility },
    { id: 'delivery',      label: 'Wholesale & Delivery',  icon: 'local_shipping', content: product.content?.delivery },
  ].filter(s => s.content && s.content.length > 5)

  if (sections.length === 0) return null

  return (
    <div className="mt-16 space-y-12">
      {sections.map(s => (
        <div key={s.id} className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined">{s.icon}</span>
            </div>
            <h2 className="text-2xl font-bold text-on-surface">{s.label}</h2>
          </div>
          <div className="bg-white rounded-3xl border border-outline-variant p-8 shadow-sm">
            {s.content.split('\n').map((para, i) => (
              para.trim() ? <p key={i} className="text-slate-600 leading-relaxed mb-4 text-sm">{para}</p> : null
            ))}
          </div>
        </div>
      ))}
      
      <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-xl font-bold mb-2">Ready to place a wholesale order?</h4>
          <p className="text-slate-400 text-sm">Contact our sales team for personalized volume pricing and shipping schedules.</p>
        </div>
        <div className="flex gap-4">
          <a
            href={`https://wa.me/8801647794452?text=আমি ${product.name} (SKU: ${product.sku}) সম্পর্কে জানতে চাই`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-wa text-white font-bold px-6 py-3 rounded-xl hover:brightness-95 transition-all text-sm"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            WhatsApp Enquiry
          </a>
        </div>
      </div>
    </div>
  )
}
