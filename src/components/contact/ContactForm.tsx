"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

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

export function ContactForm() {
  const [type, setType] = useState(projectTypes[0]);
  const [budget, setBudget] = useState(budgets[3]);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
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
              read every brief and reply within a day.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-2 text-sm text-bone-dim underline-offset-4 transition-colors hover:text-bone hover:underline"
            >
              Send another
            </button>
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

            <Button type="submit" className="mt-1 w-full sm:w-auto">
              Send message
              <Send
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
