/* ============================================================
   Adi.OS — custom cursor (canvas trail + morph + click burst)
   ============================================================ */
function Cursor() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse) return; // leave native cursor on touch

    document.body.classList.add("cursor-custom");
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, dpr;
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.width = innerWidth * dpr;
      H = canvas.height = innerHeight * dpr;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    addEventListener("resize", resize);

    const C = [243, 160, 133]; // cyan
    const A = [242, 198, 145]; // amber
    let mx = innerWidth / 2, my = innerHeight / 2;
    let rx = mx, ry = my; // eased ring
    let mode = "default"; // default | link | text
    let down = false, downScale = 0;
    const trail = [];
    const burst = [];
    let lastSpawn = 0;

    function onMove(e) {
      mx = e.clientX; my = e.clientY;
      const t = e.target.closest ? e.target.closest("[data-cursor]") : null;
      mode = t ? t.getAttribute("data-cursor") : "default";
      const now = performance.now();
      if (!reduced && now - lastSpawn > 16) {
        lastSpawn = now;
        trail.push({ x: mx, y: my, life: 1, r: 2 + Math.random() * 2 });
        if (trail.length > 46) trail.shift();
      }
    }
    function onDown() {
      down = true;
      if (reduced) return;
      const col = mode === "link" ? A : C;
      for (let i = 0; i < 16; i++) {
        const a = (Math.PI * 2 * i) / 16 + Math.random() * 0.4;
        const sp = 2.4 + Math.random() * 3.4;
        burst.push({ x: mx, y: my, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, col });
      }
    }
    function onUp() { down = false; }
    addEventListener("mousemove", onMove);
    addEventListener("mousedown", onDown);
    addEventListener("mouseup", onUp);
    addEventListener("mouseleave", () => { mode = "default"; });

    let raf;
    function rgba(c, a) { return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }
    function draw() {
      ctx.clearRect(0, 0, W, H);

      // trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= 0.045;
        if (p.life <= 0) { trail.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.fillStyle = rgba(C, p.life * 0.5);
        ctx.shadowBlur = 12; ctx.shadowColor = rgba(C, p.life * 0.6);
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // burst
      for (let i = burst.length - 1; i >= 0; i--) {
        const b = burst[i];
        b.x += b.vx; b.y += b.vy; b.vx *= 0.92; b.vy *= 0.92; b.life -= 0.03;
        if (b.life <= 0) { burst.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.fillStyle = rgba(b.col, b.life);
        ctx.arc(b.x, b.y, 2.2 * b.life, 0, Math.PI * 2);
        ctx.fill();
      }

      // eased ring
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      downScale += ((down ? 0.7 : 1) - downScale) * 0.25;

      const isLink = mode === "link";
      const isText = mode === "text";
      const col = isLink ? A : C;

      if (isText) {
        // I-beam: thin vertical bar at exact pointer
        ctx.strokeStyle = rgba(col, 0.9);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mx, my - 12); ctx.lineTo(mx, my + 12);
        ctx.stroke();
      } else {
        // outer ring (eased)
        const baseR = (isLink ? 22 : 14) * downScale;
        ctx.strokeStyle = rgba(col, isLink ? 0.9 : 0.55);
        ctx.lineWidth = isLink ? 1.6 : 1.2;
        ctx.beginPath();
        ctx.arc(rx, ry, baseR, 0, Math.PI * 2);
        ctx.stroke();

        if (isLink) {
          // crosshair ticks
          ctx.beginPath();
          [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy]) => {
            ctx.moveTo(rx + dx * (baseR - 5), ry + dy * (baseR - 5));
            ctx.lineTo(rx + dx * (baseR + 4), ry + dy * (baseR + 4));
          });
          ctx.stroke();
        }
        // inner dot (exact pointer)
        ctx.fillStyle = rgba(col, 1);
        ctx.shadowBlur = 10; ctx.shadowColor = rgba(col, 0.8);
        ctx.beginPath();
        ctx.arc(mx, my, isLink ? 2 : 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", onMove);
      removeEventListener("mousedown", onDown);
      removeEventListener("mouseup", onUp);
      document.body.classList.remove("cursor-custom");
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999,
    }} />
  );
}
window.Cursor = Cursor;
