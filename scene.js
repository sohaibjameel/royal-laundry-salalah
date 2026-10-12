import * as THREE from 'three';

const host = document.getElementById('scene');
const canvas = document.getElementById('gl');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function fallback() {
  // Static carpet image if WebGL is unavailable
  const img = window.RLPattern.makeCarpet(1024, 640);
  img.style.cssText = 'position:absolute;width:min(62vw,720px);height:auto;right:4vw;top:50%;transform:translateY(-50%) perspective(900px) rotateX(38deg) rotateZ(-8deg);border-radius:6px;box-shadow:0 40px 80px rgba(0,0,0,.35)';
  canvas.replaceWith(img);
}

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
} catch (e) { renderer = null; }

if (!renderer || !window.RLPattern) {
  if (window.RLPattern) fallback();
} else {
  run();
}

function run() {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
  camera.position.set(0, 2.6, 6.2);
  camera.lookAt(0, 0.2, 0);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x1b2559, 1.15));
  const key = new THREE.DirectionalLight(0xffe2a8, 2.1);
  key.position.set(3, 5, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x8fb4ff, 0.6);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  // ---------- Carpet ----------
  const L = 4.2, WD = 2.6, SX = 168, SY = 64;
  const geo = new THREE.PlaneGeometry(L, WD, SX, SY);
  const pos = geo.attributes.position;
  const baseX = new Float32Array(pos.count), baseY = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) { baseX[i] = pos.getX(i); baseY[i] = pos.getY(i); }

  const tex = new THREE.CanvasTexture(window.RLPattern.makeCarpet(2048, 1268));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const carpetMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.92, metalness: 0, side: THREE.DoubleSide });

  const dirtTex = new THREE.CanvasTexture(window.RLPattern.makeDirt(1024, 634, 3));
  dirtTex.colorSpace = THREE.SRGBColorSpace;
  const dirtMat = new THREE.MeshStandardMaterial({
    map: dirtTex, transparent: true, opacity: reduce ? 0 : 0.95, roughness: 1, depthWrite: false,
    side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2
  });

  const group = new THREE.Group();
  const carpet = new THREE.Mesh(geo, carpetMat);
  const dirt = new THREE.Mesh(geo, dirtMat);
  group.add(carpet, dirt);
  group.rotation.x = -Math.PI / 2 + 0.28;
  group.rotation.z = -0.22;
  scene.add(group);

  // soft floor shadow
  const shCv = document.createElement('canvas'); shCv.width = shCv.height = 256;
  const sx = shCv.getContext('2d');
  const sg = sx.createRadialGradient(128, 128, 10, 128, 128, 128);
  sg.addColorStop(0, 'rgba(5,10,35,.55)'); sg.addColorStop(1, 'rgba(5,10,35,0)');
  sx.fillStyle = sg; sx.fillRect(0, 0, 256, 256);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(L * 1.5, WD * 1.6), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shCv), transparent: true, depthWrite: false }));
  shadow.position.z = -0.06;
  group.add(shadow);

  // ---------- Bubbles ----------
  const bCv = document.createElement('canvas'); bCv.width = bCv.height = 128;
  const bx = bCv.getContext('2d');
  const bg = bx.createRadialGradient(64, 64, 30, 64, 64, 62);
  bg.addColorStop(0, 'rgba(255,255,255,0.02)');
  bg.addColorStop(0.78, 'rgba(200,225,255,0.18)');
  bg.addColorStop(0.92, 'rgba(255,240,200,0.7)');
  bg.addColorStop(1, 'rgba(255,255,255,0)');
  bx.fillStyle = bg; bx.beginPath(); bx.arc(64, 64, 62, 0, Math.PI * 2); bx.fill();
  const rg = bx.createLinearGradient(0, 0, 128, 128);
  rg.addColorStop(0, 'rgba(255,214,140,0.95)'); rg.addColorStop(0.5, 'rgba(170,220,255,0.9)'); rg.addColorStop(1, 'rgba(255,170,220,0.9)');
  bx.strokeStyle = rg; bx.lineWidth = 3; bx.beginPath(); bx.arc(64, 64, 58, 0, Math.PI * 2); bx.stroke();
  bx.fillStyle = 'rgba(255,255,255,0.9)';
  bx.beginPath(); bx.ellipse(44, 40, 12, 7, -0.7, 0, Math.PI * 2); bx.fill();
  const bTex = new THREE.CanvasTexture(bCv);
  bTex.colorSpace = THREE.SRGBColorSpace;

  const bubbles = [];
  const N = reduce ? 0 : 46;
  for (let i = 0; i < N; i++) {
    const m = new THREE.SpriteMaterial({ map: bTex, transparent: true, depthWrite: false, opacity: 0 });
    const s = new THREE.Sprite(m);
    const size = 0.12 + Math.random() * 0.36;
    s.scale.setScalar(size);
    s.userData = {
      x: (Math.random() - 0.5) * L * 1.1, z: (Math.random() - 0.5) * WD * 0.9,
      y: -0.2 - Math.random() * 0.9, speed: 0.35 + Math.random() * 0.55,
      wob: Math.random() * Math.PI * 2, size, burst: true
    };
    scene.add(s);
    bubbles.push(s);
  }

  // ---------- Pointer ripple ----------
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2(9, 9);
  let rippleLocal = new THREE.Vector3(99, 99, 0), rippleAmp = 0, targetAmp = 0;
  const hitPlane = new THREE.Mesh(new THREE.PlaneGeometry(L * 1.2, WD * 1.2), new THREE.MeshBasicMaterial({ visible: false }));
  group.add(hitPlane);

  host.addEventListener('pointermove', (e) => {
    const r = host.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObject(hitPlane)[0];
    if (hit) { rippleLocal = group.worldToLocal(hit.point.clone()); targetAmp = 1; } else targetAmp = 0;
  });
  host.addEventListener('pointerleave', () => { targetAmp = 0; });

  // ---------- Layout ----------
  let tiltX = 0, tiltY = 0;
  function layout() {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const rtl = document.documentElement.dir === 'rtl';
    if (w > 960) {
      camera.fov = 36;
      group.rotation.x = -Math.PI / 2 + 0.28;
      group.position.set(rtl ? -1.9 : 1.9, 0.1, 0);
      group.scale.setScalar(Math.min(0.8, w / 1750));
    } else {
      camera.fov = 44;
      group.rotation.x = -Math.PI / 2 + 0.62;
      group.position.set(0, 2.15, -0.4);
      group.scale.setScalar(Math.max(0.36, Math.min(0.8, w / 1050)));
    }
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', layout);
  window.addEventListener('rl-lang', layout);
  layout();

  // ---------- Deform ----------
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const clamp01 = (v) => Math.max(0, Math.min(1, v));

  function deform(p, t) {
    const d = p * L;
    const R = L - d;
    const rMin = 0.05;
    const rOuter = rMin + 0.038 * R;
    const c = R > 0 ? (rOuter - rMin) / R : 0;
    const flatAmp = 0.035 * p;
    for (let i = 0; i < pos.count; i++) {
      const s = baseX[i] + L / 2, y = baseY[i];
      let X, Z;
      if (s <= d) {
        X = s - L / 2;
        Z = flatAmp * Math.sin(s * 2.2 - t * 1.4) * Math.cos(y * 1.6 + t * 0.6)
          + 0.018 * Math.sin(s * 5 + y * 3 - t * 2);
        if (rippleAmp > 0.001) {
          const dx = X - rippleLocal.x, dy = y - rippleLocal.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          Z += rippleAmp * 0.11 * Math.exp(-dist * dist * 2.2) * Math.cos(dist * 9 - t * 7);
        }
      } else {
        const a = s - d;
        const r = rOuter - c * a;
        const th = a / Math.max(r, rMin);
        X = (d - L / 2) + r * Math.sin(th);
        Z = rOuter - r * Math.cos(th);
      }
      pos.setXYZ(i, X, y, Z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  }

  // ---------- Loop ----------
  const clock = new THREE.Clock();
  let running = true, start = null;
  const freeze = new URLSearchParams(location.search).get('t'); // ?t=3 freezes the intro for previews

  function frame() {
    if (!running) return;
    const t = clock.getElapsedTime();
    if (start === null) start = performance.now();
    const since = freeze !== null ? Number(freeze) : (performance.now() - start) / 1000;
    const p = reduce ? 1 : easeOut(clamp01((since - 0.35) / 2.3));
    const wash = reduce ? 1 : clamp01((since - 2.0) / 2.4);

    rippleAmp += (targetAmp - rippleAmp) * 0.06;
    deform(p, t);
    dirtMat.opacity = 0.95 * (1 - wash);
    dirt.visible = dirtMat.opacity > 0.005;

    // gentle camera parallax from pointer
    tiltX += ((ndc.x < 2 ? ndc.x : 0) * 0.25 - tiltX) * 0.04;
    tiltY += ((ndc.y < 2 ? ndc.y : 0) * 0.12 - tiltY) * 0.04;
    camera.position.x = tiltX;
    camera.position.y = 2.6 + tiltY;
    camera.lookAt(group.position.x * 0.2, 0.2 + group.position.y * 0.4, 0);

    // bubbles: a big burst during the wash, then a light drift
    const burst = since > 1.6 && since < 5.2;
    for (const b of bubbles) {
      const u = b.userData;
      if (since < 1.6) { b.material.opacity = 0; continue; }
      u.y += u.speed * 0.016 * (burst ? 1.25 : 0.6);
      u.wob += 0.03;
      const top = 2.6;
      if (u.y > top) {
        if (!burst && Math.random() > 0.35) { u.y = top + 1; b.material.opacity = 0; continue; }
        u.y = -0.3; u.x = (Math.random() - 0.5) * L * 1.1; u.z = (Math.random() - 0.5) * WD * 0.9;
      }
      const local = new THREE.Vector3(u.x + Math.sin(u.wob) * 0.08, u.z, 0.1 + Math.max(0, u.y));
      const world = group.localToWorld(local);
      b.position.copy(world);
      const life = clamp01((u.y + 0.3) / 0.5) * clamp01((top - u.y) / 0.8);
      b.material.opacity = (burst ? 0.95 : 0.6) * life;
      b.scale.setScalar(u.size * group.scale.x * (0.9 + 0.1 * Math.sin(u.wob * 2)));
    }

    renderer.render(scene, camera);
    if (!reduce) requestAnimationFrame(frame);
  }

  if (reduce) {
    frame();
    window.addEventListener('resize', () => { renderer.render(scene, camera); });
  } else {
    // pause when the hero is off screen
    new IntersectionObserver(([en]) => {
      const was = running; running = en.isIntersecting;
      if (running && !was) requestAnimationFrame(frame);
    }).observe(host);
    requestAnimationFrame(frame);
  }
}
