import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const deck = (...p) => path.join(root, "..", "img", "deck", ...p);
const out = (...p) => path.join(root, "..", ...p);

function stripSvg(src) {
  return src
    .replace(/<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/g, "")
    .replace(/class="mini-card"/g, 'style="display:none"')
    .replace(/class="maxi-card"/g, "");
}

function prefixIds(inner, prefix) {
  return inner
    .replace(/\bid="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`)
    .replace(/xlink:href="#([^"]+)"/g, (_, id) => `xlink:href="#${prefix}${id}"`);
}

function buildMark(idPrefix, withBackShade) {
  const backShade = withBackShade
    ? `\n    <rect x="15.5" y="8" width="9" height="13" rx="1.5" fill="#c81e32" opacity="0.35"/>`
    : "";
  const ace = prefixIds(stripSvg(fs.readFileSync(deck("1s.svg"), "utf8")), `${idPrefix}-`);
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" role="img" aria-label="SolitaireFelt">
  <defs>
    <linearGradient id="${idPrefix}-felt" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1a7a54"/>
      <stop offset="1" stop-color="#0a3d2b"/>
    </linearGradient>
    <linearGradient id="${idPrefix}-back" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ef4458"/>
      <stop offset="1" stop-color="#b81024"/>
    </linearGradient>
    <clipPath id="${idPrefix}-ace-clip"><rect x="6" y="9" width="11" height="15" rx="2"/></clipPath>
  </defs>
  <rect width="32" height="32" rx="8" fill="url(#${idPrefix}-felt)"/>
  <rect x="1.25" y="1.25" width="29.5" height="29.5" rx="6.75" fill="none" stroke="#f5d547" stroke-opacity="0.5" stroke-width="1"/>
  <g transform="rotate(13 21 15)">
    <rect x="14.5" y="7" width="11" height="15" rx="2" fill="url(#${idPrefix}-back)"/>${backShade}
  </g>
  <g clip-path="url(#${idPrefix}-ace-clip)"><svg x="6" y="9" width="11" height="15" viewBox="0 0 225 314" preserveAspectRatio="xMidYMid slice">${ace}</svg></g>
</svg>`;
}

const favicon = buildMark("f", false);
const mark = buildMark("sf", true);
const logoAce = prefixIds(stripSvg(fs.readFileSync(deck("1s.svg"), "utf8")), "lg-");

const logo = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 220 44" role="img" aria-label="SolitaireFelt">
  <defs>
    <linearGradient id="lg-felt" x1="4" y1="2" x2="36" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1a7a54"/>
      <stop offset="1" stop-color="#0a3d2b"/>
    </linearGradient>
    <linearGradient id="lg-back" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ef4458"/>
      <stop offset="1" stop-color="#b81024"/>
    </linearGradient>
    <clipPath id="lg-ace-clip"><rect x="6" y="9" width="11" height="15" rx="2"/></clipPath>
  </defs>
  <g transform="translate(2 6)">
    <rect width="32" height="32" rx="8" fill="url(#lg-felt)"/>
    <rect x="1.25" y="1.25" width="29.5" height="29.5" rx="6.75" fill="none" stroke="#f5d547" stroke-opacity="0.5" stroke-width="1"/>
    <g transform="rotate(13 21 15)">
      <rect x="14.5" y="7" width="11" height="15" rx="2" fill="url(#lg-back)"/>
    </g>
    <g clip-path="url(#lg-ace-clip)"><svg x="6" y="9" width="11" height="15" viewBox="0 0 225 314" preserveAspectRatio="xMidYMid slice">${logoAce}</svg></g>
  </g>
  <text x="46" y="29" font-family="Outfit, Segoe UI, sans-serif" font-size="22" font-weight="700" letter-spacing="-0.04em">
    <tspan fill="#ffffff">Solitaire</tspan><tspan fill="#f5d547" font-weight="800">Felt</tspan>
  </text>
</svg>`;

fs.writeFileSync(out("favicon.svg"), favicon);
fs.writeFileSync(out("img", "logo-mark.svg"), mark);
fs.writeFileSync(out("img", "logo.svg"), logo);
console.log("Wrote favicon.svg, img/logo-mark.svg, img/logo.svg (real Ace of Spades)");
