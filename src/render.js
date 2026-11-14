import { profile, stats, workflow, leadStory, clippings, career, publications, ticker, bureaus, voi, output } from './data/content.js';
import { maps } from './data/maps.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const icons = {
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  paper: '<path d="M4 5h13v14H6a2 2 0 0 1-2-2V5z"/><path d="M17 9h3v8a2 2 0 0 1-2 2h-1"/><path d="M7 9h7M7 12h7M7 15h4"/>',
  pen: '<path d="M15.5 4.5l4 4L9 19l-5 1 1-5L15.5 4.5z"/><path d="M13.5 6.5l4 4"/>',
};

export function render() {
  // Ticker (diulang supaya loop mulus)
  const items = ticker.map((t) => `<span>${esc(t)}</span><i aria-hidden="true">✦</i>`).join('');
  $('[data-ticker]').innerHTML = `<div class="ticker__group">${items}</div><div class="ticker__group">${items}</div>`;

  $('[data-stats]').innerHTML = stats.map((s) => `
    <li class="stat">
      <svg viewBox="0 0 24 24" aria-hidden="true">${icons[s.icon]}</svg>
      <strong class="stat__value" data-count="${s.value}">${s.value}</strong>
      <span class="stat__label">${esc(s.label)}</span>
    </li>`).join('');

  $('[data-steps]').innerHTML = workflow.map((w, i) => `
    <li class="step" style="--i:${i}">
      <span class="step__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
      <div><h3 class="step__title">${esc(w.title)}</h3><p class="step__desc">${esc(w.desc)}</p></div>
    </li>`).join('');

  const story = $('[data-story]');
  story.href = leadStory.href;
  story.innerHTML = `
    <img src="${leadStory.image}" alt="" loading="lazy" />
    <span class="story__shade"></span>
    <span class="story__body">
      <span class="story__kicker">${esc(leadStory.kicker)}</span>
      <span class="story__title serif">${esc(leadStory.title)}</span>
      <span class="story__summary">${esc(leadStory.summary)} <em>${esc(leadStory.outlet)}, ${esc(leadStory.year)}</em></span>
    </span>`;

  $('[data-clips]').innerHTML = clippings.map((c, i) => `
    <li class="clip" style="--r:${[2, -2.5, 1.5, -2][i % 4]}deg">
      <a href="${c.href}" data-cursor="Baca">
        <span class="clip__kicker">${esc(c.kicker)}</span>
        <span class="clip__title serif">${esc(c.title)}</span>
        ${c.stat ? `<span class="clip__stat">${esc(c.stat)}</span>` : ''}
      </a>
    </li>`).join('');

  renderCases();
  renderOutput();

  $('[data-timeline]').innerHTML = career.map((c) => `
    <li class="job${c.current ? ' job--now' : ''}">
      <span class="job__years serif">${esc(c.years)}</span>
      <span class="job__dot" aria-hidden="true"></span>
      <strong class="job__outlet">${esc(c.outlet)}</strong>
      <span class="job__title">${esc(c.title)}</span>
      <span class="job__desc">${esc(c.desc)}</span>
    </li>`).join('');

  $('[data-pubs]').innerHTML = publications.map((p) => `
    <li class="pub">
      <a href="${p.href}" data-preview="${p.image}" data-cursor="Arsip">
        <span class="pub__name">${esc(p.outlet)}</span>
        <span class="pub__meta">${esc(p.period)}<br />${esc(p.note)} <span aria-hidden="true">↗</span></span>
      </a>
    </li>`).join('');

  $('[data-edu-degree]').textContent = profile.education.degree;
  $('[data-edu-school]').textContent = profile.education.school;

  const mail = `mailto:${profile.email}`;
  const email = $('[data-email]'); email.href = mail; email.textContent = profile.email;
  $('[data-email-btn]').href = mail;
  const phone = $('[data-phone]'); phone.href = `tel:${profile.phoneHref}`; phone.textContent = profile.phone;
  $('[data-name]').textContent = profile.name;
  $('[data-socials]').innerHTML = profile.socials.map((s) => `<li><a href="${s.href}">${esc(s.label)}</a></li>`).join('');
}

// ---------- Studi kasus: data redaksi ----------
const num = (v, dec = 0) => v.toLocaleString('id-ID', { minimumFractionDigits: dec, maximumFractionDigits: dec });
const count = (v, dec = 0) => `<span data-num="${v}"${dec ? ` data-dec="${dec}"` : ''}>${num(v, dec)}</span>`;
const icon = (d) => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const ico = {
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.5a5 5 0 0 1 5.5 5"/>',
  phone: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15h6M9 18h4"/>',
  eye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
};

// Proyeksi sederhana bujur/lintang ke koordinat SVG
function projector({ box: [w0, e0, n0, s0] }, W, H) {
  const k = Math.min(W / (e0 - w0), H / (n0 - s0));
  const ox = (W - (e0 - w0) * k) / 2, oy = (H - (n0 - s0) * k) / 2;
  return (lon, lat) => [+((lon - w0) * k + ox).toFixed(1), +((n0 - lat) * k + oy).toFixed(1)];
}

const LABEL = { r: [11, 4, 'start'], l: [-11, 4, 'end'], t: [0, -11, 'middle'], b: [0, 19, 'middle'] };

function mapPanel(b) {
  const W = 400, H = 300, shape = maps[b.shape], p = projector(shape, W, H);
  const land = shape.land.map((ring) => `<path class="map__land" d="M${ring.map(([lo, la]) => p(lo, la).join(' ')).join('L')}Z"/>`).join('');
  const places = b.places.map(({ name, at: [lo, la], type, label, count, biro }) => {
    const [x, y] = p(lo, la), [dx, dy, anchor] = LABEL[label];
    const push = biro ? 4 : 0; // label bergeser keluar dari cincin kantor biro
    const mark = (biro ? `<circle class="place__ring" r="${type !== 'x' ? 12 : 9}"/>` : '') + (type !== 'x'
      ? '<circle class="place__dot" r="8"/><text class="place__d" y="3.6">d</text>'
      : '<circle class="place__dot" r="4.5"/>');
    const text = `${esc(name)}${count ? ` <tspan class="place__count">×${count}</tspan>` : ''}`;
    return `<g class="place place--${type}${biro ? ' place--biro' : ''}" transform="translate(${x} ${y})"><g class="place__mark">${mark}</g><text class="place__name" x="${dx + Math.sign(dx) * push}" y="${dy + Math.sign(dy) * push}" text-anchor="${anchor}">${text}</text></g>`;
  }).join('');
  const list = (t) => b.places.filter((q) => q.type === t).map((q) => q.name).join(', ');
  return `
    <section class="panel map" aria-label="SDM ${esc(b.name)}">
      <div class="panel__top"><h5 class="panel__tab">SDM ${esc(b.name)}</h5>
      <ul class="map__legend">
        <li><i class="lg lg--r">d</i>Kota liputan (reporter/kontributor)</li>
        <li><i class="lg lg--x"></i>Kosong</li>
        <li><i class="lg lg--biro"></i>Kantor biro</li>
      </ul></div>
      <svg class="map__svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Peta ${esc(b.area)}. ${list('r') ? `Reporter: ${esc(list('r'))}. ` : ''}Kontributor: ${esc(list('k'))}. Kosong: ${esc(list('x'))}.">${land}${places}</svg>
      <div class="map__stats">
        <p><strong>${esc(b.name)}</strong>(${esc(b.area)})</p>
        <p><b>${b.cities}</b> kota</p><p><b>${b.reporters}</b> reporter</p><p><b>${b.contributors}</b> kontributor</p>
      </div>
    </section>`;
}

// Label sumbu X: indeks bulan sejak Jan 2019
const MONTHS = [[0, 'Jan', '2019'], [2, 'Mar'], [4, 'Mei'], [6, 'Jul'], [8, 'Sep'], [10, 'Nov'], [12, 'Jan', '2020']];

function chartSvg(b) {
  const W = 300, H = 230, L = 40, R = 286, T = 44, B = 180;
  const X = (m) => +(L + (m / 12) * (R - L)).toFixed(1), Y = (v) => +(B - (v / 400) * (B - T)).toFixed(1);
  const grid = [0, 100, 200, 300, 400].map((v) => `<line class="chart__grid" x1="${L}" x2="${R}" y1="${Y(v)}" y2="${Y(v)}"/><text class="chart__y" x="${L - 6}" y="${Y(v) + 4}">${v ? `${v}K` : 0}</text>`).join('');
  const xs = MONTHS.map(([m, mo, yr]) => `<text class="chart__x" x="${X(m)}" y="${B + 16}">${mo}</text>${yr ? `<text class="chart__x chart__x--yr" x="${X(m)}" y="${B + 28}">${yr}</text>` : ''}`).join('');
  const line = `<path class="chart__line" d="M${b.pv.map((v, m) => `${X(m)} ${Y(v)}`).join('L')}"/>`;
  const dots = b.pv.map((v, m) => `<circle class="chart__pt" cx="${X(m)}" cy="${Y(v)}" r="2.8"><title>${num(v, 2)}K PV</title></circle>`).join('');
  const calls = b.calls.map(([m, sub]) => {
    const x = X(m), y = Y(b.pv[m]), w = 74, bx = Math.min(R + 10 - w, Math.max(L, x - w / 2)), by = y - 46;
    return `<g class="chart__call"><line x1="${x}" x2="${x}" y1="${by + 30}" y2="${y - 5}"/><rect x="${bx}" y="${by}" width="${w}" height="30" rx="3"/><text x="${bx + w / 2}" y="${by + 13}">${num(b.pv[m], 2)}K PV</text><text class="chart__call-sub" x="${bx + w / 2}" y="${by + 25}">(${sub})</text></g>`;
  }).join('');
  const summary = b.calls.map(([m, sub]) => `${num(b.pv[m], 2)} ribu PV per hari (${sub})`).join(' menjadi ');
  return `<svg class="chart__svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Rata-rata pageviews harian ${esc(b.name)}: ${summary}">${grid}${xs}${line}${dots}${calls}</svg>`;
}

function renderCases() {
  $('[data-maps]').innerHTML = bureaus.map(mapPanel).join('');
  $('[data-charts]').innerHTML = bureaus.map((b) => `<figure class="chart"><figcaption>${esc(b.name)}</figcaption>${chartSvg(b)}</figure>`).join('');
  $('[data-growth]').innerHTML = '<p class="growth__label">Kenaikan Januari dibanding Desember</p>' + bureaus.map((b) => `
    <div class="growth__set">
      <p class="growth__name">${esc(b.name.replace('Biro ', ''))}</p>
      <span class="badge"><small>UV</small><span>+${count(b.growth.uv)}%</span></span>
      <span class="badge"><small>PV</small><span>+${count(b.growth.pv)}%</span></span>
    </div>`).join('');

  const { realtime: rt, overview: ov, now } = voi;
  $('[data-voi]').innerHTML = `
    <section class="panel screen" aria-label="Realtime GA4">
      <div class="panel__top"><h5 class="panel__tab">Realtime GA4</h5></div>
      <div class="screen__body">
        <p class="kpi kpi--xl">${icon(ico.users)}<strong>${count(rt.users)}</strong><span>pengguna dalam<br />30 menit terakhir</span></p>
        <div class="devices">
          <p class="devices__bar" aria-hidden="true">${rt.devices.map(([, v], i) => `<i class="devices__seg devices__seg--${i}" style="--w:${v}%"></i>`).join('')}</p>
          <ul class="devices__list">${rt.devices.map(([k, v], i) => `<li><i class="devices__key devices__key--${i}"></i>${esc(k)} <strong>${count(v, 1)}%</strong></li>`).join('')}</ul>
        </div>
        <p class="kpi">${icon(ico.pin)}<strong>${esc(rt.country)}</strong><span>pembaca terpusat, sedikit dari Malaysia dan Jepang</span></p>
        <p class="callout">${icon(ico.doc)}<span>Berita teratas saat itu<strong>${esc(rt.top.title)}</strong><em>${esc(rt.top.note)}</em></span></p>
      </div>
    </section>
    <section class="panel screen" aria-label="Overview ${esc(ov.date)}">
      <div class="panel__top"><h5 class="panel__tab">Overview · ${esc(ov.date)}</h5></div>
      <div class="screen__body">
        <p class="kpi kpi--row">${icon(ico.eye)}<strong>${count(ov.pv)}</strong><span>pageviews (PV)</span></p>
        <p class="kpi kpi--row">${icon(ico.users)}<strong>${count(ov.unique)}</strong><span>pageviews unik</span></p>
        <p class="kpi kpi--row">${icon(ico.clock)}<strong>${esc(ov.read)}</strong><span>rata-rata waktu baca</span></p>
        <div class="toplist">
          <p class="toplist__head"><span>Artikel teratas hari itu</span><span>PV</span></p>
          <ol>${ov.top.map(([t, pv, share], i) => `<li><span>${i + 1}.</span><span>${esc(t)}</span><strong>${count(pv)}<small>${num(share, 2)}%</small></strong></li>`).join('')}</ol>
        </div>
      </div>
    </section>
    <section class="panel screen" aria-label="Realtime right now">
      <div class="panel__top"><h5 class="panel__tab">Realtime · Right now</h5></div>
      <div class="screen__body">
        <div class="screen__trio">
          <p class="kpi">${icon(ico.users)}<strong>${count(now.users)}</strong><span>pengguna aktif saat ini</span></p>
          <p class="kpi">${icon(ico.phone)}<strong>${count(now.mobile, 2)}%</strong><span>melalui ponsel</span></p>
          <p class="kpi">${icon(ico.layers)}<strong>${count(now.pages)}</strong><span>halaman tersebar</span></p>
        </div>
        <div class="issue">
          <p class="issue__head">Isu yang dikawal</p>
          <p class="issue__big"><strong>${count(now.issue.articles)}</strong><span>dari ${now.issue.of} artikel teratas saat itu membahas <b>${esc(now.issue.topic)}</b></span></p>
          <p class="issue__dots" aria-hidden="true">${Array.from({ length: now.issue.of }, (_, i) => `<i class="${[3, 7, 16].includes(i) ? 'is-on' : ''}"></i>`).join('')}</p>
          <p class="issue__note">${count(now.issue.users)} pengguna aktif membaca ketiganya bersamaan.</p>
        </div>
      </div>
    </section>`;
}

// ---------- Capaian 03: produksi berita per bulan ----------
const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const sum = (a) => a.reduce((x, y) => x + y, 0);

// Grafik batang satu tahun: batang per bulan, garis tren, garis rata-rata, penanda puncak.
// Skala Y sama untuk semua tahun supaya tinggi batang bisa dibandingkan saat berganti tahun.
function barsSvg(months, yMax, narrow) {
  const W = narrow ? 380 : 800, H = narrow ? 330 : 360;
  const L = narrow ? 34 : 52, R = narrow ? 4 : 16, T = narrow ? 70 : 64, B = H - (narrow ? 28 : 34);
  const slot = (W - L - R) / 12, bw = slot * (narrow ? 0.66 : 0.58);
  const X = (m) => L + slot * m + slot / 2, Y = (v) => B - (v / yMax) * (B - T);
  const r1 = (n) => +n.toFixed(1);
  const step = narrow ? 600 : 300;
  const peak = Math.max(...months), pi = months.indexOf(peak), avg = sum(months) / months.length;

  const grid = Array.from({ length: yMax / step + 1 }, (_, i) => i * step).map((v) =>
    `<line class="bars__grid" x1="${L}" x2="${W - R}" y1="${r1(Y(v))}" y2="${r1(Y(v))}"/><text class="bars__y" x="${L - 8}" y="${r1(Y(v) + 4)}">${num(v)}</text>`).join('');
  const xs = BULAN.map((b, m) => `<text class="bars__x${months[m] === undefined ? ' is-empty' : ''}" x="${r1(X(m))}" y="${B + 18}">${b.slice(0, 3)}</text>`).join('');
  const bars = months.map((v, m) => {
    const x = r1(X(m) - bw / 2), y = r1(Y(v));
    return `<g class="bar${m === pi ? ' bar--peak' : ''}"><rect x="${x}" y="${y}" width="${r1(bw)}" height="${r1(B - y)}" rx="3"/><title>${BULAN[m]}: ${num(v)} berita</title></g>`;
  }).join('');
  const trend = `<path class="bars__trend" d="M${months.map((v, m) => `${r1(X(m))} ${r1(Y(v))}`).join('L')}"/>`;
  const dots = months.map((v, m) => `<circle class="bars__dot" cx="${r1(X(m))}" cy="${r1(Y(v))}" r="${narrow ? 3 : 4}"/>`).join('');
  // Di layar sempit hanya puncak, terendah, dan bulan terakhir yang diberi angka agar tidak bertabrakan
  const lo = months.indexOf(Math.min(...months)), keep = new Set([pi, lo, months.length - 1]);
  const vals = months.map((v, m) => narrow && !keep.has(m) ? '' : `<text class="bar__val${m === pi ? ' bar__val--peak' : ''}" x="${r1(X(m))}" y="${r1(Y(v) - (narrow ? 8 : 11))}">${num(v)}</text>`).join('');
  const avgY = r1(Y(avg));
  const avgLine = `<line class="bars__avg" x1="${L}" x2="${W - R}" y1="${avgY}" y2="${avgY}"/>`;
  const px = r1(X(pi)), py = r1(Y(peak) - (narrow ? 28 : 30)), pw = narrow ? 78 : 104;
  const bx = Math.min(W - R - pw, Math.max(L, px - pw / 2));
  const peakTag = `<g class="bars__peak"><rect x="${r1(bx)}" y="${py - 22}" width="${pw}" height="18" rx="3"/><text x="${r1(bx + pw / 2)}" y="${py - 9.5}">Puncak tertinggi</text><path d="M${px} ${py - 3}V${py + 4}M${px - 3} ${py + 1}L${px} ${py + 4}L${px + 3} ${py + 1}"/></g>`;

  const label = `Jumlah berita per bulan: ${months.map((v, m) => `${BULAN[m]} ${num(v)}`).join(', ')}. Puncak ${BULAN[pi]} ${num(peak)}, rata-rata ${num(Math.round(avg))}.`;
  return `<svg class="bars__svg${narrow ? ' is-narrow' : ''}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">${grid}${avgLine}${bars}${trend}${dots}${vals}${xs}${peakTag}</svg>`;
}

function renderOutput() {
  const root = $('[data-output]');
  const all = output.flatMap((y) => y.months);
  const total = sum(all), avg = Math.round(total / all.length);
  const yMax = Math.ceil(Math.max(...all) / 300) * 300;
  const tMax = Math.max(...output.map((y) => sum(y.months)));
  const last = output[output.length - 1];
  const narrowMq = window.matchMedia('(max-width: 820px)');
  let current = output.length - 1;

  const years = output.map((y, i) => {
    const t = sum(y.months), partial = y.months.length < 12;
    return `
      <li><button class="years__row" type="button" data-year-index="${i}" aria-pressed="false" data-cursor="Lihat">
        <span class="years__year">${y.year}${partial ? `<small>Jan–${BULAN[y.months.length - 1].slice(0, 3)}</small>` : ''}</span>
        <span class="years__track"><i class="years__bar" style="--w:${(t / tMax) * 100}%"></i></span>
        <span class="years__total"><strong>${count(t)}</strong><small>±${num(Math.round(t / y.months.length))}/bulan</small></span>
      </button></li>`;
  }).join('');

  root.innerHTML = `
    <section class="panel years" aria-label="Berita per tahun">
      <div class="panel__top"><h5 class="panel__tab">Per tahun</h5></div>
      <div class="years__body">
        <p class="years__hero"><strong>${count(total)}</strong><span>berita dalam ${all.length} bulan<br />Januari ${output[0].year} sampai ${BULAN[last.months.length - 1]} ${last.year}</span></p>
        <p class="years__avg">Rata-rata <strong>${num(avg)}</strong> berita per bulan, sekitar ${num(Math.round(avg / 30))} per hari.</p>
        <p class="years__hint">Pilih tahun untuk melihat grafiknya</p>
        <ul class="years__list">${years}</ul>
      </div>
    </section>
    <section class="panel bars" aria-live="polite">
      <div class="panel__top"><h5 class="panel__tab">Per bulan</h5></div>
      <div class="bars__head">
        <p class="bars__title" data-bars-title></p>
        <p class="bars__meta" data-bars-meta></p>
      </div>
      <div class="bars__chart" data-bars></div>
      <ul class="bars__legend">
        <li><i class="lg-bar"></i>Berita per bulan</li>
        <li><i class="lg-bar lg-bar--peak"></i>Puncak tertinggi</li>
        <li><i class="lg-trend"></i>Garis tren</li>
        <li><i class="lg-avg"></i><span data-bars-avg></span></li>
      </ul>
    </section>`;

  const draw = (i, animate) => {
    const y = output[i], t = sum(y.months), a = Math.round(t / y.months.length);
    const period = `Januari–${BULAN[y.months.length - 1]}`;
    root.querySelector('[data-bars-title]').textContent = `Publikasi berita per bulan, ${y.year}`;
    root.querySelector('[data-bars-meta]').innerHTML = `<span>Periode ${period}</span><span>Total ${num(t)} berita</span><span>Rata-rata ${num(a)} berita/bulan</span>`;
    root.querySelector('[data-bars-avg]').textContent = `Rata-rata (${num(a)} berita)`;
    root.querySelector('[data-bars]').innerHTML = barsSvg(y.months, yMax, narrowMq.matches);
    root.querySelectorAll('[data-year-index]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.yearIndex === i)));
    if (animate) root.dispatchEvent(new CustomEvent('output:draw'));
  };

  root.addEventListener('click', (e) => {
    const b = e.target.closest('[data-year-index]');
    if (!b || +b.dataset.yearIndex === current) return;
    current = +b.dataset.yearIndex;
    draw(current, true);
  });
  narrowMq.addEventListener('change', () => draw(current, false));
  draw(current, false);
}
