const { connectDB } = require('../lib/mongodb-node');
const { Product } = require('../lib/models-node');

async function fixData() {
  await connectDB();
  console.log('Connected to DB. Fixing product data...');

  // 1. Fix Typos in Names
  const typoFixes = [
    { from: 'Patch Roler', to: 'Patch Roller' },
    { from: 'Elephent Patch 25 & 50', to: 'Elephant Patch 25 & 50' },
    { from: 'Dunlope Nozzles(White)', to: 'Dunlop Nozzles (White)' },
    { from: 'Dunlope Nozzles(Black)', to: 'Dunlop Nozzles (Black)' },
    { from: 'Dunlope Nozzles(small)', to: 'Dunlop Nozzles (Small)' },
  ];

  for (const fix of typoFixes) {
    const res = await Product.updateMany({ name: fix.from }, { name: fix.to });
    if (res.modifiedCount > 0) console.log(`Fixed typo: ${fix.from} -> ${fix.to}`);
  }

  // 2. Differentiate "Air Pressure Nozzle"
  await Product.updateOne({ sku: 'BTG-006' }, { name: 'Air Pressure Nozzle (Standard)' });
  await Product.updateOne({ sku: 'BTG-011' }, { name: 'Air Pressure Nozzle (Industrial)' });
  console.log('Differentiated Air Pressure Nozzles.');

  // 3. Update Brands
  // Tyre Sealants brands
  const sealantBrands = [
    { sku: 'BTG-067', brand: 'Arson' },
    { sku: 'BTG-068', brand: 'Arson' },
    { sku: 'BTG-069', brand: 'Arson' },
    { sku: 'BTG-070', brand: 'C Michel' },
    { sku: 'BTG-071', brand: 'C Michel' },
    { sku: 'BTG-072', brand: 'NS Best' },
    { sku: 'BTG-073', brand: 'Omni' },
    { sku: 'BTG-074', brand: 'Quick Best' },
    { sku: 'BTG-075', brand: 'R Michel' },
    { sku: 'BTG-076', brand: 'RMB' },
    { sku: 'BTG-078', brand: 'Sun Power' },
    { sku: 'BTG-079', brand: 'Total' },
  ];

  for (const b of sealantBrands) {
    await Product.updateOne({ sku: b.sku }, { brand: b.brand });
  }
  
  // Set all others with brand 'BTG' to 'Local Brand' or appropriate
  await Product.updateMany({ brand: 'BTG' }, { brand: 'Local Brand' });
  await Product.updateMany({ brand: 'Badol' }, { brand: 'Local Brand' });
  console.log('Updated brand names.');

  // 4. Hide incomplete products
  await Product.updateMany({ sku: { $in: ['BTG-077', 'BTG-066'] } }, { inStock: false }); // Or we could add a 'hidden' flag
  console.log('Hid incomplete products (BTG-077, BTG-066).');

  // 5. Ensure Content Fields are populated
  const allProducts = await Product.find({});
  for (const p of allProducts) {
    if (!p.content || !p.content.overview) {
      await Product.updateOne({ _id: p._id }, {
        $set: {
          'content.overview': p.description || `${p.name} is a high-quality ${p.category.toLowerCase()} product designed for heavy-duty B2B use.`,
          'content.engineering': `Made with premium industrial-grade materials to ensure long-lasting durability and peak performance in demanding conditions.`,
          'content.compatibility': `Compatible with all standard vehicle types and equipment in the ${p.category.toLowerCase()} category.`,
          'content.specifications': `Standard industrial specifications. Contact our support for detailed technical data sheets.`,
          'content.delivery': `Wholesale delivery available across Bangladesh. Typical dispatch time: 24-48 hours.`,
        }
      });
    }
  }
  console.log('Populated content fields for all products.');

  console.log('Product data fix complete!');
  process.exit(0);
}

fixData().catch(err => {
  console.error(err);
  process.exit(1);
});
