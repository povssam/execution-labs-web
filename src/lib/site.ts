/**
 * Where the "Book a call" CTA points. Set NEXT_PUBLIC_CALENDAR_URL to a real
 * calendar (Cal.com / Calendly) and rebuild. Falls back to the contact page
 * so the button always does something useful.
 */
export const CALENDAR_URL =
  process.env.NEXT_PUBLIC_CALENDAR_URL || "/contact";

export const EMAIL = "hello@executionlabs.com";
