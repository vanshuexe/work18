const sharp = require('sharp');
const fs = require('fs');

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

async function generateBrandedDrum({
  targetHue,
  satBoost = 1.25,
  lightFactor = 1.0,
  inkTitle = 'OFFSET PRINTING INK',
  inkSubtitle = 'SHEETFED & WEB PRESSES • HIGH MILEAGE',
  badgeGradColors = ['#0284c7', '#0369a1'],
  cardGradColors = ['#075985', '#0284c7', '#0369a1'],
  accentColor = '#38bdf8',
  outputPath
}) {
  const escXml = str => String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeInkTitle = escXml(inkTitle);
  const safeInkSubtitle = escXml(inkSubtitle);

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

  // 2. Prepare base64 logo
  const logoCirclePng = fs.readFileSync('public/new-images/aeropolish-logo-circle.png');
  const logoBase64 = `data:image/png;base64,${logoCirclePng.toString('base64')}`;

  // 3. Create SVG overlay
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

  <!-- 1. UPPER PILL BADGE (covers 850..2140, 710..1050) -->
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

  <!-- 2. MAIN CARD LABEL (covering old PRINTING INKS at 956..2015, 1392..2474) -->
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
      <text x="170" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF">HIGH MILEAGE</text>
      <!-- Badge 2 -->
      <rect x="330" y="0" width="280" height="60" rx="30" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
      <text x="470" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF">RAPID CURING</text>
      <!-- Badge 3 -->
      <rect x="630" y="0" width="280" height="60" rx="30" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
      <text x="770" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF">VIBRANT DENSITY</text>
    </g>

    <!-- Bottom ISO & Spec Info Bar -->
    <rect x="1006" y="2240" width="960" height="90" rx="16" fill="rgba(0,0,0,0.35)" />
    <text x="1486" y="2295" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="#E2E8F0" letter-spacing="2">CERTIFIED QUALITY • ULTRA-SHARP ADHESION • LOW ODOR</text>

    <!-- Bottom Base Quality Text inside card -->
    <text x="1486" y="2425" text-anchor="middle" font-family="Montserrat, Arial, Helvetica, sans-serif" font-size="34" font-weight="900" fill="url(#goldGrad)" letter-spacing="4">★ PROFESSIONAL FORMULATION ★</text>
  </g>

  <!-- 3. BASE CAN FOOTER (completely covering old HIGH QUALITY at 2520..2655) -->
  <g filter="url(#dropShadow)">
    <rect x="880" y="2520" width="1212" height="135" rx="50" fill="rgba(3, 105, 161, 0.95)" stroke="#FFFFFF" stroke-width="4" />
    <text x="1486" y="2602" text-anchor="middle" font-family="Montserrat, Arial, Helvetica, sans-serif" font-size="40" font-weight="900" fill="#FFFFFF" letter-spacing="6">HIGH PERFORMANCE PRINTING INK</text>
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

  // Save resized
  await sharp(finalImage)
    .resize(1200, 1191)
    .toFile(outputPath);

  console.log('Successfully generated', outputPath);
}

generateBrandedDrum({
  targetHue: 202, // Cyan Blue
  satBoost: 1.25,
  lightFactor: 1.0,
  inkTitle: 'OFFSET PRINTING INK',
  inkSubtitle: 'SHEETFED & WEB PRESSES • HIGH MILEAGE',
  badgeGradColors: ['#0284c7', '#0369a1'],
  cardGradColors: ['#075985', '#0284c7', '#0369a1'],
  accentColor: '#38bdf8',
  outputPath: 'scratch/branded-drum-cyan-v2.png'
}).catch(console.error);
