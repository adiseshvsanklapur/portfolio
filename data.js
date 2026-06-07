/* ============================================================
   Adi.OS — content data
   ============================================================ */
window.ADI = {
  identity: {
    name: "Adisesh Venkatesh Sanklapur",
    short: "Adi",
    role: "CS + AI · UC Davis",
    oneliner:
      "Intelligent systems across machine learning, high-performance computing, and software engineering.",
    location: "Bay Area, CA",
    email: "adivsanklapur@gmail.com",
    phone: "925-475-9477",
    github: "github.com/adiseshvsanklapur",
    githubUrl: "https://github.com/adiseshvsanklapur",
    linkedin: "linkedin.com/in/adivsanklapur",
    linkedinUrl: "https://linkedin.com/in/adivsanklapur",
    grad: "B.S. Data Science (CS Concentration) · UC Davis · Exp. Jun 2027",
  },

  stats: [
    { v: "ICML 2026", l: "First-author publication", k: "workshop paper" },
    { v: "6.5M/s", l: "Orders matched", k: "150ns latency · C++" },
    { v: "Top 3", l: "HackDavis 2026", k: "of 600+ hackers" },
    { v: "500+", l: "Users shipped", k: "production apps" },
  ],

  experience: [
    {
      org: "ICML 2026 Workshop",
      role: "First-Author ML Research",
      date: "Mar 2026",
      flag: "publication",
      title: "On the Transfer of Output Diversity via Synthetic Data in Language Models",
      bullets: [
        "Fine-tuned Llama 3.2 with LoRA in MLX across 1,250 generations",
        "Established a tuning-strength tradeoff: light tuning preserved 29–39% diversity gains; heavy tuning caused 68.4% top-5 output repetition",
      ],
      tags: ["LLMs", "LoRA", "MLX", "Research"],
    },
    {
      org: "ARMS Lab, UC Davis",
      role: "AI Systems Researcher",
      date: "Mar 2026 — Present",
      bullets: [
        "C# REST APIs translating natural language → SolidWorks CAD geometry workflows",
        "Agentic n8n + LLM pipelines for RAG/SQL retrieval and CAD automation",
      ],
      tags: ["C#", "REST APIs", "LLMs", "n8n", "RAG"],
    },
    {
      org: "Pinpoint · Codelab",
      role: "Software Developer",
      date: "Sep 2024 — Jun 2025",
      bullets: [
        "Lost & Found platform serving 500+ UC Davis students on Next.js + Supabase",
        "PostgreSQL Row Level Security with domain-restricted Google OAuth",
      ],
      tags: ["Next.js", "Supabase", "PostgreSQL", "OAuth"],
    },
    {
      org: "Arcadia",
      role: "Software Engineering Intern",
      date: "Jan 2023 — Nov 2023",
      bullets: [
        "+40% robot navigation accuracy via Kalman filtering + sensor fusion in ROS",
        "Real-time OpenCV object-detection pipeline at 90% accuracy",
        "Arduino servo system for automated object removal",
      ],
      tags: ["C++", "ROS", "OpenCV", "Arduino"],
    },
    {
      org: "ASDRP",
      role: "Data Science Research Intern",
      date: "Jan 2022 — Jan 2023",
      bullets: [
        "SLAM autonomous robot built on Arduino + ultrasonic sensors",
        "+35% cluster purity via Kohonen SOM dimensionality reduction",
      ],
      tags: ["SLAM", "Arduino", "Python", "SOM"],
    },
  ],

  projects: [
    {
      name: "Limit Order Book Engine",
      kind: "systems",
      blurb: "C++ matching engine — constant-time matching across 10K+ price levels with a custom allocator.",
      metrics: [["6.5M/s", "orders"], ["150ns", "latency"], ["O(1)", "match"]],
      tags: ["C++20", "STL", "CMake"],
      url: "https://github.com/adiseshvsanklapur",
      featured: true,
    },
    {
      name: "AccessMap AI",
      kind: "graph",
      award: "HackDavis 2026 · Top 3",
      blurb: "Hazard-aware routing over a 19.7K-node city graph, scored by Gemini 2.5 Flash.",
      metrics: [["19.7K", "nodes"], ["Top 3", "of 600+"]],
      tags: ["Next.js 15", "NetworkX", "Mapbox GL", "Gemini"],
      url: "https://github.com/adiseshvsanklapur",
      featured: true,
    },
    {
      name: "Constraint Optimization Engine",
      kind: "quant",
      award: "Cornell · Top 5 of 2023",
      blurb: "Backtesting + linear-programming platform — less overfitting, faster strategy evaluation.",
      metrics: [["−66%", "overfit"], ["90%", "faster"]],
      tags: ["Python", "PuLP", "Pandas"],
      url: "https://github.com/adiseshvsanklapur/CQF-SystematicEquities",
    },
    {
      name: "Photo Editor",
      kind: "vision",
      blurb: "Desktop image editor in Java — edge detection, convolution filters, and painting tools.",
      tags: ["Java", "Swing", "Image Processing"],
      url: "https://github.com/adiseshvsanklapur/PhotoEditor",
    },
    {
      name: "Agentic Stock Insight",
      kind: "agent",
      blurb: "Multi-agent research system — LLaMA on Groq, orchestrated with Phidata.",
      tags: ["Python", "LLaMA", "Groq", "Phidata"],
      url: "https://github.com/adiseshvsanklapur/financial-agents",
    },
    {
      name: "AI Slides Creator",
      kind: "agent",
      blurb: "GPT-4o doc→deck pipeline — FastAPI + Streamlit, with Ollama offline inference.",
      tags: ["FastAPI", "Streamlit", "GPT-4o"],
      url: "https://github.com/adiseshvsanklapur/ai-slides-generator",
    },
    {
      name: "Pinpoint",
      kind: "web",
      blurb: "Lost & Found for 500+ UC Davis students — realtime sync, RLS, domain-locked OAuth.",
      metrics: [["500+", "students"]],
      tags: ["Next.js", "Supabase", "PostgreSQL"],
      url: "https://codelabproduct.vercel.app/",
    },
    {
      name: "Carto-Campus",
      kind: "web",
      blurb: "Campus navigation app — React + Firebase, serving 100+ users.",
      tags: ["React", "Node.js", "Firebase"],
      url: "https://carto-campus.vercel.app",
    },
    {
      name: "Fake News Detector",
      kind: "ml",
      award: "HackDavis 2024",
      blurb: "TF-IDF + scikit-learn classifier with full text-preprocessing pipeline.",
      tags: ["Python", "scikit-learn", "NLP"],
      url: "https://github.com/adiseshvsanklapur/FakeNewsDetector",
    },
    {
      name: "Compound Machine",
      kind: "eng",
      tag2: "Engineering",
      blurb: "Hand-operated mechanical fan built from levers, pulleys, and a wheel-and-axle train.",
      tags: ["Mechanical", "Honors PoE"],
      url: "https://docs.google.com/document/d/1WkI2-h2adCnuvtF9FWI1AnlmGKMno2V7jsyhmA5DGq4/edit?usp=sharing",
    },
    {
      name: "Solar & Hydrogen Car",
      kind: "eng",
      tag2: "Engineering",
      blurb: "Solar-charged car that stores its energy in a hydrogen fuel cell.",
      tags: ["Renewables", "Hardware", "Honors PoE"],
      url: "https://docs.google.com/document/d/19FwVVOZZfbymKQ5GV43_nBFjAgL-wWha9DQ73jqGxq0/edit?usp=sharing",
    },
  ],

  skills: [
    { group: "Languages", items: ["C++", "Python", "Java", "C", "SQL", "TypeScript", "JavaScript", "R", "Bash", "HTML", "CSS"] },
    { group: "ML / AI", items: ["PyTorch", "scikit-learn", "SBERT", "YOLOv8", "OpenCV", "Pandas", "NumPy"] },
    { group: "Web / Backend", items: ["React", "Next.js", "Node.js", "FastAPI", "REST APIs"] },
    { group: "Infra / Tools", items: ["Docker", "Kubernetes", "AWS", "PostgreSQL", "Supabase", "Firebase", "ChromaDB", "Linux", "ROS", "CMake", "Git"] },
    { group: "Concepts", items: ["Machine Learning", "LLMs", "Computer Vision", "Systems Engineering", "Software Engineering", "Distributed Systems", "CI/CD"] },
  ],

  coursework: [
    "Data Structures & Algorithms", "Operating Systems", "Machine Learning",
    "Databases", "Distributed Systems", "Computer Networks",
    "Systems Programming", "Linear Algebra", "Probability", "Convex Optimization",
  ],

  awards: ["Dean's List", "Top 3 · HackDavis 2026", "Top 5 · Cornell '23", "ICML 2026 Workshop"],

  hobbies: [
    { key: "piano", label: "Piano — CM Level 10", hint: "play" },
    { key: "arduino", label: "Hardware & Arduino", hint: "disarm" },
    { key: "code", label: "Coding since 11", hint: "log" },
  ],
};
