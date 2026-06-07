/* ============================================================
   Adi.OS — hero neural field (canvas, mouse-reactive)
   ============================================================ */
function NeuralField() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W, H, dpr, raf;
    const parent = canvas.parentElement;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = parent.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    addEventListener("resize", resize);

    const COUNT = Math.min(74, Math.round((W * H) / 16000));
    const nodes = [];
    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
        r: 1 + Math.random() * 1.8,
      });
    }
    // signals traveling along edges
    const signals = [];

    let mx = -999, my = -999, hasM = false;
    function onMove(e) {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
      hasM = mx >= 0 && my >= 0 && mx <= W && my <= H;
    }
    addEventListener("mousemove", onMove);

    const LINK = 132;
    let frame = 0;
    function draw() {
      frame++;
      ctx.clearRect(0, 0, W, H);

      // move
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        if (hasM && !reduced) {
          const dx = mx - n.x, dy = my - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 26000) {
            const d = Math.sqrt(d2) || 1;
            n.x += (dx / d) * 0.5; n.y += (dy / d) * 0.5; // gentle attract
          }
        }
      }

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK) continue;
          let op = (1 - dist / LINK) * 0.22;
          // brighten edges near cursor
          if (hasM) {
            const cmx = (a.x + b.x) / 2 - mx, cmy = (a.y + b.y) / 2 - my;
            const md = Math.hypot(cmx, cmy);
            if (md < 150) op += (1 - md / 150) * 0.4;
          }
          ctx.strokeStyle = `rgba(243,160,133,${op})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.stroke();

          // occasionally fire a signal along a near edge
          if (!reduced && hasM && Math.random() < 0.0008 && signals.length < 26) {
            signals.push({ a, b, t: 0, sp: 0.02 + Math.random() * 0.02 });
          }
        }
      }

      // signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.t += s.sp;
        if (s.t >= 1) { signals.splice(i, 1); continue; }
        const x = s.a.x + (s.b.x - s.a.x) * s.t;
        const y = s.a.y + (s.b.y - s.a.y) * s.t;
        ctx.fillStyle = "rgba(242,198,145,0.95)";
        ctx.shadowBlur = 8; ctx.shadowColor = "rgba(242,198,145,0.9)";
        ctx.beginPath(); ctx.arc(x, y, 1.6, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }

      // nodes
      for (const n of nodes) {
        let glow = 0;
        if (hasM) {
          const d = Math.hypot(n.x - mx, n.y - my);
          if (d < 150) glow = 1 - d / 150;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${200 + glow * 43},${150},${130},${0.5 + glow * 0.5})`;
        if (glow > 0.1) { ctx.shadowBlur = 12 * glow; ctx.shadowColor = "rgba(243,160,133,0.9)"; }
        ctx.arc(n.x, n.y, n.r + glow * 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    }
    if (reduced) { draw(); cancelAnimationFrame(raf); } // single static frame
    else draw();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={ref} className="neural-canvas" aria-hidden="true" />;
}
window.NeuralField = NeuralField;
