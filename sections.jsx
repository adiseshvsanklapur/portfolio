/* ============================================================
   Adi.OS — project viz motifs (simple generative SVG per kind)
   ============================================================ */
function ProjViz({ kind }) {
  const C = "rgba(243,160,133,";
  const A = "rgba(242,198,145,";
  if (kind === "systems") {
    // price-ladder bars (order book)
    const rows = Array.from({ length: 14 });
    return (
      <svg className="viz-svg" viewBox="0 0 320 96" preserveAspectRatio="none">
        {rows.map((_, i) => {
          const w = 30 + ((i * 53) % 180);
          const buy = i % 2 === 0;
          return (
            <rect
              key={i}
              x={buy ? 0 : 320 - w}
              y={i * 7 + 2}
              width={w}
              height={4}
              fill={(buy ? C : A) + (0.18 + (i % 5) * 0.12) + ")"}
            />
          );
        })}
        <line
          x1="160"
          y1="0"
          x2="160"
          y2="96"
          stroke={C + "0.35)"}
          strokeDasharray="2 3"
        />
      </svg>
    );
  }
  if (kind === "graph") {
    const nodes = [
      [40, 20],
      [120, 60],
      [80, 80],
      [210, 30],
      [270, 68],
      [170, 78],
      [300, 20],
      [230, 50],
      [60, 50],
      [150, 30],
    ];
    return (
      <svg className="viz-svg" viewBox="0 0 320 96">
        {nodes.map((n, i) =>
          nodes.slice(i + 1).map((m, j) => {
            const d = Math.hypot(n[0] - m[0], n[1] - m[1]);
            return d < 110 ? (
              <line
                key={i + "-" + j}
                x1={n[0]}
                y1={n[1]}
                x2={m[0]}
                y2={m[1]}
                stroke={C + "0.22)"}
              />
            ) : null;
          }),
        )}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n[0]}
            cy={n[1]}
            r={i === 3 ? 4 : 2.6}
            fill={i === 3 ? A + "0.95)" : C + "0.85)"}
          />
        ))}
      </svg>
    );
  }
  if (kind === "quant") {
    const bars = Array.from({ length: 26 });
    let y = 48;
    return (
      <svg className="viz-svg" viewBox="0 0 320 96">
        {bars.map((_, i) => {
          const up = Math.sin(i * 1.3) > -0.1;
          const h = 6 + ((i * 37) % 30);
          const x = i * 12 + 4;
          y += up ? -3 : 2.4;
          const top = Math.max(6, Math.min(70, y - h / 2));
          return (
            <g key={i}>
              <line
                x1={x}
                y1={top - 6}
                x2={x}
                y2={top + h + 6}
                stroke={(up ? C : A) + "0.5)"}
              />
              <rect
                x={x - 3}
                y={top}
                width="6"
                height={h}
                fill={(up ? C : A) + "0.8)"}
              />
            </g>
          );
        })}
      </svg>
    );
  }
  if (kind === "agent") {
    return (
      <svg className="viz-svg" viewBox="0 0 320 96">
        <circle cx="160" cy="48" r="14" fill="none" stroke={C + "0.8)"} />
        <circle cx="160" cy="48" r="4" fill={A + "0.9)"} />
        {[
          [50, 22],
          [60, 74],
          [260, 20],
          [270, 72],
          [160, 12],
          [160, 86],
        ].map((p, i) => (
          <g key={i}>
            <line
              x1="160"
              y1="48"
              x2={p[0]}
              y2={p[1]}
              stroke={C + "0.25)"}
              strokeDasharray="2 3"
            />
            <circle cx={p[0]} cy={p[1]} r="6" fill="none" stroke={C + "0.6)"} />
            <circle cx={p[0]} cy={p[1]} r="2" fill={C + "0.8)"} />
          </g>
        ))}
      </svg>
    );
  }
  if (kind === "ml") {
    return (
      <svg className="viz-svg" viewBox="0 0 320 96">
        {Array.from({ length: 46 }).map((_, i) => {
          const x = ((i * 61) % 310) + 5,
            yv = ((i * 97) % 84) + 6;
          const cls = x > 160 === yv < 48;
          return (
            <circle
              key={i}
              cx={x}
              cy={yv}
              r="2.4"
              fill={(cls ? C : A) + "0.7)"}
            />
          );
        })}
        <line
          x1="20"
          y1="86"
          x2="300"
          y2="10"
          stroke={C + "0.4)"}
          strokeDasharray="3 3"
        />
      </svg>
    );
  }
  if (kind === "vision") {
    // pixel grid with a swept edge-detect band
    const cells = [];
    for (let r = 0; r < 6; r++)
      for (let c = 0; c < 20; c++) {
        const on = Math.sin(c * 0.7) + Math.cos(r * 1.1) > 0.2;
        cells.push(
          <rect
            key={r + "-" + c}
            x={c * 16 + 2}
            y={r * 15 + 3}
            width="13"
            height="12"
            fill={(c > 8 && c < 12 ? A : C) + (on ? "0.45)" : "0.12)")}
          />,
        );
      }
    return (
      <svg className="viz-svg" viewBox="0 0 320 96">
        {cells}
      </svg>
    );
  }
  if (kind === "eng") {
    // concentric mechanical rings + spokes
    return (
      <svg className="viz-svg" viewBox="0 0 320 96">
        {[34, 24, 14].map((r, i) => (
          <circle
            key={i}
            cx="160"
            cy="48"
            r={r}
            fill="none"
            stroke={C + (0.5 - i * 0.1) + ")"}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (Math.PI * 2 * i) / 12;
          return (
            <line
              key={i}
              x1={160 + Math.cos(a) * 30}
              y1={48 + Math.sin(a) * 30}
              x2={160 + Math.cos(a) * 38}
              y2={48 + Math.sin(a) * 38}
              stroke={C + "0.6)"}
            />
          );
        })}
        <circle cx="160" cy="48" r="4" fill={A + "0.9)"} />
        <line x1="20" y1="80" x2="300" y2="80" stroke={C + "0.2)"} />
      </svg>
    );
  }
  // web
  return (
    <svg className="viz-svg" viewBox="0 0 320 96">
      <rect
        x="8"
        y="8"
        width="304"
        height="80"
        rx="6"
        fill="none"
        stroke={C + "0.25)"}
      />
      <line x1="8" y1="24" x2="312" y2="24" stroke={C + "0.25)"} />
      {[16, 30, 44].map((cx, i) => (
        <circle key={i} cx={cx} cy={16} r="2.4" fill={C + "0.5)"} />
      ))}
      {[
        [20, 34, 90],
        [120, 34, 80],
        [210, 34, 94],
        [20, 52, 70],
        [100, 52, 110],
        [222, 52, 82],
        [20, 70, 140],
      ].map((b, i) => (
        <rect
          key={i}
          x={b[0]}
          y={b[1]}
          width={b[2]}
          height="8"
          rx="2"
          fill={C + (i % 2 ? "0.18)" : "0.3)")}
        />
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------- nav */
function Nav({ onTerminal }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  const links = [
    ["work", "01"],
    ["experience", "02"],
    ["skills", "03"],
    ["about", "04"],
    ["contact", "05"],
  ];
  return (
    <nav className={"nav " + (scrolled ? "scrolled" : "")}>
      <a href="#top" className="brand" data-cursor="link">
        <span className="dot" />
        adi<b>.os</b>
      </a>
      <div className="nav-links">
        {links.map(([l, n]) => (
          <a key={l} href={"#" + l} data-cursor="link">
            <span className="n">{n}</span>
            {l}
          </a>
        ))}
      </div>
      <button className="term-toggle" data-cursor="link" onClick={onTerminal}>
        <Icon name="terminal" size={15} /> terminal
      </button>
    </nav>
  );
}

/* ---------------------------------------------------------------- hero */
function Hero() {
  const A = window.ADI;
  return (
    <header className="hero" id="top">
      <NeuralField />
      <div className="hero-grid" />
      <div className="wrap hero-inner">
        <div className="reveal in">
          <span className="hero-pill">
            <span className="live" /> CS + AI · UC Davis
          </span>
        </div>
        <h1 className="reveal in" data-cursor="text">
          adisesh
          <br />
          <span className="grad">venkatesh sanklapur.</span>
        </h1>
        <p className="hero-sub reveal in" data-cursor="text">
          machine learning · systems · software engineering.
        </p>
        <div className="hero-cta">
          <Magnetic strength={0.4}>
            <a href="#work" className="btn primary" data-cursor="link">
              <Icon name="arrow" size={15} stroke /> view the work
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href={A.identity.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn ghost"
              data-cursor="link"
            >
              <Icon name="github" size={16} /> github
            </a>
          </Magnetic>
        </div>
      </div>
      <div className="scroll-hint">
        <span>scroll</span>
        <span className="bar" />
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- stats */
function StatsStrip() {
  const ref = useReveal();
  return (
    <section className="section" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="wrap">
        <div className="stats reveal" ref={ref}>
          {window.ADI.stats.map((s, i) => (
            <div className="stat" key={i} data-cursor="link">
              <div className="v">{s.v}</div>
              <div className="l">{s.l}</div>
              <div className="k">{s.k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- experience */
function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <SecHead
          idx="02 / experience"
          kicker="the track record"
          title="Where I've shipped"
        />
        <div className="xp-list">
          {window.ADI.experience.map((x, i) => (
            <XpRow key={i} x={x} />
          ))}
        </div>
      </div>
    </section>
  );
}
function XpRow({ x }) {
  const ref = useReveal();
  return (
    <div className="xp reveal" ref={ref}>
      <div className="xp-when">
        {x.date}
        <span className="org">{x.org}</span>
      </div>
      <div>
        {x.flag && (
          <span className="flag-pub">
            <Icon name="trophy" size={12} /> {x.flag}
          </span>
        )}
        <div className="xp-role">{x.role}</div>
        {x.title && <div className="xp-paper">“{x.title}”</div>}
        <ul>
          {x.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        <div className="tag-row">
          {x.tags.map((t) => (
            <span className="tag" key={t} data-cursor="link">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- projects */
function Projects() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <SecHead
          idx="01 / selected work"
          kicker="things I've built"
          title="Engineering, end to end"
        />
        <div className="proj-grid">
          {window.ADI.projects.map((p, i) => (
            <ProjCard key={i} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
function ProjCard({ p }) {
  const ref = useReveal();
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function tilt(e) {
    trackGlow(e);
    if (reduced) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
  }
  function reset(e) {
    e.currentTarget.style.transform = "";
  }
  return (
    <a
      ref={ref}
      href={p.url || window.ADI.identity.githubUrl}
      target="_blank"
      rel="noreferrer"
      className={"proj card card-glow reveal " + (p.featured ? "big" : "")}
      data-cursor="link"
      onMouseMove={tilt}
      onMouseLeave={reset}
    >
      <div className="proj-viz">
        <ProjViz kind={p.kind} />
        {p.tag2 && <span className="proj-kind">{p.tag2}</span>}
      </div>
      <div className="proj-top">
        <div>
          <div className="proj-name">{p.name}</div>
          {p.award && (
            <div className="proj-award">
              <Icon name="trophy" size={13} /> {p.award}
            </div>
          )}
        </div>
        <span className="proj-arrow">
          <Icon name="arrow" size={18} stroke />
        </span>
      </div>
      <div className="proj-blurb">{p.blurb}</div>
      {p.metrics && (
        <div className="proj-metrics">
          {p.metrics.map((m, i) => (
            <div className="m" key={i}>
              <b>{m[0]}</b>
              <span>{m[1]}</span>
            </div>
          ))}
        </div>
      )}
      <div className="tag-row">
        {p.tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}

/* ---------------------------------------------------------------- shared section head */
function SecHead({ idx, kicker, title }) {
  return (
    <div className="sec-head">
      <div>
        <span className="kicker">{kicker}</span>
        <TypeOnView tag="h2" className="h-sec" text={title} />
      </div>
      <span className="idx">{idx}</span>
    </div>
  );
}

Object.assign(window, {
  ProjViz,
  Nav,
  Hero,
  StatsStrip,
  Experience,
  Projects,
  SecHead,
});
