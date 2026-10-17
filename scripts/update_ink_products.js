const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

let updatedCount = 0;

for (const p of products) {
  if (p.mainCategory && p.mainCategory.slug === 'ink') {
    const sub = p.subcategory?.subcategoryEn?.trim() || '';
    const name = p.productNameEn || '';

    // Rename Pachin Spot Colors to Aeropolish Spot Colors
    if (name.includes('Pachin Spot Colors')) {
      p.productNameEn = 'Aeropolish Spot Colors';
      p.productNameAr = 'ألوان أيروبولش الخاصة';
    }

    if (sub === 'Offset Inks') {
      if (name.toLowerCase().includes('spot') || name.toLowerCase().includes('pantone') || name.toLowerCase().includes('metallic')) {
        p.imageLink = '/new-images/aeropolish-ink-liquid-ruby.png';
      } else {
        p.imageLink = '/new-images/aeropolish-ink-offset-cyan.png';
      }
    } else if (sub === 'Flexo & Rotogravure') {
      if (name.toLowerCase().includes('rotogravure') || name.toLowerCase().includes('water based')) {
        p.imageLink = '/new-images/aeropolish-ink-rotogravure-emerald.png';
      } else {
        p.imageLink = '/new-images/aeropolish-ink-flexo-magenta.png';
      }
    } else if (sub === 'Can Coating') {
      if (name.toLowerCase().includes('gold') || name.toLowerCase().includes('varnish') || name.toLowerCase().includes('reducer')) {
        p.imageLink = '/new-images/aeropolish-ink-silkscreen-gold.png';
      } else {
        p.imageLink = '/new-images/aeropolish-ink-can-coating-cobalt.png';
      }
    } else if (sub === 'Silk Screen') {
      if (name.toLowerCase().includes('p.v.c') || name.toLowerCase().includes('metal') || name.toLowerCase().includes('poly')) {
        p.imageLink = '/new-images/aeropolish-ink-textile-violet.png';
      } else {
        p.imageLink = '/new-images/aeropolish-ink-silkscreen-gold.png';
      }
    } else {
      p.imageLink = '/new-images/aeropolish-ink-offset-cyan.png';
    }

    updatedCount++;
  }
}

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log(`Successfully updated ${updatedCount} ink products in data/products.json!`);

// Print distribution
const inkProducts = products.filter(p => p.mainCategory && p.mainCategory.slug === 'ink');
const distribution = {};
inkProducts.forEach(p => {
  distribution[p.imageLink] = (distribution[p.imageLink] || 0) + 1;
});
console.log('Image distribution across ink products:', distribution);
