// Dua bahasa: Inggris (bawaan) dan Indonesia.
// Teks statis di HTML ditulis dalam bahasa Indonesia, versi Inggrisnya di atribut data-en (isi)
// dan data-en-label / data-en-alt / data-en-content (atribut).
// Pengecualian: judul tab, deskripsi, dan label loader sudah berbahasa Inggris di HTML supaya tidak
// sempat tampil dalam bahasa Indonesia sebelum skrip jalan; versi Indonesianya di data-id / data-id-content.
// Teks dari data dan render memakai tr('teks Indonesia', 'English text').
// Ganti bahasa = muat ulang halaman, karena SplitText dan ScrollTrigger sudah memotong teks lama.

const read = (store, key) => { try { return store.getItem(key); } catch { return null; } };
const write = (store, key, v) => { try { store.setItem(key, v); } catch { /* mode privat: cukup lewat URL */ } };

const param = new URLSearchParams(location.search).get('lang');
export const lang = param === 'en' || param === 'id' ? param : read(localStorage, 'lang') === 'id' ? 'id' : 'en';
export const tr = (id, en) => (lang === 'en' ? en : id);
export const locale = tr('id-ID', 'en-US');

// Label kursor dibuat di banyak tempat, jadi diterjemahkan lewat satu daftar
const CURSOR = { Atas: 'Top', Lihat: 'View', Putar: 'Spin', Baca: 'Read', Arsip: 'Archive', Tulis: 'Write', Telepon: 'Call' };

export function translatePage() {
  const root = document.documentElement;
  root.lang = lang;
  document.querySelectorAll('[data-lang-toggle] [data-lang]').forEach((el) => el.classList.toggle('is-on', el.dataset.lang === lang));
  if (lang === 'id') {
    document.querySelectorAll('[data-id]').forEach((el) => { el.textContent = el.dataset.id; });
    document.querySelectorAll('[data-id-content]').forEach((el) => { el.content = el.dataset.idContent; });
    return;
  }
  document.querySelectorAll('[data-en]').forEach((el) => { el.innerHTML = el.dataset.en; });
  document.querySelectorAll('[data-en-label]').forEach((el) => el.setAttribute('aria-label', el.dataset.enLabel));
  document.querySelectorAll('[data-en-alt]').forEach((el) => { el.alt = el.dataset.enAlt; });
  document.querySelectorAll('[data-en-content]').forEach((el) => { el.content = el.dataset.enContent; });
  document.querySelectorAll('[data-cursor]').forEach((el) => { el.dataset.cursor = CURSOR[el.dataset.cursor] ?? el.dataset.cursor; });
}

export function initLangToggle() {
  document.querySelector('[data-lang-toggle]')?.addEventListener('click', () => {
    const next = lang === 'en' ? 'id' : 'en';
    write(localStorage, 'lang', next);
    write(sessionStorage, 'langScroll', String(Math.round(window.scrollY)));
    const url = new URL(location.href);
    url.searchParams.set('lang', next);
    location.href = url;
  });
}

// Posisi scroll sebelum ganti bahasa (sekali pakai), atau null
export function takeScroll() {
  const y = read(sessionStorage, 'langScroll');
  if (y === null) return null;
  try { sessionStorage.removeItem('langScroll'); } catch { /* abaikan */ }
  return +y || 0;
}
