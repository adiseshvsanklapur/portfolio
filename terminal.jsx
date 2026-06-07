/* ============================================================
   Adi.OS — terminal mode (CRT command line)
   ============================================================ */
function Terminal({ onClose, onEgg }) {
  const A = window.ADI;
  const [log, setLog] = React.useState([]);
  const [val, setVal] = React.useState("");
  const [hist, setHist] = React.useState([]);
  const [hi, setHi] = React.useState(-1);
  const bodyRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const BANNER = [
    "    _    ____  ___     ____  _____",
    "   / \\  |  _ \\|_ _|   / __ \\/  ___|",
    "  / _ \\ | | | || |   | |  | |\\___ \\",
    " / ___ \\| |_| || |   | |__| |___) |",
    " /_/   \\_\\____/|___|   \\____/|____/   v2.7",
    "",
    "adisesh venkatesh sanklapur · cs + ai · uc davis",
    "type `help` for commands, `exit` to return to the GUI.",
    "",
  ];

  React.useEffect(() => {
    setLog(BANNER.map((t) => ({ k: "out", t })));
    const id = setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
    return () => clearTimeout(id);
  }, []);
  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [log]);

  function out(lines) { return lines.map((t) => ({ k: "out", t })); }
  function err(t) { return [{ k: "err", t }]; }

  const COMMANDS = {
    help: () => out([
      "available commands",
      "  adi --about         who I am",
      "  adi --projects      selected work (alias: -p)",
      "  adi --experience    work history (alias: -x)",
      "  adi --skills        the toolkit",
      "  adi --awards        recognition",
      "  adi --contact       how to reach me",
      "  neofetch            system summary",
      "  open <section>      jump to a section in the GUI",
      "  piano               \u266A play a little Chopin",
      "  car                 \uD83D\uDE97 release the alarm car",
      "  whoami · ls · date · clear · exit",
    ]),
    whoami: () => out(["adi  —  builder of intelligent systems."]),
    ls: () => out(["work/  experience/  skills/  about/  contact/  resume.pdf  alarm-car.ino"]),
    date: () => out([new Date().toString()]),
    clear: () => { setLog([]); return null; },
    exit: () => { onClose(); return null; },
    gui: () => { onClose(); return null; },
    neofetch: () => out([
      "adi@adi-os",
      "-----------",
      "OS      : adiOS 2.7 (curiosity kernel, est. 2017)",
      "Host    : UC Davis · B.S. Data Science (CS)",
      "Uptime  : ICML 2026 · first-author publication",
      "Engine  : C++ LOB — 6.5M orders/s @ 150ns",
      "Awards  : Dean's List · HackDavis T3 · Cornell T5",
      "Music   : Chopin, Rachmaninoff (CM Level 10)",
      "Shell   : /bin/build-cool-things",
    ]),
    piano: () => { onEgg("piano"); return out(["\u266A spawning pixel piano \u2014 click the keys."]); },
    car: () => { onEgg("arduino"); return out(["\uD83D\uDE97 alarm armed \u2014 click the RC car before it drives away."]); },
    sudo: () => err("nice try. adi does not grant root to strangers."),
  };

  function adiFlag(flag) {
    switch (flag) {
      case "--about": case "-a":
        return out([
          "adi · data science (cs) @ uc davis · grad jun 2027 · bay area",
          A.identity.oneliner,
          "started coding at 11 · now publishing ML research and shipping C++ engines.",
        ]);
      case "--projects": case "-p":
        return out([
          "selected work:",
          ...A.projects.map((p, i) => `  ${String(i + 1).padStart(2, "0")}  ${p.name}${p.award ? "  [" + p.award + "]" : ""}`),
          "→ run `open work` to view them in the GUI.",
        ]);
      case "--experience": case "-x":
        return out([
          "experience:",
          ...A.experience.map((x) => `  ${x.date.padEnd(18)} ${x.role} · ${x.org}`),
        ]);
      case "--skills": case "-s":
        return out(A.skills.map((s) => `  ${s.group.padEnd(14)} ${s.items.join(", ")}`));
      case "--awards":
        return out(A.awards.map((a) => `  \u2691 ${a}`));
      case "--contact": case "-c":
        return out([
          `  email     ${A.identity.email}`,
          `  phone     ${A.identity.phone}`,
          `  github    ${A.identity.github}`,
          `  linkedin  ${A.identity.linkedin}`,
        ]);
      case "--help": case "-h":
        return COMMANDS.help();
      default:
        return err(`adi: unknown flag '${flag}'. try 'adi --help'.`);
    }
  }

  function run(raw) {
    const cmd = raw.trim();
    if (!cmd) { setLog((p) => [...p, { k: "cmd", t: cmd }]); return; }
    const [base, ...args] = cmd.split(/\s+/);
    if (base === "clear") { setLog([]); return; }
    let result;
    if (base === "adi") result = adiFlag(args[0] || "--help");
    else if (base === "open") {
      const target = (args[0] || "").replace("#", "");
      const valid = ["work", "experience", "skills", "about", "contact", "top"];
      if (valid.includes(target)) {
        result = out([`opening #${target} …`]);
        setTimeout(() => { onClose(); setTimeout(() => { const el = document.getElementById(target); el && el.scrollIntoView(); }, 380); }, 400);
      } else result = err(`open: no section '${args[0]}'. try: ${valid.join(", ")}`);
    }
    else if (base === "echo") result = out([args.join(" ")]);
    else if (COMMANDS[base]) result = COMMANDS[base]();
    else result = err(`command not found: ${base}. type 'help'.`);
    setLog((p) => [...p, { k: "cmd", t: cmd }, ...(result || [])]);
  }

  function onKey(e) {
    if (e.key === "Enter") {
      run(val);
      if (val.trim()) { setHist((h) => [val, ...h]); }
      setVal(""); setHi(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHi((i) => { const n = Math.min(i + 1, hist.length - 1); if (hist[n] !== undefined) setVal(hist[n]); return n; });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHi((i) => { const n = Math.max(i - 1, -1); setVal(n === -1 ? "" : hist[n]); return n; });
    } else if (e.key === "Tab") {
      e.preventDefault();
      const opts = ["help", "adi --about", "adi --projects", "adi --experience", "adi --skills", "adi --awards", "adi --contact", "neofetch", "open work", "piano", "car", "whoami", "clear", "exit"];
      const m = opts.find((o) => o.startsWith(val));
      if (m) setVal(m);
    } else if (e.key === "Escape") { onClose(); }
  }

  return (
    <div className="term" onClick={() => inputRef.current && inputRef.current.focus()}>
      <div className="term-scan" />
      <div className="term-chrome">
        <span className="term-dots"><i /><i /><i /></span>
        <span className="term-title">adi@adi-os — /bin/bash — 80×24</span>
        <button className="term-x" data-cursor="link" onClick={(e) => { e.stopPropagation(); onClose(); }}>
          <Icon name="close" size={14} stroke /> exit
        </button>
      </div>
      <div className="term-body" ref={bodyRef}>
        {log.map((l, i) => (
          <div key={i} className={"term-row " + l.k}>
            {l.k === "cmd" ? <span><span className="prompt">adi@os:~$</span> {l.t}</span> : <pre>{l.t}</pre>}
          </div>
        ))}
        <div className="term-input">
          <span className="prompt">adi@os:~$</span>
          <input ref={inputRef} value={val} spellCheck="false" autoComplete="off"
            onChange={(e) => setVal(e.target.value)} onKeyDown={onKey} />
          <span className="term-caret" />
        </div>
      </div>
    </div>
  );
}
window.Terminal = Terminal;
