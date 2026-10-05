'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Content (replace with your own) ---------- */
const SKILLS = [
  ['HTML5', '</>', 'Semantic, accessible structure for every page.'], ['CSS3', '🎨', 'Grid, Flexbox and thoughtful, expressive styling.'],
  ['JavaScript', '⚡', 'Vanilla JS for interactive, friendly interfaces.'], ['Responsive Design', '📱', 'Layouts that bend gracefully to any screen.'],
  ['UI/UX', '✏️', 'Sketching flows and keeping things human.'], ['Git/GitHub', '🌿', 'Tidy commits and calm collaboration.'],
  ['APIs', '🔌', 'Fetching and shaping data from the web.'], ['Performance', '🚀', 'Lean pages that load fast and feel snappy.']
];
const PROJECTS = [
  ['Cozy Recipes', 'Websites', 'A recipe book site with search and saved favourites.', ['HTML', 'CSS', 'JS'], '🍲', '#f4d77a'],
  ['Weather Doodle', 'Apps', 'Weather app that shows the forecast with hand-drawn icons.', ['JS', 'API'], '⛅', '#b7c9a8'],
  ['Todo Notebook', 'Apps', 'Sticky-note task board with drag and local storage.', ['JS', 'DOM'], '📝', '#e9a58f'],
  ['Studio Landing', 'Websites', 'A calm landing page for a small pottery studio.', ['HTML', 'CSS'], '🏺', '#d9c7a3'],
  ['Pixel Kit', 'Design', 'A small component kit built on CSS variables.', ['CSS', 'UI'], '🧩', '#b7c9a8'],
  ['Book Shelf', 'Websites', 'A reading list with filters and a tidy responsive grid.', ['HTML', 'CSS', 'JS'], '📚', '#f4d77a']
];
const JOBS = [
  ['✏', 'Freelance Frontend Developer', 'Self-employed', '2024 – Now', ['Built responsive sites for small businesses', 'Improved speed and accessibility'], ['HTML', 'CSS', 'JavaScript']],
  ['📓', 'Web Development Student', 'Class projects', '2023 – 2024', ['Practised layouts, forms and DOM scripting', 'Learned Git and teamwork'], ['HTML', 'CSS', 'Git']]
];
const SERVICES = [['🖥️', 'Frontend Development', 'Clean, careful interfaces built by hand.'], ['🎨', 'Web Design', 'Warm, readable layouts with personality.'], ['⚙️', 'JavaScript Development', 'Interactive features without heavy frameworks.'], ['📱', 'Responsive Websites', 'Looks lovely from phone to widescreen.'], ['🧵', 'UI Implementation', 'Your designs, stitched into working code.'], ['🔧', 'Website Optimization', 'Faster loads, better accessibility and SEO.']];
const STATS = [['Years coding', 2], ['Projects', 24], ['Happy clients', 12], ['Cups of coffee', 999]];

/* Deterministic "random" so imperfections stay stable between reloads */
let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
const tilt = (m = 2.2) => ((rnd() * 2 - 1) * m).toFixed(2) + 'deg';

/* ---------- Render ---------- */
$('#year').textContent = new Date().getFullYear();
$('#stats').innerHTML = STATS.map(s => `<li><strong data-to="${s[1]}">0</strong>${s[0]}</li>`).join('');
$('#skillGrid').innerHTML = SKILLS.map((s, i) => `<article class="card s${i % 4}" data-reveal style="--r:${tilt(2.6)}"><span class="pin"></span><div class="ic" aria-hidden="true">${s[1]}</div><h3>${s[0]}</h3><p>${s[2]}</p><svg class="sq" viewBox="0 0 40 40" aria-hidden="true"><path d="M5 30 C12 8 20 36 35 8"/></svg></article>`).join('');
$('#board').innerHTML = PROJECTS.map((p, i) => `<button class="card proj" data-reveal data-i="${i}" data-cat="${p[1]}" style="--r:${tilt(2.4)}" aria-label="Open ${p[0]} details"><span class="pin"></span><div class="shot" style="--c:${p[5]}" aria-hidden="true">${p[4]}</div><h3>${p[0]}</h3><p>${p[2]}</p><div class="tags">${p[3].map(t => `<span>${t}</span>`).join('')}</div><div class="links"><span>Live Demo ↗</span><span>GitHub ↗</span></div></button>`).join('');
$('#timeline').innerHTML = JOBS.map(j => `<li data-ic="${j[0]}" data-reveal><div class="when">${j[3]}</div><div class="card" style="--r:${tilt(1.4)}"><h3>${j[1]}</h3><p>${j[2]}</p><ul>${j[4].map(r => `<li>${r}</li>`).join('')}</ul><div class="tags">${j[5].map(t => `<span>${t}</span>`).join('')}</div></div></li>`).join('');
$('#services').innerHTML = SERVICES.map((s, i) => `<article class="card s${(i + 1) % 4}" data-reveal><div class="ic" aria-hidden="true">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p></article>`).join('');
$$('[data-tilt]').forEach(el => { el.style.rotate = tilt(3); });

/* ---------- Typing greeting ---------- */
(function typeGreeting() {
  const el = $('#greet'), text = 'hello there, welcome to my desk ~', n = { i: 0 };
  if (reduced) { el.textContent = text; return; }
  el.classList.add('caret');
  (function step() { el.textContent = text.slice(0, ++n.i); if (n.i < text.length) setTimeout(step, 70); })();
})();

/* ---------- Theme (saved in localStorage) ---------- */
const root = document.documentElement, themeBtn = $('#theme');
function setTheme(t) { root.dataset.theme = t; themeBtn.textContent = t === 'night' ? '☀' : '☾'; }
try { setTheme(localStorage.getItem('theme') || 'day'); } catch (e) { setTheme('day'); }
themeBtn.addEventListener('click', () => {
  const t = root.dataset.theme === 'night' ? 'day' : 'night'; setTheme(t);
  try { localStorage.setItem('theme', t); } catch (e) { /* storage blocked */ }
});

/* ---------- Mobile drawer ---------- */
const burger = $('#burger'), menu = $('#menu');
const toggleMenu = open => { menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); burger.textContent = open ? '✕ close' : '✎ menu'; };
burger.addEventListener('click', () => toggleMenu(!menu.classList.contains('open')));
menu.addEventListener('click', e => { if (e.target.closest('a')) toggleMenu(false); });
addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });

/* ---------- Active nav, reveal, counters ---------- */
const links = $$('.menu a');
const navObs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => navObs.observe(s));

function count(el) {
  const to = +el.dataset.to, t0 = performance.now(), dur = reduced ? 1 : 1400;
  (function step(t) {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}
const revObs = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in'); revObs.unobserve(e.target);
  $$('[data-to]', e.target).forEach(count);
}), { threshold: .12 });
$$('[data-reveal]').forEach(el => revObs.observe(el));

/* ---------- Project filter (paper chips) ---------- */
const cats = ['All', ...new Set(PROJECTS.map(p => p[1]))];
$('#filters').innerHTML = cats.map((c, i) => `<button class="chip" aria-pressed="${i === 0}" data-c="${c}">${c}</button>`).join('');
$('#filters').addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  $$('.chip').forEach(x => x.setAttribute('aria-pressed', x === b));
  $$('.proj').forEach(p => p.classList.toggle('out', b.dataset.c !== 'All' && p.dataset.cat !== b.dataset.c));
});

/* ---------- Project modal ---------- */
const modal = $('#modal');
$('#board').addEventListener('click', e => {
  const c = e.target.closest('.proj'); if (!c) return;
  const p = PROJECTS[+c.dataset.i];
  $('#mT').textContent = p[0]; $('#mD').textContent = p[2];
  $('#mTags').innerHTML = p[3].map(t => `<span>${t}</span>`).join('');
  const shot = $('#mShot'); shot.textContent = p[4]; shot.style.setProperty('--c', p[5]);
  modal.showModal();
});
$('#mClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
$$('[data-dead]').forEach(a => a.addEventListener('click', e => e.preventDefault())); // placeholder links

/* ---------- Interactive doodles ---------- */
$$('[data-doodle]').forEach(d => d.addEventListener('click', () => {
  d.classList.remove('spin'); void d.offsetWidth; d.classList.add('spin');
}));

/* ---------- Back to top ---------- */
const topBtn = $('#top');
addEventListener('scroll', () => topBtn.classList.toggle('show', scrollY > 600), { passive: true });
topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));

/* ---------- Pencil cursor + gentle parallax on floating papers ---------- */
if (matchMedia('(pointer:fine)').matches && !reduced) {
  const pen = $('#pencil'); document.body.classList.add('cur');
  addEventListener('mousemove', e => {
    pen.style.transform = `translate(${e.clientX - 6}px,${e.clientY - 6}px)`;
    const dx = e.clientX / innerWidth - .5, dy = e.clientY / innerHeight - .5;
    $$('.float').forEach(el => { const d = +el.dataset.depth || 10; el.style.translate = `${dx * d}px ${dy * d}px`; });
  }, { passive: true });
}

/* ---------- Contact form (handwritten validation) ---------- */
(function form() {
  const f = $('#form');
  const rules = {
    name: v => v.trim().length >= 2 || 'oops, I need your name!',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || "hmm, that email looks off…",
    subject: v => v.trim().length >= 3 || 'what is this about?',
    message: v => v.trim().length >= 10 || 'tell me a little more (10+ letters)'
  };
  const check = k => {
    const el = f.elements[k], r = rules[k](el.value);
    $('#e-' + k).textContent = r === true ? '' : '✎ ' + r;
    el.setAttribute('aria-invalid', r !== true); el.setAttribute('aria-describedby', 'e-' + k);
    return r === true;
  };
  f.addEventListener('blur', e => { if (rules[e.target.name]) check(e.target.name); }, true);
  f.addEventListener('submit', e => {
    e.preventDefault();
    if (!Object.keys(rules).map(check).every(Boolean)) { f.querySelector('[aria-invalid=true]').focus(); return; }
    $('#sent').hidden = false; f.reset(); // demo only: connect a backend or form service
    setTimeout(() => { $('#sent').hidden = true; }, 4000);
  });
})();