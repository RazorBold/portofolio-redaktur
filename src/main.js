import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { render } from './render.js';
import { initCursor, initMagnetic } from './cursor.js';
import { runLoader, initHero } from './animations/hero.js';
import { initScroll } from './animations/scroll.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

// ?static = tampilkan tanpa animasi (berguna untuk cek tata letak)
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).has('static');
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const root = document.documentElement;
root.classList.remove('no-js');
if (reduced) root.classList.add('reduced');

render();

// Smooth scroll (dimatikan bila pengguna memilih gerak dikurangi)
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}

async function start() {
  await document.fonts.ready; // SplitText butuh font final agar baris terpotong benar
  initCursor();
  initMagnetic();
  const hero = initHero({ reduced, fine });
  initScroll({ reduced, fine, lenis });
  // Three.js hanya dimuat di layar lebar (kartu disembunyikan di mobile)
  const press = window.matchMedia('(min-width: 821px)').matches
    ? import('./three/pressCard.js').then((m) => m.initPressCard(document.querySelector('[data-press]'), { reduced }))
    : null;
  await runLoader({ reduced });
  hero.play();
  (await press)?.enter();
  lenis?.start();
  ScrollTrigger.refresh();
}
start();
