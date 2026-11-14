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

export const leadStory = {
  kicker: 'Liputan utama · Nasional',
  title: '[Judul liputan unggulan]',
  summary: 'Ringkasan dua kalimat: apa beritanya, kenapa penting, dan peran redaksi dalam liputan ini.',
  outlet: 'VOI', year: '2025', href: '#',
  image: '/images/generated/doorstop.webp',
};

export const clippings = [
  { kicker: 'Daerah · detikNews · 2019', title: '[Liputan daerah & non-biro]', href: '#' },
  { kicker: 'Liputan khusus · detikNews · 2017', title: '[Liputan khusus / investigasi]', href: '#' },
  { kicker: 'Nasional · detikNews · 2016', title: '[Berita nasional yang disunting]', href: '#' },
  { kicker: 'Lapangan · Okezone · 2010', title: '[Liputan lapangan sebagai reporter]', href: '#' },
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

export const organisation = '[Organisasi profesi / komunitas jurnalis] — peran · tahun';

export const ticker = ['Agenda redaksi', 'Penyuntingan', 'Pengembangan angle', 'Koordinasi liputan', 'Daerah & non-biro', 'Berita nasional', 'Sejak 2008'];
