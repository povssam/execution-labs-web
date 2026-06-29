export type Capability = {
  title: string;
  body: string;
  points: string[];
};

export const capabilities: Capability[] = [
  {
    title: "AI agents",
    body: "Agents that take real work off the team. They read, decide, route, draft, and hand off when a person should step in.",
    points: ["Tool use", "Memory", "Human handoff"],
  },
  {
    title: "Internal software",
    body: "Ops tools, dashboards, and control rooms built around how the company already runs.",
    points: ["Live data", "Roles", "Audit trails"],
  },
  {
    title: "MVP software",
    body: "The first version that proves the idea. Real product in weeks, not a deck pretending to be progress.",
    points: ["Auth", "Payments", "Analytics"],
  },
  {
    title: "Product systems",
    body: "The product, data, and infrastructure layer when the work needs to hold up after launch.",
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
    title: "Understand",
    body: "We get close to the vision, the constraints, and the real cost of the problem.",
  },
  {
    index: "02",
    title: "Push further",
    body: "We map the system and sharpen the idea before a build gets locked in.",
  },
  {
    index: "03",
    title: "Ship the first version",
    body: "We build the smallest complete version that can be used by the team.",
  },
  {
    index: "04",
    title: "Make it hold up",
    body: "We tune it against real usage so speed does not come at the cost of quality.",
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
      "A product identity, social UI direction, and motion system built around a human premium feel.",
    problem:
      "Grace needed a product identity and interface direction that felt human, premium, and alive.",
    built:
      "Brand visuals, motion direction, social mockups, phone UI direction, and a scrolling interface concept.",
    result:
      "A clearer product presence with motion-ready visuals and a stronger brand system.",
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
    summary: "An artist-ops agent that keeps releases, tasks, and follow ups moving.",
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
    summary: "A control room for paid media decisions at scale.",
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
    summary: "A music product taken from idea to live MVP.",
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
    summary: "An investing system that makes return math clear and usable.",
    problem:
      "Dividend and total return math lived in a tangle of fragile spreadsheets no one trusted.",
    built:
      "A system that tracks dividends, reinvestment, and total return across a full portfolio with live data and clear math.",
    result: "Replaced the spreadsheets with a view investors trust.",
    tags: ["Finance", "Systems", "Data"],
    preview: "rings",
  },
  {
    slug: "motion-systems",
    client: "Motion Systems",
    category: "Motion and product",
    year: "2025",
    summary: "Motion studies for product moments that need to feel fast, clear, and owned.",
    problem:
      "The work needed to feel built, not assembled from a template.",
    built:
      "A controlled motion language using short reveals, vertical movement, and the real prismatic identity asset.",
    result: "The site now feels more like Execution Labs and less like generic AI software.",
    tags: ["Motion", "Product", "Identity"],
    preview: "status",
  },
];
