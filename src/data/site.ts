/**
 * site.ts — single source of truth for all copy on wumonica.com.
 * Last content revision: 3 Oct 2026.
 * Plain data only: no HTML strings are rendered raw anywhere (see components).
 */

export const SITE = {
  name: "Monica Wu",
  url: "https://wumonica.com",
  email: "wumonica.eng@gmail.com",
  updated: "3 Oct 2026",
  headline:
    "AI Frontend Engineer · Design Engineer · Product Engineer · Design Systems · LLM Products",
  title: "Monica Wu — AI Frontend Engineer · Design Engineer · Design Systems · LLM Products",
  description:
    "Monica Wu — AI Frontend Engineer · Design Engineer. I design the interface and build what's behind it: design systems, production UI, and two AI products shipped in 2026. 10 years in production, 6 in regulated fintech and healthcare. Ex-Microsoft, IQVIA. Remote (US).",
  ogTitle: "Monica Wu — AI Frontend Engineer · Design Engineer · Design Systems",
  ogDescription:
    "I design the interface and build what's behind it. Design systems, production UI, and two AI products shipped in 2026. 10 years in production. Ex-Microsoft, IQVIA. Remote (US).",
  keywords: [
    "AI Frontend Engineer", "Design Engineer", "Senior Frontend Engineer", "Product Engineer", "Design Systems",
    "Component Libraries", "TypeScript", "React", "Next.js", "Tailwind CSS", "CSS", "Accessibility", "WCAG 2.2 AA",
    "Interaction Design", "Visual Design", "Typography", "Wireframing", "Prototyping in code",
    "LLM Products", "LLM Agents", "Agentic RAG", "Retrieval-Augmented Generation", "Human-in-the-Loop",
    "LLM Evaluation", "AI Guardrails", "Tool Calling", "Structured Outputs", "Vector Databases", "ChromaDB",
    "OpenAI API", "Claude", "Cursor", "Python", "Angular", "Node.js", "Remote",
  ],
  social: {
    github: "https://github.com/BleenEngBlue",
    linkedin: "https://www.linkedin.com/in/monicapwu",
    huggingface: "https://huggingface.co/Monica-Wu",
  },
} as const;

export const NAV = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export const HERO = {
  eyebrow: [
    "AI Frontend Engineer", "Design Engineer", "Design Systems",
    "LLM Products", "Fintech & Healthcare",
  ],
  status: "AI Frontend / Design Engineer · Remote (US) · Pacific",
  stats: [
    { num: "10 yrs", label: "Shipping production UI" },
    { num: "2 in 2026", label: "AI products designed and shipped solo" },
    { num: "100% recall", label: "HITL review UI vs. seeded ground truth", accent: true },
  ],
  chips: [
    "TypeScript", "React / Next.js", "CSS · Tailwind", "Design Systems", "Accessibility (WCAG 2.2 AA)",
    "Interaction Design", "LLM Products · RAG", "Evals & Guardrails", "Agile delivery", "Python", "Angular", "Claude · Cursor",
  ],
} as const;

export const ABOUT = {
  paragraphs: [
    "I'm a design-trained engineer with 10 years shipping production UI end to end. I build design systems other teams build on, and in 2026 I shipped two production AI systems, both with per-stage evals. I work in TypeScript, React, Next.js, Tailwind CSS, Angular, and Python. To me the interface and the data model are one design problem: on the Workbench, the reviewer's screen decided what the data model had to be.",
    "Software that moves $200M a month doesn't get to break. That's where I learned to ship. Before AI: an enterprise payments platform (Accenture), the design system behind healthcare apps used by physicians and pharmacies nationwide (Inovalon), accessible components on ~50,000 Microsoft partner websites, and clinical research apps across 9 client sites (IQVIA). I took my components through 6 major Angular versions with zero regressions. That's the bar.",
    "I started in design, then Code Fellows, then a decade of production TypeScript, React, Angular, and Node.js. I prototype first, build the real thing, and put it in front of someone. At Inovalon, the component specs I wrote became the frontend standard for every consuming team. In 2026 I cut a human-in-the-loop review product to the one screen a reviewer needs and shipped it in 2 days. I treat AI uncertainty as a UX problem: review surfaces, guardrails, intent routing. I build with Claude and Cursor daily: ~40% faster delivery, every change review-ready.",
    "The AI work started at IQVIA. Our clinical apps had to run locally on client hardware that varied site to site, so I tested whether LLM inference could clear that bar: Llama 3.1 8B on Ollama, constrained hardware, worst case. Self-initiated, no mandate. It set the AI roadmap for regulated clinical deployments.",
  ],
  facts: [
    { num: "10 yrs", label: "Shipping production software end to end" },
    { num: "2", label: "Production AI systems shipped in 2026, each with per-stage evals" },
    { num: "$200M+/mo", label: "Payments platform I shipped for. Workflows restored within SLA, 100% of the time", accent: true },
    { num: "~40%", label: "Faster delivery with AI-assisted development (Claude, Cursor)" },
  ],
} as const;

export type Project = {
  id: string;
  badge: string;
  badgeLive?: boolean;
  featured?: boolean;
  title: string;
  sub: string;
  links: { label: string; href: string }[];
  desc: string;
  highlights?: { title: string; text: string; wide?: boolean; check?: boolean }[];
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "reconciliation-workbench",
    badge: "Live · Auth-gated",
    badgeLive: true,
    featured: true,
    title: "Reconciliation Workbench — human-in-the-loop AI for tax compliance",
    sub: "Rules engine + LLM triage + human review + golden-dataset evals · US sales tax, EU e-invoicing · Aug 2026 — present",
    links: [
      { label: "Code", href: "https://github.com/BleenEngBlue/reconciliation-workbench" },
      { label: "Case study", href: "/case-studies/tax-reconciliation-workbench/" }
    ],
    desc: "Deterministic core, AI at the edges, humans at the points of consequence. A rules engine detects six exception classes, an LLM explains each one and proposes a disposition, and a reviewer approves or overrides. Every decision lands in an exportable audit trail. Scored on every run against seeded ground truth: 100% recall, zero false positives.",
    highlights: [
      { title: "Measured on every run", text: "A golden-dataset eval panel scores each run against seeded ground truth: 100% recall, 1.0 precision, zero false positives." },
      { title: "Jurisdictions as configuration", text: "A new country is one JSON entry and zero code changes. A declarative connector layer normalizes native feeds (semicolon CSVs, comma decimals, nested-JSON e-invoice statuses) into one canonical model." },
      { title: "Six exception classes", text: "Rate, arithmetic, duplicate invoice, e-invoice linkage, orphan e-report, return tie-out. Detected deterministically, explained by the LLM, decided by a human." },
      { title: "Audit trail & governance", text: "Every approve and override is logged and exportable. All data synthetic, auth-gated on Hugging Face Spaces, security-scanned with Bandit and pip-audit." },
    ],
    stack: ["Python", "Gradio", "Human-in-the-loop (HITL)", "Rules engine", "LLM triage", "Golden-dataset evals", "AI governance", "Synthetic data", "Hugging Face Spaces"],
  },
  {
    id: "digital-twin",
    badge: "Live · Production",
    badgeLive: true,
    featured: true,
    title: "AI Digital Twin — production agentic RAG agent",
    sub: "Agentic RAG · structured tool-calling · real-time intent routing · per-stage evals · live on Hugging Face Spaces · Apr 2026 — present",
    links: [
      { label: "Live demo", href: "https://huggingface.co/spaces/Monica-Wu/digital-twin" },
      { label: "Code", href: "https://github.com/BleenEngBlue/Digital_Twin" },
      { label: "Case study", href: "/case-studies/digital-twin/" },
    ],
    desc: "Ask it about my background and it answers in my voice. GPT-4.1 Mini grounded by semantic search over ChromaDB, with structured tool-calling and real-time intent routing. Live and maintained solo since May 2026.",
    highlights: [
      { title: "Semantic-chunking redesign", text: "Retrieval returns whole, word-aligned passages instead of mid-word fragments, improving coherence over the naive baseline." },
      { title: "Per-stage eval harness", text: "Chunking, embedding, retrieval, context assembly, and generation each have their own evals and swap independently. When quality drops, the harness shows which stage did it." },
      { title: "Real-time agentic routing", text: "Hire and collaboration intent reaches me within seconds of a visitor's message." },
      { title: "Production guardrails", text: "No personal contact disclosure, no fabricated opinions, no binding commitments. Latency, cost, and errors monitored in production." },
      { title: "How it's evaluated", wide: true, check: true, text: "Verified, not assumed: before/after comparison of the chunking change on a fixed question set, guardrails spot-checked against adversarial prompts, and cluster separation inspected in the companion pipeline to confirm passages group coherently." },
    ],
    stack: ["Python", "OpenAI API", "GPT-4.1 Mini", "ChromaDB", "Gradio", "Hugging Face Spaces", "Agentic RAG", "Tool-calling", "Eval harness", "Guardrails", "LLM observability"],
  },
  {
    id: "rag-pipeline",
    badge: "Pipeline · Research",
    title: "Reproducible RAG Pipeline — semantic chunking, embeddings & cluster visualization",
    sub: "Open-source Jupyter walkthrough · Apr 2026 — present",
    links: [{ label: "GitHub", href: "https://github.com/BleenEngBlue/Reproducible_RAG_Pipeline_Semantic_Chunking_Embedding_and_Cluster_Visualization" }],
    desc: "The component engineering behind my production agent, as a runnable notebook: ingestion, semantic chunking, embeddings, clustering, and interactive 3D visualization. Demo document: the Netflix Culture Memo (June 2024).",
    stack: ["Python", "ChromaDB", "Embeddings", "Semantic chunking", "UMAP", "KMeans", "Cluster eval", "Vector search", "Data visualization", "Jupyter"],
  },
  {
    id: "portfolio",
    badge: "Portfolio · Design + build",
    title: "wumonica.com — portfolio",
    sub: "Designed and built end to end in Next.js, TypeScript, and Tailwind CSS · 2016 — present",
    links: [{ label: "Source", href: "https://github.com/BleenEngBlue/wumonica.com" }],
    desc: "This site. A hand-built design system: Cormorant Garamond + DM Mono, dark and light themes, semantic HTML. Next.js static export, Tailwind CSS v4, WCAG 2.2 AA as an acceptance criterion, zero third-party requests, self-hosted fonts, hardened CSP.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Design systems", "Visual hierarchy", "Accessibility / WCAG 2.2 AA", "Performance"],
  },
];

export const STACK: { label: string; tags: string[] }[] = [
  { label: "Top skills", tags: ["Design Systems & Component Libraries", "TypeScript · React · Next.js", "CSS · Tailwind CSS", "Accessibility (WCAG 2.2 AA)", "LLM Products (RAG, HITL, evals)"] },
  { label: "Product & design", tags: ["Design Systems", "Component Libraries", "Component Specifications", "Wireframing · Prototyping in code", "Interaction Design", "Visual Hierarchy · Typography", "UX for dense workflows", "Accessibility / WCAG 2.1–2.2 AA", "Data Visualization", "i18n", "Performance Tuning"] },
  { label: "LLM agents & retrieval", tags: ["LLM Agents", "Agentic AI Development", "Tool Calling / Function Calling", "Agent Orchestration", "Structured Outputs", "Intent Routing", "OpenAI API", "GPT-4.1 / Mini", "Ollama · Llama 3.1", "Local LLM Inference"] },
  { label: "Retrieval & context", tags: ["Retrieval-Augmented Generation (RAG)", "ChromaDB", "Vector Databases", "Embeddings", "Semantic Search", "Semantic Chunking", "Prompt Engineering", "Context Engineering", "Context Window Management"] },
  { label: "Evals, guardrails & HITL", tags: ["LLM Evaluation", "Per-stage eval harnesses", "Golden-dataset evals", "AI Guardrails", "Human-in-the-Loop (HITL)", "AI Governance", "LLM Observability", "Rules Engines", "Synthetic Data"] },
  { label: "Ship & deploy", tags: ["Production AI Systems", "Hugging Face Spaces", "Gradio", "CI/CD", "Production Deployment", "Test Automation", "Bandit / pip-audit", "0 to 1 Product Build"] },
  { label: "Languages & frameworks", tags: ["Python", "TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "Node.js", "Angular · RxJS", "Redux", "REST APIs", "MongoDB", "Pandas", "Jupyter"] },
  { label: "AI-assisted engineering", tags: ["Anthropic Claude", "Claude Cowork", "Cursor", "CLAUDE.md · skills · slash commands", "Cursor Rules"] },
  { label: "Domains", tags: ["FinTech · Payments ($200M+/mo)", "Tax & Regulatory Compliance", "Healthcare IT · Clinical research", "Media (NBCNews.com)", "Regulated / high-reliability"] },
];

export type Job = {
  date: string;
  company: string;
  role: string;
  body: string;
  via?: string;
  tags: string[];
};

export const EXPERIENCE: Job[] = [
  {
    date: "Aug 2025 — present · 1 yr 3 mos",
    company: "Wumonica Studio (Independent) · Self-employed · Remote",
    role: "AI Frontend Engineer",
    body: "Shipped 2 production AI products in 2026, prototype to deploy, solo. Reconciliation Workbench: a human-in-the-loop review UI cut to the one screen a reviewer needs, built in 2 days, 100% recall and 1.0 precision against seeded ground truth. Digital Twin: an agentic RAG agent (Python, OpenAI API, ChromaDB), live since May 2026 with latency, cost, and errors monitored in production. Let the interface shape the data: every source had to look identical on the reviewer's screen, so a new jurisdiction is one JSON entry and zero code changes. Per-stage eval harnesses pinpoint the stage that degraded. Designed and built this site in Next.js, TypeScript, and Tailwind CSS. Build with Claude and Cursor daily: ~40% faster delivery, every change review-ready.",
    tags: ["Design + build", "Next.js", "Tailwind CSS", "TypeScript", "Human-in-the-loop UI", "Agentic RAG", "Evals", "Python", "OpenAI API", "Claude", "Cursor"],
  },
  {
    date: "Sep 2023 — Aug 2025 · 2 yrs",
    company: "Inteliquet, an IQVIA business · Full-time · Remote",
    role: "Software Development Engineer 4",
    body: "Self-initiated a local LLM inference study (Ollama, Llama 3.1) on constrained hardware that set the AI roadmap for regulated clinical deployments. Owned frontend features end to end for clinical research apps across 9 client sites: requirements discovery, production TypeScript/Angular components, post-launch issues resolved within 24 hours. Consolidated 10+ Angular components into a shared library and shipped i18n across 2 production apps, cutting duplicate work across 3 product teams by ~25%. Used Cursor in a regulated healthcare codebase, keeping every change review-ready and audit-compliant.",
    tags: ["Local LLM inference", "Ollama · Llama 3.1", "TypeScript", "Angular", "Regulated industries", "i18n", "Cursor"],
  },
  {
    date: "Jan 2022 — Aug 2023 · 1 yr 8 mos",
    company: "Inovalon · Full-time · Remote",
    role: "Product Engineer — Design Systems",
    body: "Owned the in-house design system end to end: designed the components, built them, and shipped them to healthcare apps serving physicians and pharmacies nationwide. Published each component with a live demo, copy-ready HTML, JS, and CSS, and the usage docs I wrote, so teams could see how it should behave and then take the code. Audited the whole internal site (~25 components and their docs), set the fix order, and did the fixes: rebuilt broken components, added missing accessibility, unified the docs in one voice. Authored the component specs (typography, spacing, states, accessibility, API) adopted as the single reference, reducing UI bugs by ~20%. On a 3-developer team migrating the library from Angular 8 to 14 on the live site, upgraded every component I owned with zero regressions, cutting consuming teams' upgrade effort by ~40%.",
    tags: ["Design systems", "Component documentation site", "Component libraries", "Accessibility", "Zero-regression migration", "Angular", "TypeScript"],
  },
  {
    date: "Jul 2018 — Jan 2022 · 3 yrs 7 mos",
    company: "Accenture · Full-time · Greater Seattle Area · Hybrid",
    role: "Software Engineer",
    body: "Shipped transaction-critical frontend features for an enterprise payments platform processing $200M+/month, tuning UI performance on authorization and money-movement flows. Root-caused critical production defects and restored payment workflows within SLA 100% of the time. On a ~1-year telecom engagement, built a client design system and published it to npm as versioned releases so the client's teams could upgrade incrementally. Mentored 2 engineers in advanced Angular (RxJS, state management, lazy loading), getting them productive 3 weeks sooner.",
    tags: ["FinTech · Payments ($200M+/mo)", "Design system · npm library (telecom)", "High reliability", "Root-cause analysis", "TypeScript", "Angular · RxJS", "Mentoring"],
  },
  {
    date: "Jan 2018 — May 2018 · 5 mos",
    company: "Microsoft · Contract · Redmond, WA · On-site",
    role: "Software Development Engineer",
    body: "Built the production Angular/TypeScript interface 10+ partner teams used to publish and manage JSON schemas for automated page generation. Aligned API contracts across 2 engineering teams and shipped on time despite cross-team dependencies.",
    via: "Contract via Design Laboratory Inc.",
    tags: ["Angular", "TypeScript", "REST APIs", "JSON Schema"],
  },
  {
    date: "Dec 2017 — Feb 2018 · 3 mos",
    company: "Win-Kel · Freelance · Greater Seattle Area · Hybrid",
    role: "Product Engineer",
    body: "Architected a 0 to 1 full-stack product (React, Redux, Node.js, TypeScript) for a 4-person startup, owning every decision from database schema to UI. Set frontend direction and mentored 2 junior engineers through code review.",
    tags: ["0 to 1", "React", "Redux", "Node.js", "TypeScript", "Mentoring"],
  },
  {
    date: "Jan 2017 — Apr 2017 · 4 mos",
    company: "Microsoft · Contract · Greater Seattle Area · On-site",
    role: "Product Engineer",
    body: "Built and remediated accessible framework components (Angular, React, TypeScript) deployed across ~50,000 Microsoft partner websites. Brought every component to 100% WCAG 2.1 AA compliance, cutting accessibility support tickets by ~30%.",
    via: "Contract via Jetstream Software.",
    tags: ["Accessibility / WCAG 2.1 AA", "Angular", "React", "TypeScript"],
  },
  {
    date: "Jun 2016 — Oct 2016 · 5 mos",
    company: "NBCUniversal · Contract · Seattle, WA · On-site",
    role: "Software Engineer",
    body: "Shipped production fixes, analytics instrumentation, and SEO sitemap improvements for NBCNews.com social and video features serving tens of millions of monthly users. Cut load time on video-heavy pages through performance tuning.",
    via: "Contract via Next Step Staffing.",
    tags: ["JavaScript", "Performance tuning", "SEO", "Analytics"],
  },
  {
    date: "Jan 2016 — Apr 2016 · 4 mos",
    company: "UIEvolution, Inc. · Contract · Greater Seattle Area · On-site",
    role: "Product Engineer",
    body: "Built production digital-signage web apps for smart TVs, kiosks, and mobile, performance- and stress-tested against real device constraints.",
    via: "Contract through Sixth Ave Studios.",
    tags: ["React", "JavaScript", "Digital signage", "Stress testing"],
  },
];

export type Edu = { date: string; school: string; degree: string; desc: string; tags: string[]; featured?: boolean };

export const EDUCATION: Edu[] = [
  {
    date: "Issued May 2026",
    school: "SuperDataScience",
    degree: "AI Engineer Sprint — Capstone: Digital Twin, production RAG agent",
    desc: "The capstone became the first version of my Digital Twin: agentic RAG, semantic chunking, privacy guardrails, real-time tool-calling, and a per-stage eval harness. In production and maintained solo since May 2026.",
    tags: ["AI Agents", "Agentic AI Development", "RAG", "OpenAI API", "ChromaDB", "Production deployment"],
    featured: true,
  },
  {
    date: "In progress · 2026",
    school: "Interview Kickstart",
    degree: "Machine Learning Engineering",
    desc: "ML fundamentals, deep learning, and model evaluation: the foundations under the production AI systems I ship.",
    tags: ["Machine Learning", "Deep Learning", "Model Evaluation"],
  },
  {
    date: "May 2015 — Oct 2015",
    school: "Code Fellows",
    degree: "Certificate · Full-stack JavaScript",
    desc: "Immersive full-stack JavaScript: Node.js and Express REST APIs, MongoDB, authentication, TDD, deployment. Capstone: conceived, architected, and led a 5-day team build of a food-truck locator (OAuth, Google Maps API, MongoDB), and built the Maps integration and front end myself.",
    tags: ["React", "Angular", "Node.js · Express", "MongoDB", "TDD"],
  },
  {
    date: "B.A.",
    school: "California State University, Los Angeles",
    degree: "Bachelor of Arts (B.A.) · Art — Design Concentration",
    desc: "Visual systems, typography, hierarchy, and interaction design: the foundation for every design system and component spec I've shipped since.",
    tags: ["Interaction design", "Design systems", "Typography", "Visual communication"],
  },
];

export const CONTACT = {
  targeting:
    "senior design engineer, AI frontend, and product engineering roles where the interface and the code behind it are one job",
  targetingRest:
    " — including LLM products shipped to real users. Remote (US), Pacific time.",
} as const;

/** schema.org Person — serialized safely in layout.tsx (see JsonLd). */
export const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  jobTitle: ["AI Frontend Engineer", "Design Engineer", "Product Engineer", "Senior Frontend Engineer"],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "California State University, Los Angeles" },
    { "@type": "EducationalOrganization", name: "Code Fellows" },
  ],
  sameAs: [SITE.social.github, SITE.social.linkedin, SITE.social.huggingface],
  knowsAbout: [
    "Design Systems", "Component Libraries", "Interaction Design", "Visual Design", "Typography", "Accessibility",
    "TypeScript", "React", "Next.js", "Tailwind CSS", "CSS", "Angular", "Node.js", "Python",
    "LLM Agents", "Agentic Workflows", "Large Language Models", "Retrieval-Augmented Generation", "Vector Databases",
    "Tool Calling", "Structured Outputs", "LLM Evaluation", "AI Guardrails", "Human-in-the-Loop AI",
    "LLM Observability", "Prompt Engineering", "Context Engineering", "Embeddings", "ChromaDB", "OpenAI API",
    "Claude", "Cursor", "Production AI Systems",
  ],
} as const;
