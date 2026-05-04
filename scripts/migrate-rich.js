const fs = require('fs')
const path = require('path')
const https = require('https')

const SRC_DIR = path.join(__dirname, '..', 'All Products')
const API_URL = 'https://websitev2-two-phi.vercel.app/api/update-product'

// Names of the 5 rich text files
const TEXT_FILES = {
  '1_Core_Engineering.txt': 'engineering',
  '2_Performance_Metrics.txt': 'performance',
  '3_Marketing_Morphology.txt': 'marketing',
  '4_Application_Compatibility.txt': 'compatibility',
  '5_Consumer_Value_Trust.txt': 'consumerTrust',
}

function postData(data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data)
    const req = https.request(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      let body = ''
      res.on('data', chunk => body += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(body))
        } catch(e) {
          resolve({ success: false, body })
        }
      })
    })
    req.on('error', reject)
    req.write(payload)
    req.end()
  })
}

async function runMigration() {
  const dirsToProcess = []
  
  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    let isProductFolder = false
    
    // A product folder is one that contains 'cat img' or any of the txt files
    for (const e of entries) {
      if (e.name === 'cat img' || TEXT_FILES[e.name]) {
        isProductFolder = true
        break
      }
    }
    
    if (isProductFolder) {
      dirsToProcess.push(dir)
    } else {
      for (const e of entries) {
        if (e.isDirectory() && e.name !== 'pdf_catalog') {
          scanDir(path.join(dir, e.name))
        }
      }
    }
  }

  console.log('Scanning directories...')
  scanDir(SRC_DIR)
  console.log(`Found ${dirsToProcess.length} product folders.`)

  for (const dir of dirsToProcess) {
    const relativePath = path.relative(SRC_DIR, dir)
    const parts = relativePath.split(path.sep)
    const category = parts[0]
    const skuOrName = parts[parts.length - 1] // e.g. "10.00-20"
    
    const productData = {
      sku: skuOrName,
      images: [],
      content: {}
    }
    
    // Read Images
    const catImg2Dir = path.join(dir, 'cat img 2')
    let hasActualImage = false
    
    if (fs.existsSync(catImg2Dir)) {
      const images = fs.readdirSync(catImg2Dir).filter(f => f.match(/\.(jpg|jpeg|png|webp|gif|jpeg)$/i))
      if (images.length > 0) {
        hasActualImage = true
        for (const img of images) {
          productData.images.push(`/products/${category}/${skuOrName}/${img}`)
        }
      }
    }
    
    // If no images in cat img 2, use a random placeholder
    if (!hasActualImage) {
      const randomId = Math.floor(Math.random() * 8) + 1
      productData.images = [`/images/placeholders/placeholder img (${randomId}).jpeg`]
    }
    
    productData.isPlaceholder = !hasActualImage

    // Read Text Files
    for (const [file, key] of Object.entries(TEXT_FILES)) {
      const filePath = path.join(dir, file)
      if (fs.existsSync(filePath)) {
        productData.content[key] = fs.readFileSync(filePath, 'utf-8').trim()
      }
    }
    
    console.log(`Uploading rich data for ${skuOrName}... ${hasActualImage ? '(Actual)' : '(Placeholder)'}`)
    const result = await postData(productData)
    if (result.success) {
      console.log(`  ✅ Success!`)
    } else {
      console.log(`  ❌ Failed:`, result.message || result.body)
    }
  }
  
  console.log('Migration complete!')
}

runMigration().catch(console.error)
