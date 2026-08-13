import { expect, test } from "@playwright/test";

const viewports = [
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
];

const sectionSelectors = [
  ".home-opening",
  ".home-hero",
  ".worked-with-surface",
  ".statement-section",
  ".capabilities-editorial",
  ".selected-work",
  ".motion-editorial",
  ".process-editorial",
  ".signals-editorial",
  "footer",
];

const keySelectors = [
  ".home-hero-content",
  ".home-hero h1",
  ".home-hero p",
  ".home-hero a",
  ".worked-with-surface > div > p",
  ".worked-marquee",
  ".statement-copy",
  ".capabilities-editorial .editorial-heading",
  ".capability-navigation",
  ".capability-detail",
  ".selected-work .editorial-heading",
  ".work-arc-stage",
  ".work-project-stage",
  ".motion-editorial-heading",
  ".motion-media",
  ".process-editorial .editorial-heading",
  ".process-route",
  ".signals-heading",
  ".signals-manifesto",
];

type RectMetric = {
  selector: string;
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
};

for (const viewport of viewports) {
  test(`homepage geometry ${viewport.width}x${viewport.height}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForTimeout(900);

    const metrics = await page.evaluate(({ sections: selectors, keys }) => {
      const rect = (selector: string): RectMetric | null => {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) return null;
        const box = element.getBoundingClientRect();
        return {
          selector,
          top: Math.round(box.top + window.scrollY),
          bottom: Math.round(box.bottom + window.scrollY),
          left: Math.round(box.left),
          right: Math.round(box.right),
          width: Math.round(box.width),
          height: Math.round(box.height),
        };
      };

      const headings = [...document.querySelectorAll<HTMLElement>("h1, h2")].map(
        (heading) => {
          const box = heading.getBoundingClientRect();
          const styles = getComputedStyle(heading);
          return {
            text: heading.textContent?.replace(/\s+/g, " ").trim(),
            left: Math.round(box.left),
            right: Math.round(box.right),
            width: Math.round(box.width),
            fontSize: Math.round(Number.parseFloat(styles.fontSize)),
            lineHeight: Math.round(Number.parseFloat(styles.lineHeight)),
            textAlign: styles.textAlign,
          };
        },
      );

      const keyRects = keys.map((selector) => {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) return null;
        const box = element.getBoundingClientRect();
        const styles = getComputedStyle(element);
        return {
          selector,
          top: Math.round(box.top + window.scrollY),
          bottom: Math.round(box.bottom + window.scrollY),
          left: Math.round(box.left),
          right: Math.round(box.right),
          width: Math.round(box.width),
          height: Math.round(box.height),
          paddingTop: Math.round(Number.parseFloat(styles.paddingTop)),
          paddingBottom: Math.round(Number.parseFloat(styles.paddingBottom)),
        };
      }).filter(Boolean);

      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        document: {
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          scrollHeight: document.documentElement.scrollHeight,
          bodyOverflow: getComputedStyle(document.body).overflow,
          bodyOverflowX: getComputedStyle(document.body).overflowX,
        },
        sections: selectors.map(rect).filter(Boolean),
        keyRects,
        headings,
      };
    }, { sections: sectionSelectors, keys: keySelectors });

    console.log(`GEOMETRY ${viewport.width}x${viewport.height} ${JSON.stringify(metrics)}`);

    const section = (selector: string) =>
      metrics.sections.find((item) => item?.selector === selector) as RectMetric;

    expect(metrics.document.scrollWidth - metrics.document.clientWidth).toBeLessThanOrEqual(1);
    expect(Math.abs(section(".home-opening").height - viewport.height)).toBeLessThanOrEqual(1);
    expect(Math.abs(section(".worked-with-surface").bottom - viewport.height)).toBeLessThanOrEqual(1);
    expect(section(".statement-section").top).toBeGreaterThanOrEqual(viewport.height);
    if (viewport.width <= 430) {
      expect(section(".capabilities-editorial").height).toBeLessThan(800);
      expect(section(".selected-work").height).toBeLessThan(1400);
      expect(section(".process-editorial").height).toBeLessThan(800);
      expect(section(".signals-editorial").height).toBeLessThan(650);
    }
    expect(errors).toEqual([]);
  });
}

for (const viewport of viewports) {
  test(`contact geometry ${viewport.width}x${viewport.height}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    page.on("pageerror", (error) => errors.push(error.message));

    await page.setViewportSize(viewport);
    await page.goto("/contact", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);

    const geometry = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
    }));

    expect(geometry.scrollWidth - geometry.clientWidth).toBeLessThanOrEqual(1);
    expect(geometry.scrollHeight).toBeGreaterThan(viewport.height);
    expect(errors).toEqual([]);
  });
}

test("mobile menu releases body scroll and in-page navigation remains usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  const menu = page.getByRole("button", { name: "Toggle menu" });
  await menu.click();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await menu.click();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");

  await menu.click();
  await page.getByRole("link", { name: "What we build" }).click();
  await page.waitForTimeout(800);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(700);

  const before = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(200);
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(before);
});

test("Selected Work supports keyboard and touch-first swipe selection", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#selected-work", { waitUntil: "networkidle" });

  const selected = page.locator('.work-arc-item[aria-selected="true"]');
  await selected.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('#work-tab-orbit-artist-group')).toHaveAttribute(
    "aria-selected",
    "true",
  );

  const rail = page.locator(".work-arc-stage");
  const box = await rail.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;
  const y = box.y + box.height / 2;
  await rail.dispatchEvent("pointerdown", {
    pointerId: 7,
    pointerType: "touch",
    clientX: box.x + box.width * 0.8,
    clientY: y,
    button: 0,
  });
  await rail.dispatchEvent("pointerup", {
    pointerId: 7,
    pointerType: "touch",
    clientX: box.x + box.width * 0.2,
    clientY: y,
    button: 0,
  });
  await expect(page.locator('#work-tab-media-scaling')).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("middle-section controls support touch and keep active states coherent", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#what-we-build", { waitUntil: "networkidle" });

  const capabilityRail = page.locator(".capability-navigation");
  const capabilityBox = await capabilityRail.boundingBox();
  expect(capabilityBox).not.toBeNull();
  if (!capabilityBox) return;

  const capabilityY = capabilityBox.y + capabilityBox.height / 2;
  await capabilityRail.dispatchEvent("pointerdown", {
    pointerId: 11,
    pointerType: "touch",
    clientX: capabilityBox.x + capabilityBox.width * 0.8,
    clientY: capabilityY,
    button: 0,
  });
  await capabilityRail.dispatchEvent("pointerup", {
    pointerId: 11,
    pointerType: "touch",
    clientX: capabilityBox.x + capabilityBox.width * 0.2,
    clientY: capabilityY,
    button: 0,
  });
  await expect(page.locator("#capability-tab-1")).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#capability-panel")).toContainText("Replace the tab maze.");

  await page.locator(".signals-editorial").scrollIntoViewIfNeeded();
  const signals = page.locator(".signal-line");
  await signals.nth(2).click();
  await expect(signals.nth(2)).toHaveAttribute("aria-pressed", "true");
  await expect(signals.nth(0)).toHaveAttribute("aria-pressed", "false");
});

test.describe("reduced motion", () => {
  test("settles immediately without continuous media motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
    await expect(page.locator(".worked-marquee-track")).toHaveCSS("animation-name", "none");
    const video = page.locator("video").first();
    await expect(video).toHaveJSProperty("loop", false);
    await expect(video).toHaveJSProperty("autoplay", false);
  });
});
