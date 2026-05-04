const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  sku:         { type: String, required: true, unique: true },
  category:    { type: String, required: true },
  brand:       { type: String, default: 'Badol' },
  description: { type: String, default: '' },
  tags:        [String],
  images:      [String],
  inStock:     { type: Boolean, default: true },
  isPlaceholder: { type: Boolean, default: false },
  content: {
    overview:      { type: String, default: '' },
    engineering:   { type: String, default: '' },
    compatibility: { type: String, default: '' },
    specifications:{ type: String, default: '' },
    delivery:      { type: String, default: '' },
  },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

module.exports = { Product };
