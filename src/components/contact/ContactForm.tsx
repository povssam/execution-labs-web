"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { CALENDAR_URL } from "@/lib/site";

const projectTypes = [
  "AI Agents",
  "Internal Tools",
  "MVP Software",
  "Product Systems",
];

const budgets = ["Under 10k", "10k to 30k", "30k+", "Not sure"];

const fieldClass =
  "w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-bone placeholder:text-bone-faint outline-none transition-all duration-200 focus:border-bone/50 focus:bg-charcoal-2 focus:ring-1 focus:ring-bone/20";

const labelClass = "text-xs font-medium text-bone-dim";

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-all duration-200",
        active
          ? "border-bone bg-bone text-ink"
          : "border-line text-bone-dim hover:border-bone/40 hover:text-bone",
      )}
    >
      {children}
    </button>
  );
}

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export function ContactForm() {
  const [type, setType] = useState(projectTypes[0]);
  const [budget, setBudget] = useState(budgets[3]);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");

    setStatus("sending");

    if (!ACCESS_KEY) {
      // No backend configured yet. Fail loudly instead of pretending to send.
      setStatus("error");
      return;
    }

    // Send as FormData (CORS-safelisted, no preflight) per Web3Forms guidance.
    const payload = new FormData();
    payload.append("access_key", ACCESS_KEY);
    payload.append("subject", `New project brief from ${name || "the site"}`);
    payload.append("from_name", "Execution Labs site");
    payload.append("name", name);
    payload.append("email", String(data.get("email") ?? ""));
    payload.append("company", String(data.get("company") ?? ""));
    payload.append("project_type", type);
    payload.append("budget", budget);
    payload.append("message", String(data.get("message") ?? ""));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("idle");
        setSent(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-charcoal/60 p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 py-16 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-ink text-emerald-400">
              <Check size={24} />
            </div>
            <h3 className="text-xl font-medium text-bone">Brief received</h3>
            <p className="max-w-sm text-sm leading-relaxed text-bone-dim">
              Thanks for reaching out about your {type.toLowerCase()} project. We
              read every brief and reply within a day. Next, we map the system
              with you before any quote.
            </p>
            <div className="mt-2 flex items-center gap-5 text-sm">
              <Link
                href={CALENDAR_URL}
                className="text-bone underline underline-offset-4 transition-colors hover:text-white"
              >
                Book a call now
              </Link>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-bone-dim underline-offset-4 transition-colors hover:text-bone hover:underline"
              >
                Send another
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            onSubmit={onSubmit}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="company" className={labelClass}>
                Company
              </label>
              <input
                id="company"
                name="company"
                placeholder="Company name"
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-3">
              <span className={labelClass}>Project type</span>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((t) => (
                  <Chip key={t} active={type === t} onClick={() => setType(t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className={labelClass}>Budget</span>
              <div className="flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <Chip
                    key={b}
                    active={budget === b}
                    onClick={() => setBudget(b)}
                  >
                    {b}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className={labelClass}>
                What are you building?
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about the system you want to build."
                className={cn(fieldClass, "resize-none")}
              />
            </div>

            <div className="mt-1 flex flex-col gap-3">
              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? "Sending..." : "Send message"}
                <Send
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Button>
              {status === "error" && (
                <p className="text-sm text-amber-400/90">
                  Something went wrong sending your message. Email us directly at{" "}
                  <a
                    href="mailto:hello@executionlabs.com"
                    className="underline underline-offset-4"
                  >
                    hello@executionlabs.com
                  </a>
                  .
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
