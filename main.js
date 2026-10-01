/* ==========================================================================
   Adisesh Sanklapur — portfolio interactions (vanilla, no build step)
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var SVGNS = "http://www.w3.org/2000/svg";
  var EMAIL = "adivenkatesh@ucdavis.edu";

  /* deterministic RNG so diagrams render the same every visit */
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function gauss(r) { return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r()); }
  function cssVar(name) { return getComputedStyle(root).getPropertyValue(name).trim(); }
  function el(tag, attrs, parent) {
    var n = document.createElementNS(SVGNS, tag);
    for (var k in attrs) if (attrs[k] != null) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function txt(parent, x, y, s, cls, anchor) {
    var t = el("text", { x: x, y: y, class: cls || "d-label", "text-anchor": anchor || "start" }, parent);
    t.textContent = s;
    return t;
  }
  /* run fn every frame only while the element is on screen */
  function whileVisible(target, onStart, onStop) {
    if (!("IntersectionObserver" in window)) { onStart(); return; }
    new IntersectionObserver(function (e) { e[0].isIntersecting ? onStart() : onStop(); }).observe(target);
  }

  /* ------------------------------------------------------------ toast */
  var toastEl = $("#toast"), toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }
  function copy(text, okMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast(okMsg); }, function () { toast("Couldn’t copy. Select and copy manually."); });
    } else toast("Couldn’t copy. Select and copy manually.");
  }
  function copyEmail() { copy(EMAIL, "Email copied: " + EMAIL); }

  /* ------------------------------------------------------------ theme */
  function isDark() {
    var t = root.dataset.theme;
    if (t) return t === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function toggleTheme() {
    var t = isDark() ? "light" : "dark";
    root.dataset.theme = t;
    try { localStorage.setItem("theme", t); } catch (e) {}
    document.dispatchEvent(new Event("themechange"));
  }
  $("#theme-toggle").addEventListener("click", toggleTheme);
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    document.dispatchEvent(new Event("themechange"));
  });

  /* ------------------------------------------------------------ nav */
  var nav = $("#nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 24); }
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });
  if ("IntersectionObserver" in window) {
    var navLinks = $$(".nav-links a");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { spy.observe(s); });
  }

  /* ------------------------------------------------------------ clock */
  var clock = $("#clock");
  function tick() {
    try {
      clock.textContent = new Date().toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", hour12: false });
    } catch (e) { clock.textContent = ""; }
  }
  tick();
  setInterval(tick, 15000);

  $("#copy-email").addEventListener("click", copyEmail);

  /* ------------------------------------------------------------ reveal + count-up */
  function countUp(node) {
    var target = parseInt(node.dataset.count, 10);
    if (reduced || !target) return;
    var start = null, dur = 1400;
    node.textContent = "0";
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      node.textContent = Math.round(target * (1 - Math.pow(1 - p, 4))).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!reduced && "IntersectionObserver" in window) {
    root.classList.add("anim");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        $$("[data-count]", e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $$(".reveal").forEach(function (n) { io.observe(n); });
    var go = function () { requestAnimationFrame(function () { root.classList.add("loaded"); }); };
    if (document.fonts && document.fonts.ready) {
      Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 900); })]).then(go);
    } else go();
    /* safety net: never leave content hidden if observers stall */
    setTimeout(function () {
      root.classList.add("loaded");
      $$(".reveal").forEach(function (n) {
        var r = n.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) n.classList.add("in");
      });
    }, 2500);
  }

  /* ============================================================
     Hero: letters thin out and stretch near the pointer
     ============================================================ */
  (function heroLetters() {
    var h = $("#hero-name");
    if (!h) return;
    var chars = [];
    $$("[data-split]", h).forEach(function (w) {
      var s = w.textContent;
      w.textContent = "";
      w.setAttribute("aria-hidden", "true");
      for (var i = 0; i < s.length; i++) {
        var c = document.createElement("span");
        c.className = "ch"; c.textContent = s[i];
        w.appendChild(c); chars.push({ el: c, x: 0, y: 0 });
      }
    });
    if (reduced) return;
    function measure() {
      chars.forEach(function (c) {
        c.el.style.fontVariationSettings = "";
        var r = c.el.getBoundingClientRect();
        c.x = r.left + r.width / 2 + scrollX; c.y = r.top + r.height / 2 + scrollY;
      });
    }
    function set(c, t) {
      c.el.style.fontVariationSettings = t <= 0 ? "" : '"wght" ' + Math.round(800 - 620 * t) + ', "wdth" ' + Math.round(82 + 18 * t) + ', "opsz" 96';
    }
    var px = 0, py = 0, raf = 0, active = false;
    function frame() {
      raf = 0;
      var R = Math.max(180, innerWidth * 0.16);
      chars.forEach(function (c) { set(c, active ? Math.max(0, 1 - Math.hypot(c.x - px, (c.y - py) * 1.4) / R) : 0); });
    }
    var hero = $(".hero");
    hero.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      if (!active) { chars.forEach(function (c) { c.el.classList.add("live"); }); active = true; }
      px = e.clientX + scrollX; py = e.clientY + scrollY;
      if (!raf) raf = requestAnimationFrame(frame);
    });
    hero.addEventListener("pointerleave", function () {
      active = false;
      chars.forEach(function (c) { c.el.classList.remove("live"); set(c, 0); });
    });
    var ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    ready.then(function () {
      measure();
      /* one-time wave on load, so touch visitors see the type move too */
      setTimeout(function () {
        chars.forEach(function (c, i) {
          setTimeout(function () { if (!active) set(c, 0.85); }, i * 55);
          setTimeout(function () { if (!active) set(c, 0); }, i * 55 + 420);
        });
      }, 900);
    });
    addEventListener("resize", function () { if (!active) measure(); });
  })();

  /* ============================================================
     Hero: cache-aware vs round-robin router simulation
     ============================================================ */
  (function routerSim() {
    var canvas = $("#sim-canvas");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = 0, H = 0, C = {}, rand = rng(7);
    var N_REPLICAS = 4, SLOTS = 2;
    var WEIGHTS = [0.3, 0.22, 0.16, 0.11, 0.07]; // prefix popularity; the rest are unique prompts
    var replicas = [], reqs = [], recent = [], spark = [], routed = 0, lastSpawn = 0, t = 0, sparkT = 0;
    var routerPulse = 0, policy = "aware", rrNext = 0;
    for (var i = 0; i < N_REPLICAS; i++) replicas.push({ cache: [], flash: 0, flashHit: true, load: 0 });
    var elRouted = $("#s-routed"), elHit = $("#s-hit"), sparkSvg = $("#spark");

    function readColors() {
      C = {
        ink: cssVar("--ink"), ink3: cssVar("--ink-3"), line: cssVar("--line-2"), lineSoft: cssVar("--line"),
        surface: cssVar("--surface"), live: cssVar("--live"), miss: cssVar("--miss"), accent: cssVar("--accent"),
        p: [cssVar("--p1"), cssVar("--p2"), cssVar("--p3"), cssVar("--p4"), cssVar("--p5")],
      };
    }
    function layout() {
      var r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function geo() {
      var bw = Math.min(150, W * 0.3), bh = Math.min(46, (H - 40) / N_REPLICAS - 10), bx = W - bw - 16;
      var gap = (H - 24 - bh * N_REPLICAS) / (N_REPLICAS - 1), boxes = [];
      for (var i = 0; i < N_REPLICAS; i++) boxes.push({ x: bx, y: 12 + i * (bh + gap), w: bw, h: bh });
      return { rx: W * 0.4, ry: H / 2, boxes: boxes };
    }
    function pickPrefix() {
      var x = rand(), acc = 0;
      for (var i = 0; i < WEIGHTS.length; i++) { acc += WEIGHTS[i]; if (x < acc) return i; }
      return -1;
    }
    function route(prefix) {
      if (policy === "rr") { rrNext = (rrNext + 1) % N_REPLICAS; return rrNext; }
      if (prefix >= 0) for (var i = 0; i < N_REPLICAS; i++) if (replicas[i].cache.indexOf(prefix) !== -1) return i;
      var best = 0;
      for (var j = 1; j < N_REPLICAS; j++) {
        if (replicas[j].load < replicas[best].load || (replicas[j].load === replicas[best].load && rand() < 0.5)) best = j;
      }
      return best;
    }
    function spawn() {
      var y = H * (0.15 + rand() * 0.7);
      reqs.push({ prefix: pickPrefix(), stage: 0, p: 0, sx: -6, sy: y, x: -6, y: y, target: -1, speed: 0.9 + rand() * 0.4 });
    }
    function arrive(q) {
      var rep = replicas[q.target];
      rep.load--;
      var hit = q.prefix >= 0 && rep.cache.indexOf(q.prefix) !== -1;
      if (q.prefix >= 0) {
        var idx = rep.cache.indexOf(q.prefix);
        if (idx !== -1) rep.cache.splice(idx, 1);
        rep.cache.unshift(q.prefix);
        if (rep.cache.length > SLOTS) rep.cache.pop();
      }
      rep.flash = 1; rep.flashHit = hit;
      recent.push(hit ? 1 : 0);
      if (recent.length > 80) recent.shift();
      routed++;
    }
    function hitRate() {
      if (recent.length < 12) return null;
      var s = 0; recent.forEach(function (h) { s += h; });
      return s / recent.length;
    }
    function ease(x) { return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
    function update(dt) {
      t += dt;
      if (t - lastSpawn > 0.22) { spawn(); lastSpawn = t; }
      var g = geo();
      for (var i = reqs.length - 1; i >= 0; i--) {
        var q = reqs[i];
        q.p += dt * q.speed * (q.stage === 0 ? 1.1 : 1.0);
        if (q.stage === 0) {
          var e = ease(Math.min(1, q.p));
          q.x = q.sx + (g.rx - q.sx) * e; q.y = q.sy + (g.ry - q.sy) * e;
          if (q.p >= 1) { q.stage = 1; q.p = 0; q.target = route(q.prefix); replicas[q.target].load++; routerPulse = 1; }
        } else {
          var b = g.boxes[q.target], e2 = ease(Math.min(1, q.p));
          q.x = g.rx + (b.x - g.rx) * e2; q.y = g.ry + (b.y + b.h / 2 - g.ry) * e2;
          if (q.p >= 1) { arrive(q); reqs.splice(i, 1); }
        }
      }
      replicas.forEach(function (r) { r.flash = Math.max(0, r.flash - dt * 1.8); });
      routerPulse = Math.max(0, routerPulse - dt * 3);
      sparkT += dt;
      if (sparkT > 0.4) {
        sparkT = 0;
        var hr = hitRate();
        if (hr !== null) { spark.push({ v: hr, rr: policy === "rr" }); if (spark.length > 90) spark.shift(); }
      }
    }
    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }
    function draw() {
      var g = geo();
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = C.lineSoft;
      for (var gx = 12; gx < W; gx += 22) for (var gy = 12; gy < H; gy += 22) ctx.fillRect(gx, gy, 1, 1);
      ctx.lineWidth = 1; ctx.setLineDash([3, 5]); ctx.strokeStyle = C.line;
      g.boxes.forEach(function (b) { ctx.beginPath(); ctx.moveTo(g.rx, g.ry); ctx.lineTo(b.x, b.y + b.h / 2); ctx.stroke(); });
      ctx.setLineDash([]);
      ctx.font = "10px 'Geist Mono', ui-monospace, monospace";
      ctx.fillStyle = C.ink3; ctx.textAlign = "left";
      ctx.fillText("PROMPTS →", 10, 18);
      g.boxes.forEach(function (b, i) {
        var r = replicas[i];
        ctx.fillStyle = C.surface; roundRect(b.x, b.y, b.w, b.h, 8); ctx.fill();
        ctx.lineWidth = 1 + r.flash * 1.4;
        ctx.strokeStyle = r.flash > 0.02 ? (r.flashHit ? C.live : C.miss) : C.line;
        ctx.globalAlpha = r.flash > 0.02 ? 0.35 + r.flash * 0.65 : 1;
        ctx.stroke(); ctx.globalAlpha = 1; ctx.lineWidth = 1;
        ctx.fillStyle = C.ink; ctx.textAlign = "left";
        ctx.fillText("GPU-" + i, b.x + 10, b.y + b.h / 2 + 3.5);
        var s = Math.min(14, b.h - 18);
        for (var k = 0; k < SLOTS; k++) {
          var sx = b.x + b.w - 12 - (SLOTS - k) * (s + 5) + 5, sy = b.y + (b.h - s) / 2, pf = r.cache[k];
          if (pf === undefined) { ctx.strokeStyle = C.line; roundRect(sx, sy, s, s, 3); ctx.stroke(); }
          else { ctx.fillStyle = C.p[pf]; roundRect(sx, sy, s, s, 3); ctx.fill(); }
        }
      });
      reqs.forEach(function (q) {
        ctx.fillStyle = q.prefix >= 0 ? C.p[q.prefix] : C.ink3;
        ctx.beginPath(); ctx.arc(q.x, q.y, 4.2, 0, Math.PI * 2); ctx.fill();
        if (q.prefix < 0) { ctx.fillStyle = C.surface; ctx.beginPath(); ctx.arc(q.x, q.y, 1.8, 0, Math.PI * 2); ctx.fill(); }
      });
      var rr = 22 + routerPulse * 3;
      ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(g.rx, g.ry, rr, 0, Math.PI * 2); ctx.fill();
      if (routerPulse > 0) {
        ctx.strokeStyle = C.accent; ctx.globalAlpha = routerPulse * 0.8; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(g.rx, g.ry, rr + 6 + (1 - routerPulse) * 10, 0, Math.PI * 2); ctx.stroke();
        ctx.globalAlpha = 1; ctx.lineWidth = 1;
      }
      ctx.fillStyle = C.surface; ctx.textAlign = "center";
      ctx.fillText("ROUTE", g.rx, g.ry + 3.5);
      ctx.fillStyle = C.ink3;
      ctx.fillText(policy === "rr" ? "round-robin" : "prefix tree", g.rx, g.ry + rr + 18);
    }
    function stats() {
      elRouted.textContent = routed.toLocaleString();
      var hr = hitRate();
      elHit.textContent = hr === null ? "—" : Math.round(hr * 100) + "%";
      /* sparkline: hit rate over time, round-robin stretches shaded */
      sparkSvg.textContent = "";
      if (spark.length < 2) return;
      var n = 90, w = 200 / (n - 1), off = n - spark.length, pts = [];
      spark.forEach(function (s, i) {
        var x = (off + i) * w;
        if (s.rr) el("rect", { x: x - w / 2, y: 0, width: w + 0.5, height: 40, class: "spark-rr" }, sparkSvg);
        pts.push(x.toFixed(1) + "," + (38 - s.v * 36).toFixed(1));
      });
      el("polyline", { points: pts.join(" "), class: "spark-line" }, sparkSvg);
    }

    $$("[data-policy]").forEach(function (b) {
      b.addEventListener("click", function () {
        policy = b.dataset.policy;
        $$("[data-policy]").forEach(function (o) { o.classList.toggle("on", o === b); o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
        recent = recent.slice(-10); // let the new policy show quickly
        if (reduced) { for (var s = 0; s < 300; s++) update(0.03); draw(); stats(); }
      });
    });

    readColors(); layout();
    var raf = 0, last = 0, statT = 0, on = false;
    function frame(ts) {
      var dt = Math.min(0.05, last ? (ts - last) / 1000 : 0.016);
      last = ts;
      update(dt); draw();
      statT += dt;
      if (statT > 0.25) { stats(); statT = 0; }
      raf = on && !document.hidden ? requestAnimationFrame(frame) : 0;
    }
    function start() { on = true; if (!raf && !reduced) { last = 0; raf = requestAnimationFrame(frame); } }
    if (reduced) { for (var s = 0; s < 600; s++) update(0.03); draw(); stats(); }
    else {
      whileVisible(canvas, start, function () { on = false; });
      document.addEventListener("visibilitychange", function () { if (!document.hidden && on) start(); });
    }
    new ResizeObserver(function () { layout(); draw(); }).observe(canvas);
    document.addEventListener("themechange", function () { readColors(); draw(); });
  })();

  /* ============================================================
     Chart tooltip (any element with data-tip)
     ============================================================ */
  (function tooltips() {
    var tip = $("#tip");
    document.addEventListener("pointerover", function (e) {
      var t = e.target.closest && e.target.closest("[data-tip]");
      if (!t) { tip.classList.remove("show"); return; }
      tip.textContent = t.getAttribute("data-tip");
      tip.classList.add("show");
    });
    document.addEventListener("pointermove", function (e) {
      if (!tip.classList.contains("show")) return;
      tip.style.left = Math.min(innerWidth - 90, Math.max(90, e.clientX)) + "px";
      tip.style.top = e.clientY + "px";
    });
    addEventListener("scroll", function () { tip.classList.remove("show"); }, { passive: true });
  })();

  /* ============================================================
     Dot grids (Pinpoint students, verified generations)
     ============================================================ */
  $$(".waffle[data-n]").forEach(function (w) {
    var n = parseInt(w.dataset.n, 10), frag = document.createDocumentFragment();
    for (var i = 0; i < n; i++) {
      var d = document.createElement("i");
      d.style.setProperty("--d", Math.round((i % 50) * 14 + Math.floor(i / 50) * 22));
      frag.appendChild(d);
    }
    w.appendChild(frag);
  });

  /* ============================================================
     Flagship: diagrams + scroll-driven story
     ============================================================ */
  (function problemSvg() {
    var svg = $("#p-problem");
    if (!svg) return;
    txt(svg, 20, 26, "SAME SYSTEM PROMPT ×4");
    [0, 1, 2, 3].forEach(function (i) { el("circle", { cx: 34 + i * 16, cy: 44, r: 5, fill: "var(--p1)" }, svg); });
    el("path", { d: "M70 58 C 90 100, 110 130, 130 140", class: "d-edge" }, svg);
    el("circle", { cx: 150, cy: 140, r: 24, fill: "var(--ink)" }, svg);
    var lb = txt(svg, 150, 144, "LB", "d-label", "middle"); lb.style.fill = "var(--surface)";
    txt(svg, 150, 184, "round-robin", "d-label", "middle");
    [0, 1, 2, 3].forEach(function (i) {
      var y = 14 + i * 58;
      el("path", { d: "M174 140 C 210 140, 220 " + (y + 22) + ", 250 " + (y + 22), class: "d-edge-hot d-flow", style: "stroke: var(--miss)" }, svg);
      el("rect", { x: 250, y: y, width: 132, height: 44, rx: 8, class: "d-box" }, svg);
      txt(svg, 262, y + 17, "GPU-" + i, "d-label d-label-ink");
      el("rect", { x: 262, y: y + 25, width: 108, height: 8, rx: 3, fill: "url(#stripe)" }, svg);
    });
    var defs = el("defs", {}, svg);
    var pat = el("pattern", { id: "stripe", width: 6, height: 6, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
    el("rect", { width: 6, height: 6, fill: "var(--accent-soft)" }, pat);
    el("rect", { width: 2.5, height: 6, fill: "var(--miss)" }, pat);
    txt(svg, 20, 262, "EVERY GPU RECOMPUTES THE SAME PREFIX → 4× THE PREFILL WORK", "d-label").style.fill = "var(--miss)";
  })();

  (function trieSvg() {
    var svg = $("#trie-svg");
    if (!svg) return;
    var N = {
      root: [44, 150, "root"],
      sys: [132, 76, "sys:"], sum: [132, 150, "summ"], code: [132, 224, "code"],
      agent: [218, 46, "agent"], chat: [218, 104, "chat"], doc: [218, 160, "doc"], fix: [218, 214, "fix"], test: [218, 262, "test"],
    };
    var E = [["root", "sys"], ["root", "sum"], ["root", "code"], ["sys", "agent"], ["sys", "chat"], ["sum", "doc"], ["code", "fix"], ["code", "test"]];
    var HOT = { "root-sys": 1, "sys-chat": 1 };
    var R = [{ y: 30 }, { y: 98 }, { y: 166 }, { y: 234 }];
    var MAP = [["agent", 0], ["chat", 1], ["doc", 2], ["fix", 3], ["test", 3]];
    MAP.forEach(function (m) {
      var n = N[m[0]], hot = m[0] === "chat";
      el("path", {
        d: "M" + (n[0] + 8) + " " + n[1] + " C " + (n[0] + 50) + " " + n[1] + ", 250 " + (R[m[1]].y + 18) + ", 290 " + (R[m[1]].y + 18),
        class: hot ? "d-edge-hot d-flow" : "d-edge", "stroke-dasharray": hot ? null : "2 4",
      }, svg);
    });
    E.forEach(function (e) {
      var a = N[e[0]], b = N[e[1]], hot = HOT[e[0] + "-" + e[1]];
      el("path", { d: "M" + a[0] + " " + a[1] + " C " + (a[0] + 44) + " " + a[1] + ", " + (b[0] - 44) + " " + b[1] + ", " + b[0] + " " + b[1], class: hot ? "d-edge-hot" : "d-edge" }, svg);
    });
    Object.keys(N).forEach(function (k) {
      var n = N[k], hot = k === "root" || k === "sys" || k === "chat";
      el("circle", { cx: n[0], cy: n[1], r: hot ? 6 : 4.5, class: hot ? "d-node d-node-hot" : "d-node" }, svg);
      txt(svg, n[0], n[1] - 12, n[2], "d-label" + (hot ? " d-label-ink" : ""), "middle");
    });
    R.forEach(function (r, i) {
      el("rect", { x: 290, y: r.y, width: 92, height: 36, rx: 8, class: "d-box" + (i === 1 ? " d-box-hot" : "") }, svg);
      txt(svg, 302, r.y + 22, "GPU-" + i, "d-label" + (i === 1 ? " d-label-ink" : ""));
      el("rect", { x: 356, y: r.y + 11, width: 14, height: 14, rx: 3, fill: i === 1 ? "var(--accent)" : "var(--line-2)" }, svg);
    });
    txt(svg, 44, 296, "“sys: chat …” → GPU-1, which already holds that KV cache", "d-label");
  })();

  (function story() {
    var stage = $("#stage");
    if (!stage) return;
    var panels = $$(".panel", stage), steps = $$(".step"), pips = $$(".stage-steps i", stage);
    function show(n) {
      stage.dataset.step = n;
      panels.forEach(function (p) { p.classList.toggle("on", +p.dataset.panel === n); });
      steps.forEach(function (s) { s.classList.toggle("on", +s.dataset.step === n); });
      pips.forEach(function (p, i) { p.classList.toggle("on", i <= n); });
    }
    /* the active step is the one whose box crosses the reading line */
    var cur = -1;
    function pick() {
      var line = innerHeight * (innerWidth <= 900 ? 0.62 : 0.42), best = 0;
      steps.forEach(function (st, i) { if (st.getBoundingClientRect().top <= line) best = i; });
      if (best !== cur) { cur = best; show(best); }
    }
    addEventListener("scroll", pick, { passive: true });
    addEventListener("resize", pick);
    pick();
  })();

  /* ============================================================
     Experience: timeline of roles (real dates from the résumé)
     ============================================================ */
  (function gantt() {
    var g = $("#gantt");
    if (!g) return;
    var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var ROLES = [
      { org: "Shopify", role: "SWE Intern", s: [2026, 8] },
      { org: "ARMS Lab", role: "AI Systems Researcher", s: [2026, 2] },
      { org: "Pinpoint", role: "Software Developer", s: [2024, 8], e: [2025, 5] },
      { org: "Arcadia", role: "SWE Intern", s: [2023, 0], e: [2023, 10] },
      { org: "ASDRP", role: "Data Science Research Intern", s: [2022, 0], e: [2023, 0] },
    ];
    var now = new Date();
    var nowM = (now.getFullYear() - 2022) * 12 + now.getMonth() + now.getDate() / 31;
    var endYear = Math.max(2027, now.getFullYear() + 1), span = (endYear - 2022) * 12;
    function pos(m) { return Math.min(100, (m / span) * 100); }
    function mIdx(ym) { return (ym[0] - 2022) * 12 + ym[1]; }
    g.style.setProperty("--g-label", "150px");
    var axis = document.createElement("div"); axis.className = "g-axis mono";
    var rows = document.createElement("div"); rows.className = "g-rows";
    var grid = document.createElement("div"); grid.className = "g-grid";
    for (var y = 2022; y <= endYear; y++) {
      var lab = document.createElement("span");
      lab.style.left = pos((y - 2022) * 12) + "%"; lab.textContent = "’" + String(y).slice(2);
      axis.appendChild(lab);
      var gl = document.createElement("i"); gl.style.left = pos((y - 2022) * 12) + "%"; grid.appendChild(gl);
    }
    var today = document.createElement("i"); today.className = "today"; today.style.left = pos(nowM) + "%"; grid.appendChild(today);
    rows.appendChild(grid);
    var xpRows = $$(".xp-row");
    ROLES.forEach(function (r, i) {
      var row = document.createElement("div"); row.className = "g-row";
      var name = document.createElement("span"); name.className = "g-name"; name.textContent = r.org;
      var track = document.createElement("div"); track.className = "g-track";
      var bar = document.createElement("div");
      var s = mIdx(r.s), e = r.e ? mIdx(r.e) + 1 : nowM;
      bar.className = "g-bar" + (r.e ? "" : " now");
      bar.style.left = pos(s) + "%";
      bar.style.width = Math.max(0.8, pos(e) - pos(s)) + "%";
      bar.style.transitionDelay = i * 90 + "ms";
      bar.setAttribute("data-tip", r.org + " · " + r.role + " · " + MON[r.s[1]] + " " + r.s[0] + " – " + (r.e ? MON[r.e[1]] + " " + r.e[0] : "now"));
      bar.addEventListener("click", function () { if (xpRows[i]) xpRows[i].scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" }); });
      track.appendChild(bar);
      row.appendChild(name); row.appendChild(track);
      rows.appendChild(row);
    });
    g.appendChild(axis); g.appendChild(rows);
  })();

  /* ============================================================
     Arcadia: live constant-velocity Kalman filter (synthetic data)
     ============================================================ */
  (function kalman() {
    var canvas = $("#kalman");
    if (!canvas) return;
    var ctx = canvas.getContext("2d"), W = 0, H = 0, C = {}, r = rng(3);
    var dt = 0.05, R = 0.18 * 0.18, q = 3, N = 180, tt = 0;
    var x = [0, 0], P = [[1, 0], [0, 1]];
    var truth = [], meas = [], est = [];
    var elErr = $("#k-err"), elRaw = $("#k-raw");
    function colors() { C = { ink3: cssVar("--ink-3"), miss: cssVar("--miss"), acc: cssVar("--accent"), line: cssVar("--line") }; }
    function layout() {
      var b = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      W = b.width; H = b.height; canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function f(t) { return 0.62 * Math.sin(0.9 * t) + 0.28 * Math.sin(0.31 * t + 1); }
    function step() {
      tt += dt;
      var z = f(tt) + gauss(r) * 0.18;
      /* predict: x = F x, P = F P F' + Q */
      var px = x[0] + dt * x[1], pv = x[1];
      var d4 = Math.pow(dt, 4) / 4, d3 = Math.pow(dt, 3) / 2, d2 = dt * dt;
      var p00 = P[0][0] + dt * (P[1][0] + P[0][1]) + d2 * P[1][1] + q * d4;
      var p01 = P[0][1] + dt * P[1][1] + q * d3;
      var p10 = P[1][0] + dt * P[1][1] + q * d3;
      var p11 = P[1][1] + q * d2;
      /* update with position measurement */
      var S = p00 + R, k0 = p00 / S, k1 = p10 / S, y = z - px;
      x = [px + k0 * y, pv + k1 * y];
      P = [[(1 - k0) * p00, (1 - k0) * p01], [p10 - k1 * p00, p11 - k1 * p01]];
      truth.push(f(tt)); meas.push(z); est.push(x[0]);
      if (truth.length > N) { truth.shift(); meas.shift(); est.shift(); }
    }
    function Y(v) { return H / 2 - v * H * 0.4; }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var sx = W / (N - 1);
      ctx.strokeStyle = C.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
      ctx.fillStyle = C.miss; ctx.globalAlpha = 0.55;
      meas.forEach(function (v, i) { ctx.beginPath(); ctx.arc(i * sx, Y(v), 1.8, 0, 7); ctx.fill(); });
      ctx.globalAlpha = 1;
      ctx.setLineDash([4, 4]); ctx.strokeStyle = C.ink3; ctx.lineWidth = 1.4;
      ctx.beginPath(); truth.forEach(function (v, i) { i ? ctx.lineTo(i * sx, Y(v)) : ctx.moveTo(0, Y(v)); }); ctx.stroke();
      ctx.setLineDash([]); ctx.strokeStyle = C.acc; ctx.lineWidth = 2.2;
      ctx.beginPath(); est.forEach(function (v, i) { i ? ctx.lineTo(i * sx, Y(v)) : ctx.moveTo(0, Y(v)); }); ctx.stroke();
    }
    function errs() {
      var e = 0, m = 0;
      for (var i = 0; i < truth.length; i++) { e += Math.pow(est[i] - truth[i], 2); m += Math.pow(meas[i] - truth[i], 2); }
      elErr.textContent = "RMSE " + Math.sqrt(e / truth.length).toFixed(3);
      elRaw.textContent = "RMSE " + Math.sqrt(m / truth.length).toFixed(3);
    }
    colors(); layout();
    for (var i = 0; i < N; i++) step();
    draw(); errs();
    var raf = 0, on = false, acc = 0, last = 0, eT = 0;
    function frame(ts) {
      var d = last ? Math.min(0.1, (ts - last) / 1000) : 0; last = ts;
      acc += d; eT += d;
      while (acc >= dt) { step(); acc -= dt; }
      draw();
      if (eT > 0.5) { errs(); eT = 0; }
      raf = on ? requestAnimationFrame(frame) : 0;
    }
    if (!reduced) whileVisible(canvas, function () { on = true; if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }, function () { on = false; });
    new ResizeObserver(function () { layout(); draw(); }).observe(canvas);
    document.addEventListener("themechange", function () { colors(); draw(); });
  })();

  /* ============================================================
     Research: drag tuning strength → outputs collapse (illustration)
     ============================================================ */
  (function collapse() {
    var svg = $("#collapse-svg"), slider = $("#tune"), read = $("#tune-read");
    if (!svg || !slider) return;
    var r = rng(21), dots = [], CLS = ["var(--p1)", "var(--p2)", "var(--p3)", "var(--p4)", "var(--p5)"];
    el("circle", { cx: 160, cy: 90, r: 26, class: "d-edge", "stroke-dasharray": "2 3" }, svg);
    for (var i = 0; i < 64; i++) {
      var a = r() * Math.PI * 2, d = Math.sqrt(r());
      var a2 = r() * Math.PI * 2, d2 = Math.pow(r(), 1.7) * (i < 52 ? 16 : 34);
      dots.push({
        x0: 160 + Math.cos(a) * d * 140, y0: 90 + Math.sin(a) * d * 72,
        x1: 160 + Math.cos(a2) * d2, y1: 90 + Math.sin(a2) * d2,
        c0: CLS[i % 5], c1: i < 52 ? CLS[0] : CLS[(i % 4) + 1], thr: 0.35 + r() * 0.5,
        el: el("circle", { r: 3.6, "fill-opacity": 0.88 }, svg),
      });
    }
    function render() {
      var t = slider.value / 100, e = t * t * (3 - 2 * t);
      dots.forEach(function (p) {
        p.el.setAttribute("cx", (p.x0 + (p.x1 - p.x0) * e).toFixed(1));
        p.el.setAttribute("cy", (p.y0 + (p.y1 - p.y0) * e).toFixed(1));
        p.el.setAttribute("fill", t > p.thr ? p.c1 : p.c0);
      });
      read.textContent = t < 0.35 ? "varied outputs" : t < 0.7 ? "converging" : "collapsed: same few answers";
    }
    slider.addEventListener("input", render);
    render();
  })();

  /* ============================================================
     AccessMap: click streets to block them; Dijkstra reroutes
     ============================================================ */
  (function mapSvg() {
    var svg = $("#map-svg");
    if (!svg) return;
    var r = rng(11), COLS = 9, ROWS = 7, nodes = [], edges = [];
    for (var y = 0; y < ROWS; y++) for (var x = 0; x < COLS; x++) {
      nodes.push({ x: 36 + x * 41 + (r() - 0.5) * 16, y: 44 + y * 36 + (r() - 0.5) * 12 });
    }
    function id(x, y) { return y * COLS + x; }
    function add(a, b) {
      var A = nodes[a], B = nodes[b];
      edges.push({ a: a, b: b, w: Math.hypot(A.x - B.x, A.y - B.y) * (0.8 + r() * 0.6), blocked0: r() < 0.1 });
    }
    for (var yy = 0; yy < ROWS; yy++) for (var xx = 0; xx < COLS; xx++) {
      if (xx < COLS - 1) add(id(xx, yy), id(xx + 1, yy));
      if (yy < ROWS - 1) add(id(xx, yy), id(xx, yy + 1));
      if (xx < COLS - 1 && yy < ROWS - 1 && r() < 0.3) add(id(xx, yy), id(xx + 1, yy + 1));
    }
    var src = id(0, 5), dst = id(8, 1);
    var gEdges = el("g", {}, svg);
    var routeEl = el("path", { class: "m-route" }, svg);
    var status = $("#map-status");

    edges.forEach(function (e) {
      var A = nodes[e.a], B = nodes[e.b];
      e.g = el("g", { class: "m-edge", role: "button", tabindex: "0", "aria-label": "Toggle a blocked street" }, gEdges);
      el("line", { x1: A.x, y1: A.y, x2: B.x, y2: B.y, class: "d-edge m-line" }, e.g);
      el("line", { x1: A.x, y1: A.y, x2: B.x, y2: B.y, class: "m-hit" }, e.g);
      var toggle = function () { e.blocked = !e.blocked; paint(); };
      e.g.addEventListener("click", toggle);
      e.g.addEventListener("keydown", function (k) { if (k.key === "Enter" || k.key === " ") { k.preventDefault(); toggle(); } });
    });
    nodes.forEach(function (n) { el("circle", { cx: n.x, cy: n.y, r: 2.2, class: "d-dot" }, svg); });
    [[src, "A"], [dst, "B"]].forEach(function (p) {
      var n = nodes[p[0]];
      el("circle", { cx: n.x, cy: n.y, r: 9, fill: "var(--accent)" }, svg);
      txt(svg, n.x, n.y + 3.5, p[1], "d-label", "middle").style.fill = "var(--accent-ink)";
    });

    function dijkstra() {
      var dist = nodes.map(function () { return Infinity; }), prev = [], done = [];
      dist[src] = 0;
      for (;;) {
        var u = -1;
        for (var i = 0; i < nodes.length; i++) if (!done[i] && (u === -1 || dist[i] < dist[u])) u = i;
        if (u === -1 || dist[u] === Infinity || u === dst) break;
        done[u] = true;
        edges.forEach(function (e) {
          if (e.blocked) return;
          var v = e.a === u ? e.b : e.b === u ? e.a : -1;
          if (v !== -1 && dist[u] + e.w < dist[v]) { dist[v] = dist[u] + e.w; prev[v] = u; }
        });
      }
      var path = [], c = dst;
      while (c !== undefined) { path.unshift(c); c = prev[c]; }
      return path[0] === src ? path : null;
    }
    function paint() {
      var nb = 0;
      edges.forEach(function (e) { e.g.classList.toggle("blocked", !!e.blocked); if (e.blocked) nb++; });
      var path = dijkstra();
      if (!path) { routeEl.setAttribute("d", ""); status.textContent = "no accessible route · " + nb + " blocked"; return; }
      routeEl.setAttribute("d", path.map(function (i, k) { return (k ? "L" : "M") + nodes[i].x.toFixed(1) + " " + nodes[i].y.toFixed(1); }).join(" "));
      status.textContent = "route: " + (path.length - 1) + " segments · " + nb + " blocked";
    }
    function reset() { edges.forEach(function (e) { e.blocked = e.blocked0; }); if (!dijkstra()) edges.forEach(function (e) { e.blocked = false; }); paint(); }
    $("#map-reset").addEventListener("click", reset);
    reset();

    if (!reduced && "IntersectionObserver" in window) {
      var len = routeEl.getTotalLength();
      routeEl.style.strokeDasharray = len; routeEl.style.strokeDashoffset = len;
      new IntersectionObserver(function (en, obs) {
        if (!en[0].isIntersecting) return;
        routeEl.style.transition = "stroke-dashoffset 2.2s cubic-bezier(.2,.7,.1,1) .2s";
        routeEl.style.strokeDashoffset = 0;
        setTimeout(function () { routeEl.style.transition = ""; routeEl.style.strokeDasharray = ""; routeEl.style.strokeDashoffset = ""; }, 2600);
        obs.disconnect();
      }, { threshold: 0.4 }).observe(svg);
    }
  })();

  /* ============================================================
     Order book: live price ladder (simulated flow) + real benchmarks
     ============================================================ */
  (function orderBook() {
    var ladder = $("#ladder");
    if (!ladder) return;
    var LEVELS = 7, TICK = 0.01, r = rng(5);
    var bestBid = 101.24, bids = [], asks = [], msgs = 0, rows = [];
    for (var i = 0; i < LEVELS; i++) { bids.push(40 + Math.round(r() * 160)); asks.push(40 + Math.round(r() * 160)); }
    /* rows: asks from deepest to best, then the spread row, then bids from best to deepest */
    for (var j = 0; j < LEVELS * 2; j++) {
      var row = document.createElement("div");
      row.className = "lv " + (j < LEVELS ? "ask" : "bid");
      row.innerHTML = '<span class="lv-p"></span><span class="lv-bar"><i></i></span><span class="lv-s"></span>';
      rows.push(row);
      if (j === LEVELS) {
        var sp = document.createElement("div"); sp.className = "lv-spread mono"; sp.id = "lob-spread";
        ladder.appendChild(sp);
      }
      ladder.appendChild(row);
    }
    var lastEl = $("#lob-last"), msgEl = $("#lob-msgs"), spreadEl = $("#lob-spread");
    function render(flash) {
      var max = 1;
      bids.concat(asks).forEach(function (v) { if (v > max) max = v; });
      for (var i = 0; i < LEVELS; i++) {
        var a = rows[LEVELS - 1 - i], b = rows[LEVELS + i];
        a.firstChild.textContent = (bestBid + TICK * (i + 1)).toFixed(2);
        a.lastChild.textContent = asks[i];
        a.children[1].firstChild.style.width = (asks[i] / max) * 100 + "%";
        b.firstChild.textContent = (bestBid - TICK * i).toFixed(2);
        b.lastChild.textContent = bids[i];
        b.children[1].firstChild.style.width = (bids[i] / max) * 100 + "%";
      }
      spreadEl.textContent = "spread " + TICK.toFixed(2) + " · mid " + (bestBid + TICK / 2).toFixed(3);
      msgEl.textContent = msgs.toLocaleString();
      if (flash) {
        flash.classList.remove("hit"); void flash.offsetWidth; flash.classList.add("hit");
      }
    }
    function lvl() { var x = r(); return Math.min(LEVELS - 1, Math.floor(x * x * LEVELS)); } // activity concentrates at the touch
    function step() {
      var flash = null;
      for (var n = 0; n < 3; n++) {
        msgs++;
        var side = r() < 0.5 ? bids : asks, L = lvl(), e = r();
        if (e < 0.55) side[L] = Math.max(1, side[L] - 1 - Math.floor(r() * side[L] * 0.35));     // cancel / replace down
        else if (e < 0.9) side[L] += 5 + Math.floor(r() * 40);                                   // add
        else {                                                                                    // marketable order trades the touch
          var buy = side === asks, book = buy ? asks : bids, qty = 10 + Math.floor(r() * 60);
          var px = buy ? bestBid + TICK : bestBid;
          book[0] -= qty;
          if (book[0] <= 0) {
            book.shift(); book.push(40 + Math.floor(r() * 160));
            var other = buy ? bids : asks;
            other.unshift(5 + Math.floor(r() * 30)); other.pop();
            bestBid += buy ? TICK : -TICK;
          }
          lastEl.textContent = (buy ? "BUY " : "SELL ") + qty + " @ " + px.toFixed(2);
          lastEl.className = buy ? "buy" : "sell";
          flash = rows[buy ? LEVELS - 1 : LEVELS];
        }
      }
      render(flash);
    }
    render();
    var timer = null;
    function startBook() { if (!timer && !reduced) timer = setInterval(step, 140); }
    function stopBook() { clearInterval(timer); timer = null; }
    if (reduced) { for (var k = 0; k < 40; k++) step(); }
    else whileVisible(ladder, startBook, stopBook);

    /* tabs */
    $$("[data-lob]").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.dataset.lob;
        $$("[data-lob]").forEach(function (o) { o.classList.toggle("on", o === b); o.setAttribute("aria-pressed", o === b ? "true" : "false"); });
        $$(".lob-pane").forEach(function (p) { p.hidden = p.dataset.pane !== v; });
        $("#lob-title").textContent = v === "live" ? "Live order book" : "Benchmarks";
        if (v === "live") startBook(); else stopBook();
      });
    });
  })();

  /* ============================================================
     Cornell Quant: constrained portfolio optimizer (illustrative data)
     maximize Σ μᵢwᵢ  s.t.  Σwᵢ = 1,  0 ≤ wᵢ ≤ asset cap,  Σ_sector wᵢ ≤ sector cap.
     These caps are nested, so filling the highest-return assets first is the
     exact LP optimum.
     ============================================================ */
  (function portfolio() {
    var box = $("#port-bars");
    if (!box) return;
    var SECTORS = [["Tech", "var(--p1)"], ["Finance", "var(--p2)"], ["Health", "var(--p3)"], ["Energy", "var(--p4)"]];
    var ASSETS = [
      ["A", 0, 14], ["B", 2, 12], ["C", 0, 11], ["D", 3, 9.5],
      ["E", 1, 8], ["F", 0, 7], ["G", 2, 6], ["H", 3, 4.5],
    ];
    var capIn = $("#cap"), secIn = $("#sec"), MAXW = 50; // track spans 0–50%
    var rows = ASSETS.map(function (a) {
      var row = document.createElement("div"); row.className = "pb-row";
      row.innerHTML = '<span class="pb-name"><i></i><b></b><small></small></span><div class="pb-track"><div class="pb-fill"></div><div class="pb-cap"></div></div><span class="pb-v"></span>';
      row.querySelector("i").style.background = SECTORS[a[1]][1];
      row.querySelector("b").textContent = a[0];
      row.querySelector("small").textContent = "μ " + a[2] + "%";
      row.querySelector(".pb-fill").style.background = SECTORS[a[1]][1];
      box.appendChild(row);
      return row;
    });
    var legend = $("#port-legend");
    SECTORS.forEach(function (s) {
      var sp = document.createElement("span");
      sp.innerHTML = "<i></i>"; sp.firstChild.style.background = s[1];
      sp.appendChild(document.createTextNode(s[0]));
      legend.appendChild(sp);
    });
    function solve() {
      var cap = capIn.value / 100, secCap = secIn.value / 100, left = 1, sec = [secCap, secCap, secCap, secCap], ret = 0;
      $("#cap-v").textContent = capIn.value + "%";
      $("#sec-v").textContent = secIn.value + "%";
      ASSETS.forEach(function (a, i) {
        var w = Math.max(0, Math.min(cap, sec[a[1]], left));
        sec[a[1]] -= w; left -= w; ret += w * a[2];
        var why = w < 1e-9 ? "" : Math.abs(w - cap) < 1e-9 ? "asset cap" : Math.abs(sec[a[1]]) < 1e-9 ? "sector cap" : "";
        var r = rows[i], pct = Math.round(w * 1000) / 10;
        r.querySelector(".pb-fill").style.width = (w * 100 / MAXW) * 100 + "%";
        r.querySelector(".pb-cap").style.left = Math.min(100, (cap * 100 / MAXW) * 100) + "%";
        r.querySelector(".pb-v").innerHTML = pct + "%" + (why ? "<small>" + why + "</small>" : "");
        r.classList.toggle("zero", w < 1e-9);
        r.setAttribute("data-tip", "Asset " + a[0] + " · " + SECTORS[a[1]][0] + " · μ " + a[2] + "% · weight " + pct + "%" + (why ? " (" + why + ")" : ""));
      });
      $("#port-ret").textContent = left > 1e-9 ? "infeasible" : ret.toFixed(1) + "%";
    }
    capIn.addEventListener("input", solve);
    secIn.addEventListener("input", solve);
    solve();
  })();

  /* ============================================================
     Toolkit: which tools show up in which projects
     ============================================================ */
  (function skillGraph() {
    var body = $("#graph-body");
    if (!body) return;
    var WORK = [
      ["shopify", "Shopify", ["C++"]],
      ["icml", "ICML 2026 paper", ["LoRA/PEFT", "MLX", "Python"]],
      ["router", "Inference router", ["vLLM", "C++", "Docker", "Kubernetes"]],
      ["lob", "Order book engine", ["C++"]],
      ["arms", "ARMS Lab", ["Python", "FastAPI", "SQL", "C#", "RAG"]],
      ["access", "AccessMap AI", ["Python", "FastAPI", "Next.js", "Supabase"]],
      ["quant", "Cornell Quant engine", ["Python", "Pandas"]],
      ["pinpoint", "Pinpoint", ["Next.js", "Supabase", "PostgreSQL"]],
      ["arcadia", "Arcadia", ["C++", "ROS", "OpenCV"]],
      ["asdrp", "ASDRP", ["Python"]],
    ];
    var TOOLS = ["LoRA/PEFT", "MLX", "vLLM", "Python", "Docker", "Kubernetes", "C++", "RAG", "FastAPI", "SQL", "C#", "Pandas", "Next.js", "Supabase", "PostgreSQL", "ROS", "OpenCV"];
    var deg = {};
    WORK.forEach(function (w) { w[2].forEach(function (t) { deg[t] = (deg[t] || 0) + 1; }); });
    var left = $("#g-left"), right = $("#g-right"), svg = $("#g-links"), nodes = {}, links = [];
    function mk(list, key, label, sub) {
      var li = document.createElement("li"), b = document.createElement("button");
      b.className = "g-node"; b.type = "button";
      b.innerHTML = "<span></span>" + (sub ? '<span class="deg"></span>' : "");
      b.firstChild.textContent = label;
      if (sub) b.lastChild.textContent = sub;
      li.appendChild(b); list.appendChild(li);
      nodes[key] = b;
    }
    WORK.forEach(function (w) { mk(left, "w:" + w[0], w[1], String(w[2].length)); });
    TOOLS.forEach(function (t) { mk(right, "t:" + t, t, deg[t] > 1 ? "×" + deg[t] : ""); });
    WORK.forEach(function (w) {
      w[2].forEach(function (t) { links.push({ a: "w:" + w[0], b: "t:" + t, el: el("path", { class: "g-link" }, svg) }); });
    });
    function draw() {
      var br = body.getBoundingClientRect();
      links.forEach(function (l) {
        var a = nodes[l.a].getBoundingClientRect(), b = nodes[l.b].getBoundingClientRect();
        var x1 = a.right - br.left, y1 = a.top + a.height / 2 - br.top, x2 = b.left - br.left, y2 = b.top + b.height / 2 - br.top, mx = (x1 + x2) / 2;
        l.el.setAttribute("d", "M" + x1 + " " + y1 + " C " + mx + " " + y1 + ", " + mx + " " + y2 + ", " + x2 + " " + y2);
      });
    }
    function focus(key) {
      var on = {};
      if (key) { on[key] = true; links.forEach(function (l) { if (l.a === key || l.b === key) { on[l.a] = true; on[l.b] = true; } }); }
      Object.keys(nodes).forEach(function (k) {
        nodes[k].classList.toggle("on", !!key && !!on[k]);
        nodes[k].classList.toggle("dim", !!key && !on[k]);
      });
      links.forEach(function (l) {
        var hot = !!key && (l.a === key || l.b === key);
        l.el.classList.toggle("on", hot);
        l.el.classList.toggle("dim", !!key && !hot);
        if (hot) svg.appendChild(l.el);
      });
    }
    /* idle tour through the projects until someone interacts */
    var touched = false, tourI = 0, tourT = null, inView = false;
    function tour() {
      clearTimeout(tourT);
      if (touched || reduced || !inView) return;
      focus("w:" + WORK[tourI % WORK.length][0]);
      tourI++;
      tourT = setTimeout(tour, 2200);
    }
    Object.keys(nodes).forEach(function (k) {
      var n = nodes[k], pick = function () { touched = true; clearTimeout(tourT); focus(k); };
      n.addEventListener("mouseenter", pick);
      n.addEventListener("focus", pick);
      n.addEventListener("click", pick);
    });
    body.addEventListener("mouseleave", function () { focus(null); });
    draw();
    new ResizeObserver(draw).observe(body);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
    whileVisible(body, function () { inView = true; tour(); }, function () { inView = false; clearTimeout(tourT); });
  })();

  /* ============================================================
     Piano
     ============================================================ */
  var paletteOpen = function () { return false; };
  var playPhrase = (function piano() {
    var box = $("#piano-keys");
    if (!box) return function () {};
    var FREQ = {
      C4: 261.63, "C#4": 277.18, D4: 293.66, "D#4": 311.13, E4: 329.63, F4: 349.23, "F#4": 369.99,
      G4: 392.0, "G#4": 415.3, A4: 440.0, "A#4": 466.16, B4: 493.88, C5: 523.25, "C#5": 554.37,
      D5: 587.33, "D#5": 622.25, E5: 659.25,
    };
    var WHITE = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"];
    var BLACK = [["C#4", 0], ["D#4", 1], ["F#4", 3], ["G#4", 4], ["A#4", 5], ["C#5", 7], ["D#5", 8]];
    var KEYMAP = { a: "C4", w: "C#4", s: "D4", e: "D#4", d: "E4", f: "F4", t: "F#4", g: "G4", y: "G#4", h: "A4", u: "A#4", j: "B4", k: "C5", o: "C#5", l: "D5", p: "D#5", ";": "E5" };
    var keys = {};
    WHITE.forEach(function (n) {
      var b = document.createElement("button");
      b.className = "wkey"; b.textContent = n.replace(/\d/, ""); b.setAttribute("aria-label", n);
      b.addEventListener("pointerdown", function () { hit(n); });
      box.appendChild(b); keys[n] = b;
    });
    BLACK.forEach(function (p) {
      var b = document.createElement("button");
      b.className = "bkey"; b.setAttribute("aria-label", p[0]);
      b.style.left = "calc(16px + (100% - 32px) * " + (p[1] + 1) / WHITE.length + " - 3.5%)";
      b.addEventListener("pointerdown", function () { hit(p[0]); });
      box.appendChild(b); keys[p[0]] = b;
    });
    var actx = null;
    function audio() {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      return actx;
    }
    function note(freq, dur, when) {
      var c = audio(), t0 = c.currentTime + (when || 0);
      [[freq, 0.32, "triangle"], [freq * 2, 0.07, "sine"], [freq * 3, 0.025, "sine"]].forEach(function (o) {
        var osc = c.createOscillator(), g = c.createGain();
        osc.type = o[2]; osc.frequency.value = o[0];
        osc.connect(g); g.connect(c.destination);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(o[1], t0 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        osc.start(t0); osc.stop(t0 + dur + 0.05);
      });
    }
    function light(n, ms) {
      var k = keys[n]; if (!k) return;
      k.classList.add("on");
      setTimeout(function () { k.classList.remove("on"); }, ms || 160);
    }
    function hit(n) { note(FREQ[n], 1.1); light(n); }
    /* a Chopin-flavored phrase (Nocturne in E-flat, simplified) */
    var MELODY = [["A#4", 1], ["G4", 0.5], ["F4", 0.5], ["G4", 1], ["A#4", 1], ["A4", 0.5], ["G4", 0.5], ["F4", 1], ["D#4", 1],
      ["F4", 0.5], ["G4", 0.5], ["A4", 1], ["A#4", 1], ["D5", 0.5], ["C5", 0.5], ["A#4", 2]];
    var playBtn = $("#piano-play"), playing = false;
    function play() {
      if (playing) return;
      playing = true; playBtn.disabled = true; playBtn.textContent = "♪ Playing…";
      var beat = 0.42, t = 0;
      MELODY.forEach(function (m) {
        note(FREQ[m[0]], m[1] * beat + 0.4, t);
        (function (n, at, len) { setTimeout(function () { light(n, len); }, at); })(m[0], t * 1000, m[1] * beat * 800);
        t += m[1] * beat;
      });
      setTimeout(function () { playing = false; playBtn.disabled = false; playBtn.textContent = "▶ Play a phrase"; }, t * 1000 + 300);
    }
    playBtn.addEventListener("click", play);
    var inView = false;
    whileVisible(box, function () { inView = true; }, function () { inView = false; });
    addEventListener("keydown", function (e) {
      if (!inView || e.repeat || e.metaKey || e.ctrlKey || e.altKey || paletteOpen() || !$("#tldr").hidden) return;
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      var n = KEYMAP[e.key.toLowerCase()];
      if (n) { hit(n); e.preventDefault(); }
    });
    return play;
  })();

  /* ============================================================
     30-second summary
     ============================================================ */
  var tldr = $("#tldr"), tldrReturn = null;
  function openTldr() {
    tldrReturn = document.activeElement;
    tldr.hidden = false;
    document.body.style.overflow = "hidden";
    setTimeout(function () { $(".tldr-x", tldr).focus(); }, 10);
  }
  function closeTldr() {
    tldr.hidden = true;
    document.body.style.overflow = "";
    if (tldrReturn && tldrReturn.focus) tldrReturn.focus();
  }
  $$("[data-tldr]").forEach(function (b) { b.addEventListener("click", openTldr); });
  $$("[data-close]", tldr).forEach(function (b) { b.addEventListener("click", closeTldr); });
  tldr.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { e.preventDefault(); closeTldr(); return; }
    if (e.key !== "Tab") return;
    var f = $$("button, a[href]", tldr).filter(function (n) { return n.offsetParent !== null; });
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  $("#tldr-email").addEventListener("click", copyEmail);
  $("#tldr-copy").addEventListener("click", function () {
    var lines = [
      "Adisesh Venkatesh Sanklapur",
      "B.S. Computer Science, UC Davis (Exp. Dec 2027)",
      "",
      "Now: Software Engineering Intern, Shopify (search index serving)",
      "Research: First author, ICML 2026; AI Systems Researcher, ARMS Lab",
      "",
    ];
    $$(".tldr-list li", tldr).forEach(function (li) { lines.push("- " + li.textContent.replace(/\s+/g, " ").trim()); });
    lines.push("", "Core stack: " + $(".tldr-stack", tldr).textContent.replace("Core stack", "").trim());
    lines.push("", EMAIL, "github.com/adiseshvsanklapur", "linkedin.com/in/adivsanklapur", location.origin + location.pathname);
    copy(lines.join("\n"), "Summary copied to clipboard");
  });

  /* ============================================================
     Command palette (⌘K)
     ============================================================ */
  var pal = $("#palette"), palInput = $("#palette-input"), palList = $("#palette-list");
  var lastFocus = null, sel = 0, visibleItems = [];
  paletteOpen = function () { return !pal.hidden; };
  function goTo(id) { return function () { var t = document.getElementById(id); if (t) t.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); }; }
  function openUrl(u) { return function () { window.open(u, "_blank", "noopener"); }; }
  var ITEMS = [
    { g: "Start here", l: "30-second summary", ic: "⚡", k: "tldr overview", run: openTldr },
    { g: "Go to", l: "Flagship: inference router", s: "C++20 · −43% p99", ic: "01", k: "project systems vllm", run: goTo("flagship") },
    { g: "Go to", l: "Experience", s: "Shopify, ARMS Lab, Arcadia…", ic: "02", k: "work jobs internship", run: goTo("experience") },
    { g: "Go to", l: "Research", s: "ICML 2026", ic: "03", k: "paper publication llm", run: goTo("research") },
    { g: "Go to", l: "Projects", s: "Order book, AccessMap, Cornell Quant", ic: "04", k: "builds quant graph lob c++", run: goTo("projects") },
    { g: "Go to", l: "Toolkit & education", s: "Skills, UC Davis", ic: "05", k: "skills languages education honors", run: goTo("toolkit") },
    { g: "Go to", l: "About", ic: "06", k: "bio piano", run: goTo("about") },
    { g: "Go to", l: "Contact", ic: "07", k: "email hire reach", run: goTo("contact") },
    { g: "Do", l: "Copy email address", s: EMAIL, ic: "@", k: "contact mail", run: copyEmail },
    { g: "Do", l: "Toggle light / dark", ic: "◐", k: "theme mode dark light", run: toggleTheme },
    { g: "Do", l: "Play a Chopin phrase", ic: "♪", k: "piano music", run: function () { goTo("about")(); setTimeout(playPhrase, reduced ? 0 : 500); } },
    { g: "Open", l: "GitHub", s: "adiseshvsanklapur", ic: "↗", k: "code repos", run: openUrl("https://github.com/adiseshvsanklapur") },
    { g: "Open", l: "LinkedIn", s: "adivsanklapur", ic: "↗", k: "profile", run: openUrl("https://www.linkedin.com/in/adivsanklapur/") },
    { g: "Open", l: "ICML 2026 paper", s: "PDF", ic: "↗", k: "research diversity synthetic data", run: openUrl("https://genaicreativity.org/icml2026/files/67/67_paper.pdf") },
    { g: "Open", l: "Inference router repo", s: "GitHub", ic: "↗", k: "vllm c++ project", run: openUrl("https://github.com/adiseshvsanklapur/cache-aware-inference-router") },
    { g: "Open", l: "Order book engine repo", s: "GitHub", ic: "↗", k: "lob c++ quant matching", run: openUrl("https://github.com/adiseshvsanklapur/High-Performance-LOB") },
    { g: "Open", l: "AccessMap AI repo", s: "GitHub", ic: "↗", k: "hackdavis project map", run: openUrl("https://github.com/adiseshvsanklapur/AccessMapAI") },
  ];
  function render() {
    var q = palInput.value.trim().toLowerCase();
    visibleItems = ITEMS.filter(function (it) {
      if (it.when && !it.when()) return false;
      if (!q) return true;
      var hay = (it.l + " " + (it.s || "") + " " + it.k + " " + it.g).toLowerCase();
      return q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
    });
    if (sel >= visibleItems.length) sel = Math.max(0, visibleItems.length - 1);
    palList.innerHTML = "";
    if (!visibleItems.length) {
      var empty = document.createElement("li");
      empty.className = "palette-empty"; empty.textContent = "Nothing matches “" + palInput.value + "”";
      palList.appendChild(empty);
      return;
    }
    var group = null;
    visibleItems.forEach(function (it, i) {
      if (it.g !== group) {
        group = it.g;
        var h = document.createElement("li");
        h.className = "palette-group"; h.setAttribute("role", "presentation"); h.textContent = group;
        palList.appendChild(h);
      }
      var li = document.createElement("li");
      li.className = "palette-item"; li.id = "pi-" + i;
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", i === sel ? "true" : "false");
      li.innerHTML = '<span class="pi-ic"></span><span class="pi-l"></span>' + (it.s ? '<span class="pi-sub"></span>' : "");
      li.querySelector(".pi-ic").textContent = it.ic;
      li.querySelector(".pi-l").textContent = it.l;
      if (it.s) li.querySelector(".pi-sub").textContent = it.s;
      li.addEventListener("mousemove", function () { if (sel !== i) { sel = i; mark(); } });
      li.addEventListener("click", function () { choose(i); });
      palList.appendChild(li);
    });
    palInput.setAttribute("aria-activedescendant", "pi-" + sel);
  }
  function mark() {
    $$(".palette-item", palList).forEach(function (n) { n.setAttribute("aria-selected", n.id === "pi-" + sel ? "true" : "false"); });
    var cur = $("#pi-" + sel);
    if (cur) cur.scrollIntoView({ block: "nearest" });
    palInput.setAttribute("aria-activedescendant", "pi-" + sel);
  }
  function choose(i) {
    var it = visibleItems[i];
    if (!it) return;
    closePalette(true);
    it.run();
  }
  function openPalette() {
    if (paletteOpen()) return;
    lastFocus = document.activeElement;
    pal.hidden = false; palInput.value = ""; sel = 0; render();
    document.body.style.overflow = "hidden";
    setTimeout(function () { palInput.focus(); }, 10);
  }
  function closePalette(skipRestore) {
    pal.hidden = true;
    document.body.style.overflow = "";
    if (!skipRestore && lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $("#open-palette").addEventListener("click", openPalette);
  pal.addEventListener("click", function (e) { if (e.target.hasAttribute("data-close")) closePalette(); });
  palInput.addEventListener("input", function () { sel = 0; render(); });
  palInput.addEventListener("keydown", function (e) {
    var n = Math.max(1, visibleItems.length);
    if (e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % n; mark(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + n) % n; mark(); }
    else if (e.key === "Enter") { e.preventDefault(); choose(sel); }
    else if (e.key === "Escape") { e.preventDefault(); closePalette(); }
    else if (e.key === "Tab") { e.preventDefault(); }
  });
  addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (!tldr.hidden) closeTldr();
      paletteOpen() ? closePalette() : openPalette();
      return;
    }
    if (e.key === "/" && !paletteOpen() && tldr.hidden) {
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      if (tag !== "INPUT" && tag !== "TEXTAREA") { e.preventDefault(); openPalette(); }
    }
  });

  /* show the right modifier key on non-Mac platforms */
  if (!/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) {
    $$(".kbd-k, .footer kbd").forEach(function (k) { k.textContent = "Ctrl K"; });
  }
})();
