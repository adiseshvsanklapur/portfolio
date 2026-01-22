import AdiFooter from "./AdiFooter";
// eslint-disable-next-line
import App from "./App.css";

function Home() {
  return (
    <>
      <main className="section hero">
        <div className="container hero-stack hero-center">
          <h1 className="hero-title reveal text-shine">
            Adisesh Venkatesh Sanklapur
          </h1>
          <p className="hero-subtitle hero-subtitle-row hero-subtitle-tight reveal" style={{ "--delay": "120ms" }}>
            <span className="hero-degree">CS/DS @ UC Davis</span>
            <span className="chip inline-chip">Expected Grad: Dec 2026</span>
          </p>
          <div className="hero-actions hero-actions-spaced reveal" style={{ "--delay": "200ms" }}>
            <a className="btn btn-primary" href="/about">
              About me
            </a>
            <a className="btn btn-ghost" href="/projects">
              View projects
            </a>
          </div>
          <div className="hero-links hero-links-spaced reveal" style={{ "--delay": "280ms" }}>
            <a
              className="icon-link"
              href="https://www.linkedin.com/in/adisesh-venkatesh-sanklapur-75405a21b/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              data-tooltip="Connect on LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 9h3v9H6zM7.5 6.5a1.5 1.5 0 11.001-3.001A1.5 1.5 0 017.5 6.5zM11 9h3v1.2c.6-.9 1.6-1.4 2.9-1.4 2.2 0 3.6 1.4 3.6 4v5.2h-3v-4.6c0-1.1-.4-1.8-1.4-1.8-1 0-1.6.7-1.8 1.4-.1.2-.1.6-.1 1v4h-3V9z" strokeWidth="1.4" />
              </svg>
            </a>
            <a
              className="icon-link"
              href="https://github.com/adiseshvsanklapur"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              data-tooltip="View GitHub"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.4 7 9.7.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.4-1-.9-1.3-.9-1.3-.8-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.5 1.1 3.1.8.1-.7.4-1.1.7-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 .9-2.7-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.8 1a9.4 9.4 0 015.1 0c2-1.3 2.8-1 2.8-1 .5 1.3.2 2.3.1 2.5.6.7.9 1.6.9 2.7 0 3.9-2.3 4.7-4.5 5 .4.3.8 1 .8 2v2.9c0 .3.2.6.7.5 4.1-1.3 7-5.2 7-9.7C22 6.6 17.5 2 12 2z" strokeWidth="1.2" />
              </svg>
            </a>
            <a
              className="icon-link"
              href="mailto:adivsanklapur@gmail.com"
              aria-label="Email"
              data-tooltip="Send an email"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" />
                <path d="M3 7l9 6 9-6" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
