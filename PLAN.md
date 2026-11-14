# Rencana — Portofolio Redaktur Pelaksana

## Konsep: "Editorial Desk", hero sinematik
Mengacu ke referensi yang dipilih (lihat `design/moodboard/`): hero sinematik dengan tipografi
raksasa, foto profil cutout sebagai fokus, dan meja redaksi penuh properti jurnalis.
Disesuaikan dengan sosok **Redaktur Pelaksana VOI, eks detikNews & Okezone, 18 tahun di redaksi**.

- **Warna:** emerald green `#0E4D3A` (gelap `#082E23`, terang `#5FA88A`), off-white `#F2EFE8`, hitam `#111111`.
- **Tipografi:** sans tebal raksasa untuk kata "REDAKTUR" (gradasi putih ke transparan, di belakang foto),
  script tulisan tangan untuk "Pelaksana", sans bersih untuk isi, mono untuk label tanggal/edisi.
- **Navigasi minimalis:** About · Portfolio · Experience · Contact, plus tombol "Hubungi Saya ↗".

## Hero: susunan lapisan (dari belakang ke depan)
1. Latar emerald dengan gradasi gelap ke terang ke bawah
2. Teks "REDAKTUR" ukuran ~18vw, ada parallax saat mouse bergerak
3. **Foto cutout pemilik** (foto asli, latar dihapus otomatis)
4. Script "Pelaksana" menimpa huruf besar
5. Meja redaksi: koran berserakan, tumpukan buku (Jurnalistik, Manajemen Redaksi,
   Editing & Kurasi, Produksi Berita), kamera, laptop, mug "Press"
6. **Kartu pers berayun di tali lanyard** (Three.js + fisika sederhana, bergoyang mengikuti kursor):
   isinya nama, "Redaktur Pelaksana", fokus, kontak
7. Copy kiri: "Editorial Leadership & Newsroom Management", deskripsi singkat, 2 tombol

## Struktur halaman
| # | Section | Isi | Motion |
|---|---------|-----|--------|
| 1 | Hero | Lihat susunan lapisan di atas | Masuk berurutan (GSAP timeline), parallax mouse, lanyard berayun |
| 2 | About | Profil + 3 angka nyata: **18 tahun** di redaksi, **3 media nasional**, **6 jabatan**. Foto rapat redaksi gaya polaroid dengan paperclip | Angka berjalan, polaroid miring sedikit saat hover |
| 3 | Kepemimpinan Redaksi | Peran di VOI: agenda pemberitaan, penyuntingan, angle, koordinasi produksi, dengan diagram alur Agenda → Terbit | Garis alur tergambar mengikuti scroll |
| 4 | Portfolio: Karya Jurnalistik | **Editorial showcase**: satu karya besar sebagai "headline", sisanya disusun seperti tata letak halaman koran (kolom, kicker, byline), bukan grid kartu | Gambar reveal dengan mask, hover menampilkan kursor "BACA" |
| 5 | Publikasi | Daftar artikel/liputan per media (VOI, detikNews, Okezone) seperti indeks koran | Baris membesar saat hover |
| 6 | Experience | Timeline karier 2008 → sekarang sebagai 6 "edisi" | Scroll horizontal di-pin |
| 7 | Pengalaman Organisasi | Organisasi profesi/kampus (data dari pemilik) | Fade + stagger |
| 8 | Contact | Telepon, email, form dengan latar emerald | Tombol magnetik |

**Kursor kustom:** titik emerald yang mengikuti mouse. Di atas link membesar dengan label ("BACA", "BUKA", "KIRIM").
**Mobile:** "REDAKTUR" ditumpuk 2 baris, foto di bawah judul, properti meja dikurangi,
lanyard jadi gambar diam, kursor kustom mati.

## Teknologi
- **Vite** + JavaScript biasa (cepat, mudah di-deploy ke Vercel)
- **GSAP** + ScrollTrigger + SplitText untuk animasi scroll dan teks
- **Three.js** untuk adegan 3D di hero
- **Lenis** untuk smooth scroll
- Menghormati `prefers-reduced-motion`. Animasi 3D diganti gambar diam kalau perangkat lemah.

## Gambar & video
- **Foto profil cutout:** foto ASLI pemilik, latar dihapus otomatis (rembg), lalu dirapikan.
  Tidak memakai wajah buatan AI, karena portofolio harus menampilkan orangnya sendiri.
- **Properti meja** (koran, buku, kamera, mug, laptop) dan foto rapat redaksi: generate dengan AI
  (Figma AI), lalu dipotong per objek supaya bisa dianimasikan terpisah. Kartu pers dan judul buku
  dibuat sebagai komponen kode/Figma, bukan gambar, supaya teksnya tajam dan bisa diedit.
- **Foto stok gratis** (Unsplash / Pexels) kalau butuh foto nyata. Lisensinya boleh dipakai.
- **Google / Pinterest hanya untuk moodboard** (referensi gaya di `design/moodboard/`).
  Gambar dari sana umumnya berhak cipta, jadi tidak dipasang di situs.
- **Foto orangnya** wajib dari pemilik portofolio (lihat `public/images/photos/`).
- **Video showreel:** dibuat dari gambar hasil generate + teks animasi, format MP4 dan WebM, di bawah 5 MB.

## Tahapan
1. **Persiapan** ✅ folder project, struktur, isi CV di `src/data/content.js`, build jalan
2. **Moodboard & arah desain**: kumpulkan referensi, pilih palet dan font
3. **Desain Figma**: 1 halaman desktop + 1 versi mobile, komponen, variable warna
   *(catatan: akun Figma masih paket Starter, kuota akses Claude ke Figma terbatas per hari)*
4. **Generate aset**: gambar AI dan video showreel
5. **Coding**: section demi section mengikuti desain, lalu animasi GSAP, Three.js, kursor
6. **Uji**: HP, tablet, desktop, performa (target Lighthouse ≥ 85)
7. **Deploy ke Vercel** (repo GitHub baru)

## Yang masih dibutuhkan dari pemilik
- [ ] Nama lengkap
- [ ] Foto profil setengah badan, latar polos, resolusi tinggi (untuk cutout hero)
- [ ] Foto saat liputan atau di redaksi, kalau ada
- [ ] Pengalaman organisasi (nama organisasi, peran, tahun)
- [ ] Link LinkedIn / Instagram / X
- [ ] 3–6 contoh liputan atau artikel unggulan (judul + link), untuk section "Karya Pilihan"
- [ ] Apakah nomor telepon boleh ditampilkan publik?
