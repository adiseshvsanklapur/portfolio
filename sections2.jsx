/* ============================================================
   Adi.OS — skills, about, contact, footer
   ============================================================ */

/* ---------------------------------------------------------------- skills */
function Skills() {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <SecHead
          idx="03 / capabilities"
          kicker="the toolkit"
          title="The stack I think in"
        />
        <div className="skill-cols">
          {window.ADI.skills.map((s, i) => (
            <SkillBlock key={i} s={s} />
          ))}
          <CourseworkBlock />
        </div>
      </div>
    </section>
  );
}
function SkillBlock({ s }) {
  const ref = useReveal();
  return (
    <div className="skill-block card reveal" ref={ref}>
      <h4>
        {s.group}
        <span className="c">{String(s.items.length).padStart(2, "0")}</span>
      </h4>
      <div className="tag-row">
        {s.items.map((it, i) => (
          <span
            className="tag skill-tag in"
            key={it}
            data-cursor="link"
            style={{ transitionDelay: i * 32 + "ms" }}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
function CourseworkBlock() {
  const ref = useReveal();
  return (
    <div className="skill-block card reveal" ref={ref}>
      <h4>
        Relevant Coursework<span className="c">@ UC DAVIS</span>
      </h4>
      <div className="tag-row">
        {window.ADI.coursework.map((c, i) => (
          <span
            className="tag skill-tag in"
            key={c}
            style={{ transitionDelay: i * 32 + "ms" }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- about */
function About({ onEgg }) {
  const A = window.ADI;
  const bodyRef = useReveal();
  const metaRef = useReveal();
  return (
    <section className="section" id="about">
      <div className="wrap">
        <SecHead
          idx="04 / profile"
          kicker="who's behind it"
          title="The short version"
        />
        <div className="about-grid">
          <div className="reveal" ref={bodyRef}>
            <p className="about-lead">
              Nine years of writing code, from a curious 11-year-old to{" "}
              <span className="hl">first-author ML research</span> and a C++
              engine that matches millions of orders a second.
            </p>
            <p className="about-body">
              I'm a Data Science (CS concentration) undergrad at UC Davis, drawn
              to the layer where
              <strong> theory meets the metal</strong> — training language
              models, squeezing latency out of C++, and shipping software that
              real people use.
            </p>
            <div className="hobby-strip">
              <span className="hobby-label mono">off the clock</span>
              <div className="hobby-chip-row">
                {A.hobbies.map((h) => (
                  <button
                    className="hobby-chip"
                    key={h.key}
                    data-cursor="link"
                    onClick={() => onEgg(h.key)}
                  >
                    <Icon
                      name={
                        { piano: "music", arduino: "cpu", code: "terminal" }[
                          h.key
                        ]
                      }
                      size={13}
                      stroke
                    />
                    <span>{h.label}</span>
                    <span className="hc-run mono">{h.hint}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="about-meta reveal" ref={metaRef}>
            <Vital
              k="education"
              v="B.S. Data Science (CS)"
              s="UC Davis · exp. Jun 2027"
            />
            <Vital k="focus" v="ML · Systems · SWE" s="research + production" />
            <Vital
              k="based"
              v={A.identity.location}
              s="open to 2026 internships"
            />
          </div>
        </div>
        <div className="course-wrap">
          <h4>Coursework</h4>
          <div className="tag-row">
            {A.coursework.map((c) => (
              <span className="tag" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="course-wrap">
          <h4>Awards</h4>
          <div className="tag-row">
            {A.awards.map((a) => (
              <span className="tag" key={a} data-cursor="link">
                <Icon name="trophy" size={11} /> {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Vital({ k, v, s }) {
  return (
    <div className="vital">
      <span className="vital-k">{k}</span>
      <span className="vital-v">{v}</span>
      <span className="vital-s">{s}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- contact + footer */
function Contact({ onTerminal }) {
  const A = window.ADI;
  const ref = useReveal();
  const [copied, setCopied] = React.useState(false);
  function copyEmail(e) {
    e.preventDefault();
    navigator.clipboard?.writeText(A.identity.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }
  return (
    <section className="section contact" id="contact">
      <div className="wrap">
        <div className="reveal" ref={ref}>
          <span
            className="kicker"
            style={{ justifyContent: "center", display: "flex" }}
          >
            let's build something
          </span>
          <h2 style={{ marginTop: 22 }}>
            Say <span className="grad">hello</span>.
          </h2>
          <p className="contact-sub">
            Open to roles in ML, systems, and software engineering.
          </p>
          <div className="contact-links">
            <Magnetic strength={0.3}>
              <a
                href={"mailto:" + A.identity.email}
                className="c-link"
                data-cursor="link"
                onClick={copyEmail}
              >
                <Icon name="mail" size={16} />{" "}
                {copied ? "copied to clipboard ✓" : A.identity.email}
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href={A.identity.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="c-link"
                data-cursor="link"
              >
                <Icon name="github" size={16} /> GitHub
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href={A.identity.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="c-link"
                data-cursor="link"
              >
                <Icon name="linkedin" size={16} /> LinkedIn
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href={"tel:" + A.identity.phone.replace(/\D/g, "")}
                className="c-link"
                data-cursor="link"
              >
                <Icon name="phone" size={15} stroke /> {A.identity.phone}
              </a>
            </Magnetic>
          </div>
          <button
            className="cmd-prompt"
            data-cursor="link"
            onClick={onTerminal}
            aria-label="open terminal"
          >
            <span className="cmd-line">
              <span className="cmd-dollar">adi@os:~$</span>
              <span className="cmd-typed">help</span>
              <span className="cmd-cur" />
            </span>
            <span className="cmd-hint mono">
              prefer a shell? click to open the terminal · or press ` anywhere
            </span>
          </button>
        </div>
        <div className="footer" style={{ marginTop: 80 }}>
          <span>© 2026 Adisesh V. Sanklapur</span>
          <span className="mono">adi.os v2.7 · built from scratch</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Skills, About, Contact });
