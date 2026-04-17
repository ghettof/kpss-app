const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

function drawStar(ctx, cx, cy, outerR, innerR, points) {
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function generateIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const s = size / 680;

  // Arka plan
  ctx.fillStyle = '#0F1923';
  roundRect(ctx, 90 * s, 90 * s, 500 * s, 500 * s, 100 * s);
  ctx.fill();

  // Şapka üst (mortarboard)
  ctx.fillStyle = '#c8a84b';
  ctx.beginPath();
  ctx.moveTo(340 * s, 190 * s);
  ctx.lineTo(520 * s, 265 * s);
  ctx.lineTo(340 * s, 340 * s);
  ctx.lineTo(160 * s, 265 * s);
  ctx.closePath();
  ctx.fill();

  // Şapka gövdesi
  ctx.fillStyle = '#b8943a';
  ctx.beginPath();
  ctx.moveTo(255 * s, 265 * s);
  ctx.quadraticCurveTo(255 * s, 320 * s, 340 * s, 330 * s);
  ctx.quadraticCurveTo(425 * s, 320 * s, 425 * s, 265 * s);
  ctx.lineTo(425 * s, 290 * s);
  ctx.quadraticCurveTo(425 * s, 348 * s, 340 * s, 358 * s);
  ctx.quadraticCurveTo(255 * s, 348 * s, 255 * s, 290 * s);
  ctx.closePath();
  ctx.fill();

  // Şapka orta düğme
  ctx.fillStyle = '#b8943a';
  ctx.beginPath();
  ctx.arc(340 * s, 190 * s, 10 * s, 0, Math.PI * 2);
  ctx.fill();

  // Püskül ipi
  ctx.strokeStyle = '#e8c860';
  ctx.lineWidth = 3 * s;
  ctx.beginPath();
  ctx.moveTo(340 * s, 190 * s);
  ctx.quadraticCurveTo(380 * s, 200 * s, 400 * s, 230 * s);
  ctx.quadraticCurveTo(415 * s, 255 * s, 420 * s, 280 * s);
  ctx.stroke();

  // Püskül çizgileri
  ctx.lineWidth = 2 * s;
  const puskul = [[410,310],[420,315],[430,310],[435,305],[405,308]];
  puskul.forEach(([px, py]) => {
    ctx.beginPath();
    ctx.moveTo(420 * s, 280 * s);
    ctx.lineTo(px * s, py * s);
    ctx.stroke();
  });

  // Püskül merkez
  ctx.fillStyle = '#c8a84b';
  ctx.beginPath();
  ctx.arc(420 * s, 280 * s, 5 * s, 0, Math.PI * 2);
  ctx.fill();

  // Büyük yıldız sol üst
  ctx.fillStyle = '#e8c860';
  drawStar(ctx, 185 * s, 195 * s, 22 * s, 10 * s, 5);

  // Küçük yıldız sağ
  ctx.fillStyle = '#c8a84b';
  ctx.globalAlpha = 0.8;
  drawStar(ctx, 495 * s, 210 * s, 16 * s, 7 * s, 5);
  ctx.globalAlpha = 1;

  // Diploma
  ctx.fillStyle = '#e8dcc8';
  roundRect(ctx, 270 * s, 370 * s, 140 * s, 55 * s, 8 * s);
  ctx.fill();

  ctx.fillStyle = '#d4c4a0';
  roundRect(ctx, 270 * s, 370 * s, 140 * s, 10 * s, 4 * s);
  ctx.fill();
  roundRect(ctx, 270 * s, 415 * s, 140 * s, 10 * s, 4 * s);
  ctx.fill();

  ctx.fillStyle = '#E30A17';
  roundRect(ctx, 332 * s, 368 * s, 16 * s, 59 * s, 3 * s);
  ctx.fill();

  // KPSS yazısı
  ctx.fillStyle = '#c8a84b';
  ctx.font = `900 ${52 * s}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillText('KPSS', 340 * s, 560 * s);

  // Alt yazı
  ctx.fillStyle = '#8899AA';
  ctx.font = `400 ${18 * s}px Arial`;
  ctx.fillText('HAZIRLIK', 340 * s, 596 * s);

  return canvas;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// 1024x1024 icon
const icon = generateIcon(1024);
fs.writeFileSync(path.join(__dirname, '../assets/images/icon.png'), icon.toBuffer('image/png'));

// Android adaptive icon foreground
const adaptive = generateIcon(1024);
fs.writeFileSync(path.join(__dirname, '../assets/images/android-icon-foreground.png'), adaptive.toBuffer('image/png'));

// Favicon
const favicon = generateIcon(48);
fs.writeFileSync(path.join(__dirname, '../assets/images/favicon.png'), favicon.toBuffer('image/png'));

console.log('İkonlar oluşturuldu!');