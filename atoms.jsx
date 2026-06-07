/* ============================================================
   Adi.OS — shared atoms (icons, hooks, interactive primitives)
   ============================================================ */
const { useRef, useEffect, useState } = React;

const ICONS = {
  github: "M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2z",
  linkedin: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V10.4H5.9v7.94h2.44zM7.12 9.3a1.42 1.42 0 1 0 0-2.84 1.42 1.42 0 0 0 0 2.84zm11.22 9.04v-4.36c0-2.33-1.25-3.42-2.91-3.42-1.34 0-1.94.74-2.28 1.26v-1.08h-2.43c.03.69 0 7.94 0 7.94h2.43v-4.43c0-.22.02-.44.08-.6.18-.44.58-.9 1.26-.9.89 0 1.25.68 1.25 1.67v4.26h2.6z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 4.2V18h16V8.2l-8 5-8-5zM18.6 6H5.4l6.6 4.1L18.6 6z",
  phone: "M6.6 2.5 9 7l-2 1.5a12 12 0 0 0 6.5 6.5L15 13l4.5 2.4a1.5 1.5 0 0 1 .8 1.6l-.6 3a1.5 1.5 0 0 1-1.7 1.2A18 18 0 0 1 2.8 6.5 1.5 1.5 0 0 1 4 4.8l2.6-.6Z",
  terminal: "M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm2.7 4.3 3 3-3 3 1.4 1.4 4.4-4.4-4.4-4.4-1.4 1.4zM13 14h5v2h-5v-2z",
  arrow: "M7 17 17 7M9 7h8v8",
  trophy: "M7 4h10v2h3v3a4 4 0 0 1-4 4 5 5 0 0 1-2 1.8V18h2.5v2h-7v-2H12v-3.2A5 5 0 0 1 10 13a4 4 0 0 1-4-4V6h1V4zm0 4v1a2 2 0 0 0 2 2V8H7zm10 0h-2v3a2 2 0 0 0 2-2V8z",
  external: "M14 4h6v6M20 4l-9 9M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6",
  music: "M9 18a3 3 0 1 1-2-2.83V5l11-2v9.17A3 3 0 1 0 18 13V3L7 5v10",
  cpu: "M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2M6 6h12v12H6zM10 10h4v4h-4z",
  close: "M6 6l12 12M18 6 6 18",
  copy: "M9 9h10v10H9zM5 15H4V5h10v1",
  pin: "M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z",
};

function Icon({ name, size = 18, stroke = false, style }) {
  const d = ICONS[name];
  const common = { width: size, height: size, viewBox: "0 0 24 24", style, "aria-hidden": true };
  if (stroke) {
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    );
  }
  return (
    <svg {...common} fill="currentColor">
      <path d={d} />
    </svg>
  );
}

/* ----------------------------------------------------------------
   in-view watcher — scroll-position based (robust everywhere;
   IntersectionObserver is unreliable inside some preview iframes)
---------------------------------------------------------------- */
const _watchers = [];
let _watchBound = false;
let _watchRaf = 0;
function _runWatch() {
  const vh = window.innerHeight || 800;
  for (let i = _watchers.length - 1; i >= 0; i--) {
    const w = _watchers[i];
    const r = w.el.getBoundingClientRect();
    if (r.top < vh * 0.9 && r.bottom > vh * 0.04) {
      w.cb();
      _watchers.splice(i, 1);
    }
  }
}
function _scheduleWatch() {
  // call directly (rAF can be frozen in throttled preview iframes) + rAF for smoothness
  _runWatch();
  cancelAnimationFrame(_watchRaf);
  _watchRaf = requestAnimationFrame(_runWatch);
}
function watchInView(el, cb) {
  if (!el) return;
  _watchers.push({ el, cb });
  if (!_watchBound) {
    _watchBound = true;
    window.addEventListener("scroll", _scheduleWatch, { passive: true });
    window.addEventListener("resize", _scheduleWatch);
  }
  _scheduleWatch();
  // a few delayed sweeps catch late-mounted / late-laid-out nodes
  [120, 400, 900].forEach((t) => setTimeout(_scheduleWatch, t));
}

/* reveal-on-scroll: adds .in when element enters viewport */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("in");
      return;
    }
    const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;
    watchInView(el, () => setTimeout(() => el.classList.add("in"), delay));
  }, []);
  return ref;
}

/* self-typing text once it enters view */
function TypeOnView({ text, className, speed = 38, tag = "span" }) {
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) { setShown(text.length); setStarted(true); return; }
    watchInView(el, () => {
      setStarted(true);
      // only type when animations are confirmed; otherwise show full text
      if (!document.documentElement.classList.contains("anim-on")) setShown(text.length);
    });
    // safety net: never leave a header empty
    const fb = setTimeout(() => {
      if (!document.documentElement.classList.contains("anim-on")) { setStarted(true); setShown(text.length); }
    }, 1200);
    return () => clearTimeout(fb);
  }, [text]);
  useEffect(() => {
    if (!started || reduced) return;
    if (!document.documentElement.classList.contains("anim-on")) { setShown(text.length); return; }
    if (shown >= text.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), speed);
    return () => clearTimeout(t);
  }, [started, shown, text]);
  const Tag = tag;
  const done = shown >= text.length;
  return (
    <Tag ref={ref} className={className}>
      {text.slice(0, shown)}
      <span className={"caret " + (started && !done ? "on" : "")}>{done ? "" : "\u00A0"}</span>
    </Tag>
  );
}

/* magnetic wrapper — child drifts toward cursor when near */
function Magnetic({ children, strength = 0.4, className, ...rest }) {
  const ref = useRef(null);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function move(e) {
    if (reduced) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }
  function leave() {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }
  return (
    <div ref={ref} className={className} onMouseMove={move} onMouseLeave={leave}
      style={{ transition: "transform .35s cubic-bezier(.2,.7,.2,1)", willChange: "transform" }} {...rest}>
      {children}
    </div>
  );
}

/* pointer-tracked glow position for cards (sets --mx/--my) */
function trackGlow(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
  e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
}

Object.assign(window, { Icon, useReveal, TypeOnView, Magnetic, trackGlow });
