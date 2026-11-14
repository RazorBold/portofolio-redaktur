// Semua isi portofolio di satu tempat. Ubah teks di sini, bukan di HTML.
// Tanda [ ... ] = isian sementara yang menunggu data asli dari pemilik.
// tr('Indonesia', 'English'): teks dua bahasa. Judul berita versi Inggris adalah terjemahan, bukan judul terbit.
import { tr } from '../i18n.js';

export const profile = {
  name: 'Ferdinan', // TODO: nama lengkap
  role: tr('Redaktur Pelaksana', 'Managing Editor'),
  company: 'VOI',
  email: 'ferdinan.okejono@gmail.com',
  phone: '0852 8206 6148',
  phoneHref: '+6285282066148',
  education: { degree: tr('Sarjana Ilmu Komunikasi', 'Bachelor of Communication Science'), school: 'Universitas Persada Indonesia Y.A.I (UPI–YAI)' },
  socials: [
    { label: 'X', href: '#' }, // TODO
  ],
};

export const stats = [
  { value: 18, label: tr('Tahun di ruang redaksi', 'Years in the newsroom'), icon: 'clock' },
  { value: 3, label: tr('Media nasional', 'National media outlets'), icon: 'paper' },
  { value: 6, label: tr('Jabatan redaksi', 'Editorial positions'), icon: 'pen' },
];

// Alur kerja redaksi (urutan memang berurutan, jadi diberi nomor)
export const workflow = [
  { title: tr('Agenda pemberitaan', 'News agenda'), desc: tr('Menyusun prioritas isu harian dan rencana liputan bersama tim redaksi.', 'Setting daily story priorities and coverage plans with the editorial team.') },
  { title: tr('Penyuntingan', 'Editing'), desc: tr('Memastikan akurasi, kelengkapan, dan standar editorial di setiap naskah.', 'Checking accuracy, completeness, and editorial standards in every story.') },
  { title: tr('Penajaman sudut berita', 'Angle development'), desc: tr('Mencari sudut pandang yang membuat berita relevan, kuat, dan berbeda dari media lain.', 'Sharpening the angle so each story is relevant, strong, and distinct.') },
  { title: tr('Koordinasi produksi', 'Production coordination'), desc: tr('Mengatur ritme kerja reporter, editor, dan tim produksi sampai berita terbit.', 'Setting the pace for reporters, editors, and production until the story goes live.') },
];

// Sumber: Top 10 Articles Biro Medan & Makassar (GA, Januari 2020) dan dasbor GA VOI.ID.
// Liputan biro ditulis tim daerah; Ferdinan mengelolanya sebagai Wakil Redaktur Pelaksana Daerah & Non Biro.
// Judul VOI disusun dari URL artikelnya, jadi tanda baca bisa sedikit berbeda dari aslinya. TODO: link detikcom
export const leadStory = {
  kicker: tr('Liputan utama · Biro Medan', 'Lead story · Medan Bureau'),
  title: tr('Peran Istri di Balik Pembunuhan Hakim PN Medan', "The Wife's Role Behind the Murder of a Medan District Court Judge"),
  summary: tr('Dibaca 209.370 kali. Sepuluh dari sebelas artikel terpopuler Biro Medan bulan itu adalah liputan lanjutan kasus ini, mulai dari kronologi, motif, keterangan polisi, hingga suara anak korban. Liputan ini dikerjakan biro yang saya pimpin.', "209,370 pageviews. Ten of the Medan Bureau's top eleven articles that month were follow-ups to this case: the timeline, the motive, police statements, even the victim's child speaking out. Coverage from the bureau I managed."),
  outlet: 'detikcom', year: tr('8 Januari 2020', '8 January 2020'), href: '#',
  image: '/images/generated/doorstop.webp',
};

export const clippings = [
  { kicker: tr('Biro Makassar · detikcom · 15 Jan 2020', 'Makassar Bureau · detikcom · 15 Jan 2020'), title: tr('Bisa Terbang! Pesawat Bikinan Montir Tak Lulus SD Seharga Rp 30 Juta', 'It Flies! A Rp 30 Million Plane Built by a Mechanic Who Never Finished Primary School'), stat: tr('Dibaca 255.170 kali', '255,170 pageviews'), href: '#' },
  { kicker: tr('Biro Makassar · detikcom · 15 Jan 2020', 'Makassar Bureau · detikcom · 15 Jan 2020'), title: tr('Analisis Pakar Penerbangan soal Pesawat Montir Tak Tamat SD', 'An Aviation Expert on the Plane Built by a Primary-School Dropout Mechanic'), stat: tr('Dibaca 168.770 kali · liputan lanjutan dari sudut pandang pakar', '168,770 pageviews · follow-up from an expert angle'), href: '#' },
  { kicker: 'VOI · 16 Feb 2023', title: tr('DPRD: Bandara Internasional Minangkabau Turun Kelas Jadi Bandara Nasional, Kerugian bagi Sumbar', 'Regional Council: Minangkabau International Airport Downgraded to a National Airport, a Loss for West Sumatra'), stat: tr('Dibaca 6.894 kali · 10,6% dari total trafik situs hari itu', "6,894 pageviews · 10.6% of the site's traffic that day"), href: 'https://voi.id/berita/253605/dprd-bandara-internasional-minangkabau-turun-kelas-jadi-bandara-nasional-kerugian-bagi-sumbar' },
  { kicker: tr('VOI · real-time', 'VOI · realtime'), title: tr('Gempa Kuta Selatan Bali, Magnitudo 4,8', 'Magnitude 4.8 Earthquake Hits South Kuta, Bali'), stat: tr('Berita terpopuler di edisi bahasa Inggris dan Indonesia pada saat yang sama', 'Top story in the English and Indonesian editions at once'), href: '#' },
];

// Urut dari yang paling awal → sekarang
export const career = [
  { years: '2008–2012', outlet: 'Okezone.com', title: 'Reporter', desc: tr('Peliputan, wawancara, riset, dan produksi berita digital.', 'Reporting, interviews, research, and digital news production.') },
  { years: '2012–2016', outlet: 'detikNews', title: 'Reporter', desc: tr('Liputan lapangan, verifikasi informasi, dan penulisan berita.', 'Field reporting, fact verification, and news writing.') },
  { years: '2016–2017', outlet: 'detikNews', title: tr('Redaktur Nasional', 'National Desk Editor'), desc: tr('Menyunting naskah, menajamkan sudut berita, dan menjaga standar editorial.', 'Editing copy, developing angles, upholding editorial standards.') },
  { years: '2017–2018', outlet: 'detikNews', title: tr('Koordinator Peliputan', 'Coverage Coordinator'), desc: tr('Mengoordinasikan reporter, memantau arus berita, dan menjaga kualitas liputan.', 'Coordinating reporters, monitoring the news, keeping coverage quality up.') },
  { years: '2019–2020', outlet: 'detikNews', title: tr('Wakil Redaktur Pelaksana', 'Deputy Managing Editor'), desc: tr('Daerah & Non Biro: mengelola pemberitaan dari biro dan kontributor daerah.', 'Regional & Non-Bureau: managing regional coverage.') },
  { years: tr('2020 — kini', '2020 — present'), outlet: 'VOI', title: tr('Redaktur Pelaksana', 'Managing Editor'), desc: tr('Memimpin alur editorial, agenda pemberitaan, dan produksi berita.', 'Leading the editorial workflow, news agenda, and production.'), current: true },
];

export const publications = [
  { outlet: 'VOI', period: tr('2020 — kini', '2020 — present'), note: tr('Redaktur pelaksana', 'Managing editor'), href: '#', image: '/images/generated/newsroom-malam.webp' },
  { outlet: 'detikNews', period: '2012 — 2020', note: tr('5 jabatan', '5 roles'), href: '#', image: '/images/generated/rapat-redaksi.webp' },
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
    name: tr('Biro Medan', 'Medan Bureau'), city: 'Medan', area: 'Sumatra', shape: 'sumatra', cities: 11, reporters: 5, contributors: 5,
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
    name: tr('Biro Makassar', 'Makassar Bureau'), city: 'Makassar', area: 'Sulawesi', shape: 'sulawesi', cities: 9, reporters: 3, contributors: 9,
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
    calls: [[7, tr('Agu 2019', 'Aug 2019')], [12, '1–18 Jan']],
    growth: { uv: 42, pv: 36 },
  },
];

// Studi kasus 02: tangkapan layar Google Analytics VOI.ID (historis, bukan data real-time)
export const voi = {
  realtime: {
    users: 1121,
    devices: [[tr('Ponsel', 'Mobile'), 82.8], ['Desktop', 16.1], ['Tablet', 1.1]],
    country: 'Indonesia',
    top: { title: tr('Gempa Kuta Selatan Bali, Magnitudo 4,8', 'Magnitude 4.8 Earthquake Hits South Kuta, Bali'), note: tr('Dibaca 194 pengguna di edisi Inggris dan 75 pengguna di edisi Indonesia', 'English edition 194 users, Indonesian edition 75') },
  },
  overview: {
    date: tr('16 Februari 2023', '16 February 2023'), pv: 64902, unique: 57210, read: tr('2 menit 1 detik', '2 min 1 sec'),
    // Artikel saja; beranda dan halaman kanal dilewati
    top: [
      [tr('DPRD: Bandara Internasional Minangkabau Turun Kelas Jadi Bandara Nasional', 'Regional Council: Minangkabau International Airport Downgraded to a National Airport'), 6894, 10.62],
      [tr('Antisipasi Kelangkaan MinyaKita Jelang Lebaran', 'Bracing for a MinyaKita Cooking Oil Shortage Ahead of Eid'), 1724, 2.66],
      [tr('Sejarah Bandara Minangkabau yang Kini Dikhawatirkan Turun Kelas', 'The History of Minangkabau Airport, Now at Risk of a Downgrade'), 484, 0.75],
    ],
  },
  // Tanggal tangkapan layar tidak tercantum
  now: { users: 1881, mobile: 95.27, pages: 207, issue: { topic: tr('Desa Wadas', 'Wadas village'), articles: 3, of: 19, users: 250 } },
};

// Capaian 03: jumlah berita per bulan di VOI (data dari Ferdinan). 2026 baru sampai Agustus.
export const output = [
  { year: 2023, months: [1347, 1719, 1725, 1382, 1681, 1378, 1439, 1502, 1477, 1554, 1462, 1462] },
  { year: 2024, months: [1758, 1368, 1148, 924, 1265, 1303, 1461, 1468, 907, 1369, 1180, 1176] },
  { year: 2025, months: [1240, 1081, 1208, 696, 1127, 1063, 1271, 1167, 1006, 1208, 1109, 1392] },
  { year: 2026, months: [1133, 1318, 1309, 1138, 964, 913, 1215, 804] },
];


export const ticker = tr(
  ['Agenda redaksi', 'Penyuntingan', 'Penajaman sudut berita', 'Koordinasi liputan', 'Daerah & non-biro', 'Berita nasional', 'Sejak 2008'],
  ['News agenda', 'Editing', 'Angle development', 'Coverage coordination', 'Regional & non-bureau', 'National news', 'Since 2008'],
);
