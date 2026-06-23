import {
  Bot,
  Wrench,
  Rocket,
  Boxes,
  Eye,
  Zap,
  Layers,
  FileText,
  Map as MapIcon,
  Code2,
  LineChart,
  type LucideIcon,
} from "lucide-react";

export type Capability = {
  title: string;
  body: string;
  points: string[];
  icon: LucideIcon;
};

export const capabilities: Capability[] = [
  {
    title: "AI Agents",
    body: "Agents that read, decide, and act inside your systems.",
    points: ["Tool use", "Memory", "Human handoff"],
    icon: Bot,
  },
  {
    title: "Internal Tools",
    body: "Dashboards and ops tools your team actually uses.",
    points: ["Live data", "Roles", "Audit trail"],
    icon: Wrench,
  },
  {
    title: "MVP Software",
    body: "A first version that ships. Real product in weeks.",
    points: ["Auth", "Payments", "Analytics"],
    icon: Rocket,
  },
  {
    title: "Product Systems",
    body: "Full systems that scale and hold up under load.",
    points: ["APIs", "Pipelines", "Infra"],
    icon: Boxes,
  },
];

export type Reason = {
  title: string;
  body: string;
  icon: LucideIcon;
};

export const reasons: Reason[] = [
  {
    title: "We understand the vision",
    body: "We get the goal before we write code, then push it past the brief.",
    icon: Eye,
  },
  {
    title: "We move fast",
    body: "Short cycles. Working software in days, not quarters.",
    icon: Zap,
  },
  {
    title: "We build real systems",
    body: "No throwaway demos. Solid, tested, ready to grow.",
    icon: Layers,
  },
];

export type Step = {
  index: string;
  title: string;
  body: string;
  icon: LucideIcon;
};

export const process: Step[] = [
  {
    index: "01",
    title: "Brief",
    body: "We learn the problem, the users, and what winning looks like.",
    icon: FileText,
  },
  {
    index: "02",
    title: "Map the system",
    body: "We design the flow, the data, and the edges before building.",
    icon: MapIcon,
  },
  {
    index: "03",
    title: "Build the first version",
    body: "We ship a working version fast so you can use it for real.",
    icon: Code2,
  },
  {
    index: "04",
    title: "Improve with real usage",
    body: "We watch how it runs and sharpen it against real data.",
    icon: LineChart,
  },
];

export type Metric = { label: string; value: string };

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
  metrics: Metric[];
  tags: string[];
  preview: PreviewKind;
};

// Industries we've shipped for (derived from real case studies, not invented).
export const industries = ["Music", "Media", "Finance", "Ops", "Startups"];

export type Reassurance = { title: string; body: string };

// Risk-reversal points. Factual, tied to how engagements actually work.
export const reassurances: Reassurance[] = [
  {
    title: "Fixed scope, fixed price",
    body: "We quote the work before we start. No open-ended hourly bills.",
  },
  {
    title: "Working software in days",
    body: "You see a usable version fast, not a deck or a long wait.",
  },
  {
    title: "You own everything",
    body: "The code and the systems are yours. No lock-in.",
  },
  {
    title: "No long contracts",
    body: "We earn the next step by shipping the first one.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image?: string;
  /** Marks sample content so it never reads as a real claim. */
  placeholder?: boolean;
};

// MOCK preview content. Replace with real, approved quotes and drop placeholder.
export const testimonials: Testimonial[] = [
  {
    quote:
      "They shipped a working system in weeks, not quarters. It just runs, and we stopped chasing the busywork.",
    name: "Alex Rivera",
    role: "Founder, media startup",
    image: "/people/p1.png",
    placeholder: true,
  },
  {
    quote:
      "The agent handles the coordination our team used to drown in. We feel it every week.",
    name: "Jordan Lee",
    role: "Head of Ops, agency",
    image: "/people/p2.png",
    placeholder: true,
  },
];

export type Founder = {
  name: string;
  role: string;
  note: string;
  image: string;
  /** Marks sample content so it never reads as a real claim. */
  placeholder?: boolean;
};

// MOCK preview content. Replace name/note/image with the real founder.
export const founder: Founder | null = {
  name: "Your name here",
  role: "Founder, Execution Labs",
  note: "I started Execution Labs to ship the systems other shops only pitch. We build the thing, put it in your hands fast, and keep sharpening it.",
  image: "/people/founder.png",
  placeholder: true,
};

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

export const caseStudies: CaseStudy[] = [
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
    metrics: [
      { label: "Coordination", value: "-70%" },
      { label: "Active projects", value: "48" },
      { label: "Agent uptime", value: "99.9%" },
    ],
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
    metrics: [
      { label: "Review time", value: "-87%" },
      { label: "Accounts", value: "32" },
      { label: "Spend tracked", value: "$4.2M" },
    ],
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
    metrics: [
      { label: "Time to launch", value: "6 wks" },
      { label: "Beta users", value: "1.1k" },
      { label: "Retention", value: "42%" },
    ],
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
    metrics: [
      { label: "Holdings", value: "260" },
      { label: "Refresh", value: "Live" },
      { label: "Errors", value: "0" },
    ],
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
    metrics: [
      { label: "Hours saved", value: "11/wk" },
      { label: "Tools linked", value: "7" },
      { label: "Tasks routed", value: "3.4k" },
    ],
    tags: ["Agents", "Ops", "Integration"],
    preview: "status",
  },
];
