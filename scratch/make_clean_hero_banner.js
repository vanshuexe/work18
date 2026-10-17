const sharp = require('sharp');

async function makeCleanBanner() {
  const meta = await sharp('public/new-images/trends-hero-collage.webp').metadata();
  console.log('Banner size:', meta.width, 'x', meta.height);

  // We can create a clean overlay with a dark glassmorphic gradient in the center
  // that smoothly covers the baked text while letting the left and right room photography shine through!
  const centerShadeSvg = Buffer.from(`
<svg width="${meta.width}" height="${meta.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0f172a" stop-opacity="0.94" />
      <stop offset="50%" stop-color="#0f172a" stop-opacity="0.82" />
      <stop offset="85%" stop-color="#0f172a" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="topBottomFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.6" />
    </linearGradient>
  </defs>
  <!-- Full top/bottom contrast fade -->
  <rect width="${meta.width}" height="${meta.height}" fill="url(#topBottomFade)" />
  <!-- Center backdrop ellipse covering the text completely -->
  <ellipse cx="960" cy="225" rx="420" ry="210" fill="url(#centerGlow)" />
</svg>
`);

  await sharp('public/new-images/trends-hero-collage.webp')
    .composite([{ input: centerShadeSvg, top: 0, left: 0 }])
    .webp({ quality: 90 })
    .toFile('public/new-images/trends-hero-clean.webp');

  console.log('Saved public/new-images/trends-hero-clean.webp');
}

makeCleanBanner().catch(console.error);
