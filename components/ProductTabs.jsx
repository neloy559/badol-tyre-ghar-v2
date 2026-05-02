'use client'
import { useState } from 'react'
import Link from 'next/link'

const TABS = [
  { id: 'marketing',     label: 'Product Overview' },
  { id: 'engineering',   label: 'Core Engineering' },
  { id: 'performance',   label: 'Performance Metrics' },
  { id: 'compatibility', label: 'Application & Compatibility' },
  { id: 'consumerTrust', label: 'Consumer Value & Trust' },
]

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('marketing')

  const tabContent = {
    marketing:     product.content?.marketing     || product.description || 'Marketing details coming soon.',
    engineering:   product.content?.engineering   || 'Engineering and quality specifications coming soon.',
    performance:   product.content?.performance   || 'Performance metrics coming soon.',
    compatibility: product.content?.compatibility || 'Application compatibility information coming soon.',
    consumerTrust: product.content?.consumerTrust || 'Value proposition coming soon.',
  }

  return (
    <div className="mt-16">
      {/* Tab Nav */}
      <div className="flex border-b border-outline-variant gap-1 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-bold text-sm whitespace-nowrap transition-all border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500 hover:text-primary'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-2xl rounded-tr-2xl border border-outline-variant border-t-0 p-8 mt-0">
        {tabContent[activeTab]?.split('\n').map((para, i) =>
          para.trim() ? <p key={i} className="text-slate-600 leading-relaxed mb-4 text-sm">{para}</p> : null
        )}

        {activeTab === 'consumerTrust' && (
          <div className="mt-6 bg-surface-container-low rounded-xl p-6 border border-outline-variant">
            <h4 className="font-bold text-on-surface mb-4">B2B Order Enquiry</h4>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/8801647794452?text=আমি ${product.name} (SKU: ${product.sku}) সম্পর্কে জানতে চাই`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-wa text-white font-bold px-6 py-3 rounded-xl hover:brightness-95 transition-all text-sm"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                WhatsApp for Delivery Terms
              </a>
              <a
                href="tel:+8801647794452"
                className="flex items-center gap-2 border-2 border-outline-variant text-on-surface font-bold px-6 py-3 rounded-xl hover:bg-surface-container transition-all text-sm"
              >
                <span className="material-symbols-outlined text-base">call</span>
                Call Us Directly
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
