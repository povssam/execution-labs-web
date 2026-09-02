"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { EMAIL } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import styles from "./ContactForm.module.css";

const projectTypes = [
  "AI Agents",
  "Internal Tools",
  "MVP Software",
  "Product Systems",
];

const budgets = ["Under 10k", "10k to 30k", "30k+", "Not sure"];

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
      aria-pressed={active}
      className={cn(styles.chip, active && styles.chipActive)}
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
  const [usedEmailFallback, setUsedEmailFallback] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const reduceMotion = usePrefersReducedMotion();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const message = String(data.get("message") ?? "");

    setStatus("sending");

    if (!ACCESS_KEY) {
      const subject = encodeURIComponent(`New project brief from ${name || "the site"}`);
      const body = encodeURIComponent(
        [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || "Not provided"}`,
          `Project type: ${type}`,
          `Budget: ${budget}`,
          "",
          message,
        ].join("\n"),
      );
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setUsedEmailFallback(true);
      setStatus("idle");
      setSent(true);
      return;
    }

    // Send as FormData (CORS-safelisted, no preflight) per Web3Forms guidance.
    const payload = new FormData();
    payload.append("access_key", ACCESS_KEY);
    payload.append("subject", `New project brief from ${name || "the site"}`);
    payload.append("from_name", "Execution Labs site");
    payload.append("name", name);
    payload.append("email", email);
    payload.append("company", company);
    payload.append("project_type", type);
    payload.append("budget", budget);
    payload.append("message", message);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("idle");
        setUsedEmailFallback(false);
        setSent(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={styles.formShell}>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.2, ease: [0.23, 1, 0.32, 1] }}
            className={styles.success}
          >
            <div className={styles.successIcon}>
              <Check size={24} />
            </div>
            <h3 className={styles.successTitle}>Brief received</h3>
            <p className={styles.successCopy}>
              {usedEmailFallback
                ? "Your email app should now have a drafted project brief. Send it when it looks right and we will reply within a day."
                : `Thanks for reaching out about your ${type.toLowerCase()} project. We read every brief and reply within a day. Next, we map the system with you before any quote.`}
            </p>
            <div className={styles.successActions}>
              <Link
                href="/work"
                className="text-bone underline underline-offset-4 transition-colors hover:text-white"
              >
                See the work
              </Link>
              <button
                type="button"
                onClick={() => {
                  setUsedEmailFallback(false);
                  setSent(false);
                }}
                className="text-bone-dim underline-offset-4 transition-colors hover:text-bone hover:underline"
              >
                Send another
              </button>
            </div>
          </motion.div>
        ) : (
          <form
            key="form"
            onSubmit={onSubmit}
            className={styles.form}
          >
            <div className={styles.fieldGrid}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name…"
                  className={styles.input}
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  spellCheck={false}
                  inputMode="email"
                  placeholder="you@company.com…"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="company" className={styles.label}>
                Company
              </label>
              <input
                id="company"
                name="company"
                autoComplete="organization"
                placeholder="Company name…"
                className={styles.input}
              />
            </div>

            <fieldset className={styles.choiceGroup}>
              <legend className={styles.label}>Project type</legend>
              <div className={styles.chipRow}>
                {projectTypes.map((t) => (
                  <Chip key={t} active={type === t} onClick={() => setType(t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.choiceGroup}>
              <legend className={styles.label}>Budget</legend>
              <div className={styles.chipRow}>
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
            </fieldset>

            <div className={styles.field}>
              <label htmlFor="message" className={styles.label}>
                What are you building?
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about the system you want to build…"
                className={cn(styles.input, styles.textarea)}
              />
            </div>

            <div className={styles.submitRow}>
              <button
                type="submit"
                disabled={status === "sending"}
                className={styles.submit}
              >
                {status === "sending" ? "Sending…" : "Send message"}
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                />
              </button>
              {status === "error" && (
                <p className={styles.error} role="alert" aria-live="polite">
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
              {status === "sending" && (
                <p className={styles.status} role="status" aria-live="polite">
                  Sending your brief…
                </p>
              )}
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
