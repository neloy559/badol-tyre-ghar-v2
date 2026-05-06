import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/lib/models'
import { products } from '@/lib/products-seed'

export async function GET() {
  try {
    await connectDB()
    
    let inserted = 0
    let skipped = 0

    for (const p of products) {
      try {
        await Product.updateOne(
          { sku: p.sku },
          {
            $set: {
              name:     p.name,
              category: p.category,
              segment:  p.segment || '',
              brand:    p.brand || 'Badol',
              description: p.spec || p.description || '',
              images:   p.images || [],
              inStock:  true,
              isPlaceholder: !!p.isPlaceholder,
            },
            $setOnInsert: {
              sku:      p.sku,
              content: {
                overview:      p.spec || '',
                engineering:   '',
                compatibility: p.vehicle_type || '',
                specifications:'',
                delivery:      '',
              },
            }
          },
          { upsert: true }
        )
        inserted++
      } catch (e) {
        skipped++
      }
    }

    return NextResponse.json({ success: true, inserted, skipped })
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 })
  }
}
