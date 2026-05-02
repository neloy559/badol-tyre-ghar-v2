import mongoose from 'mongoose'

// ── Product ───────────────────────────────────────────
const ProductSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  sku:         { type: String, required: true, unique: true },
  category:    { type: String, required: true }, // Tubes | Patches | Flaps | Gadgets | Tyre Sealants | Tyres
  brand:       { type: String, default: 'Badol' },
  description: { type: String, default: '' },
  tags:        [String],
  images:      [String],
  inStock:     { type: Boolean, default: true },
  content: {
    overview:      { type: String, default: '' },
    engineering:   { type: String, default: '' },
    compatibility: { type: String, default: '' },
    specifications:{ type: String, default: '' },
    delivery:      { type: String, default: '' },
  },
}, { timestamps: true })

// ── Partner Lead ──────────────────────────────────────
const PartnerLeadSchema = new mongoose.Schema({
  businessName:   { type: String, required: true },
  ownerName:      { type: String, required: true },
  phone:          { type: String, required: true },
  district:       { type: String, required: true },
  monthlyVolume:  { type: String, default: '' },
  message:        { type: String, default: '' },
  status:         { type: String, default: 'new' }, // new | contacted | converted
}, { timestamps: true })

// ── Shop / Dealer ─────────────────────────────────────
const ShopSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  district: { type: String, required: true },
  thana:    { type: String, default: '' },
  address:  { type: String, default: '' },
  phone:    { type: String, default: '' },
}, { timestamps: true })

export const Product    = mongoose.models.Product    || mongoose.model('Product',    ProductSchema)
export const PartnerLead = mongoose.models.PartnerLead || mongoose.model('PartnerLead', PartnerLeadSchema)
export const Shop       = mongoose.models.Shop       || mongoose.model('Shop',       ShopSchema)
