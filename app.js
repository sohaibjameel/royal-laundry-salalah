(function () {
  /* ---------- Carpet pattern (shared with the 3D scene) ---------- */
  var C = { madder: '#9E2A2B', indigo: '#1B2559', gold: '#E3A72F', cream: '#F2E4C4', teal: '#2F6B66', rose: '#C8654A' };

  function diamond(ctx, cx, cy, w, h, fill) {
    ctx.beginPath(); ctx.moveTo(cx, cy - h); ctx.lineTo(cx + w, cy); ctx.lineTo(cx, cy + h); ctx.lineTo(cx - w, cy); ctx.closePath();
    ctx.fillStyle = fill; ctx.fill();
  }

  function makeCarpet(W, H) {
    var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    var x = cv.getContext('2d');
    x.fillStyle = C.madder; x.fillRect(0, 0, W, H);
    var b = Math.round(H * 0.11);
    // outer border band
    x.fillStyle = C.indigo; x.fillRect(0, 0, W, b); x.fillRect(0, H - b, W, b); x.fillRect(0, 0, b, H); x.fillRect(W - b, 0, b, H);
    // border motif: running diamonds
    var step = b * 0.9;
    for (var i = step / 2; i < W; i += step) { diamond(x, i, b / 2, b * 0.3, b * 0.32, C.gold); diamond(x, i, H - b / 2, b * 0.3, b * 0.32, C.gold); diamond(x, i, b / 2, b * 0.12, b * 0.13, C.madder); diamond(x, i, H - b / 2, b * 0.12, b * 0.13, C.madder); }
    for (var j = step / 2 + b; j < H - b; j += step) { diamond(x, b / 2, j, b * 0.3, b * 0.32, C.gold); diamond(x, W - b / 2, j, b * 0.3, b * 0.32, C.gold); diamond(x, b / 2, j, b * 0.12, b * 0.13, C.madder); diamond(x, W - b / 2, j, b * 0.12, b * 0.13, C.madder); }
    // guard stripes
    x.strokeStyle = C.cream; x.lineWidth = b * 0.08;
    x.strokeRect(b + b * 0.12, b + b * 0.12, W - 2 * b - b * 0.24, H - 2 * b - b * 0.24);
    x.strokeStyle = C.gold; x.lineWidth = b * 0.04;
    x.strokeRect(b + b * 0.3, b + b * 0.3, W - 2 * b - b * 0.6, H - 2 * b - b * 0.6);
    // field lattice of small diamonds
    var fx0 = b * 1.5, fy0 = b * 1.5, fx1 = W - b * 1.5, fy1 = H - b * 1.5;
    var cell = (fy1 - fy0) / 6;
    for (var yy = fy0 + cell / 2; yy < fy1; yy += cell) {
      for (var xx = fx0 + cell / 2; xx < fx1; xx += cell) {
        diamond(x, xx, yy, cell * 0.22, cell * 0.22, 'rgba(242,228,196,.18)');
        diamond(x, xx, yy, cell * 0.07, cell * 0.07, C.gold);
      }
    }
    // central medallion
    var cx = W / 2, cy = H / 2, mh = (fy1 - fy0) * 0.46, mw = mh * 1.25;
    diamond(x, cx, cy, mw, mh, C.indigo);
    diamond(x, cx, cy, mw * 0.84, mh * 0.84, C.cream);
    diamond(x, cx, cy, mw * 0.7, mh * 0.7, C.teal);
    diamond(x, cx, cy, mw * 0.52, mh * 0.52, C.madder);
    diamond(x, cx, cy, mw * 0.34, mh * 0.34, C.gold);
    diamond(x, cx, cy, mw * 0.18, mh * 0.18, C.indigo);
    // pendants
    [-1, 1].forEach(function (s) {
      diamond(x, cx + s * mw * 1.18, cy, mw * 0.16, mh * 0.2, C.gold);
      diamond(x, cx + s * mw * 1.18, cy, mw * 0.07, mh * 0.09, C.indigo);
    });
    // corner spandrels
    [[fx0, fy0], [fx1, fy0], [fx0, fy1], [fx1, fy1]].forEach(function (p) {
      diamond(x, p[0], p[1], mh * 0.42, mh * 0.42, C.indigo);
      diamond(x, p[0], p[1], mh * 0.28, mh * 0.28, C.rose);
      diamond(x, p[0], p[1], mh * 0.12, mh * 0.12, C.gold);
    });
    // subtle weave texture
    x.globalAlpha = 0.06;
    for (var k = 0; k < H; k += 3) { x.fillStyle = k % 6 ? '#000' : '#fff'; x.fillRect(0, k, W, 1); }
    x.globalAlpha = 1;
    return cv;
  }

  function makeDirt(W, H, seed) {
    var cv = document.createElement('canvas'); cv.width = W; cv.height = H;
    var x = cv.getContext('2d');
    var s = seed || 7;
    function rnd() { s = (s * 16807) % 2147483647; return s / 2147483647; }
    x.fillStyle = 'rgba(120,92,58,0.62)'; x.fillRect(0, 0, W, H);
    for (var i = 0; i < 70; i++) {
      var px = rnd() * W, py = rnd() * H, r = (0.04 + rnd() * 0.16) * H;
      var g = x.createRadialGradient(px, py, 0, px, py, r);
      g.addColorStop(0, 'rgba(84,60,34,' + (0.25 + rnd() * 0.35) + ')');
      g.addColorStop(1, 'rgba(84,60,34,0)');
      x.fillStyle = g; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill();
    }
    for (var n = 0; n < 4000; n++) {
      x.fillStyle = 'rgba(60,44,26,' + (rnd() * 0.5) + ')';
      x.fillRect(rnd() * W, rnd() * H, 1 + rnd() * 2, 1 + rnd() * 2);
    }
    return cv;
  }

  window.RLPattern = { makeCarpet: makeCarpet, makeDirt: makeDirt };

  /* ---------- Before / after ---------- */
  var ba = document.getElementById('ba');
  if (ba) {
    var carpet = makeCarpet(1280, 800).toDataURL('image/jpeg', 0.85);
    var dirt = makeDirt(640, 400, 11).toDataURL('image/png');
    document.getElementById('baClean').style.backgroundImage = 'url(' + carpet + ')';
    var dirty = document.getElementById('baDirty');
    dirty.style.backgroundImage = 'url(' + carpet + ')';
    dirty.style.setProperty('--dirt', 'url(' + dirt + ')');
    var range = document.getElementById('baRange');
    range.addEventListener('input', function () { ba.style.setProperty('--pos', range.value + '%'); });
  }

  /* ---------- Nav background ---------- */
  var nav = document.querySelector('.nav');
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Counters ---------- */
  var counts = { carpets: 1, blankets: 0 };
  document.querySelectorAll('[data-step]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var t = btn.getAttribute('data-target');
      counts[t] = Math.max(0, Math.min(30, counts[t] + Number(btn.getAttribute('data-step'))));
      document.getElementById(t).textContent = counts[t];
    });
  });

  /* ---------- Date min ---------- */
  var date = document.getElementById('fDate');
  var d = new Date(); var iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  date.min = iso;
  document.getElementById('yr').textContent = d.getFullYear();

  /* ---------- Booking → WhatsApp ---------- */
  var form = document.getElementById('bookForm');
  var err = document.getElementById('formError');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var T = window.RL_T || function (k) { return k; };
    var name = form.name.value.trim(), area = form.area.value, day = date.value, time = form.time.value;
    var msg = '';
    if (!name) { msg = T('err.name'); form.name.focus(); }
    else if (!area) { msg = T('err.area'); form.area.focus(); }
    else if (counts.carpets + counts.blankets === 0) { msg = T('err.items'); }
    else if (!day) { msg = T('err.date'); date.focus(); }
    if (msg) { err.textContent = msg; err.hidden = false; return; }
    err.hidden = true;
    var ar = window.RL_LANG && window.RL_LANG() === 'ar';
    var text = ar
      ? 'السلام عليكم، أريد حجز استلام من الغسيل الملكي:\nالاسم: ' + name + '\nالمنطقة: ' + area + '\nسجاد: ' + counts.carpets + '\nغنفات: ' + counts.blankets + '\nاليوم: ' + day + '\nالوقت: ' + time
      : 'Hello Royal Laundry, I would like to book a pickup:\nName: ' + name + '\nArea: ' + area + '\nCarpets: ' + counts.carpets + '\nBlankets: ' + counts.blankets + '\nDay: ' + day + '\nTime: ' + time;
    window.open('https://wa.me/96898887453?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });

  /* ---------- Section heading reveal ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var heads = document.querySelectorAll('main section:not(.hero) h2');
  if (!reduce && 'IntersectionObserver' in window) {
    heads.forEach(function (h) { h.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.3 });
    heads.forEach(function (h) { io.observe(h); });
  }

  requestAnimationFrame(function () { document.body.classList.add('loaded'); });
})();
