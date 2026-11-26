// Tiny SVG charts, written for this site — no library, no network.
// Each function takes plain data and returns an SVG string. Colours come
// from the site palette so every chart looks like it belongs here.

const INK = "#16302b";
const GRID = "#dfe7e2";
const TEAL = "#0f766e";
const AMBER = "#d97706";
const RUST = "#b45309";
const SLATE = "#64748b";

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// A line chart with dots, year labels and a value on the last point.
// data: [{year, value}], opts: {height, format, color, ymin}
export function lineChart(data, opts = {}) {
  const w = 640;
  const h = opts.height || 240;
  const padL = 46;
  const padR = 14;
  const padT = 18;
  const padB = 28;
  const vals = data.map((d) => d.value);
  let lo = Math.min(...vals);
  let hi = Math.max(...vals);
  if (opts.ymin !== undefined) lo = Math.min(lo, opts.ymin);
  if (lo === hi) hi = lo + 1;
  const span = hi - lo;
  lo -= span * 0.12;
  hi += span * 0.12;
  const fmt = opts.format || ((v) => String(v));
  const axisFmt = opts.axisFormat || shortNumber;
  const x = (i) => padL + ((w - padL - padR) * i) / (data.length - 1);
  const y = (v) => padT + ((h - padT - padB) * (hi - v)) / (hi - lo);
  const color = opts.color || TEAL;

  const points = data.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(" ");
  const dots = data.map((d, i) => `<circle cx="${x(i)}" cy="${y(d.value)}" r="3.5" fill="#fff" stroke="${color}" stroke-width="2"><title>${d.year}: ${fmt(d.value)}</title></circle>`).join("");
  const years = data.map((d, i) => `<text x="${x(i)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${SLATE}">${d.year}</text>`).join("");
  const last = data[data.length - 1];
  const lastTag = `<text x="${x(data.length - 1)}" y="${y(last.value) - 10}" text-anchor="end" font-size="13" font-weight="700" fill="${color}">${esc(fmt(last.value))}</text>`;

  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Line chart, ${data[0].year} to ${last.year}" xmlns="http://www.w3.org/2000/svg">
${gridlines(lo, hi, padL, w - padR, y, axisFmt)}
<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
${dots}
${years}
${lastTag}
</svg>`;
}

// Short numbers for the axis: long labels get clipped at the chart's
// left edge, so thousands become "1.4k" and the rest stay as they are.
function shortNumber(v) {
  if (Math.abs(v) >= 1000) return (v / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

// Four faint horizontal lines with a label each, shared by the line
// and bar charts so they always agree.
function gridlines(lo, hi, x0, x1, y, fmt) {
  return [0, 1, 2, 3].map((k) => {
    const v = lo + ((hi - lo) * k) / 3;
    return `<line x1="${x0}" y1="${y(v)}" x2="${x1}" y2="${y(v)}" stroke="${GRID}" stroke-width="1"/><text x="${x0 - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11" fill="${SLATE}">${esc(fmt(v))}</text>`;
  }).join("");
}

// A vertical bar chart. Negative values draw below the zero line.
// data: [{year, value}], opts: {height, format, color, negColor}
export function barChart(data, opts = {}) {
  const w = 640;
  const h = opts.height || 240;
  const padL = 46;
  const padR = 14;
  const padT = 22;
  const padB = 28;
  const vals = data.map((d) => d.value);
  let lo = Math.min(0, ...vals);
  let hi = Math.max(...vals);
  const span = hi - lo || 1;
  // Bars start at zero: never pad below it, or the axis shows a
  // meaningless negative label under an all-positive chart.
  if (lo < 0) lo -= span * 0.08;
  hi += span * 0.12;
  const fmt = opts.format || ((v) => String(v));
  const axisFmt = opts.axisFormat || shortNumber;
  const slot = (w - padL - padR) / data.length;
  const barW = Math.min(44, slot * 0.62);
  const x = (i) => padL + slot * i + (slot - barW) / 2;
  const y = (v) => padT + ((h - padT - padB) * (hi - v)) / (hi - lo);
  const color = opts.color || TEAL;
  const neg = opts.negColor || RUST;

  const bars = data.map((d, i) => {
    const top = y(Math.max(d.value, 0));
    const bottom = y(Math.min(d.value, 0));
    return `<rect x="${x(i).toFixed(1)}" y="${top.toFixed(1)}" width="${barW}" height="${Math.max(1, bottom - top).toFixed(1)}" rx="3" fill="${d.value < 0 ? neg : color}"><title>${d.year}: ${fmt(d.value)}</title></rect><text x="${x(i) + barW / 2}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${esc(fmt(d.value))}</text>`;
  }).join("");
  const years = data.map((d, i) => `<text x="${x(i) + barW / 2}" y="${h - 8}" text-anchor="middle" font-size="11" fill="${SLATE}">${d.year}</text>`).join("");
  const zero = lo < 0 ? `<line x1="${padL}" y1="${y(0)}" x2="${w - padR}" y2="${y(0)}" stroke="${SLATE}" stroke-width="1"/>` : "";

  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart, ${data[0].year} to ${data[data.length - 1].year}" xmlns="http://www.w3.org/2000/svg">
${gridlines(lo, hi, padL, w - padR, y, axisFmt)}
${zero}
${bars}
${years}
</svg>`;
}

// A donut: slices with a legend underneath. data: [{name, share}]
export function donutChart(data, opts = {}) {
  const w = 640;
  const h = opts.height || 300;
  const cx = 150;
  const cy = h / 2 - 10;
  const r = 105;
  const inner = 62;
  const palette = ["#0f766e", "#d97706", "#1d4ed8", "#b45309", "#0e7490", "#94a3b8"];
  let angle = -Math.PI / 2;
  const slices = data.map((d, i) => {
    const a0 = angle;
    const a1 = angle + (d.share / 100) * Math.PI * 2;
    angle = a1;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const path = `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z`;
    return `<path d="${path}" fill="${palette[i % palette.length]}"><title>${esc(d.name)}: ${d.share}%</title></path>`;
  }).join("");

  const legend = data.map((d, i) => {
    const ly = 34 + i * 30;
    return `<rect x="300" y="${ly - 12}" width="14" height="14" rx="3" fill="${palette[i % palette.length]}"/><text x="322" y="${ly}" font-size="13" fill="${INK}">${esc(d.name)}</text><text x="620" y="${ly}" text-anchor="end" font-size="13" font-weight="700" fill="${INK}">${d.share}%</text>`;
  }).join("");

  const total = data.reduce((s, d) => s + d.share, 0);
  const centre = `<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="800" fill="${INK}">${total}%</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="${SLATE}">of GDP</text>`;

  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Donut chart of shares" xmlns="http://www.w3.org/2000/svg">
${slices}
${centre}
${legend}
</svg>`;
}

// Horizontal bars for comparing a few groups.
// data: [{group, value}] or [{group, share}] — both spellings accepted.
export function hbarChart(data, opts = {}) {
  const rowH = 44;
  const w = 640;
  const h = rowH * data.length + 16;
  const val = (d) => d.value ?? d.share;
  const max = Math.max(...data.map(val));
  const fmt = opts.format || ((v) => String(v));
  const color = opts.color || TEAL;
  const rows = data.map((d, i) => {
    const y = 8 + i * rowH;
    const bw = Math.max(4, ((w - 220) * val(d)) / max);
    return `<text x="0" y="${y + 19}" font-size="13" fill="${INK}">${esc(d.group)}</text><rect x="96" y="${y + 6}" width="${bw.toFixed(1)}" height="20" rx="4" fill="${color}"><title>${esc(d.group)}: ${fmt(val(d))}</title></rect><text x="${(104 + bw).toFixed(1)}" y="${y + 21}" font-size="13" font-weight="700" fill="${INK}">${esc(fmt(val(d)))}</text>`;
  }).join("");
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Bar chart comparing groups" xmlns="http://www.w3.org/2000/svg">${rows}</svg>`;
}
