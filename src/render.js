import { profile, stats, workflow, leadStory, clippings, career, publications, organisation, ticker } from './data/content.js';

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
      </a>
    </li>`).join('');

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
  $('[data-edu-org]').textContent = organisation;

  const mail = `mailto:${profile.email}`;
  const email = $('[data-email]'); email.href = mail; email.textContent = profile.email;
  $('[data-email-btn]').href = mail;
  const phone = $('[data-phone]'); phone.href = `tel:${profile.phoneHref}`; phone.textContent = profile.phone;
  $('[data-name]').textContent = profile.name;
  $('[data-socials]').innerHTML = profile.socials.map((s) => `<li><a href="${s.href}">${esc(s.label)}</a></li>`).join('');
}
