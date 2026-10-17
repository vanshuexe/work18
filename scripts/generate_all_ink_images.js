const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

const logoCirclePng = fs.readFileSync('public/new-images/aeropolish-logo-circle.png');
const logoBase64 = `data:image/png;base64,${logoCirclePng.toString('base64')}`;

async function generateBrandedDrum({
  targetHue,
  satBoost = 1.25,
  lightFactor = 1.0,
  inkTitle = 'OFFSET PRINTING INK',
  inkSubtitle = 'SHEETFED & WEB PRESSES • HIGH MILEAGE',
  badges = ['HIGH MILEAGE', 'RAPID CURING', 'VIBRANT DENSITY'],
  badgeGradColors = ['#0284c7', '#0369a1'],
  cardGradColors = ['#075985', '#0284c7', '#0369a1'],
  accentColor = '#38bdf8',
  bottomBadgeColor = 'rgba(3, 105, 161, 0.95)',
  bottomBadgeText = 'HIGH PERFORMANCE PRINTING INK',
  outputPath
}) {
  const escXml = str => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeInkTitle = escXml(inkTitle);
  const safeInkSubtitle = escXml(inkSubtitle);
  const safeBottomText = escXml(bottomBadgeText);

  // 1. Recolor base drum
  const { data, info } = await sharp('public/new-images/ink-original.webp')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const output = Buffer.from(data);
  for (let i = 0; i < output.length; i += info.channels) {
    const a = output[i + 3];
    if (a < 30) continue;
    const r = output[i], g = output[i+1], b = output[i+2];
    const [h, s, l] = rgbToHsl(r, g, b);

    const isPurpleHue = (h >= 220 && h <= 340);
    const hasPurpleTint = (b > g + 4 && r > g + 2);

    if ((isPurpleHue || hasPurpleTint) && s > 0.05 && l < 0.93) {
      const hueOffset = (h >= 220 && h <= 340) ? (h - 280) * 0.35 : 0;
      const newHue = targetHue + hueOffset;
      const newSat = Math.min(1.0, s * satBoost);
      const newLight = Math.min(1.0, l * lightFactor);
      const [nr, ng, nb] = hslToRgb(newHue, newSat, newLight);
      output[i] = nr;
      output[i+1] = ng;
      output[i+2] = nb;
    }
  }

  // 2. Create SVG overlay
  const svgOverlay = Buffer.from(`
<svg width="${info.width}" height="${info.height}" viewBox="0 0 ${info.width} ${info.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="pillGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${badgeGradColors[0]}" />
      <stop offset="100%" stop-color="${badgeGradColors[1]}" />
    </linearGradient>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${cardGradColors[0]}" />
      <stop offset="50%" stop-color="${cardGradColors[1]}" />
      <stop offset="100%" stop-color="${cardGradColors[2]}" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="50%" stop-color="#fef08a" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- 1. UPPER PILL BADGE -->
  <g filter="url(#dropShadow)">
    <rect x="850" y="710" width="1290" height="340" rx="170" fill="url(#pillGrad)" stroke="#FFFFFF" stroke-width="9" />
    
    <!-- White circular backing for logo -->
    <circle cx="1035" cy="880" r="140" fill="#FFFFFF" stroke="${accentColor}" stroke-width="4" />
    <!-- Embedded Logo in upper pill -->
    <image href="${logoBase64}" x="895" y="740" width="280" height="280" />

    <!-- Brand Typography on Upper Pill -->
    <text x="1210" y="865" font-family="Montserrat, Arial, Helvetica, sans-serif" font-size="94" font-weight="900" fill="#FFFFFF" letter-spacing="3">AEROPOLISH</text>
    <text x="1215" y="925" font-family="Montserrat, Arial, Helvetica, sans-serif" font-size="32" font-weight="700" fill="${accentColor}" letter-spacing="4">PAINTS &amp; COATING INDUSTRY</text>
    <text x="1215" y="972" font-family="Montserrat, Arial, Helvetica, sans-serif" font-size="24" font-weight="600" fill="#F1F5F9" letter-spacing="2">PREMIUM QUALITY GUARANTEE</text>
  </g>

  <!-- 2. MAIN CARD LABEL -->
  <g filter="url(#dropShadow)">
    <rect x="956" y="1392" width="1060" height="1084" rx="38" fill="url(#cardGrad)" stroke="#FFFFFF" stroke-width="8" />
    
    <!-- Top White Accent Bar -->
    <rect x="956" y="1392" width="1060" height="135" rx="38" fill="#FFFFFF" />
    <rect x="956" y="1490" width="1060" height="37" fill="#FFFFFF" />
    
    <!-- Top Header text inside the white bar -->
    <text x="1486" y="1475" text-anchor="middle" font-family="Montserrat, Arial, Helvetica, sans-serif" font-size="44" font-weight="900" fill="${cardGradColors[0]}" letter-spacing="6">INDUSTRIAL COATINGS &amp; INKS</text>

    <!-- Center Card Emblem White Base Circle -->
    <circle cx="1486" cy="1705" r="150" fill="#FFFFFF" stroke="${accentColor}" stroke-width="5" filter="url(#dropShadow)" />
    <!-- Embedded Center Logo -->
    <image href="${logoBase64}" x="1346" y="1565" width="280" height="280" />

    <!-- Brand Name on Card -->
    <text x="1486" y="1925" text-anchor="middle" font-family="Montserrat, Arial, Helvetica, sans-serif" font-size="78" font-weight="900" fill="#FFFFFF" letter-spacing="5">AEROPOLISH</text>

    <!-- Decorative Gold Divider Line -->
    <rect x="1186" y="1955" width="600" height="4" fill="url(#goldGrad)" rx="2" />
    <circle cx="1486" cy="1957" r="7" fill="#fbbf24" />

    <!-- Specific Ink Name (Large & Bold) -->
    <text x="1486" y="2040" text-anchor="middle" font-family="Montserrat, Arial, Helvetica, sans-serif" font-size="62" font-weight="900" fill="${accentColor}" letter-spacing="2">${safeInkTitle}</text>

    <!-- Subtitle Spec -->
    <text x="1486" y="2105" text-anchor="middle" font-family="Montserrat, Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#F1F5F9" letter-spacing="1.5">${safeInkSubtitle}</text>

    <!-- Feature Badges Row -->
    <g transform="translate(1016, 2150)">
      <!-- Badge 1 -->
      <rect x="30" y="0" width="280" height="60" rx="30" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
      <text x="170" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF">${escXml(badges[0])}</text>
      <!-- Badge 2 -->
      <rect x="330" y="0" width="280" height="60" rx="30" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
      <text x="470" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF">${escXml(badges[1])}</text>
      <!-- Badge 3 -->
      <rect x="630" y="0" width="280" height="60" rx="30" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
      <text x="770" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF">${escXml(badges[2])}</text>
    </g>

    <!-- Bottom ISO & Spec Info Bar -->
    <rect x="1006" y="2240" width="960" height="90" rx="16" fill="rgba(0,0,0,0.35)" />
    <text x="1486" y="2295" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#E2E8F0" letter-spacing="2">CERTIFIED QUALITY • ULTRA-SHARP ADHESION • LOW ODOR</text>

    <!-- Bottom Base Quality Text inside card -->
    <text x="1486" y="2425" text-anchor="middle" font-family="Montserrat, Arial, Helvetica, sans-serif" font-size="34" font-weight="900" fill="url(#goldGrad)" letter-spacing="4">★ PROFESSIONAL FORMULATION ★</text>
  </g>

  <!-- 3. BASE CAN FOOTER -->
  <g filter="url(#dropShadow)">
    <rect x="880" y="2520" width="1212" height="135" rx="50" fill="${bottomBadgeColor}" stroke="#FFFFFF" stroke-width="4" />
    <text x="1486" y="2602" text-anchor="middle" font-family="Montserrat, Arial, Helvetica, sans-serif" font-size="40" font-weight="900" fill="#FFFFFF" letter-spacing="6">${safeBottomText}</text>
  </g>
</svg>
`);

  // Composite everything
  const finalImage = await sharp(output, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels
    }
  })
  .composite([
    { input: svgOverlay, top: 0, left: 0 }
  ])
  .png()
  .toBuffer();

  // Save resized to 1200x1191
  await sharp(finalImage)
    .resize(1200, 1191)
    .toFile(outputPath);

  console.log('Successfully generated', outputPath);
  return finalImage;
}

async function main() {
  const configs = [
    {
      targetHue: 202, // Cyan Blue
      satBoost: 1.25,
      lightFactor: 1.0,
      inkTitle: 'OFFSET PRINTING INK',
      inkSubtitle: 'SHEETFED & WEB PRESSES • HIGH MILEAGE',
      badges: ['HIGH MILEAGE', 'RAPID CURING', 'VIBRANT DENSITY'],
      badgeGradColors: ['#0284c7', '#0369a1'],
      cardGradColors: ['#075985', '#0284c7', '#0369a1'],
      accentColor: '#38bdf8',
      bottomBadgeColor: 'rgba(3, 105, 161, 0.95)',
      bottomBadgeText: 'HIGH PERFORMANCE PRINTING INK',
      outputPath: 'public/new-images/aeropolish-ink-offset-cyan.png'
    },
    {
      targetHue: 340, // Process Magenta / Vivid Berry Crimson
      satBoost: 1.3,
      lightFactor: 1.02,
      inkTitle: 'FLEXO & PACKAGING INK',
      inkSubtitle: 'CORRUGATED CARTONS, LABELS & REELS',
      badges: ['FAST DRYING', 'HIGH GLOSS', 'SOLVENT RESISTANT'],
      badgeGradColors: ['#db2777', '#9d174d'],
      cardGradColors: ['#831843', '#be185d', '#9d174d'],
      accentColor: '#f472b6',
      bottomBadgeColor: 'rgba(157, 23, 77, 0.95)',
      bottomBadgeText: 'RAPID CURE FLEXO PACKAGING INK',
      outputPath: 'public/new-images/aeropolish-ink-flexo-magenta.png'
    },
    {
      targetHue: 42, // Golden Yellow / Amber
      satBoost: 1.35,
      lightFactor: 1.05,
      inkTitle: 'SILK SCREEN SPECIALTY INK',
      inkSubtitle: 'PRECISION MESH • HIGH OPACITY GRAPHICS',
      badges: ['HIGH OPACITY', 'TACTILE FINISH', 'UV RESISTANT'],
      badgeGradColors: ['#d97706', '#b45309'],
      cardGradColors: ['#78350f', '#b45309', '#92400e'],
      accentColor: '#fde047',
      bottomBadgeColor: 'rgba(180, 83, 9, 0.95)',
      bottomBadgeText: 'PRECISION MESH SCREEN PRINTING INK',
      outputPath: 'public/new-images/aeropolish-ink-silkscreen-gold.png'
    },
    {
      targetHue: 155, // Emerald Green
      satBoost: 1.3,
      lightFactor: 0.98,
      inkTitle: 'ROTOGRAVURE PACKAGING INK',
      inkSubtitle: 'HIGH-VOLUME POUCHES, WRAPS & LAMINATES',
      badges: ['ULTRA-SHARP', 'HIGH SPEED', 'MAX ADHESION'],
      badgeGradColors: ['#059669', '#047857'],
      cardGradColors: ['#064e3b', '#047857', '#065f46'],
      accentColor: '#4ade80',
      bottomBadgeColor: 'rgba(4, 120, 87, 0.95)',
      bottomBadgeText: 'HIGH SPEED ROTOGRAVURE INK',
      outputPath: 'public/new-images/aeropolish-ink-rotogravure-emerald.png'
    },
    {
      targetHue: 225, // Deep Cobalt Sapphire Blue
      satBoost: 1.25,
      lightFactor: 0.96,
      inkTitle: 'CAN & METAL COATING INK',
      inkSubtitle: 'FOOD TINS, CAPS, CANS & AEROSOLS',
      badges: ['ANTI-CORROSION', 'HEAT RESISTANT', 'DEEP DRAWING'],
      badgeGradColors: ['#2563eb', '#1d4ed8'],
      cardGradColors: ['#1e3a8a', '#1e40af', '#1d4ed8'],
      accentColor: '#93c5fd',
      bottomBadgeColor: 'rgba(30, 64, 175, 0.95)',
      bottomBadgeText: 'CORROSION RESISTANT METAL COATING',
      outputPath: 'public/new-images/aeropolish-ink-can-coating-cobalt.png'
    },
    {
      targetHue: 275, // Vivid Royal Violet
      satBoost: 1.2,
      lightFactor: 1.0,
      inkTitle: 'TEXTILE & APPAREL INK',
      inkSubtitle: 'DIRECT-TO-GARMENT & COTTON BLENDS',
      badges: ['WASH FASTNESS', 'SOFT HAND', 'VIVID STRETCH'],
      badgeGradColors: ['#7c3aed', '#6d28d9'],
      cardGradColors: ['#4c1d95', '#5b21b6', '#6d28d9'],
      accentColor: '#c084fc',
      bottomBadgeColor: 'rgba(91, 33, 182, 0.95)',
      bottomBadgeText: 'PREMIUM TEXTILE & FABRIC INK',
      outputPath: 'public/new-images/aeropolish-ink-textile-violet.png'
    },
    {
      targetHue: 0, // Brilliant Ruby Red
      satBoost: 1.35,
      lightFactor: 1.0,
      inkTitle: 'PREMIUM LIQUID PRINTING INK',
      inkSubtitle: 'SPECIALTY SPOT COLORS & HIGH DENSITY',
      badges: ['SPOT COLOR', 'PURE PIGMENT', 'RAPID TACK'],
      badgeGradColors: ['#dc2626', '#b91c1c'],
      cardGradColors: ['#7f1d1d', '#991b1b', '#b91c1c'],
      accentColor: '#fca5a5',
      bottomBadgeColor: 'rgba(185, 28, 28, 0.95)',
      bottomBadgeText: 'HIGH DENSITY SPOT COLOR INK',
      outputPath: 'public/new-images/aeropolish-ink-liquid-ruby.png'
    }
  ];

  for (const cfg of configs) {
    console.log('Generating:', cfg.outputPath);
    await generateBrandedDrum(cfg);
  }

  // Also create metal-aeropolish.png for homepage Stronger Prints section
  // Composite the Cobalt Sapphire drum with dramatic dark vignette background
  console.log('Generating public/new-images/metal-aeropolish.png...');
  const canBuffer = await sharp('public/new-images/aeropolish-ink-can-coating-cobalt.png')
    .resize(500, 496)
    .toBuffer();

  const backgroundSvg = Buffer.from(`
<svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="65%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="40%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </radialGradient>
    <radialGradient id="glowGrad" cx="50%" cy="55%" r="45%">
      <stop offset="0%" stop-color="#2563eb" stop-opacity="0.35" />
      <stop offset="60%" stop-color="#1d4ed8" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#020617" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgGrad)" />
  <circle cx="300" cy="330" r="260" fill="url(#glowGrad)" />
  <!-- subtle floor reflection -->
  <ellipse cx="300" cy="540" rx="220" ry="25" fill="#000000" opacity="0.6" />
</svg>
`);

  await sharp(backgroundSvg)
    .composite([
      { input: canBuffer, top: 45, left: 50 }
    ])
    .png()
    .toFile('public/new-images/metal-aeropolish.png');

  console.log('Generated public/new-images/metal-aeropolish.png successfully!');
}

main().catch(console.error);
