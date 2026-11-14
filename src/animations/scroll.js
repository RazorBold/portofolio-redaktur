import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

export function initScroll({ reduced, fine, lenis }) {
  initNav(lenis);
  initTicker(reduced, lenis);
  initPreview(fine);
  if (reduced) return;

  // Judul: baris naik dari balik "masker"
  $$('[data-split]').forEach((el) => {
    const lines = new SplitText(el, { type: 'lines', mask: 'lines' }).lines;
    gsap.from(lines, { yPercent: 105, duration: 1.1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 85%' } });
  });

  // Tulisan tangan: muncul seperti sedang ditulis (kiri → kanan)
  $$('[data-script-reveal]').forEach((el) => {
    gsap.fromTo(el, { clipPath: 'inset(-30% 100% -30% -5%)' }, {
      clipPath: 'inset(-30% -5% -30% -5%)', duration: 1.6, ease: 'power2.inOut',
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  $$('[data-reveal]').forEach((el) => {
    gsap.from(el, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  // Gambar latar bergerak lebih lambat dari halaman
  $$('[data-parallax-bg]').forEach((img) => {
    gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  about();
  lead();
  works();
  cases();
  journey();
  pubs();
  contact();
}

function about() {
  // Angka berjalan
  $$('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    const o = { v: 0 };
    gsap.to(o, { v: end, duration: 1.8, ease: 'power2.out', onUpdate: () => (el.textContent = Math.round(o.v)), scrollTrigger: { trigger: el, start: 'top 88%' } });
  });
  gsap.from('.stat', { y: 40, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.stats', start: 'top 85%' } });
  gsap.from('.about__script', { clipPath: 'inset(-30% 100% -30% -5%)', duration: 1.4, ease: 'power2.inOut', scrollTrigger: { trigger: '.about', start: 'top 75%' } });
  // Polaroid jatuh ke tempatnya lalu ikut bergoyang saat discroll
  gsap.from('[data-polaroid]', { rotate: 16, y: -80, opacity: 0, duration: 1.4, ease: 'elastic.out(1, 0.6)', scrollTrigger: { trigger: '.about', start: 'top 80%' } });
  gsap.to('[data-polaroid]', { rotate: -2, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top 60%', end: 'bottom top', scrub: true } });
  gsap.fromTo('[data-watermark]', { xPercent: 6 }, { xPercent: -12, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } });
}

function lead() {
  gsap.from('[data-photo]', { rotate: -14, x: -80, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.lead', start: 'top 65%' } });
  const steps = $$('.step');
  gsap.from(steps, { x: 120, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.14, scrollTrigger: { trigger: '.steps', start: 'top 80%' } });
  gsap.from($$('.step__num'), { yPercent: 60, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.14, scrollTrigger: { trigger: '.steps', start: 'top 80%' } });
}

function works() {
  const chars = new SplitText('[data-mast]', { type: 'chars', charsClass: 'char' }).chars;
  $('[data-mast]').classList.add('is-split');
  gsap.from(chars, { yPercent: 100, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.07, scrollTrigger: { trigger: '.works', start: 'top 75%' } });
  gsap.from('[data-rule]', { scaleX: 0, duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: '[data-rule]', start: 'top 90%' } });
  // Foto liputan utama terbuka dari bawah
  const story = $('[data-story]');
  gsap.timeline({ scrollTrigger: { trigger: story, start: 'top 80%' } })
    .from(story, { clipPath: 'inset(100% 0 0 0 round 18px)', duration: 1.4, ease: 'expo.inOut' })
    .from($('img', story), { scale: 1.35, duration: 1.8, ease: 'expo.out' }, 0.2)
    .from($$('.story__body > *', story), { y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out' }, 0.8);
  // Kliping ditempel satu per satu
  $$('.clip').forEach((c, i) => {
    gsap.from(c, { y: 80, rotate: i % 2 ? -14 : 14, opacity: 0, duration: 1.2, ease: 'back.out(1.6)', delay: i * 0.12, scrollTrigger: { trigger: '.clips', start: 'top 82%' } });
  });
}

// Angka berjalan dengan format Indonesia (titik ribuan, koma desimal)
function countUp(el, trigger) {
  const end = +el.dataset.num;
  const dec = +(el.dataset.dec || 0);
  const o = { v: 0 };
  gsap.to(o, {
    v: end, duration: 1.8, ease: 'power2.out',
    onUpdate: () => (el.textContent = o.v.toLocaleString('id-ID', { minimumFractionDigits: dec, maximumFractionDigits: dec })),
    scrollTrigger: { trigger, start: 'top 85%' },
  });
}

// Garis SVG tergambar dari ujung ke ujung (tanpa plugin DrawSVG)
function draw(paths, vars) {
  paths.forEach((p) => { const len = p.getTotalLength(); gsap.set(p, { strokeDasharray: len, strokeDashoffset: len }); });
  return gsap.to(paths, { strokeDashoffset: 0, ...vars });
}

function cases() {
  const on = (trigger, start = 'top 80%') => ({ trigger, start });
  $$('[data-tag]').forEach((t) => gsap.from(t, { x: -40, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: on(t, 'top 88%') }));
  if (window.matchMedia('(min-width: 1181px)').matches) {
    gsap.from('[data-cases-photo]', { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: on('.cases__head', 'top 75%') });
  }

  // Panel diletakkan satu per satu, judul panel menyusul dari kiri
  $$('.case').forEach((c) => {
    gsap.from($$('.panel', c), { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12, scrollTrigger: on($('.panel', c), 'top 88%') });
  });
  $$('.panel__tab').forEach((t) => gsap.from(t, { x: -24, opacity: 0, duration: 0.9, ease: 'expo.out', delay: 0.3, scrollTrigger: on(t, 'top 88%') }));

  // Peta: garis pantai tergambar, daratan terisi, lalu titik kota muncul
  $$('.map').forEach((m) => {
    const tl = gsap.timeline({ scrollTrigger: on(m, 'top 70%') });
    tl.add(draw($$('.map__land', m), { duration: 1.6, ease: 'power2.inOut' }), 0)
      .from($$('.map__land', m), { fillOpacity: 0, duration: 0.8, ease: 'power1.out' }, 0.9)
      .from($$('.place__mark', m), { scale: 0, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)', stagger: 0.06 }, 1.1)
      .from($$('.place__name', m), { opacity: 0, x: -4, duration: 0.5, stagger: 0.06 }, 1.2);
  });

  // Grafik: garis tumbuh ke kanan, titik dan label menyusul
  $$('.chart').forEach((c) => {
    const tl = gsap.timeline({ scrollTrigger: on(c, 'top 80%') });
    tl.add(draw($$('.chart__line', c), { duration: 1.8, ease: 'power2.inOut' }), 0)
      .from($$('.chart__pt', c), { scale: 0, transformOrigin: '50% 50%', duration: 0.4, ease: 'back.out(3)', stagger: 0.1 }, 0.1)
      .from($$('.chart__call', c), { opacity: 0, y: 10, duration: 0.6, ease: 'power3.out', stagger: 0.5 }, 0.6);
  });
  gsap.from('.badge', { y: 20, opacity: 0, duration: 0.8, ease: 'back.out(2)', stagger: 0.08, scrollTrigger: on('[data-growth]', 'top 90%') });
  gsap.from('.devices__seg', { scaleX: 0, duration: 1.2, ease: 'expo.inOut', stagger: 0.1, scrollTrigger: on('.devices', 'top 90%') });
  gsap.from('.issue__dots i', { scale: 0, duration: 0.4, ease: 'back.out(3)', stagger: 0.04, scrollTrigger: on('.issue', 'top 88%') });
  // Produksi berita: bar tahun memanjang; grafik bulanan tumbuh saat terlihat dan setiap kali tahun diganti
  gsap.from('.years__bar', { scaleX: 0, duration: 1.4, ease: 'expo.inOut', stagger: 0.12, scrollTrigger: on('.years__list', 'top 88%') });
  const out = $('[data-output]');
  if (out) {
    ScrollTrigger.create({ trigger: '.bars', start: 'top 80%', once: true, onEnter: () => growBars(out) });
    out.addEventListener('output:draw', () => growBars(out));
  }
  $$('.cases [data-num]').forEach((el) => countUp(el, el.closest('.panel')));
}

function growBars(root) {
  const tl = gsap.timeline();
  tl.from($$('.bar rect', root), { scaleY: 0, transformOrigin: '50% 100%', duration: 0.9, ease: 'expo.out', stagger: 0.05 }, 0)
    .from($$('.bars__avg', root), { scaleX: 0, transformOrigin: '0% 50%', duration: 0.8, ease: 'power2.inOut' }, 0.2)
    .add(draw($$('.bars__trend', root), { duration: 1.1, ease: 'power2.inOut' }), 0.35)
    .from($$('.bars__dot', root), { scale: 0, transformOrigin: '50% 50%', duration: 0.35, ease: 'back.out(3)', stagger: 0.05 }, 0.45)
    .from($$('.bar__val', root), { opacity: 0, y: 6, duration: 0.4, stagger: 0.04 }, 0.6)
    .from($$('.bars__peak', root), { opacity: 0, y: -8, duration: 0.6, ease: 'back.out(2)' }, 1);
}

function journey() {
  gsap.fromTo('[data-journey-bg]', { xPercent: 8 }, { xPercent: -14, ease: 'none', scrollTrigger: { trigger: '.journey', start: 'top bottom', end: 'bottom top', scrub: true } });
  const jobs = $$('.job');
  const wide = window.matchMedia('(min-width: 1181px)').matches;
  if (wide) {
    // Garis waktu tergambar mengikuti scroll; setiap jabatan menyala saat garis mencapainya
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.timeline', start: 'top 75%', end: 'bottom 45%', scrub: 0.6 } });
    tl.fromTo('[data-line]', { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: jobs.length }, 0);
    jobs.forEach((j, i) => {
      tl.from(j, { opacity: 0.12, y: 30, ease: 'power2.out', duration: 0.8 }, i * 0.95);
      tl.from($('.job__dot', j), { scale: 0, ease: 'back.out(3)', duration: 0.4 }, i * 0.95);
    });
  } else {
    jobs.forEach((j) => gsap.from(j, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: j, start: 'top 88%' } }));
  }
}

function pubs() {
  gsap.from('.pub', { xPercent: -8, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '[data-pubs]', start: 'top 80%' } });
  gsap.from('.pubs__script', { clipPath: 'inset(-30% 100% -30% -5%)', duration: 1.3, ease: 'power2.inOut', scrollTrigger: { trigger: '.pubs', start: 'top 75%' } });
  gsap.from('[data-edu]', { rotate: 14, y: 100, opacity: 0, duration: 1.5, ease: 'elastic.out(1, 0.7)', scrollTrigger: { trigger: '[data-edu]', start: 'top 85%' } });
}

function contact() {
  const chars = new SplitText('[data-contact-word]', { type: 'chars', charsClass: 'char' }).chars;
  $('[data-contact-word]').classList.add('is-split');
  gsap.from(chars, { yPercent: 100, opacity: 0, rotate: 6, duration: 1.2, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: '.contact', start: 'top 70%' } });
  gsap.from('.contact__list > div, .contact > .btn', { y: 30, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.contact__list', start: 'top 90%' } });
}

// Nav: latar muncul setelah hero, sembunyi saat scroll turun, tampil saat scroll naik
function initNav(lenis) {
  const nav = $('[data-nav]');
  ScrollTrigger.create({
    start: 80, end: 'max',
    onUpdate: (self) => {
      nav.classList.add('is-scrolled');
      nav.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > window.innerHeight * 0.8);
    },
    onLeaveBack: () => nav.classList.remove('is-scrolled', 'is-hidden'),
  });
  // Tautan aktif
  $$('.nav__links a').forEach((a) => {
    const target = $(a.getAttribute('href'));
    if (!target) return;
    ScrollTrigger.create({ trigger: target, start: 'top 50%', end: 'bottom 50%', onToggle: (s) => a.classList.toggle('is-current', s.isActive) });
  });
  // Smooth scroll untuk tautan internal + menu mobile
  const menu = $('#menu');
  const toggle = $('[data-menu-toggle]');
  const setMenu = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Tutup' : 'Menu';
    open ? lenis?.stop() : lenis?.start();
  };
  toggle.addEventListener('click', () => setMenu(menu.hidden));
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const el = id === '#top' ? document.body : $(id);
    if (!el) return;
    e.preventDefault();
    if (!menu.hidden) setMenu(false);
    lenis ? lenis.scrollTo(el, { offset: id === '#top' ? 0 : -40, duration: 1.4 }) : el.scrollIntoView({ behavior: 'smooth' });
  }));
}

// Ticker: berjalan terus, lebih cepat & miring saat halaman discroll cepat
function initTicker(reduced, lenis) {
  const track = $('[data-ticker]');
  if (reduced) return;
  const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
  const skew = gsap.quickTo(track, 'skewX', { duration: 0.4, ease: 'power3' });
  lenis?.on('scroll', ({ velocity }) => {
    const v = gsap.utils.clamp(-40, 40, velocity);
    loop.timeScale(1 + Math.abs(v) / 6 * Math.sign(v || 1));
    skew(-v * 0.25);
  });
}

// Pratinjau foto mengikuti kursor saat hover nama media
function initPreview(fine) {
  if (!fine) return;
  const box = $('.pub-preview');
  const img = $('img', box);
  const x = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3' });
  const y = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3' });
  $$('[data-preview]').forEach((a) => {
    a.addEventListener('pointerenter', () => { img.src = a.dataset.preview; gsap.to(box, { opacity: 1, scale: 1, rotate: -4, duration: 0.5, ease: 'power3.out' }); });
    a.addEventListener('pointerleave', () => gsap.to(box, { opacity: 0, scale: 0.8, rotate: 0, duration: 0.4 }));
    a.addEventListener('pointermove', (e) => { x(e.clientX); y(e.clientY); });
  });
}
