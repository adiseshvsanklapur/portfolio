/* ============================================================
   Adi.OS — hero name as an interactive particle field.
   The name is built from hundreds of points; the cursor pushes
   them aside, reaches lines into the letters, and they settle back.
   ============================================================ */
function NameField() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    let W, H, dpr, raf, particles = [];
    let mx = -9999, my = -9999, hasM = false;
    let t0 = performance.now();

    const LINES = ["Adisesh", "Sanklapur"];
    const CORAL = [243, 160, 133];
    const LILAC = [206, 170, 214];

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = parent.getBoundingClientRect();
      W = Math.max(1, r.width); H = Math.max(1, r.height);
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // offscreen render of the name to sample point positions
      const off = document.createElement("canvas");
      off.width = W; off.height = H;
      const o = off.getContext("2d");
      o.fillStyle = "#fff";
      o.textBaseline = "middle";
      o.textAlign = "left";
      let size = Math.min(H * 0.44, W * 0.155);
      o.font = `800 ${size}px "Plus Jakarta Sans", system-ui, sans-serif`;
      let maxw = Math.max(...LINES.map((l) => o.measureText(l).width));
      if (maxw > W * 0.96) { size *= (W * 0.96) / maxw; o.font = `800 ${size}px "Plus Jakarta Sans", system-ui, sans-serif`; }
      const lineH = size * 1.0;
      const totalH = lineH * LINES.length;
      const y0 = H / 2 - totalH / 2 + lineH / 2;
      LINES.forEach((l, i) => o.fillText(l, 0, y0 + i * lineH));

      const data = o.getImageData(0, 0, W, H).data;
      const step = Math.max(3, Math.round(size / 26));
      const targets = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] > 130) {
            targets.push([x + (Math.random() - 0.5) * step, y + (Math.random() - 0.5) * step, y < y0 + lineH * 0.5 ? 0 : 1]);
          }
        }
      }
      // preserve current positions on resize where possible
      const prev = particles;
      particles = targets.map((tg, i) => {
        const old = prev[i];
        return {
          tx: tg[0], ty: tg[1], line: tg[2],
          x: old ? old.x : tg[0], y: old ? old.y : tg[1],
          vx: 0, vy: 0,
          size: 1.15 + Math.random() * 0.95,
          ph: Math.random() * Math.PI * 2,
        };
      });
    }

    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      hasM = mx > -40 && my > -40 && mx < W + 40 && my < H + 40;
    }
    function onLeave() { hasM = false; mx = -9999; my = -9999; }
    window.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    function frame(now) {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, W, H);

      // physics
      for (const p of particles) {
        // spring to target
        p.vx += (p.tx - p.x) * 0.022;
        p.vy += (p.ty - p.y) * 0.022;
        // idle shimmer (subtle, keeps letters legible)
        if (!reduced) {
          p.vx += Math.sin(t * 1.1 + p.ph) * 0.018;
          p.vy += Math.cos(t * 0.9 + p.ph) * 0.018;
        }
        // cursor repulsion
        if (hasM) {
          const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
          if (d2 < 9500) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / 97) * 3.4;
            p.vx += (dx / d) * f; p.vy += (dy / d) * f;
          }
        }
        p.vx *= 0.85; p.vy *= 0.85;
        p.x += p.vx; p.y += p.vy;
      }

      // lines reaching from the cursor into the letters
      if (hasM) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < particles.length; i += 2) {
          const p = particles[i];
          const dx = p.x - mx, dy = p.y - my;
          const d = Math.hypot(dx, dy);
          if (d < 125) {
            ctx.strokeStyle = `rgba(243,160,133,${(1 - d / 125) * 0.45})`;
            ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(p.x, p.y); ctx.stroke();
          }
        }
      }

      // dots
      for (const p of particles) {
        let glow = 0;
        if (hasM) {
          const d = Math.hypot(p.x - mx, p.y - my);
          if (d < 125) glow = 1 - d / 125;
        }
        const base = p.line === 0 ? CORAL : LILAC;
        const rr = Math.round(base[0] + glow * (255 - base[0]) * 0.7);
        const gg = Math.round(base[1] + glow * 40);
        const bb = Math.round(base[2] + glow * 25);
        if (glow > 0.18) { ctx.shadowBlur = 9 * glow; ctx.shadowColor = "rgba(245,175,140,0.9)"; }
        ctx.fillStyle = `rgba(${rr},${gg},${bb},${0.82 + glow * 0.18})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + glow * 1.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(frame);
    }

    let mounted = true;
    function start() { if (mounted) build(); }
    // sample immediately (fallback metrics), then re-sample once the webfont loads
    build();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
    raf = requestAnimationFrame(frame);

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return <canvas ref={ref} className="name-canvas" aria-hidden="true" />;
}
window.NameField = NameField;
