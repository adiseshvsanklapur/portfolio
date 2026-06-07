/* ============================================================
   Adi.OS — easter eggs: pixel piano + RC alarm car + toast
   ============================================================ */
const FREQ = {
  C4: 261.63, "C#4": 277.18, D4: 293.66, "D#4": 311.13, E4: 329.63,
  F4: 349.23, "F#4": 369.99, G4: 392.0, "G#4": 415.3, A4: 440.0,
  "A#4": 466.16, B4: 493.88, C5: 523.25,
};

let _actx = null;
function audio() {
  if (!_actx) _actx = new (window.AudioContext || window.webkitAudioContext)();
  if (_actx.state === "suspended") _actx.resume();
  return _actx;
}
function playNote(freq, dur = 0.5, when = 0, gainMul = 1) {
  const ctx = audio();
  const t0 = ctx.currentTime + when;
  // two oscillators (fundamental + soft octave) for a warmer "piano-ish" tone
  [[freq, 0.5 * gainMul, "triangle"], [freq * 2, 0.12 * gainMul, "sine"]].forEach(([f, g, type]) => {
    const o = ctx.createOscillator();
    const a = ctx.createGain();
    o.type = type; o.frequency.value = f;
    o.connect(a); a.connect(ctx.destination);
    a.gain.setValueAtTime(0.0001, t0);
    a.gain.exponentialRampToValueAtTime(g, t0 + 0.012);
    a.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.start(t0); o.stop(t0 + dur + 0.05);
  });
}

// a little Chopin-flavored phrase (Nocturne-ish), [note, beats]
const MELODY = [
  ["A#4", 1], ["G4", 0.5], ["F4", 0.5], ["G4", 1], ["A#4", 1],
  ["A4", 0.5], ["G4", 0.5], ["F4", 1], ["D#4", 1],
  ["F4", 0.5], ["G4", 0.5], ["A4", 1], ["A#4", 2],
];

const WHITE = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
const BLACK = [
  { n: "C#4", i: 0 }, { n: "D#4", i: 1 }, { n: "F#4", i: 3 }, { n: "G#4", i: 4 }, { n: "A#4", i: 5 },
];

function PixelPiano({ onClose }) {
  const [active, setActive] = React.useState(null);
  const [playing, setPlaying] = React.useState(false);
  function hit(n) {
    playNote(FREQ[n], 0.7);
    setActive(n); setTimeout(() => setActive((a) => (a === n ? null : a)), 140);
  }
  function playMelody() {
    if (playing) return;
    setPlaying(true);
    const bpm = 0.42;
    let t = 0;
    MELODY.forEach(([n, b]) => {
      playNote(FREQ[n], b * bpm + 0.25, t);
      setTimeout(() => { setActive(n); setTimeout(() => setActive((a) => (a === n ? null : a)), b * bpm * 1000 * 0.7); }, t * 1000);
      t += b * bpm;
    });
    setTimeout(() => setPlaying(false), t * 1000 + 400);
  }
  return (
    <div className="egg-piano card" role="dialog" aria-label="pixel piano">
      <div className="egg-head">
        <span className="egg-title"><Icon name="music" size={14} /> nocturne.exe</span>
        <div className="egg-actions">
          <button className="egg-btn" data-cursor="link" onClick={playMelody} disabled={playing}>
            {playing ? "♪ playing…" : "▶ play chopin"}
          </button>
          <button className="egg-close" data-cursor="link" onClick={onClose}><Icon name="close" size={13} stroke /></button>
        </div>
      </div>
      <div className="piano">
        <div className="piano-whites">
          {WHITE.map((n) => (
            <button key={n} className={"wkey " + (active === n ? "on" : "")} data-cursor="link"
              onMouseDown={() => hit(n)}><span>{n[0]}</span></button>
          ))}
        </div>
        <div className="piano-blacks">
          {BLACK.map(({ n, i }) => (
            <button key={n} className={"bkey " + (active === n ? "on" : "")} data-cursor="link"
              style={{ left: `calc(${i} * (100% / 8) + (100% / 8) - 14px)` }}
              onMouseDown={() => hit(n)} />
          ))}
        </div>
      </div>
      <div className="egg-foot mono">a little Chopin · ♪ click the keys</div>
    </div>
  );
}

function RcCar({ onClose }) {
  const DURATION_MS = 9000;
  const [phase, setPhase] = React.useState("active"); // active | caught | missed

  React.useEffect(() => {
    if (phase !== "active") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setPhase("missed"), reduced ? 12000 : DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  React.useEffect(() => {
    if (phase === "caught") {
      const t = setTimeout(onClose, 1400);
      return () => clearTimeout(t);
    }
    if (phase === "missed") {
      const t = setTimeout(onClose, 2200);
      return () => clearTimeout(t);
    }
  }, [phase, onClose]);

  function disarm() {
    if (phase !== "active") return;
    setPhase("caught");
  }

  return (
    <React.Fragment>
      <div className="egg-car-panel card" role="dialog" aria-label="Arduino alarm car">
        <div className="egg-head">
          <span className="egg-title"><Icon name="cpu" size={14} /> alarm-car.ino</span>
          <button className="egg-close" data-cursor="link" onClick={onClose} aria-label="Close">
            <Icon name="close" size={13} stroke />
          </button>
        </div>
        {phase === "active" && (
          <React.Fragment>
            <p className="egg-car-msg">
              Your Arduino alarm is going off. <strong>Click the RC car</strong> racing below to shut it down.
            </p>
            <div className="egg-car-track">
              <span className="egg-car-track-label mono">time left</span>
              <div className="egg-car-track-bar"><div className="egg-car-track-fill" /></div>
            </div>
          </React.Fragment>
        )}
        {phase === "caught" && (
          <p className="egg-car-msg egg-car-msg--ok mono">✓ Alarm disarmed. You can sleep now.</p>
        )}
        {phase === "missed" && (
          <p className="egg-car-msg egg-car-msg--miss mono">The car got away. Alarm still blaring…</p>
        )}
      </div>

      {phase === "active" && (
        <button type="button" className="egg-car" data-cursor="link" onClick={disarm} aria-label="Click to disarm alarm">
          <span className="car-target-ring" aria-hidden="true" />
          <span className="car-bubble mono">click to disarm</span>
          <svg className="car-svg" viewBox="0 0 64 34" shapeRendering="crispEdges" aria-hidden="true">
            <rect x="6" y="16" width="52" height="10" fill="oklch(0.78 0.115 33)" />
            <rect x="16" y="8" width="28" height="9" fill="oklch(0.7 0.12 28)" />
            <rect x="20" y="10" width="9" height="6" fill="oklch(0.185 0.01 55)" />
            <rect x="32" y="10" width="9" height="6" fill="oklch(0.185 0.01 55)" />
            <rect x="54" y="18" width="5" height="4" fill="oklch(0.85 0.09 75)" />
            <rect x="2" y="18" width="4" height="4" fill="oklch(0.85 0.09 75)" />
            <g className="wheel"><rect x="12" y="24" width="11" height="8" fill="oklch(0.3 0.01 55)" /><rect x="16" y="27" width="3" height="2" fill="oklch(0.7 0.01 55)" /></g>
            <g className="wheel"><rect x="40" y="24" width="11" height="8" fill="oklch(0.3 0.01 55)" /><rect x="44" y="27" width="3" height="2" fill="oklch(0.7 0.01 55)" /></g>
          </svg>
        </button>
      )}
      {phase === "caught" && (
        <div className="egg-car egg-car--caught" aria-hidden="true">
          <svg className="car-svg" viewBox="0 0 64 34" shapeRendering="crispEdges">
            <rect x="6" y="16" width="52" height="10" fill="oklch(0.78 0.115 33)" />
            <rect x="16" y="8" width="28" height="9" fill="oklch(0.7 0.12 28)" />
            <rect x="20" y="10" width="9" height="6" fill="oklch(0.185 0.01 55)" />
            <rect x="32" y="10" width="9" height="6" fill="oklch(0.185 0.01 55)" />
            <rect x="54" y="18" width="5" height="4" fill="oklch(0.85 0.09 75)" />
            <rect x="2" y="18" width="4" height="4" fill="oklch(0.85 0.09 75)" />
            <g className="wheel"><rect x="12" y="24" width="11" height="8" fill="oklch(0.3 0.01 55)" /><rect x="16" y="27" width="3" height="2" fill="oklch(0.7 0.01 55)" /></g>
            <g className="wheel"><rect x="40" y="24" width="11" height="8" fill="oklch(0.3 0.01 55)" /><rect x="44" y="27" width="3" height="2" fill="oklch(0.7 0.01 55)" /></g>
          </svg>
        </div>
      )}
    </React.Fragment>
  );
}

function Toast({ msg, onClose }) {
  React.useEffect(() => { const t = setTimeout(onClose, 2600); return () => clearTimeout(t); }, []);
  return <div className="egg-toast mono">{msg}</div>;
}

function EggLayer({ egg, dismiss }) {
  return (
    <React.Fragment>
      {egg.piano && <PixelPiano onClose={() => dismiss("piano")} />}
      {egg.car && <RcCar onClose={() => dismiss("car")} />}
      {egg.toast && <Toast msg={egg.toast} onClose={() => dismiss("toast")} />}
    </React.Fragment>
  );
}

Object.assign(window, { EggLayer, playNote });
