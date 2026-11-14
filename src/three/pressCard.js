import * as THREE from 'three';
import { gsap } from 'gsap';
import { profile } from '../data/content.js';

// Kartu pers 3D yang tergantung di tali lanyard.
// Berayun seperti bandul (pegas teredam), bereaksi pada kecepatan kursor, dan berbalik saat diklik.
const W = 2.5, H = 3.4, STRAP = 3.1, PX = 400; // PX = piksel tekstur per unit

const COLORS = { paper: '#f6f4ef', ink: '#121212', emerald: '#0e4d3a', deep: '#082e23', sage: '#5fa88a', line: '#dcd8d0' };

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

function loadImage(src) {
  return new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
}

async function drawFront(photo) {
  const c = document.createElement('canvas'); c.width = W * PX; c.height = H * PX;
  const x = c.getContext('2d');
  roundRect(x, 0, 0, c.width, c.height, 60); x.fillStyle = COLORS.paper; x.fill();
  x.save(); x.clip();
  // pita bawah
  x.fillStyle = COLORS.emerald; x.fillRect(0, c.height - 150, c.width, 150);
  x.restore();
  x.lineWidth = 20; x.strokeStyle = '#ffffff'; roundRect(x, 10, 10, c.width - 20, c.height - 20, 52); x.stroke();
  // slot tali
  x.fillStyle = '#d1cec8'; roundRect(x, c.width / 2 - 110, 54, 220, 36, 18); x.fill();
  // judul
  x.fillStyle = COLORS.ink; x.font = '900 92px Inter'; x.textBaseline = 'alphabetic';
  x.fillText('REDAKTUR', 86, 220); x.fillText('PELAKSANA', 86, 312);
  x.font = '700 44px Inter'; x.textAlign = 'right'; x.fillText('2026', c.width - 86, 312); x.textAlign = 'left';
  // foto
  const fx = c.width / 2 - 190, fy = 360, fw = 380, fh = 410;
  x.save(); roundRect(x, fx, fy, fw, fh, 30); x.fillStyle = COLORS.emerald; x.fill(); x.clip();
  if (photo) { const s = (fw * 1.55) / photo.width; x.drawImage(photo, fx + fw / 2 - (photo.width * s) / 2, fy + 18, photo.width * s, photo.height * s); }
  x.restore();
  // baris data
  const rows = [['NAMA', profile.name], ['MEDIA', profile.company], ['FOKUS', 'Manajemen Redaksi'], ['KONTAK', profile.email]];
  rows.forEach(([k, v], i) => {
    const y = 860 + i * 78;
    x.fillStyle = COLORS.line; x.fillRect(86, y + 26, c.width - 172, 3);
    x.fillStyle = COLORS.ink; x.font = '800 34px Inter'; x.fillText(k, 86, y);
    x.font = `400 ${v.length > 22 ? 28 : 34}px Inter`; x.textAlign = 'right'; x.fillText(v, c.width - 86, y); x.textAlign = 'left';
  });
  x.fillStyle = COLORS.paper; x.font = '800 46px Inter'; x.textAlign = 'center';
  x.fillText(`PRESS · ${profile.company}`, c.width / 2, c.height - 58);
  return c;
}

function drawBack() {
  const c = document.createElement('canvas'); c.width = W * PX; c.height = H * PX;
  const x = c.getContext('2d');
  roundRect(x, 0, 0, c.width, c.height, 60); x.fillStyle = COLORS.emerald; x.fill();
  x.lineWidth = 20; x.strokeStyle = '#ffffff'; roundRect(x, 10, 10, c.width - 20, c.height - 20, 52); x.stroke();
  x.fillStyle = '#0a3d2d'; roundRect(x, c.width / 2 - 110, 54, 220, 36, 18); x.fill();
  const g = x.createLinearGradient(0, 380, 0, 640); g.addColorStop(0, 'rgba(242,239,232,.95)'); g.addColorStop(1, 'rgba(242,239,232,.15)');
  x.fillStyle = g; x.font = '900 230px Inter'; x.textAlign = 'center'; x.fillText('PRESS', c.width / 2, 600);
  x.fillStyle = COLORS.sage; x.font = '400 170px "Great Vibes"'; x.save(); x.translate(c.width / 2, 790); x.rotate(-0.12); x.fillText('Redaksi', 0, 0); x.restore();
  x.fillStyle = 'rgba(242,239,232,.8)'; x.font = '500 34px Inter';
  x.fillText('Kartu identitas', c.width / 2, 1060); x.fillText(`${profile.role} · ${profile.company}`, c.width / 2, 1110);
  return c;
}

export async function initPressCard(container, { reduced }) {
  if (!container || container.offsetWidth === 0) return;
  const canvas = container.querySelector('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 14);
  scene.add(new THREE.AmbientLight(0xffffff, 1.7));
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(-4, 5, 7); scene.add(key);
  const rim = new THREE.DirectionalLight(0x5fa88a, 0.8); rim.position.set(5, -2, -4); scene.add(rim);

  // Hierarki: pivot (titik gantung di atas) → tali → klip → kartu
  const pivot = new THREE.Group(); scene.add(pivot);
  const strapMat = new THREE.MeshStandardMaterial({ color: 0x0a3d2d, roughness: 0.85, side: THREE.DoubleSide });
  const strap = new THREE.Mesh(new THREE.PlaneGeometry(0.34, STRAP + 8), strapMat);
  strap.position.y = -(STRAP + 8) / 2 + 8; pivot.add(strap);
  const metal = new THREE.MeshStandardMaterial({ color: 0xc4c7ca, metalness: 0.85, roughness: 0.28 });
  const clip = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.42, 0.1), metal); clip.position.y = -STRAP - 0.05; pivot.add(clip);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.035, 12, 32), metal); ring.position.y = -STRAP - 0.32; pivot.add(ring);

  const card = new THREE.Group(); card.position.y = -STRAP - 0.42; pivot.add(card);
  await document.fonts.ready;
  await Promise.all(['900 92px Inter', '800 34px Inter', '400 170px "Great Vibes"'].map((f) => document.fonts.load(f)));
  const photo = await loadImage('/images/photos/profil-cutout.webp');
  const tex = (cv) => { const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t; };
  const geo = new THREE.PlaneGeometry(W, H);
  const front = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex(await drawFront(photo)), alphaTest: 0.5, roughness: 0.55 }));
  const back = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: tex(drawBack()), alphaTest: 0.5, roughness: 0.55 }));
  front.position.set(0, -H / 2, 0.012); back.position.set(0, -H / 2, -0.012); back.rotation.y = Math.PI;
  card.add(front, back);
  // pelindung plastik transparan
  const sleeve = new THREE.Mesh(new THREE.PlaneGeometry(W + 0.12, H + 0.12), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.08, roughness: 0.05, metalness: 0.2, side: THREE.DoubleSide, depthWrite: false }));
  sleeve.position.set(0, -H / 2, 0.03); card.add(sleeve);

  // Ukuran & framing
  let halfH = 3.75;
  const resize = () => {
    const w = container.clientWidth, h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    pivot.position.y = halfH;
  };
  new ResizeObserver(resize).observe(container); resize();

  // Fisika bandul
  const s = { theta: 0, omega: 0, tilt: 0, tiltV: 0, yaw: 0, yawV: 0, yawTarget: 0, lean: 0, drop: 9 };
  let lastX = null, lastT = 0, visible = true;
  const hero = container.closest('.hero');
  hero.addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (lastX !== null) {
      const vx = (e.clientX - lastX) / Math.max(16, now - lastT);
      s.omega += gsap.utils.clamp(-0.9, 0.9, vx * 0.55);
    }
    lastX = e.clientX; lastT = now;
    const r = container.getBoundingClientRect();
    s.lean = gsap.utils.clamp(-0.5, 0.5, (e.clientX - (r.left + r.width / 2)) / r.width) * 0.9;
    s.tiltV += ((e.clientY / window.innerHeight) - 0.5) * 0.02;
  });
  hero.addEventListener('pointerleave', () => { s.lean = 0; lastX = null; });
  canvas.addEventListener('click', () => { s.yawTarget += Math.PI; s.omega += 0.6; });

  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(container);

  // Masuk: jatuh dari atas lalu berayun
  if (!reduced) { s.drop = 9; s.omega = 1.4; } else { s.drop = 0; }
  const enter = () => gsap.to(s, { drop: 0, duration: 1.6, ease: 'elastic.out(1, 0.5)' });

  const tick = (time, dtMs) => {
    if (!visible || document.hidden) return;
    const dt = Math.min(0.05, dtMs / 1000);
    if (!reduced) {
      const wind = Math.sin(time * 0.8) * 0.06 + Math.sin(time * 1.7) * 0.03;
      s.omega += (-13 * s.theta - 1.5 * s.omega + wind) * dt; s.theta += s.omega * dt;
      s.tiltV += (-10 * s.tilt - 2 * s.tiltV) * dt; s.tilt += s.tiltV * dt;
      s.yawV += (16 * (s.yawTarget + s.lean - s.yaw) - 4.5 * s.yawV) * dt; s.yaw += s.yawV * dt;
    }
    pivot.rotation.z = s.theta;
    pivot.rotation.x = s.tilt;
    card.rotation.y = s.yaw + s.theta * 0.6;
    pivot.position.y = halfH + s.drop;
    renderer.render(scene, camera);
  };
  gsap.ticker.add(tick);
  tick(0, 16);
  return { enter };
}
