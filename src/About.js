import React from "react";
// eslint-disable-next-line
import App from "./App.css";
import AdiFooter from "./AdiFooter";

const skills = {
  Languages: [
    "C++20",
    "Python",
    "Java",
    "C",
    "SQL (PostgreSQL)",
    "TypeScript",
    "JavaScript",
    "R",
    "Bash",
  ],
  "ML & Data": [
    "PyTorch",
    "SBERT",
    "scikit-learn",
    "Vector DBs (ChromaDB)",
    "NumPy",
    "Pandas",
    "YOLOv8",
    "OpenCV",
  ],
  "Tools & Infrastructure": [
    "FastAPI",
    "React",
    "Next.js",
    "Docker",
    "Kubernetes",
    "Linux",
    "Git",
    {
      label: "AWS Certified Cloud Practitioner",
      href: "https://www.credly.com/badges/82b5745f-7dcf-4b49-96c1-f3d7a0d95ec0/public_url",
    },
  ],
};

const coursework = [
  {
    title: "Data Structures and Algorithms",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Systems Programming",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="5" width="16" height="14" rx="2" strokeWidth="2" />
        <path d="M8 9h8M8 13h6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Convex Optimization",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 18l6-8 4 4 6-10" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Distributed Data Pipelines",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="6" cy="12" r="2.5" strokeWidth="2" />
        <circle cx="18" cy="6" r="2.5" strokeWidth="2" />
        <circle cx="18" cy="18" r="2.5" strokeWidth="2" />
        <path d="M8.5 12h7M7.5 10.5l8-4M7.5 13.5l8 4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Database Management Systems",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <ellipse cx="12" cy="6" rx="7" ry="3" strokeWidth="2" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" strokeWidth="2" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Advanced Probability",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 16c2-4 4-6 8-6s6 2 8 6" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 8c2-2 4-3 8-3s6 1 8 3" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Linear Algebra",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M5 19V5h14" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 16l8-8" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 8h4v4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Discrete Mathematics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="7" cy="7" r="2.5" strokeWidth="2" />
        <circle cx="17" cy="7" r="2.5" strokeWidth="2" />
        <circle cx="12" cy="17" r="2.5" strokeWidth="2" />
        <path d="M9 7h6M8.5 9.5l3.5 5M15.5 9.5l-3.5 5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const highlights = [
  {
    title: "Pinpoint (Codelab)",
    body: "Architected a full-stack Lost & Found platform in Next.js + Supabase with multi-tenant RLS, realtime sync, and Google OAuth domain restrictions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="7" strokeWidth="2" />
        <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Autonomous Vehicles Research",
    body: "Built ROS/C++ path tracking with Kalman filtering and OpenCV pipelines, improving navigation precision across varied terrain.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          d="M5 16l1.5-5.5A2 2 0 018.4 9h7.2a2 2 0 011.9 1.5L19 16"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="16" r="2" strokeWidth="2" />
        <circle cx="16" cy="16" r="2" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "Data Science Research",
    body: "Developed a Kohonen SOM and a SLAM-enabled autonomous robot for high-dimensional clustering and real-time mapping.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="4" width="16" height="16" rx="3" strokeWidth="2" />
        <path d="M8 8h8M8 12h8M8 16h5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

function About() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <a className="text-link" href="/">
              ← Home
            </a>
            <h1>About</h1>
            <p className="section-subtitle">
              I'm Adisesh (Adi), a Data Science student at UC Davis focused on
              systems, ML, and full-stack engineering. I build clean, fast
              products and research-driven systems with measurable impact.
            </p>
          </div>
          <div className="hero-meta">
            <span className="chip">Expected Graduation: Dec 2026</span>
            <span className="chip">UC Davis</span>
            <span className="chip">Bay Area</span>
            <span className="chip">Software + ML + Systems</span>
          </div>
          <div className="hero-actions" style={{ marginTop: "20px" }}>
            <a className="btn btn-primary" href="/projects">
              View projects
            </a>
          </div>
          <h2 className="section-title section-title-spaced">Experience</h2>
          <div className="grid-3 reveal-stagger">
            {highlights.map((item) => (
              <div key={item.title} className="card">
                <div className="icon-badge">{item.icon}</div>
                <h3 className="card-title">{item.title}</h3>
                <p className="card-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <h2 className="section-title">Skills</h2>
          <div className="stack">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="card card-dark">
                <p className="card-eyebrow">{group}</p>
                <div className="chip-row">
                  {items.map((item) => {
                    const isLink = typeof item === "object";
                    const label = isLink ? item.label : item;
                    return isLink ? (
                      <a
                        key={label}
                        className="chip chip-dark chip-link"
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {label}
                      </a>
                    ) : (
                      <span key={label} className="chip chip-dark">
                        {label}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="section-title">Relevant Coursework</h2>
          <div className="chip-row">
            {coursework.map((course) => (
              <span key={course.title} className="chip chip-icon">
                <span className="chip-icon-mark">{course.icon}</span>
                {course.title}
              </span>
            ))}
          </div>
        </div>
      </section>
      <AdiFooter />
    </>
  );
}

export default About;
