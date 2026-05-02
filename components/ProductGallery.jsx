'use client'
import { useState } from 'react'

export default function ProductGallery({ images }) {
  const defaultImage = images && images.length > 0 ? images[0] : null
  const [activeImg, setActiveImg] = useState(defaultImage)

  if (!defaultImage) {
    return (
      <div>
        <div className="aspect-square bg-surface-container-low rounded-3xl border border-outline-variant overflow-hidden flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-slate-300 text-[180px]">tire_repair</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="aspect-square bg-surface-container-low rounded-3xl border border-outline-variant overflow-hidden flex items-center justify-center mb-4 relative">
        <img src={activeImg} alt="Product Image" className="w-full h-full object-cover" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <div 
              key={i} 
              onClick={() => setActiveImg(img)}
              className={`w-20 h-20 shrink-0 rounded-xl border-2 overflow-hidden bg-surface-container-low flex items-center justify-center cursor-pointer transition-colors ${activeImg === img ? 'border-primary' : 'border-outline-variant hover:border-primary/50'}`}
            >
              <img src={img} className="w-full h-full object-cover" alt="Thumb" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
