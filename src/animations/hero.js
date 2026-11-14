import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Loader: hitung 0 → 100 lalu tirai terangkat. Mengembalikan Promise saat selesai.
export function runLoader({ reduced }) {
  const loader = document.querySelector('.loader');
  if (reduced || !loader) { loader?.remove(); return Promise.resolve(); }
  const count = loader.querySelector('.loader__count');
  const state = { v: 0 };
  return new Promise((resolve) => {
    gsap.timeline({ onComplete: () => { loader.remove(); } })
      .to(state, { v: 100, duration: 1.4, ease: 'power2.inOut', onUpdate: () => { count.textContent = Math.round(state.v); } })
      .to(loader.querySelector('.loader__inner'), { yPercent: -40, opacity: 0, duration: 0.5, ease: 'power2.in' })
      .add(resolve, '-=0.15')
      .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' }, '<');
  });
}

export function initHero({ reduced, fine }) {
  const q = (s) => document.querySelector(s);
  const word = q('[data-hero-word]');
  const person = q('[data-person]');
  const script = q('[data-hero-script]');
  const bg = q('.hero__bg');
  const lede = q('[data-hero-lede]');
  const fades = document.querySelectorAll('[data-hero-fade]');
  const nav = q('[data-nav]');

  if (reduced) return { play: () => {} };

  const chars = new SplitText(word, { type: 'chars', charsClass: 'char' }).chars;
  word.classList.add('is-split');
  const ledeLines = new SplitText(lede, { type: 'lines', mask: 'lines' }).lines;

  // Keadaan awal (disembunyikan sebelum loader selesai)
  gsap.set(bg, { scale: 1.18 });
  gsap.set(chars, { yPercent: 110, opacity: 0 });
  gsap.set(person, { yPercent: 18, opacity: 0 });
  gsap.set(script, { clipPath: 'inset(-20% 100% -20% -5%)' });
  gsap.set(ledeLines, { yPercent: 105 });
  gsap.set(fades, { y: 24, opacity: 0 });
  gsap.set(nav, { yPercent: -100, opacity: 0 });

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
    .to(bg, { scale: 1, duration: 2.4, ease: 'power3.out' }, 0)
    .to(chars, { yPercent: 0, opacity: 1, duration: 1.4, stagger: { each: 0.06, from: 'center' } }, 0.1)
    .to(person, { yPercent: 0, opacity: 1, duration: 1.6 }, 0.35)
    .to(script, { clipPath: 'inset(-20% -5% -20% -5%)', duration: 1.5, ease: 'power2.inOut' }, 0.8)
    .to(ledeLines, { yPercent: 0, duration: 1.1, stagger: 0.08 }, 1.0)
    .to(fades, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 1.15)
    .to(nav, { yPercent: 0, opacity: 1, duration: 1 }, 1.1);

  // Parallax mengikuti mouse: tiap lapisan bergerak di kedalaman berbeda
  if (fine) {
    const layers = [
      [bg, 8], [word, -18], [person, 14], [script, -28],
    ].map(([el, depth]) => ({ x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }), depth }));
    q('.hero').addEventListener('pointermove', (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      layers.forEach((l) => { l.x(nx * l.depth * 2); l.y(ny * l.depth); });
    });
  }

  // Saat hero discroll keluar: lapisan memisah
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    .to(word, { yPercent: -45, ease: 'none' }, 0)
    .to(script, { yPercent: -80, ease: 'none' }, 0)
    .to(bg, { yPercent: 12, ease: 'none' }, 0)
    .to('.hero__copy', { yPercent: -30, opacity: 0, ease: 'none' }, 0);

  return { play: () => tl.play() };
}
