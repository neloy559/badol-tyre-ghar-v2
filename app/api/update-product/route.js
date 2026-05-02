import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Product } from '@/lib/models'

export async function POST(request) {
  try {
    await connectDB()
    const data = await request.json()
    
    // data = { sku, images, content: { overview, engineering, ... } }
    
    // The SKU might be slightly different in products.js vs directory names
    // We update by trying to match the SKU from directory or name
    let query = { sku: data.sku }
    let product = await Product.findOne(query)
    
    // If not found by exact SKU, try matching by name
    if (!product) {
      // Find a product where the name contains the data.sku (which is actually the folder name)
      // e.g. folder is "10.00-20", product name is "Badol Genuine Tube 10.00-20"
      product = await Product.findOne({ name: new RegExp(data.sku.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i') })
    }
    
    if (!product) {
      return NextResponse.json({ success: false, message: `Product not found for ${data.sku}` }, { status: 404 })
    }

    product.images = data.images || product.images
    product.isPlaceholder = data.isPlaceholder !== undefined ? data.isPlaceholder : product.isPlaceholder
    product.content = { ...product.content, ...data.content }
    
    await product.save()

    return NextResponse.json({ success: true, product })
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 })
  }
}
