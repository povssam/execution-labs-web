export type Capability = {
  title: string;
  body: string;
  points: string[];
};

export const capabilities: Capability[] = [
  {
    title: "AI Agents",
    body: "Agents that read, decide, and act inside your systems.",
    points: ["Tool use", "Memory", "Human handoff"],
  },
  {
    title: "Internal Tools",
    body: "Dashboards and ops tools your team actually uses.",
    points: ["Live data", "Roles", "Audit trail"],
  },
  {
    title: "MVP Software",
    body: "A first version that ships. Real product in weeks.",
    points: ["Auth", "Payments", "Analytics"],
  },
  {
    title: "Product Systems",
    body: "Full systems that scale and hold up under load.",
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
    body: "We learn the problem, the users, and what winning looks like.",
  },
  {
    index: "02",
    title: "Map the system",
    body: "We design the flow, the data, and the edges before building.",
  },
  {
    index: "03",
    title: "Build the first version",
    body: "We ship a working version fast so you can use it for real.",
  },
  {
    index: "04",
    title: "Improve with real usage",
    body: "We watch how it runs and sharpen it against real data.",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "How fast can you start?",
    a: "Most projects kick off within a week of the first call. We keep scope tight so we can move.",
  },
  {
    q: "What does it cost?",
    a: "Most builds land between 10k and 30k. We scope against the outcome, not hours, and quote before we start.",
  },
  {
    q: "How long until I see something working?",
    a: "Days, not quarters. The first usable version usually ships in a few weeks, and you use it for real.",
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
  tags: string[];
  preview: PreviewKind;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "grace",
    client: "Grace",
    category: "Brand, product UI, social",
    year: "2025",
    summary:
      "A product identity and interface direction that feels human, premium, and alive.",
    problem:
      "Grace needed a product identity and interface direction that felt human, premium, and alive.",
    built:
      "Brand visuals, social mockups, phone UI direction, and a scrolling UI concept.",
    result:
      "A clearer product presence with motion-ready visuals and a stronger brand feel.",
    tags: ["Brand system", "Product UI", "Motion"],
    preview: "lines",
  },
  {
    slug: "orbit-artist-group",
    client: "Orbit Artist Group",
    category: "AI Agents",
    year: "2025",
    summary: "An agent that runs artist operations end to end.",
    problem:
      "A growing roster meant releases, deadlines, and deliverables slipped through manual tracking.",
    built:
      "An agent that watches every project, chases the right people, and keeps work moving without a manager in the loop.",
    result: "Manual coordination dropped 70 percent across the roster.",
    tags: ["Agents", "Ops", "Automation"],
    preview: "queue",
  },
  {
    slug: "media-scaling",
    client: "Media Scaling",
    category: "Internal Tools",
    year: "2025",
    summary: "A control room for paid media at scale.",
    problem:
      "Spend was spread across dozens of ad accounts with no single place to judge what worked.",
    built:
      "An internal tool that pulls every account into one view so the team spots winners and reallocates spend in minutes.",
    result: "Reviews that took a full day now take an hour.",
    tags: ["Dashboard", "Data", "Internal"],
    preview: "bars",
  },
  {
    slug: "soniq",
    client: "Soniq",
    category: "MVP Software",
    year: "2024",
    summary: "A music product, from idea to live MVP.",
    problem:
      "A strong concept had no product, and the window to test it with real users was closing.",
    built:
      "A working MVP with auth, playback, billing, and a clean interface that real users were on within weeks.",
    result: "Shipped a usable product in six weeks.",
    tags: ["MVP", "Product", "Audio"],
    preview: "lines",
  },
  {
    slug: "dividends-total-returns",
    client: "Dividends & Total Returns",
    category: "Product Systems",
    year: "2024",
    summary: "An investing system that models returns in real time.",
    problem:
      "Dividend and total return math lived in a tangle of fragile spreadsheets no one trusted.",
    built:
      "A system that tracks dividends, reinvestment, and total return across a full portfolio with live data and clear math.",
    result: "Replaced the spreadsheets with a view investors trust.",
    tags: ["Finance", "Systems", "Data"],
    preview: "rings",
  },
  {
    slug: "custom-ai-ops-system",
    client: "Custom AI Ops System",
    category: "AI Agents",
    year: "2025",
    summary: "A custom ops brain for a fast moving team.",
    problem:
      "Work was scattered across email, docs, and tasks, and follow ups kept falling away.",
    built:
      "An agent layer that drafts, routes, and follows up across every tool so the team stays on the work that matters.",
    result: "Saved each operator hours every week.",
    tags: ["Agents", "Ops", "Integration"],
    preview: "status",
  },
];
