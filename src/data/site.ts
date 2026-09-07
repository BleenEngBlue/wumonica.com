/**
 * site.ts — single source of truth for all copy on wumonica.com.
 * Repositioned 6 Sep 2026: design + code first, AI products second. Title everywhere = "AI Frontend Engineer".
 * LinkedIn (linkedin.com/in/monicapwu) must be re-synced to this file: headline, About, title. Public location = "Remote (US) · Pacific" only.
 * Plain data only: no HTML strings are rendered raw anywhere (see components).
 */

export const SITE = {
  name: "Monica Wu",
  url: "https://wumonica.com",
  email: "wumonica.eng@gmail.com",
  updated: "6 Sep 2026",
  headline:
    "AI Frontend Engineer · Design Engineer · Product Engineer · Design Systems · LLM Products",
  title: "Monica Wu — AI Frontend Engineer · Design Engineer · Design Systems · LLM Products",
  description:
    "Monica Wu — AI Frontend Engineer · Design Engineer · Product Engineer. I design the interface and build what's behind it: production UI, design systems other teams build on, and two AI products shipped end to end in 2026 (agentic RAG agent; human-in-the-loop review, 100% recall). B.A. Design + 10 years of production frontend ($200M+/mo payments, ~50K Microsoft partner sites), 6 of them in regulated fintech and healthcare. Ex-Microsoft, IQVIA. Remote (US) · Pacific time.",
  ogTitle: "Monica Wu — AI Frontend Engineer · Design Engineer · Design Systems",
  ogDescription:
    "I design the interface and build what's behind it — production UI, design systems, and two AI products shipped end to end in 2026. B.A. Design + 10 years of production frontend. Ex-Microsoft, IQVIA. Remote (US).",
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
  status: "AI Frontend / Design Engineer · Agile product teams · Remote (US) · Pacific",
  stats: [
    { num: "10 yrs", label: "Production UI shipped" },
    { num: "2 in 2026", label: "AI products designed & shipped solo" },
    { num: "100% recall", label: "HITL review UI, seeded ground truth", accent: true },
  ],
  chips: [
    "TypeScript", "React / Next.js", "CSS · Tailwind", "Design Systems", "Accessibility (WCAG 2.2 AA)",
    "Interaction Design", "LLM Products · RAG", "Evals & Guardrails", "Agile delivery", "Python", "Angular", "Claude · Cursor",
  ],
} as const;

export const ABOUT = {
  paragraphs: [
    "I'm a design-trained engineer (B.A., Design) with 10 years shipping production UI end to end — design systems other teams build on, and two production AI systems shipped in 2026, each with per-stage evals and production observability. I work in TypeScript, React, Next.js, Tailwind CSS, Angular, and Python, and I treat the interface and the data model as one design problem: the reviewer's screen decided what the Workbench's data model had to be.",
    "Software that moves $200M a month doesn't get to break — that's where I learned to ship. Before AI: an enterprise payments platform processing $200M+/month (Accenture), the design system behind healthcare apps used by physicians and pharmacies nationwide (Inovalon), WCAG-accessible components deployed across ~50,000 Microsoft partner websites, and clinical research apps across 9 client sites (IQVIA). When I migrated that component library across 6 major Angular versions, downstream teams saw zero regressions. That's the bar I build to.",
    "I started in design — a B.A. in Art & Design — then Code Fellows, then a decade of production TypeScript, React, Angular, and Node.js. I sketch or prototype first, then build the real thing and put it in front of someone: at Inovalon the component specs I wrote (type, spacing, states, accessibility, API) became the frontend standard for every consuming team; in 2026 I cut a human-in-the-loop review product to the one screen a reviewer needs and shipped it in 2 days. I treat AI uncertainty as a UX problem — review surfaces, guardrails, intent routing — and practice AI-assisted development daily (Claude, Cursor), ~40% faster feature delivery with every change review-ready.",
    "That AI work started at IQVIA, where our clinical apps had to run locally on-site and client hardware varied site to site — so I tested whether LLM inference could clear that bar: Llama 3.1 8B on Ollama on constrained hardware as a worst-case baseline. Self-initiated, no mandate. It established the AI roadmap for regulated clinical deployments.",
  ],
  facts: [
    { num: "10 yrs", label: "Shipping production software end to end" },
    { num: "2", label: "Production AI systems shipped in 2026, each with per-stage evals and observability" },
    { num: "$200M+/mo", label: "Payments platform I shipped transaction-critical features for — workflows restored within SLA 100% of the time", accent: true },
    { num: "~40%", label: "Faster feature delivery with AI-assisted development (Claude, Cursor)" },
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
    sub: "Rules engine + LLM triage + HITL review + golden-dataset evals · multi-jurisdiction (US sales tax, EU CTC e-invoicing) · Aug 2026 — present",
    links: [{ label: "Code", href: "https://github.com/BleenEngBlue/reconciliation-workbench" }],
    desc: "Human-in-the-loop AI exception review for multi-jurisdiction tax compliance. Deterministic core, AI at the edges, humans at the points of consequence: a rules engine detects six exception classes, an LLM triage layer explains each exception and proposes a disposition, a reviewer approves or overrides, and every decision lands in an exportable audit trail. An eval panel scores every run against seeded ground truth — 100% recall, zero false positives.",
    highlights: [
      { title: "Measured on every run", text: "Golden-dataset eval panel measures precision and recall against seeded ground truth on each run: 100% recall, 1.0 precision, zero false positives." },
      { title: "Jurisdictions as configuration", text: "Adding a country is one JSON entry and zero downstream code changes. A declarative connector layer normalizes native-format feeds (semicolon CSVs, comma decimals, nested-JSON e-invoice statuses) into one canonical model." },
      { title: "Six exception classes", text: "Rate, arithmetic, duplicate invoice, e-invoice linkage, orphan e-report, and return tie-out — detected deterministically, explained by the LLM, decided by a human." },
      { title: "Audit trail & governance", text: "Every approve/override is logged to an exportable audit trail. All data synthetic; deployed auth-gated on Hugging Face Spaces; security-scanned with Bandit and pip-audit." },
    ],
    stack: ["Python", "Gradio", "Human-in-the-loop (HITL)", "Rules engine", "LLM triage", "Golden-dataset evals", "AI governance", "Synthetic data", "Hugging Face Spaces"],
  },
  {
    id: "digital-twin",
    badge: "Live · Production",
    badgeLive: true,
    featured: true,
    title: "AI Digital Twin — production agentic RAG agent",
    sub: "Agentic RAG + LLM · structured tool-calling · real-time intent routing · per-stage eval harness · live on Hugging Face Spaces · Apr 2026 — present",
    links: [
      { label: "Live demo", href: "https://huggingface.co/spaces/Monica-Wu/digital-twin" },
      { label: "Code", href: "https://github.com/BleenEngBlue/Digital_Twin" },
    ],
    desc: "Production agentic RAG agent with structured tool-calling and real-time intent routing that answers natural-language questions about my professional background in my own voice — GPT-4.1 Mini grounded by semantic search over ChromaDB. Shipped to production in 6 weeks; live and maintained independently since May 2026.",
    highlights: [
      { title: "Semantic-chunking redesign", text: "Semantic-chunking redesign improved retrieval coherence over the naive baseline — retrieval returns whole, word-aligned passages instead of mid-word fragments." },
      { title: "Per-stage eval harness", text: "Chunking, embedding, retrieval, context assembly, and generation each have their own evals and can be swapped independently — when quality degrades, the harness shows which stage did it." },
      { title: "Real-time agentic routing", text: "Real-time agentic routing delivers hire/collaboration intent to me within seconds of a visitor interaction." },
      { title: "Production guardrails", text: "Privacy and integrity guardrails: no personal contact disclosure, no fabricated opinions, no binding commitments. Latency, cost, and errors monitored in production." },
      { title: "How it's evaluated", wide: true, check: true, text: "Retrieval quality is verified, not assumed: before/after comparison across the chunking change on a fixed question set, guardrail behavior spot-checked against adversarial prompts, and semantic cluster separation inspected in the companion pipeline to confirm passages group coherently rather than fragmenting." },
    ],
    stack: ["Python", "OpenAI API", "GPT-4.1 Mini", "ChromaDB", "Gradio", "Hugging Face Spaces", "Agentic RAG", "Tool-calling", "Eval harness", "Guardrails", "LLM observability"],
  },
  {
    id: "rag-pipeline",
    badge: "Pipeline · Research",
    title: "Reproducible RAG Pipeline — semantic chunking, embeddings & cluster visualization",
    sub: "Open-source Jupyter walkthrough · Apr 2026 — present",
    links: [{ label: "GitHub", href: "https://github.com/BleenEngBlue/Reproducible_RAG_Pipeline_Semantic_Chunking_Embedding_and_Cluster_Visualization" }],
    desc: "A hands-on Jupyter notebook that walks through the core building blocks of a Retrieval-Augmented Generation (RAG) pipeline — from raw document ingestion through intelligent chunking, embedding generation, semantic clustering, and interactive 3D visualization. The demo document is the Netflix Culture Memo (June 2024). The component engineering behind my production agent.",
    stack: ["Python", "ChromaDB", "Embeddings", "Semantic chunking", "UMAP", "KMeans", "Cluster eval", "Vector search", "Data visualization", "Jupyter"],
  },
  {
    id: "portfolio",
    badge: "Portfolio · Design + build",
    title: "wumonica.com — portfolio",
    sub: "Designed and built end to end in Next.js, TypeScript, and Tailwind CSS · typography, visual hierarchy, component system, accessibility, performance owned as one surface · 2016 — present",
    links: [{ label: "GitHub", href: SITE.social.github }],
    desc: "This site. A hand-built design system — Cormorant Garamond + DM Mono, dark and light themes, semantic HTML — rendered by Next.js (App Router, static export) and React with Tailwind CSS v4 utilities; WCAG 2.2 AA as an acceptance criterion, zero third-party requests, self-hosted fonts, and a hardened CSP. Showcases two production AI systems and 10 years of high-stakes UI.",
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
    date: "Aug 2025 — present · 1 yr 1 mo",
    company: "Wumonica Studio (Independent) · Self-employed · Remote",
    role: "AI Frontend Engineer",
    body: "Designed and built this portfolio site end to end in Next.js, TypeScript, and Tailwind CSS — typography, visual hierarchy, component system, accessibility, and performance as one surface. Shipped 2 production AI products in 2026 with full-stack ownership, from code prototype to deploy: Reconciliation Workbench (human-in-the-loop review UI designed around the one screen a reviewer needs; Python, Gradio, exportable audit trail; 100% recall, 1.0 precision against seeded ground truth; built in 2 days) and Digital Twin (agentic RAG with Python, OpenAI API, ChromaDB; live since May 2026). Let the interface shape the data: because every source had to look identical on the reviewer's screen, jurisdictions (US sales tax, EU e-invoicing/CTC) became pure configuration via a declarative connector layer — a new country is one JSON entry, zero code changes. Per-stage eval harnesses isolate the degraded stage; latency, cost, and errors monitored in production. Practice AI-assisted development daily (Claude, Cursor), cutting feature delivery time by ~40% while keeping every change review-ready.",
    tags: ["Design + build", "Next.js", "Tailwind CSS", "TypeScript", "Human-in-the-loop UI", "Agentic RAG", "Evals", "Python", "OpenAI API", "Claude", "Cursor"],
  },
  {
    date: "Sep 2023 — Aug 2025 · 2 yrs",
    company: "Inteliquet, an IQVIA business · Full-time · Remote",
    role: "Software Development Engineer 4",
    body: "Self-initiated a local LLM inference study (Ollama, Llama 3.1) on constrained hardware that established the AI roadmap for regulated clinical deployments. Owned frontend features end to end for clinical research apps across 9 client sites: ran requirements discovery with stakeholders, shipped production TypeScript/Angular components, and resolved post-launch issues within 24 hours. Consolidated 10+ Angular components into a shared library and shipped i18n across 2 production apps, reducing duplicate work across 3 product teams by ~25%. Accelerated delivery with AI-assisted development (Cursor) in a regulated healthcare codebase, keeping every change review-ready and audit-compliant.",
    tags: ["Local LLM inference", "Ollama · Llama 3.1", "TypeScript", "Angular", "Regulated industries", "i18n", "Cursor"],
  },
  {
    date: "Jan 2022 — Aug 2023 · 1 yr 8 mos",
    company: "Inovalon · Full-time · Remote",
    role: "Product Engineer — Design Systems",
    body: "Owned the in-house design system end to end — designed the components (visual and interaction design), built them, and put them into production — for healthcare apps serving physicians and pharmacies nationwide. Published each component to the internal developer site with a live, interactive demo on one tab and the copy-ready HTML, JS, and CSS on their own tabs, alongside the usage documentation I wrote — so consuming teams could see exactly how it was meant to behave, then take the code. Audited the entire internal site — ~25 components and their documentation — set the fix order myself, and did the fixes: rebuilt components that were broken on the site, added missing accessibility, and brought every doc page to one consistent voice. Reusable, accessible components with typography, interaction design, cross-browser compatibility, and performance as acceptance criteria. As one of a 3-developer team migrating the library across 6 major Angular versions (8 to 14) on the live site, upgraded every component I owned with zero regressions — cutting consuming teams' upgrade effort by ~40%. Authored the component specifications — typography, spacing, states, accessibility, and API defined once — adopted as the single reference by internal teams, reducing UI bugs by ~20%; ran working sessions with designers and engineers to keep consuming teams' screens consistent.",
    tags: ["Design systems", "Component documentation site", "Component libraries", "Accessibility", "Zero-regression migration", "Angular", "TypeScript"],
  },
  {
    date: "Jul 2018 — Jan 2022 · 3 yrs 7 mos",
    company: "Accenture · Full-time · Greater Seattle Area · Hybrid",
    role: "Software Engineer",
    body: "Delivered transaction-critical frontend features end to end for an enterprise payments platform processing $200M+/month, optimizing UI performance on authorization and money-movement flows. On a separate ~1-year telecommunications engagement, built the components of a client design system and published the library to npm as versioned releases, sequenced so the client's internal development teams could upgrade incrementally. Resolved critical production defects through root-cause analysis, restoring payment workflows within SLA 100% of the time. Mentored 2 engineers in advanced Angular (RxJS, state management, lazy loading), accelerating their time-to-productivity by 3 weeks.",
    tags: ["FinTech · Payments ($200M+/mo)", "Design system · npm library (telecom)", "High reliability", "Root-cause analysis", "TypeScript", "Angular · RxJS", "Mentoring"],
  },
  {
    date: "Jan 2018 — May 2018 · 5 mos",
    company: "Microsoft · Contract · Redmond, WA · On-site",
    role: "Software Development Engineer",
    body: "Delivered a production Angular/TypeScript interface on REST APIs for Microsoft partner and internal teams to publish and manage JSON schemas for automated page generation — used by 10+ partner teams. Collaborated across 2 engineering teams to align API contracts and frontend implementation, shipping on time despite cross-team dependencies.",
    via: "Contract via Design Laboratory Inc.",
    tags: ["Angular", "TypeScript", "REST APIs", "JSON Schema"],
  },
  {
    date: "Dec 2017 — Feb 2018 · 3 mos",
    company: "Win-Kel · Freelance · Greater Seattle Area · Hybrid",
    role: "Product Engineer",
    body: "Architected a 0 to 1 full-stack product (React, Redux, Node.js, TypeScript) for a 4-person startup — owned product and stack decisions from database schema to UI. Set frontend technical direction and mentored 2 junior engineers through code review.",
    tags: ["0 to 1", "React", "Redux", "Node.js", "TypeScript", "Mentoring"],
  },
  {
    date: "Jan 2017 — Apr 2017 · 4 mos",
    company: "Microsoft · Contract · Greater Seattle Area · On-site",
    role: "Product Engineer",
    body: "Built and remediated WCAG-accessible framework components (Angular, React, TypeScript) deployed across ~50,000 Microsoft partner websites. Ensured 100% WCAG 2.1 AA compliance for all components, reducing accessibility-related support tickets by ~30%.",
    via: "Contract via Jetstream Software.",
    tags: ["Accessibility / WCAG 2.1 AA", "Angular", "React", "TypeScript"],
  },
  {
    date: "Jun 2016 — Oct 2016 · 5 mos",
    company: "NBCUniversal · Contract · Seattle, WA · On-site",
    role: "Software Engineer",
    body: "Shipped production fixes, analytics instrumentation, and SEO sitemap improvements for NBCNews.com social and video features serving tens of millions of monthly users. Reduced page load time for video-heavy pages through performance tuning.",
    via: "Contract via Next Step Staffing.",
    tags: ["JavaScript", "Performance tuning", "SEO", "Analytics"],
  },
  {
    date: "Jan 2016 — Apr 2016 · 4 mos",
    company: "UIEvolution, Inc. · Contract · Greater Seattle Area · On-site",
    role: "Product Engineer",
    body: "Built production digital-signage web apps for smart TVs, kiosks, and mobile — with performance and stress testing against real device constraints.",
    via: "Contract through Sixth Ave Studios.",
    tags: ["React", "JavaScript", "Digital signage", "Stress testing"],
  },
];

export type Edu = { date: string; school: string; degree: string; desc: string; tags: string[]; featured?: boolean };

export const EDUCATION: Edu[] = [
  {
    date: "Issued May 2026",
    school: "SuperDataScience",
    degree: "AI Engineer Sprint — Capstone: Digital Twin, production RAG agent shipped in 6 weeks",
    desc: "Production-focused AI Engineer Sprint. The capstone became the first version of my Digital Twin agent — shipped to production in 6 weeks and maintained independently since May 2026: agentic RAG, semantic chunking, privacy guardrails, real-time tool-calling, and a per-stage eval harness.",
    tags: ["AI Agents", "Agentic AI Development", "RAG", "OpenAI API", "ChromaDB", "Production deployment"],
    featured: true,
  },
  {
    date: "In progress · 2026",
    school: "Interview Kickstart",
    degree: "Machine Learning Engineering",
    desc: "Machine learning engineering program covering ML fundamentals, deep learning, and model evaluation — deepening the ML foundations behind the production AI systems I ship.",
    tags: ["Machine Learning", "Deep Learning", "Model Evaluation"],
  },
  {
    date: "May 2015 — Oct 2015",
    school: "Code Fellows",
    degree: "Certificate · Full-stack JavaScript",
    desc: "Immersive, full-time software engineering program focused on production full-stack JavaScript: Node.js and Express REST APIs, MongoDB data modeling, authentication, test-driven development, and deployment. Capstone: conceived, architected, and led a team build of a food-truck locator app over 5 days (OAuth, Google Maps API, JavaScript front end, MongoDB) — personally built the Google Maps integration and the front end. The foundation for a decade of production TypeScript, React, Angular, and Node.js work at Microsoft, Accenture, IQVIA, and Inovalon.",
    tags: ["React", "Angular", "Node.js · Express", "MongoDB", "TDD"],
  },
  {
    date: "B.A.",
    school: "California State University, Los Angeles",
    degree: "Bachelor of Arts (B.A.) · Art — Design Concentration",
    desc: "Concentration in visual systems, typography, hierarchy, and interaction design: the foundation for the design systems and component specifications adopted as the single reference at Inovalon.",
    tags: ["Interaction design", "Design systems", "Typography", "Visual communication"],
  },
];

export const CONTACT = {
  targeting:
    "senior design engineer, AI frontend, and product engineering roles where the interface and the code behind it are the same job",
  targetingRest:
    " — including LLM products shipped to real users. Remote (US), Pacific time, distributed-first.",
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
