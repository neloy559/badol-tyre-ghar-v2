const fs = require('fs')
const path = require('path')

const SRC_DIR = path.join(__dirname, 'All Products')
const DEST_DIR = path.join(__dirname, 'public', 'products')

function copyImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    
    if (entry.isDirectory()) {
      const subEntries = fs.readdirSync(fullPath);
      const hasCatImg2 = subEntries.includes('cat img 2');
      
      if (hasCatImg2) {
        console.log(`Checking product folder: ${entry.name}`);
        const catImg2Path = path.join(fullPath, 'cat img 2');
        const images = fs.readdirSync(catImg2Path).filter(f => f.match(/\.(jpg|jpeg|png|webp|gif|jpeg)$/i));
        
        console.log(`  Found ${images.length} images in cat img 2`);

        if (images.length > 0) {
          const relativePath = path.relative(SRC_DIR, fullPath);
          const parts = relativePath.split(path.sep);
          
          const category = parts[0];
          const product = parts[parts.length - 1];
          
          const targetDir = path.join(DEST_DIR, category, product);
          console.log(`  Target: ${targetDir}`);

          if (fs.existsSync(targetDir)) {
            fs.rmSync(targetDir, { recursive: true, force: true });
          }
          fs.mkdirSync(targetDir, { recursive: true });
          
          for (const img of images) {
            fs.copyFileSync(path.join(catImg2Path, img), path.join(targetDir, img));
            console.log(`  ✅ Copied: ${img}`);
          }
        }
      } else {
        copyImages(fullPath);
      }
    }
  }
}

console.log('Starting image copy...')
copyImages(SRC_DIR)
console.log('Done!')
