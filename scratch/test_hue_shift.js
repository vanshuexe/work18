const sharp = require('sharp');

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

async function shiftColor(targetHue, satMultiplier = 1.0, lightMultiplier = 1.0, outputPath) {
  const { data, info } = await sharp('public/new-images/ink-original.webp')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const output = Buffer.from(data);
  for (let i = 0; i < output.length; i += info.channels) {
    const a = output[i + 3];
    if (a < 20) continue;
    const r = output[i], g = output[i+1], b = output[i+2];
    const [h, s, l] = rgbToHsl(r, g, b);
    // Purple is between 240 and 320
    if (s > 0.10 && h >= 235 && h <= 325) {
      // Calculate delta from base purple (~280)
      const hueOffset = h - 280;
      const newHue = targetHue + hueOffset;
      const newSat = Math.min(1.0, s * satMultiplier);
      const newLight = Math.min(1.0, l * lightMultiplier);
      const [nr, ng, nb] = hslToRgb(newHue, newSat, newLight);
      output[i] = nr;
      output[i+1] = ng;
      output[i+2] = nb;
    }
  }

  await sharp(output, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels
    }
  })
  .resize(1000, 992)
  .toFile(outputPath);

  console.log('Saved to', outputPath);
}

async function run() {
  // Cyan (Process Blue ~200)
  await shiftColor(200, 1.2, 1.05, 'scratch/test-cyan.png');
  // Emerald Green (~155)
  await shiftColor(155, 1.3, 0.95, 'scratch/test-emerald.png');
}

run().catch(console.error);
