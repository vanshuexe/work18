const sharp = require('sharp');
const path = require('path');

async function extractAssets() {
  const source = 'design/color-trends.png';

  // 1. Hero banner backdrop (y=85 to 520, 1920 wide)
  console.log('Extracting trends-hero-collage.webp...');
  await sharp(source)
    .extract({ left: 0, top: 85, width: 1920, height: 435 })
    .webp({ quality: 88 })
    .toFile('public/new-images/trends-hero-collage.webp');

  // 2. Quietude (y=600 to 1260, x=380 to 1540)
  console.log('Extracting trends-quietude.webp...');
  await sharp(source)
    .extract({ left: 380, top: 600, width: 1160, height: 660 })
    .webp({ quality: 90 })
    .toFile('public/new-images/trends-quietude.webp');

  // 3. Symbiosis (y=1370 to 2030, x=380 to 1540)
  console.log('Extracting trends-symbiosis.webp...');
  await sharp(source)
    .extract({ left: 380, top: 1370, width: 1160, height: 660 })
    .webp({ quality: 90 })
    .toFile('public/new-images/trends-symbiosis.webp');

  // 4. Homecoming (y=2150 to 2810, x=380 to 1540)
  console.log('Extracting trends-homecoming.webp...');
  await sharp(source)
    .extract({ left: 380, top: 2150, width: 1160, height: 660 })
    .webp({ quality: 90 })
    .toFile('public/new-images/trends-homecoming.webp');

  // 5. Renegade (y=2930 to 3590, x=380 to 1540)
  console.log('Extracting trends-renegade.webp...');
  await sharp(source)
    .extract({ left: 380, top: 2930, width: 1160, height: 660 })
    .webp({ quality: 90 })
    .toFile('public/new-images/trends-renegade.webp');

  console.log('All trend assets extracted successfully!');
}

extractAssets().catch(console.error);
