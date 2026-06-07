/* ============================================================
   Adi.OS — app shell
   ============================================================ */
function ScrollProgress() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    f(); addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  return <div className="scroll-prog" ref={ref} />;
}

function App() {
  const wasBooted = (() => { try { return sessionStorage.getItem("adi_booted") === "1"; } catch (e) { return false; } })();
  const [booting, setBooting] = React.useState(!wasBooted);
  const [ready, setReady] = React.useState(wasBooted);
  const [terminal, setTerminal] = React.useState(false);
  const [egg, setEgg] = React.useState({ piano: false, car: false, toast: null });

  React.useEffect(() => {
    if (!booting) { const t = setTimeout(() => setReady(true), 40); return () => clearTimeout(t); }
  }, [booting]);

  // keyboard: ` toggles terminal
  React.useEffect(() => {
    const onKey = (e) => {
      if (booting) return;
      if (e.key === "`" || e.key === "~") { e.preventDefault(); setTerminal((t) => !t); }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [booting]);

  // lock body scroll while terminal open
  React.useEffect(() => {
    document.body.style.overflow = terminal ? "hidden" : "";
  }, [terminal]);

  function onEgg(key) {
    if (key === "piano") setEgg((e) => ({ ...e, piano: true }));
    else if (key === "arduino" || key === "car") setEgg((e) => ({ ...e, car: true }));
    else if (key === "code") setEgg((e) => ({ ...e, toast: "console.log('curiosity, compiling since 2017');" }));
  }
  function dismiss(which) {
    setEgg((e) => ({ ...e, [which === "toast" ? "toast" : which]: which === "toast" ? null : false }));
  }

  return (
    <React.Fragment>
      {booting && <BootSequence onDone={() => setBooting(false)} />}
      <Cursor />
      <div className="ambient" />
      <ScrollProgress />
      <div className={"app-shell " + (ready ? "ready" : "")}>
        <Nav onTerminal={() => setTerminal(true)} />
        <Hero />
        <main>
          <StatsStrip />
          <Projects />
          <Experience />
          <Skills />
          <About onEgg={onEgg} />
          <Contact onTerminal={() => setTerminal(true)} />
        </main>
      </div>
      {terminal && <Terminal onClose={() => setTerminal(false)} onEgg={onEgg} />}
      <EggLayer egg={egg} dismiss={dismiss} />
    </React.Fragment>
  );
}

/* ---- Reveal entrances are OFF by default so content is always visible.
   We only enable them (html.anim-on) once we confirm CSS transitions actually
   run in this environment — some preview iframes / throttled tabs freeze them.
   This guarantees content is never stuck invisible. ---- */
(function probeAnim() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = document.createElement("div");
    el.style.cssText = "position:fixed;left:-9999px;top:0;width:4px;height:4px;opacity:0.001;transition:opacity 50ms linear;pointer-events:none";
    document.body.appendChild(el);
    requestAnimationFrame(() => { el.style.opacity = "1"; });
    setTimeout(() => {
      const v = parseFloat(getComputedStyle(el).opacity);
      if (v > 0.5) document.documentElement.classList.add("anim-on");
      el.remove();
    }, 150);
  } catch (e) {}
})();

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
