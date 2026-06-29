export type Capability = {
  title: string;
  body: string;
  stance: string;
  points: string[];
};

export const capabilities: Capability[] = [
  {
    title: "AI Agents",
    stance: "Give the agent a job, not a demo.",
    body: "Agents that remove recurring work from the team. They read, decide, route, draft, and hand off when a person should step in.",
    points: ["Brief to workflow", "Tool use", "Human handoff"],
  },
  {
    title: "Internal Tools",
    stance: "Replace the tab maze.",
    body: "Ops tools and control rooms for the work that currently lives in sheets, Slack, and memory.",
    points: ["Live data", "Roles", "Audit trails"],
  },
  {
    title: "MVP Software",
    stance: "Ship the first real version.",
    body: "The smallest complete product that can take payment, gather usage, and prove what should happen next.",
    points: ["Auth", "Payments", "Usage"],
  },
  {
    title: "Product Systems",
    stance: "Build the layer that holds up.",
    body: "Product, data, and infrastructure work for teams that need speed without creating expensive cleanup later.",
    points: ["APIs", "Pipelines", "Infra"],
  },
];

export type Step = {
  index: string;
  title: string;
  body: string;
};

export const process: Step[] = [
  {
    index: "01",
    title: "Brief",
    body: "We get close to the vision, the constraint, and the money or time leaking from the system.",
  },
  {
    index: "02",
    title: "Shape",
    body: "We map the workflow, remove the soft parts, and decide what must be real first.",
  },
  {
    index: "03",
    title: "Build",
    body: "We ship the smallest complete version the team can use, not a presentation about it.",
  },
  {
    index: "04",
    title: "Harden",
    body: "We tune it against real usage so the work saves time and avoids expensive rework.",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How fast can you start?",
    a: "Most projects kick off within a week of the first conversation. We keep scope tight so we can move.",
  },
  {
    q: "What does it cost?",
    a: "Most builds land between 10k and 30k. We scope against the outcome, not hours, and quote before we start.",
  },
  {
    q: "How long until I see something working?",
    a: "Days, not quarters. The first usable version usually ships in a few weeks and gets used for real.",
  },
  {
    q: "Do you work with non-technical founders?",
    a: "Yes. We map the system in plain language before we write code, so you always know what you are getting.",
  },
  {
    q: "What happens after launch?",
    a: "We watch how it runs and sharpen it against real usage. You own the code and the systems.",
  },
  {
    q: "What do you need from me to start?",
    a: "A clear problem and someone who can answer questions. We handle the rest.",
  },
];

export type PreviewKind = "queue" | "bars" | "lines" | "status" | "rings";

export type CaseStudy = {
  slug: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  problem: string;
  built: string;
  result: string;
  proof: string;
  users: string;
  artifact: string;
  tags: string[];
  preview: PreviewKind;
  assets?: {
    video?: string;
    pdf?: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "grace",
    client: "Grace",
    category: "Brand system, product interface, social UI, motion",
    year: "2025",
    summary:
      "A brand and interface system for a product that needed to feel human, premium, and alive.",
    problem:
      "Grace needed a product identity and interface direction that felt human, premium, and alive.",
    built:
      "Brand visuals, motion direction, social mockups, phone UI direction, and a scrolling interface concept.",
    result:
      "A clearer product presence with motion-ready visuals the team could use across product and launch work.",
    proof: "Brand concept, motion proof, social UI, phone direction",
    users: "Founder and product team",
    artifact: "Motion-ready brand system",
    tags: ["Brand system", "Product interface", "Social UI", "Motion"],
    preview: "lines",
    assets: {
      video: "/brand/grace/grace-animation.mp4",
      pdf: "/brand/grace/grace-branding-concept.pdf",
    },
  },
  {
    slug: "orbit-artist-group",
    client: "Orbit Artist Group",
    category: "AI Agents",
    year: "2025",
    summary: "An artist-ops agent for roster work: releases, tasks, approvals, and follow ups.",
    problem:
      "A growing roster meant releases, deadlines, and deliverables were being tracked by memory, messages, and manual follow up.",
    built:
      "An agent-backed operating layer that watches project state, prompts the right person, and keeps release work visible without another status meeting.",
    result: "Less chasing, fewer missed handoffs, and a roster workflow that keeps moving while the team stays focused on artists.",
    proof: "Release tracker, task queue, follow-up agent",
    users: "Artist managers and operations leads",
    artifact: "Roster operating system",
    tags: ["Agents", "Ops", "Roster"],
    preview: "queue",
  },
  {
    slug: "media-scaling",
    client: "Media Scaling",
    category: "Internal Tools",
    year: "2025",
    summary: "A paid-media control room for spend, winners, account health, and budget moves.",
    problem:
      "Spend was spread across accounts and reports, making it slow to see what worked and where money should move.",
    built:
      "An internal decision screen that pulls account data into one view, flags winners, and gives the team a faster way to reallocate budget.",
    result: "A clearer review loop for spend decisions, with less time lost jumping between dashboards.",
    proof: "Spend view, account health, budget review flow",
    users: "Media buyers and operators",
    artifact: "Paid media control room",
    tags: ["Dashboard", "Spend", "Ops"],
    preview: "bars",
  },
  {
    slug: "soniq",
    client: "Soniq",
    category: "MVP Software",
    year: "2024",
    summary: "A music product taken from concept to a usable MVP with real product paths.",
    problem:
      "A strong music concept needed a product fast enough to test with real users before the opportunity cooled.",
    built:
      "A working MVP with auth, playback, billing, onboarding, and a clean interface that could support real usage.",
    result: "The idea moved from conversation to a product people could try, pay for, and judge honestly.",
    proof: "Auth, playback, billing, onboarding",
    users: "Music fans and early product users",
    artifact: "Live product MVP",
    tags: ["MVP", "Product", "Audio"],
    preview: "lines",
  },
  {
    slug: "dividends-total-returns",
    client: "Dividends & Total Returns",
    category: "Product Systems",
    year: "2024",
    summary: "A finance system that turns dividend and total-return math into a trusted product view.",
    problem:
      "Dividend and total return math lived in a tangle of fragile spreadsheets no one trusted.",
    built:
      "A product system that tracks dividends, reinvestment, and total return across a portfolio with live data and clear calculations.",
    result: "Replaced fragile spreadsheet work with a clearer system for investors and operators.",
    proof: "Portfolio data, return math, reinvestment views",
    users: "Investors and finance operators",
    artifact: "Return calculation system",
    tags: ["Finance", "Systems", "Data"],
    preview: "rings",
  },
];
