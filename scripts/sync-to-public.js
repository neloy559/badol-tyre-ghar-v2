const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'All Products');
const PUBLIC_ROOT = path.join(__dirname, '..', 'public', 'products');

function syncImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  const catImg2Path = path.join(dir, 'cat img 2');
  if (fs.existsSync(catImg2Path)) {
    // Determine Category and Product Name
    const relativePath = path.relative(ROOT, dir);
    const parts = relativePath.split(path.sep);
    
    if (parts.length >= 2) {
      const category = parts[0];
      const productName = parts[1];
      
      const destDir = path.join(PUBLIC_ROOT, category, productName);
      
      if (fs.existsSync(destDir)) {
        fs.rmSync(destDir, { recursive: true, force: true });
      }
      fs.mkdirSync(destDir, { recursive: true });
      
      const images = fs.readdirSync(catImg2Path);
      images.forEach(img => {
        fs.copyFileSync(path.join(catImg2Path, img), path.join(destDir, img));
      });
      console.log(`Synced ${images.length} images for ${category}/${productName}`);
    }
  }
  
  entries.forEach(e => {
    if (e.isDirectory() && e.name !== 'cat img' && e.name !== 'cat img 2' && e.name !== 'pdf_catalog') {
      syncImages(path.join(dir, e.name));
    }
  });
}

console.log('Syncing images to public/products...');
syncImages(ROOT);
console.log('Done!');
