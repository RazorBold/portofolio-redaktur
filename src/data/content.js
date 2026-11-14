// Semua isi portofolio di satu tempat. Ubah teks di sini, bukan di HTML.
// Tanda [ ... ] = isian sementara yang menunggu data asli dari pemilik.

export const profile = {
  name: 'Ferdinan', // TODO: nama lengkap
  role: 'Redaktur Pelaksana',
  company: 'VOI',
  email: 'ferdinan.okejono@gmail.com',
  phone: '0852 8206 6148',
  phoneHref: '+6285282066148',
  education: { degree: 'Sarjana Ilmu Komunikasi', school: 'Universitas Persada Indonesia Y.A.I (UPI–YAI)' },
  socials: [
    { label: 'LinkedIn', href: '#' }, // TODO
    { label: 'Instagram', href: '#' }, // TODO
    { label: 'X', href: '#' }, // TODO
  ],
};

export const stats = [
  { value: 18, label: 'Tahun di ruang redaksi', icon: 'clock' },
  { value: 3, label: 'Media nasional', icon: 'paper' },
  { value: 6, label: 'Jabatan redaksi', icon: 'pen' },
];

// Alur kerja redaksi (urutan memang berurutan, jadi diberi nomor)
export const workflow = [
  { title: 'Agenda pemberitaan', desc: 'Menyusun prioritas isu harian dan rencana liputan bersama tim redaksi.' },
  { title: 'Penyuntingan', desc: 'Memastikan akurasi, kelengkapan, dan standar editorial di setiap naskah.' },
  { title: 'Pengembangan angle', desc: 'Menajamkan sudut pandang agar berita relevan, kuat, dan berbeda.' },
  { title: 'Koordinasi produksi', desc: 'Mengatur ritme reporter, editor, dan tim produksi hingga berita terbit.' },
];

// Sumber: Top 10 Articles Biro Medan & Makassar (GA, Januari 2020) dan dasbor GA VOI.ID.
// Liputan biro ditulis tim daerah; Ferdinan mengelolanya sebagai Wakil Redaktur Pelaksana Daerah & Non Biro.
// Judul VOI disusun dari URL artikelnya, jadi tanda baca bisa sedikit berbeda dari aslinya. TODO: link detikcom
export const leadStory = {
  kicker: 'Liputan utama · Biro Medan',
  title: 'Peran Istri di Balik Pembunuhan Hakim PN Medan',
  summary: '209.370 pageviews. Sepuluh dari sebelas artikel teratas Biro Medan bulan itu adalah lanjutan kasus ini: kronologi, motif, keterangan Polri, sampai suara anak korban. Liputan biro yang saya kelola.',
  outlet: 'detikcom', year: '8 Januari 2020', href: '#',
  image: '/images/generated/doorstop.webp',
};

export const clippings = [
  { kicker: 'Biro Makassar · detikcom · 15 Jan 2020', title: 'Bisa Terbang! Pesawat Bikinan Montir Tak Lulus SD Seharga Rp 30 Juta', stat: '255.170 pageviews', href: '#' },
  { kicker: 'Biro Makassar · detikcom · 15 Jan 2020', title: 'Analisis Pakar Penerbangan soal Pesawat Montir Tak Tamat SD', stat: '168.770 pageviews · lanjutan dari sudut ahli', href: '#' },
  { kicker: 'VOI · 16 Feb 2023', title: 'DPRD: Bandara Internasional Minangkabau Turun Kelas Jadi Bandara Nasional, Kerugian bagi Sumbar', stat: '6.894 pageviews · 10,6% trafik situs hari itu', href: 'https://voi.id/berita/253605/dprd-bandara-internasional-minangkabau-turun-kelas-jadi-bandara-nasional-kerugian-bagi-sumbar' },
  { kicker: 'VOI · realtime', title: 'Gempa Kuta Selatan Bali, Magnitudo 4,8', stat: 'Teratas di edisi Inggris dan Indonesia sekaligus', href: '#' },
];

// Urut dari yang paling awal → sekarang
export const career = [
  { years: '2008–2012', outlet: 'Okezone.com', title: 'Reporter', desc: 'Peliputan, wawancara, riset, dan produksi berita digital.' },
  { years: '2012–2016', outlet: 'detikNews', title: 'Reporter', desc: 'Liputan lapangan, verifikasi informasi, dan penulisan berita.' },
  { years: '2016–2017', outlet: 'detikNews', title: 'Redaktur Nasional', desc: 'Menyunting, mengembangkan angle, menjaga standar editorial.' },
  { years: '2017–2018', outlet: 'detikNews', title: 'Koordinator Peliputan', desc: 'Koordinasi reporter, monitoring berita, kualitas liputan.' },
  { years: '2019–2020', outlet: 'detikNews', title: 'Wakil Redaktur Pelaksana', desc: 'Daerah & Non Biro: mengelola pemberitaan daerah.' },
  { years: '2020 — kini', outlet: 'VOI', title: 'Redaktur Pelaksana', desc: 'Memimpin alur editorial, agenda, dan produksi berita.', current: true },
];

export const publications = [
  { outlet: 'VOI', period: '2020 — kini', note: 'Redaktur pelaksana', href: '#', image: '/images/generated/newsroom-malam.webp' },
  { outlet: 'detikNews', period: '2012 — 2020', note: '5 peran', href: '#', image: '/images/generated/rapat-redaksi.webp' },
  { outlet: 'Okezone.com', period: '2008 — 2012', note: 'Reporter', href: '#', image: '/images/generated/doorstop.webp' },
];

// Studi kasus 01: laporan internal detikcom (Jan–Mar 2020), diterima sebagai Wakil Redaktur Pelaksana Daerah & Non Biro.
// Peta SDM dari slide "SDM Biro Medan" & "SDM Biro Makassar" (email 24 Maret 2020). Nama orang sengaja tidak dicantumkan.
// Titik peta: { name, at: [bujur, lintang], type, label, count, biro }.
//   type: r = reporter, k = kontributor, x = kosong. label: posisi teks (r/l/t/b). count: jumlah orang bila > 1.
//   biro: kota kantor biro (diberi cincin).
// pv: rata-rata pageviews per hari (ribuan) per bulan, Jan 2019 s.d. 1–18 Jan 2020 (13 titik), dari slide "Average Daily UV & PV".
// UV tidak dipakai karena banyak angkanya tidak terbaca di slide. calls: titik yang diberi label [indeks bulan, keterangan].
export const bureaus = [
  {
    name: 'Biro Medan', area: 'Sumatra', shape: 'sumatra', cities: 11, reporters: 5, contributors: 5,
    places: [
      { name: 'Banda Aceh', at: [95.32, 5.55], type: 'r', label: 'r' },
      { name: 'Medan', at: [98.67, 3.59], type: 'r', label: 'r', count: 2, biro: true },
      { name: 'Pekanbaru', at: [101.45, 0.51], type: 'r', label: 'r' },
      { name: 'Palembang', at: [104.76, -2.98], type: 'r', label: 'r' },
      { name: 'Sibolga', at: [98.78, 1.74], type: 'k', label: 'l' },
      { name: 'Padang', at: [100.35, -0.95], type: 'k', label: 'l' },
      { name: 'Jambi', at: [103.6, -1.6], type: 'k', label: 'l' },
      { name: 'Batam', at: [104.03, 1.13], type: 'k', label: 'r' },
      { name: 'Pangkalpinang', at: [106.11, -2.13], type: 'k', label: 't' },
      { name: 'Bengkulu', at: [102.26, -3.8], type: 'x', label: 'l' },
      { name: 'Bandar Lampung', at: [105.26, -5.43], type: 'x', label: 'r' },
    ],
    pv: [0, 0, 0, 0, 0, 32.78, 19.54, 18.63, 40.15, 68.2, 144.25, 194.59, 351.44],
    calls: [[5, 'Jun 2019'], [12, '1–18 Jan']],
    growth: { uv: 38, pv: 81 },
  },
  {
    name: 'Biro Makassar', area: 'Sulawesi', shape: 'sulawesi', cities: 9, reporters: 3, contributors: 9,
    places: [
      { name: 'Manado', at: [124.84, 1.47], type: 'k', label: 't' },
      { name: 'Palu', at: [119.87, -0.9], type: 'k', label: 'r' },
      { name: 'Polewali Mandar', at: [119.33, -3.41], type: 'k', label: 'l' },
      { name: 'Parepare', at: [119.62, -4.01], type: 'k', label: 'l' },
      // Maros digeser sedikit dari posisi aslinya (119.57, -5.0) supaya tidak menumpuk dengan Makassar
      { name: 'Maros', at: [119.75, -4.62], type: 'k', label: 'l' },
      { name: 'Makassar', at: [119.43, -5.14], type: 'k', label: 'l', count: 2, biro: true },
      { name: 'Bone', at: [120.33, -4.54], type: 'k', label: 'r' },
      { name: 'Kendari', at: [122.51, -3.97], type: 'k', label: 'r' },
      { name: 'Gorontalo', at: [123.06, 0.54], type: 'x', label: 'b' },
    ],
    pv: [2.23, 0.06, 0.05, 0, 0.02, 0.03, 1.68, 14.56, 57.87, 81.21, 76.16, 160.79, 218.34],
    calls: [[7, 'Agu 2019'], [12, '1–18 Jan']],
    growth: { uv: 42, pv: 36 },
  },
];

// Studi kasus 02: tangkapan layar Google Analytics VOI.ID (historis, bukan data real-time)
export const voi = {
  realtime: {
    users: 1121,
    devices: [['Ponsel', 82.8], ['Desktop', 16.1], ['Tablet', 1.1]],
    country: 'Indonesia',
    top: { title: 'Gempa Kuta Selatan Bali, Magnitudo 4,8', note: 'Edisi Inggris 194 pengguna, edisi Indonesia 75' },
  },
  overview: {
    date: '16 Februari 2023', pv: 64902, unique: 57210, read: '2 menit 1 detik',
    // Artikel saja; beranda dan halaman kanal dilewati
    top: [
      ['DPRD: Bandara Internasional Minangkabau Turun Kelas Jadi Bandara Nasional', 6894, 10.62],
      ['Antisipasi Kelangkaan MinyaKita Jelang Lebaran', 1724, 2.66],
      ['Sejarah Bandara Minangkabau yang Kini Dikhawatirkan Turun Kelas', 484, 0.75],
    ],
  },
  // Tanggal tangkapan layar tidak tercantum
  now: { users: 1881, mobile: 95.27, pages: 207, issue: { topic: 'Desa Wadas', articles: 3, of: 19, users: 250 } },
};

// Capaian 03: jumlah berita per bulan di VOI (data dari Ferdinan). 2026 baru sampai Agustus.
export const output = [
  { year: 2023, months: [1347, 1719, 1725, 1382, 1681, 1378, 1439, 1502, 1477, 1554, 1462, 1462] },
  { year: 2024, months: [1758, 1368, 1148, 924, 1265, 1303, 1461, 1468, 907, 1369, 1180, 1176] },
  { year: 2025, months: [1240, 1081, 1208, 696, 1127, 1063, 1271, 1167, 1006, 1208, 1109, 1392] },
  { year: 2026, months: [1133, 1318, 1309, 1138, 964, 913, 1215, 804] },
];


export const ticker = ['Agenda redaksi', 'Penyuntingan', 'Pengembangan angle', 'Koordinasi liputan', 'Daerah & non-biro', 'Berita nasional', 'Sejak 2008'];
