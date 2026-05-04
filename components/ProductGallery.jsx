'use client'
import { useState } from 'react'
import Image from 'next/image'

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
        <Image 
          src={encodeURI(activeImg)} 
          alt="Product Image" 
          fill 
          className="object-contain" 
          priority
          onError={(e) => { e.currentTarget.src = '/images/placeholders/p1.jpeg' }}
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <div 
              key={i} 
              onClick={() => setActiveImg(img)}
              className={`w-20 h-20 shrink-0 rounded-xl border-2 overflow-hidden bg-surface-container-low relative cursor-pointer transition-colors ${activeImg === img ? 'border-primary' : 'border-outline-variant hover:border-primary/50'}`}
            >
              <Image 
                src={encodeURI(img)} 
                fill
                className="object-cover" 
                alt="Thumb" 
                onError={(e) => { e.currentTarget.src = '/images/placeholders/p1.jpeg' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
