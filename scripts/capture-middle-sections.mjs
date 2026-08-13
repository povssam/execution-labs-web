import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseURL = process.env.AUDIT_URL ?? "http://127.0.0.1:4174";
const outputDir = process.env.AUDIT_OUTPUT ?? "docs/qa/middle-art-direction/after";
const viewport = {
  width: Number(process.env.AUDIT_WIDTH ?? 390),
  height: Number(process.env.AUDIT_HEIGHT ?? 844),
};
const viewportLabel = `${viewport.width}x${viewport.height}`;

const sections = [
  ["what-we-build", ".capabilities-editorial"],
  ["selected-work-intro", ".selected-work-intro"],
  ["grace-proof", ".work-project-stage"],
  ["motion-work", ".motion-editorial"],
  ["process", ".process-editorial"],
  ["client-signals", ".signals-editorial"],
];

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport, colorScheme: "dark" });
await page.goto(baseURL, { waitUntil: "networkidle" });
await page.waitForTimeout(900);

await page.screenshot({
  path: path.join(outputDir, `middle-sequence-${viewportLabel}.png`),
  fullPage: true,
});

for (const [name, selector] of sections) {
  const element = page.locator(selector);
  await element.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await element.screenshot({ path: path.join(outputDir, `${name}-${viewportLabel}.png`) });
}

await browser.close();
