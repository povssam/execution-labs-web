import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.AUDIT_URL ?? "http://127.0.0.1:3001";
const outputDir = process.env.AUDIT_OUTPUT ?? "docs/qa/process-proof-outcomes-2026-08-18/cycle-1";
const viewports = (process.env.AUDIT_VIEWPORTS ?? "390x844,1440x900")
  .split(",")
  .map((viewport) => viewport.split("x").map(Number));

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

try {
  for (const [width, height] of viewports) {
    const page = await browser.newPage({
      viewport: { width, height },
      colorScheme: "dark",
      reducedMotion: "no-preference",
      hasTouch: width <= 430,
    });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);

    await page.screenshot({
      path: path.join(outputDir, `homepage-${width}x${height}.png`),
      fullPage: true,
    });

    for (const id of ["process", "client-signals"]) {
      const section = page.locator(`#${id}`);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      await section.screenshot({
        path: path.join(outputDir, `${id}-${width}x${height}.png`),
      });
    }

    await page.close();
  }
} finally {
  await browser.close();
}
