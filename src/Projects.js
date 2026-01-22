// eslint-disable-next-line
import App from "./App.css";
import AdiFooter from "./AdiFooter";
import TiltCard from "./components/TiltCard";

const otherProjects = [
  {
    title: "High-Performance LOB Matching Engine",
    description:
      "Architected a sub-microsecond C++20 engine using a hybrid O(1) Intrusive List and Hash-Map architecture, achieving 6.58M orders/sec throughput and a 151.89ns average latency per simulated order execution.",
    theme:
      "linear-gradient(135deg, rgba(45, 70, 180, 0.9), rgba(14, 18, 38, 0.9))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 12h16" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 8h12M6 16h12" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    links: [
      {
        label: "View Project",
        url: "https://github.com/adiseshvsanklapur/High-Performance-LOB",
      },
    ],
  },
  {
    title: "Systematic Trading System",
    description:
      "Utilized the PuLP open-source modeling library in Python to replicate an Equity Market Neutral trading strategy on a sample dataset of 5 emerging and 5 developed trading markets. Developed this project as a team lead for the 2023 Cornell Trading Competition held in New York.",
    theme:
      "linear-gradient(135deg, rgba(8, 94, 74, 0.9), rgba(9, 20, 28, 0.9))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 18l5-6 4 3 7-9" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    links: [
      {
        label: "View Project",
        url: "https://github.com/adiseshvsanklapur/CQF-SystematicEquities",
      },
    ],
  },
  {
    title: "LLM Inspector",
    description:
      "Architected a full-stack evaluation harness to quantify LLM reliability using an LLM-as-a-Judge pipeline, automating bulk scoring for faithfulness and context relevancy across 500+ parallelized test cases.",
    theme:
      "linear-gradient(135deg, rgba(92, 48, 156, 0.9), rgba(14, 12, 24, 0.9))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="5" width="16" height="14" rx="2" strokeWidth="2" />
        <path d="M8 9h8M8 13h6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    links: [
      {
        label: "View Project",
        url: "https://github.com/adiseshvsanklapur/LLM-Inspector",
      },
    ],
  },
  {
    title: "AI Slides Creator",
    description:
      "Built a full-stack LLM-powered tool that processes uploaded documents into business-grade slide decks using GPT-4o for summarization and python-pptx for automated generation. Features a FastAPI backend, Streamlit frontend, and optional Ollama integration for offline inference.",
    theme:
      "linear-gradient(135deg, rgba(31, 70, 165, 0.9), rgba(10, 15, 28, 0.9))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="4" width="16" height="12" rx="2" strokeWidth="2" />
        <path d="M8 20h8" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 16v4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    links: [
      {
        label: "View Project",
        url: "https://github.com/adiseshvsanklapur/ai-slides-generator",
      },
    ],
  },
  {
    title: "Portfolio",
    description:
      "Built this personal portfolio using React.js and Grommet to showcase technical projects with a clean, responsive UI and smooth UX. Deployed on Netlify with CI/CD for fast performance and easy updates.",
    theme:
      "linear-gradient(135deg, rgba(24, 28, 36, 0.95), rgba(90, 90, 100, 0.5))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="7" width="16" height="12" rx="2" strokeWidth="2" />
        <path d="M9 7V5h6v2" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    links: [
      {
        label: "View Project",
        url: "https://github.com/adiseshvsanklapur/portfolio",
      },
    ],
  },
  {
    title: "Photo Editor",
    description:
      "A Photo Editor application which has numerous features such as Edge Detection and painting tools. Developed using JFrame, a fairly outdated Java library, causing the UI to look a little outdated. I hope to migrate the program to JavaFX, a more modern library, in the future.",
    theme:
      "linear-gradient(135deg, rgba(105, 45, 45, 0.9), rgba(12, 10, 10, 0.9))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="6" width="16" height="12" rx="2" strokeWidth="2" />
        <circle cx="9" cy="11" r="2" strokeWidth="2" />
        <path d="M20 16l-4-4-4 4-2-2-4 4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    links: [
      {
        label: "View Project",
        url: "https://github.com/adiseshvsanklapur/PhotoEditor",
      },
    ],
  },
  {
    title: "Agentic Stock Insight",
    description:
      "Developed a Python-based multi-agent AI system with a Web Search Agent (using DuckDuckGo) and a Financial Agent (using yfinance), both powered by LLaMA models hosted on Groq for fast, low-latency reasoning. The system's orchestration is managed via Phidata, with uv handling dependencies.",
    theme:
      "linear-gradient(135deg, rgba(28, 92, 150, 0.9), rgba(12, 18, 30, 0.9))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M4 17l4-4 4 3 6-7" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 20h16" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    links: [
      {
        label: "View Project",
        url: "https://github.com/adiseshvsanklapur/financial-agents",
      },
    ],
  },
  {
    title: "Carto-Campus",
    description:
      "I developed the functionality for Carto-Campus, the school navigation application for school campuses in the Pleasanton area, using JavaScript (React, Node), Google Firebase, and other related technologies. Reached over 100 users for the application, while also protecting user security.",
    theme:
      "linear-gradient(135deg, rgba(18, 78, 88, 0.9), rgba(9, 18, 22, 0.9))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 21s6-6 6-11a6 6 0 10-12 0c0 5 6 11 6 11z" strokeWidth="2" />
        <circle cx="12" cy="10" r="2.5" strokeWidth="2" />
      </svg>
    ),
    links: [{ label: "View Site", url: "https://carto-campus.vercel.app" }],
  },
  {
    title: "Fake News Detector",
    description:
      "Built a Python-based fake news detection system leveraging scikit-learn and TF-IDF vectorization, achieving over 60% accuracy. Implemented extensive text preprocessing and multiple classifiers to reliably distinguish between real and fake news articles. Developed as part of HackDavis 2024.",
    theme:
      "linear-gradient(135deg, rgba(68, 68, 110, 0.9), rgba(10, 12, 20, 0.9))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <rect x="4" y="5" width="16" height="14" rx="2" strokeWidth="2" />
        <path d="M8 9h8M8 13h6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    links: [
      {
        label: "View Project",
        url: "https://github.com/adiseshvsanklapur/FakeNewsDetector",
      },
    ],
  },
];

const engineeringProjects = [
  {
    title: "Compound Machine Project",
    subtitle: "Honors Principles of Engineering",
    description:
      "Along with 3 other students, I created a mechanical fan that is manually operated. This project was made using numerous different mechanical systems, such as a wheel and axle system, a lever, a pulley system, and many more. Through this project, I was able to get a better understanding of how different mechanical systems come together to form wonderful solutions to real world issues.",
    image: "/compmachine.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="8" cy="12" r="3" strokeWidth="2" />
        <circle cx="16" cy="12" r="3" strokeWidth="2" />
        <path d="M11 12h2" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    link: "https://docs.google.com/document/d/1WkI2-h2adCnuvtF9FWI1AnlmGKMno2V7jsyhmA5DGq4/edit?usp=sharing",
  },
  {
    title: "Solar & Hydrogen Car",
    subtitle: "Honors Principles of Engineering",
    description:
      "Renewable energy is the future of the world. Many countries have already started switching to more renewable forms of energy. More specifically, solar powered items are gaining more and more popularity. To get a better understanding of how these systems work together, I designed and manufactured a simple solar car that uses solar panels to charge up, and stores the energy in a hydrogen fuel cell.",
    image: "/solarcar.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M5 16l1.5-5.5A2 2 0 018.4 9h7.2a2 2 0 011.9 1.5L19 16" strokeWidth="2" />
        <circle cx="8" cy="16" r="2" strokeWidth="2" />
        <circle cx="16" cy="16" r="2" strokeWidth="2" />
      </svg>
    ),
    link: "https://docs.google.com/document/d/19FwVVOZZfbymKQ5GV43_nBFjAgL-wWha9DQ73jqGxq0/edit?usp=sharing",
  },
];

function Projects() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <a className="text-link" href="/">
              ← Home
            </a>
            <h1>Projects</h1>
            <p className="section-subtitle">
              A focused selection of software, ML, and engineering work.
            </p>
          </div>
          <h2 className="section-title">Other Projects</h2>
          <div className="grid-2 reveal-stagger">
            {otherProjects.map((project) => (
              <TiltCard
                key={project.title}
                className="card image-card project-hero tilt-card"
                style={{ backgroundImage: project.theme }}
              >
                <div className="image-overlay">
                  <div className="icon-badge">{project.icon}</div>
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-body">{project.description}</p>
                  <div className="card-actions">
                    {project.links.length > 0 &&
                      project.links.map((link) => (
                        <a
                          key={link.url}
                          className="btn btn-light"
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="section-title">Engineering Projects</h2>
          <div className="grid-2 reveal-stagger">
            {engineeringProjects.map((project) => (
              <TiltCard
                key={project.title}
                className="card image-card tilt-card"
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="image-overlay">
                  <div className="icon-badge">{project.icon}</div>
                  <p className="card-eyebrow">{project.subtitle}</p>
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-body">{project.description}</p>
                  <div className="card-actions"></div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
        <AdiFooter />
    </>
  );
}

export default Projects;
