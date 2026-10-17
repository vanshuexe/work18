const res = await fetch('http://localhost:3000');
const html = await res.text();
const desktopMenu = html.match(/id="menu-about"[^>]*>([\s\S]*?)<\/div>/);
console.log('--- Desktop Menu ---');
console.log(desktopMenu ? desktopMenu[1] : 'not found');

const mobileMenu = html.match(/id="mobile-about"[^>]*>([\s\S]*?)<\/div>/);
console.log('--- Mobile Menu ---');
console.log(mobileMenu ? mobileMenu[1] : 'not found');
