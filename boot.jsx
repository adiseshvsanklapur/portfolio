/* ============================================================
   Adi.OS — boot sequence intro
   ============================================================ */
function BootSequence({ onDone }) {
  const [lines, setLines] = React.useState([]);
  const [pct, setPct] = React.useState(0);
  const [leaving, setLeaving] = React.useState(false);
  const doneRef = React.useRef(false);

  const SCRIPT = [
    { t: "adiOS v2.7 — kernel boot", c: "dim" },
    { t: "» mounting /dev/curiosity ............ since 2017", c: "ok" },
    { t: "» loading module: machine_learning .... ICML'26 ✓", c: "ok" },
    { t: "» loading module: hpc_engine ......... 150ns ✓", c: "ok" },
    { t: "» loading module: systems_engineering . 6.5M ops/s ✓", c: "ok" },
    { t: "» calibrating neural field ........... 74 nodes online", c: "dim" },
    { t: "» spawning agents [llm · rag · search] linked", c: "dim" },
    { t: "» warming RC-car alarm subroutine ..... armed", c: "warn" },
    { t: "[ ok ] adi.identity verified — welcome.", c: "hi" },
  ];

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    setTimeout(() => { try { sessionStorage.setItem("adi_booted", "1"); } catch (e) {} onDone(); }, 620);
  }

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { finish(); return; }
    let i = 0;
    const interval = setInterval(() => {
      const idx = i;
      setLines((L) => [...L, SCRIPT[idx]]);
      i++;
      setPct(Math.round((i / SCRIPT.length) * 100));
      if (i >= SCRIPT.length) { clearInterval(interval); setTimeout(finish, 560); }
    }, 230);
    const onKey = () => finish();
    addEventListener("keydown", onKey);
    return () => { clearInterval(interval); removeEventListener("keydown", onKey); };
  }, []);

  return (
    <div className={"boot " + (leaving ? "boot-out" : "")}>
      <div className="boot-inner">
        <div className="boot-head">
          <span className="boot-dot" />
          <span>adi<b>.os</b></span>
          <span className="boot-ver">// personal systems environment</span>
        </div>
        <div className="boot-log">
          {lines.map((l, idx) => (
            <div key={idx} className={"boot-line " + (l.c || "")}>{l.t}</div>
          ))}
        </div>
        <div className="boot-bar">
          <div className="boot-bar-fill" style={{ width: pct + "%" }} />
        </div>
        <div className="boot-foot">
          <span>{pct}%</span>
          <button className="boot-skip" data-cursor="link" onClick={finish}>skip intro →</button>
        </div>
      </div>
    </div>
  );
}
window.BootSequence = BootSequence;
