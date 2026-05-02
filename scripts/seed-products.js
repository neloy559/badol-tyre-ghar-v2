// Migration script: seeds MongoDB with products from the static JS file
// Run with: node scripts/seed-products.js
// Requires MONGODB_URI in .env.local


import mongoose from 'mongoose'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set. Please add it to .env.local')
  process.exit(1)
}

const ProductSchema = new mongoose.Schema({
  name:        String,
  sku:         { type: String, unique: true },
  category:    String,
  brand:       String,
  description: String,
  tags:        [String],
  images:      [String],
  inStock:     { type: Boolean, default: true },
  content: {
    overview:       String,
    engineering:    String,
    compatibility:  String,
    specifications: String,
    delivery:       String,
  },
}, { timestamps: true })

const Product = mongoose.models?.Product || mongoose.model('Product', ProductSchema)

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected to MongoDB')

  // Dynamically load the products seed file
  const { products } = await import('./lib/products-seed.js')

  let inserted = 0
  let skipped = 0

  for (const p of products) {
    try {
      await Product.updateOne(
        { sku: p.sku },
        {
          $setOnInsert: {
            name:     p.name,
            sku:      p.sku,
            category: p.category,
            brand:    p.brand || 'Badol',
            description: p.spec || p.description || '',
            images:   p.images || [],
            inStock:  true,
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
      console.warn(`⚠️  Skipped ${p.sku}: ${e.message}`)
      skipped++
    }
  }

  console.log(`✅ Seeding complete! Inserted/Updated: ${inserted}, Skipped: ${skipped}`)
  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})
