const fs = require('fs')
const path = require('path')

const SRC_DIR = path.join(__dirname, '..', 'All Products')
const DEST_DIR = path.join(__dirname, 'public', 'products')

function copyImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    
    if (entry.isDirectory()) {
      if (entry.name === 'cat img') {
        // We found an image folder!
        // The structure is All Products/<Category>/<Product>/cat img/
        const relativePath = path.relative(SRC_DIR, fullPath)
        const parts = relativePath.split(path.sep)
        
        if (parts.length >= 3) {
          const category = parts[0]
          const product = parts[1]
          
          const targetDir = path.join(DEST_DIR, category, product)
          fs.mkdirSync(targetDir, { recursive: true })
          
          const images = fs.readdirSync(fullPath)
          for (const img of images) {
            fs.copyFileSync(path.join(fullPath, img), path.join(targetDir, img))
            console.log(`Copied: ${category}/${product}/${img}`)
          }
        }
      } else {
        copyImages(fullPath)
      }
    }
  }
}

console.log('Starting image copy...')
copyImages(SRC_DIR)
console.log('Done!')
