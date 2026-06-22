"use client";

import { useEffect, useState } from "react";
import { CountUp } from "../ui/CountUp";
import { cn } from "@/lib/utils";

function Panel({
  title,
  meta,
  className,
  children,
  delay = 0,
}: {
  title: string;
  meta?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      style={delay ? { animationDelay: `${delay}s` } : undefined}
      className={cn(
        "reveal flex flex-col rounded-xl border border-line bg-charcoal/70 p-4",
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-faint">
          {title}
        </span>
        {meta}
      </div>
      {children}
    </div>
  );
}

const queueItems = [
  { label: "Sync release calendar", state: "run" },
  { label: "Draft client update", state: "run" },
  { label: "Reconcile ad spend", state: "queue" },
  { label: "Flag overdue tasks", state: "done" },
];

function AgentQueue({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % queueItems.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <Panel
      title="Agent queue"
      delay={0.05}
      className={className}
      meta={
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-bone-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          4 active
        </span>
      }
    >
      <ul className="flex flex-col gap-1.5">
        {queueItems.map((item, i) => (
          <li
            key={item.label}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-xs transition-colors duration-300",
              i === active ? "bg-charcoal-2 text-bone" : "text-bone-dim",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 shrink-0 rounded-full",
                item.state === "run" && "bg-emerald-400",
                item.state === "queue" && "bg-amber-400/80",
                item.state === "done" && "bg-bone-faint",
              )}
            />
            <span className="truncate">{item.label}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function WorkflowMap({ className }: { className?: string }) {
  return (
    <Panel title="Workflow map" delay={0.1} className={className}>
      <svg viewBox="0 0 220 96" className="h-[88px] w-full" fill="none">
        <defs>
          <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e7e3da" stopOpacity="0" />
            <stop offset="50%" stopColor="#e7e3da" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e7e3da" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          "M22 48 H80",
          "M80 48 C100 48 100 24 124 24",
          "M80 48 C100 48 100 72 124 72",
          "M150 24 C172 24 172 48 196 48",
          "M150 72 C172 72 172 48 196 48",
        ].map((d, i) => (
          <g key={i}>
            <path d={d} stroke="#232327" strokeWidth="1.5" />
            <path
              className="flow-line"
              d={d}
              stroke="url(#flow)"
              strokeWidth="1.5"
              strokeDasharray="26 120"
              strokeDashoffset={160}
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          </g>
        ))}
        {[
          [22, 48],
          [80, 48],
          [124, 24],
          [124, 72],
          [150, 24],
          [150, 72],
          [196, 48],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="4.5"
            fill="#0d0d0f"
            stroke="#e7e3da"
            strokeWidth="1.5"
          />
        ))}
      </svg>
    </Panel>
  );
}

const timeBars = [40, 55, 48, 70, 62, 85, 78, 96];

function TimeSaved() {
  return (
    <Panel
      title="Time saved"
      delay={0.15}
      meta={
        <span className="font-mono text-[10px] text-emerald-400">+18% mo</span>
      }
    >
      <div className="flex items-baseline gap-1">
        <CountUp
          to={1284}
          duration={1.6}
          className="text-3xl font-semibold tracking-tight text-bone"
        />
        <span className="text-sm text-bone-dim">hrs</span>
      </div>
      <div className="mt-3 flex h-9 items-end gap-1">
        {timeBars.map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 rounded-sm bg-bone/25"
          />
        ))}
      </div>
    </Panel>
  );
}

const systems = [
  { name: "Agents", up: true },
  { name: "Pipelines", up: true },
  { name: "API", up: true },
  { name: "Webhooks", up: true },
];

function SystemStatus() {
  return (
    <Panel
      title="System status"
      delay={0.2}
      meta={
        <span className="font-mono text-[10px] text-emerald-400">
          operational
        </span>
      }
    >
      <ul className="grid grid-cols-2 gap-1.5">
        {systems.map((s) => (
          <li
            key={s.name}
            className="flex items-center gap-2 rounded-md border border-line bg-ink/40 px-2 py-1.5 text-xs text-bone-dim"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {s.name}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ClientBrief() {
  return (
    <Panel
      title="Client brief"
      delay={0.25}
      meta={<span className="font-mono text-[10px] text-bone-faint">v3</span>}
    >
      <p className="text-xs leading-relaxed text-bone-dim">
        Automate roster ops. Track every release. Chase the right people. Keep
        work moving without a manager in the loop.
      </p>
    </Panel>
  );
}

const builds = [
  { label: "Data model", pct: 100 },
  { label: "Agent layer", pct: 92 },
  { label: "Dashboard", pct: 74 },
];

function BuildProgress() {
  return (
    <Panel title="Build progress" delay={0.3}>
      <ul className="flex flex-col gap-2.5">
        {builds.map((b) => (
          <li key={b.label}>
            <div className="mb-1 flex justify-between text-[11px]">
              <span className="text-bone-dim">{b.label}</span>
              <span className="font-mono text-bone-faint">{b.pct}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-charcoal-2">
              <div
                className="h-full rounded-full bg-bone/70"
                style={{ width: `${b.pct}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function OpsDashboard() {
  return (
    <div className="relative rounded-2xl border border-line bg-ink/80 p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] glass">
      {/* window chrome */}
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="h-2.5 w-2.5 rounded-full border border-line" />
        <span className="ml-2 font-mono text-[10px] text-bone-faint">
          execution-os
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-bone-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 p-1 sm:grid-cols-4">
        <AgentQueue className="col-span-2" />
        <WorkflowMap className="col-span-2" />
        <TimeSaved />
        <SystemStatus />
        <ClientBrief />
        <BuildProgress />
      </div>
    </div>
  );
}
