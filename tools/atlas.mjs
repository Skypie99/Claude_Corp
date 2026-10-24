// atlas.mjs: generates the Branch Atlas artwork and writes it into the pages.
//
//   node tools/atlas.mjs
//
// No dependencies. Each drawing is written in place between marker comments,
// for example <!-- atlas:wide --> ... <!-- /atlas:wide -->, so copy edits stay
// in index.html and only the artwork is regenerated.
//
// The drawings carry no small text. Annotations, labels and captions are HTML
// next to the drawing, so they keep their size at every width and theme.
// Colour comes from CSS classes (.glyph-*, .fill-*, .t-ink) defined in
// assets/site.css, so one drawing serves both themes.
//
// Geometry follows the Branch Atlas concept (ClaudeCorp-Website-Concepts-20261024-v1,
// source/atlas.mjs): one routing node fans into fifteen lines, the lines run in
// parallel with one dot each, converge on a review square, then an arrow leads to
// the human merge node and the release dot. It is a diagram of the operating
// model, not a record of live activity.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const N = 15;
const cls = (i) => (i % 3 === 0 ? 'glyph-accent' : i % 3 === 1 ? 'glyph-ink' : 'glyph-muted');
const fcls = (i) => (i % 3 === 0 ? 'fill-accent' : i % 3 === 1 ? 'fill-ink' : 'fill-muted');
const f = (n) => +n.toFixed(2);

// Wide composition: desktop and tablet plate. Node names are the only text and
// are set large; leaders run to the plate edges where the HTML notes sit.
function wide() {
  const W = 800, H = 290, cy = 118, gap = 14;
  const sky0 = 34, morgan = 116, fanStart = 128, runStart = 274, runEnd = 526, dotX = 400;
  const rev = { x: 614, s: 44 }, sky1 = 712, main = 772, nameY = 266;
  let s = '';
  // leaders to the notes above (01, 03, 05) and below (02, 04)
  const lead = (x, y1, y2) => `<path d="M ${x} ${y1} V ${y2}" class="glyph-rule" stroke-width="1" fill="none"/>`;
  s += lead(sky0, 0, cy - 14) + lead(dotX, 0, cy - 7 * gap - 9) + lead(sky1, 0, cy - 17);
  s += lead(morgan, nameY + 9, H) + lead(rev.x + rev.s / 2, nameY + 9, H);
  s += `<path d="M ${sky0 + 9} ${cy} H ${morgan - 12}" class="glyph-rule" stroke-width="1.4" fill="none"/>`;
  let lines = '', dots = '';
  for (let i = 0; i < N; i++) {
    const y = f(cy + (i - (N - 1) / 2) * gap);
    lines += `<path d="M ${fanStart} ${cy} C ${fanStart + 72} ${cy} ${runStart - 72} ${y} ${runStart} ${y} H ${runEnd} C ${runEnd + 62} ${y} ${rev.x - 62} ${cy} ${rev.x} ${cy}" class="${cls(i)} branch" pathLength="1" style="--i:${i}" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    dots += `<circle cx="${dotX}" cy="${y}" r="3.4" class="${fcls(i)} node-dot"/>`;
  }
  s += lines + dots;
  s += `<circle cx="${sky0}" cy="${cy}" r="8" class="fill-paper glyph-ink" stroke-width="2.5"/><circle cx="${sky0}" cy="${cy}" r="2.6" class="fill-accent"/>`;
  s += `<circle cx="${morgan}" cy="${cy}" r="11" class="fill-paper glyph-ink" stroke-width="3"/><circle cx="${morgan}" cy="${cy}" r="3.3" class="fill-accent"/>`;
  s += `<rect x="${rev.x}" y="${cy - rev.s / 2}" width="${rev.s}" height="${rev.s}" rx="4" class="fill-shade glyph-accent" stroke-width="1.6"/>`;
  s += `<path d="M ${rev.x + 10} ${cy} L ${rev.x + 19} ${cy + 9} L ${rev.x + 35} ${cy - 11}" class="glyph-accent" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<path d="M ${rev.x + rev.s + 10} ${cy} H ${sky1 - 17}" class="glyph-accent" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M ${sky1 - 25} ${cy - 6} L ${sky1 - 17} ${cy} L ${sky1 - 25} ${cy + 6}" class="glyph-accent" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<circle cx="${sky1}" cy="${cy}" r="11" class="fill-paper glyph-ink" stroke-width="3"/><circle cx="${sky1}" cy="${cy}" r="3.3" class="fill-accent"/>`;
  s += `<path d="M ${sky1 + 13} ${cy} H ${main - 9}" class="glyph-ink" stroke-width="1.6" fill="none"/>`;
  s += `<circle cx="${main}" cy="${cy}" r="7" class="fill-ink"/>`;
  const name = (x, t, size) => `<text x="${x}" y="${nameY}" font-size="${size}" text-anchor="middle" class="t-ink">${t}</text>`;
  s += name(sky0, 'Sky', 25) + name(morgan, 'Morgan', 27) + name(dotX, '15 roles', 31);
  s += name(rev.x + rev.s / 2, 'Review', 27) + name(sky1, 'Sky', 27) + name(main, 'main', 25);
  return `<svg class="atlas atlas-wide" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">${s}</svg>`;
}

// Compact strip: the same system at signature size for the first screen on
// phones and tablets. No text inside; HTML labels sit underneath.
function strip() {
  const W = 360, H = 100, cy = 50, gap = 5.6;
  const sky0 = 8, morgan = 34, fanStart = 43, runStart = 112, runEnd = 236, dotX = 174;
  const rev = { x: 272, s: 22 }, sky1 = 327, main = 353;
  let s = `<path d="M ${sky0 + 6} ${cy} H ${morgan - 8}" class="glyph-rule" stroke-width="1.2" fill="none"/>`;
  let lines = '', dots = '';
  for (let i = 0; i < N; i++) {
    const y = f(cy + (i - (N - 1) / 2) * gap);
    lines += `<path d="M ${fanStart} ${cy} C ${fanStart + 34} ${cy} ${runStart - 34} ${y} ${runStart} ${y} H ${runEnd} C ${runEnd + 20} ${y} ${rev.x - 20} ${cy} ${rev.x} ${cy}" class="${cls(i)} branch" pathLength="1" style="--i:${i}" stroke-width="1.25" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    dots += `<circle cx="${dotX}" cy="${y}" r="1.9" class="${fcls(i)} node-dot"/>`;
  }
  s += lines + dots;
  s += `<circle cx="${sky0}" cy="${cy}" r="5" class="fill-paper glyph-ink" stroke-width="1.7"/><circle cx="${sky0}" cy="${cy}" r="1.7" class="fill-accent"/>`;
  s += `<circle cx="${morgan}" cy="${cy}" r="7" class="fill-paper glyph-ink" stroke-width="2"/><circle cx="${morgan}" cy="${cy}" r="2.2" class="fill-accent"/>`;
  s += `<rect x="${rev.x}" y="${cy - rev.s / 2}" width="${rev.s}" height="${rev.s}" rx="3" class="fill-shade glyph-accent" stroke-width="1.3"/>`;
  s += `<path d="M ${rev.x + 5} ${cy} L ${rev.x + 9.5} ${cy + 4.5} L ${rev.x + 17.5} ${cy - 5.5}" class="glyph-accent" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<path d="M ${rev.x + rev.s + 5} ${cy} H ${sky1 - 11}" class="glyph-accent" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M ${sky1 - 15.5} ${cy - 4} L ${sky1 - 11} ${cy} L ${sky1 - 15.5} ${cy + 4}" class="glyph-accent" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `<circle cx="${sky1}" cy="${cy}" r="7" class="fill-paper glyph-ink" stroke-width="2"/><circle cx="${sky1}" cy="${cy}" r="2.2" class="fill-accent"/>`;
  s += `<path d="M ${sky1 + 8} ${cy} H ${main - 5}" class="glyph-ink" stroke-width="1.2" fill="none"/>`;
  s += `<circle cx="${main}" cy="${cy}" r="4.5" class="fill-ink"/>`;
  return `<svg class="atlas atlas-strip" viewBox="0 0 ${W} ${H}" aria-hidden="true" focusable="false">${s}</svg>`;
}

const ART = { wide: wide(), strip: strip() };
const TARGETS = ['index.html', '404.html', 'tools/og-image.html'];

let total = 0;
for (const rel of TARGETS) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, 'utf8');
  let count = 0;
  const after = before.replace(/(<!-- atlas:(wide|strip) -->)[\s\S]*?(<!-- \/atlas:\2 -->)/g, (_, open, name, close) => {
    count++;
    return `${open}${ART[name]}${close}`;
  });
  if (after !== before) fs.writeFileSync(file, after);
  console.log(`${rel}: ${count} drawing(s) ${after !== before ? 'updated' : 'unchanged'}`);
  total += count;
}
if (!total) {
  console.error('No <!-- atlas:… --> markers found.');
  process.exit(1);
}
