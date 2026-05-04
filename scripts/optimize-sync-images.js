const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'All Products');

function processProducts(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  // A folder is a product folder if it contains .txt files or images directly
  const files = entries.filter(e => e.isFile());
  const hasTxt = files.some(f => f.name.endsWith('.txt'));
  const hasImages = files.some(f => f.name.match(/\.(jpg|jpeg|png|webp)$/i));
  
  if (hasTxt || hasImages) {
    console.log(`Processing product: ${dir}`);
    
    const catImg2Path = path.join(dir, 'cat img 2');
    const catImgPath = path.join(dir, 'cat img');
    
    // 1. Clean cat img 2
    if (fs.existsSync(catImg2Path)) {
      fs.rmSync(catImg2Path, { recursive: true, force: true });
    }
    fs.mkdirSync(catImg2Path);
    
    // 2. Prioritize images in the product folder itself
    let sourceImages = files
      .filter(f => f.name.match(/\.(jpg|jpeg|png|webp)$/i))
      .map(f => path.join(dir, f.name));
      
    // 3. If no images in product folder, check 'cat img'
    if (sourceImages.length === 0 && fs.existsSync(catImgPath)) {
      const catFiles = fs.readdirSync(catImgPath);
      sourceImages = catFiles
        .filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i))
        .map(f => path.join(catImgPath, f));
    }
    
    // 4. Copy to cat img 2
    sourceImages.forEach((src, index) => {
      const ext = path.extname(src).toLowerCase() || '.jpeg';
      // Standardize to .jpeg if it's .jpg for consistency
      const finalExt = (ext === '.jpg' || ext === '.jpeg') ? '.jpeg' : ext;
      const dest = path.join(catImg2Path, `${index + 1}${finalExt}`);
      fs.copyFileSync(src, dest);
      console.log(`  -> Copied ${src} to ${dest}`);
    });
    
  } else {
    // Recurse into subdirectories
    entries.forEach(e => {
      if (e.isDirectory() && e.name !== 'cat img' && e.name !== 'cat img 2' && e.name !== 'pdf_catalog') {
        processProducts(path.join(dir, e.name));
      }
    });
  }
}

console.log('Starting product image optimization...');
processProducts(ROOT);
console.log('Done!');
