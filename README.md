# Portofolio Redaktur Pelaksana

Website portofolio satu halaman: Vite + GSAP (ScrollTrigger, SplitText) + Lenis + Three.js.
Desain sumber: Figma "Moodboard – Portofolio Redaktur" → halaman "Desain — Desktop". Rencana: [PLAN.md](PLAN.md).

## Menjalankan
```bash
npm install
npm run dev      # mode pengembangan: http://localhost:5173
npm run build    # hasil siap online di folder dist/
npm run serve    # lihat hasil build: http://localhost:4173
```
Tambahkan `?static` di URL untuk melihat halaman tanpa animasi.

## Mengubah isi
Semua teks ada di `src/data/content.js`. Tanda `[ ... ]` = isian sementara.

**Wajib sebelum online:** ganti `public/images/photos/profil-cutout.webp` dan `profil-kartu.webp`
dengan foto asli (latar transparan). Foto sekarang adalah wajah buatan AI.

## Animasi
- `src/animations/hero.js`: loader 0→100, hero masuk berurutan, parallax mengikuti mouse
- `src/animations/scroll.js`: judul per baris, tulisan tangan "tertulis", angka berjalan, polaroid jatuh,
  kliping ditempel, garis waktu tergambar, pratinjau foto saat hover publikasi, ticker yang bereaksi pada kecepatan scroll
- `src/three/pressCard.js`: kartu pers 3D berayun di lanyard (klik untuk membalik), hanya di layar ≥ 821px
- `src/cursor.js`: kursor kustom berlabel + tombol magnetik
- `prefers-reduced-motion` dihormati: semua animasi dimatikan.
