'use client'
import Image from 'next/image'

export default function OptimizedImage({ src, alt, fill, sizes, priority, className }) {
  const fallback = '/images/placeholders/placeholder-img-1.jpeg'
  
  return (
    <Image
      src={src || fallback}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={(e) => {
        e.currentTarget.src = fallback
      }}
    />
  )
}
