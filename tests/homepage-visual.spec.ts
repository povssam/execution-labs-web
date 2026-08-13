import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const viewports = [
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1728, height: 1117 },
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
  ".capability-detail-primary",
  ".capability-proof",
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

async function getReadableCollisionReport(page: Page) {
  return page.evaluate(() => {
    const visible = (element: Element) => {
      const styles = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return styles.display !== "none" && styles.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    };
    const area = (a: DOMRect, b: DOMRect) =>
      Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
      Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    const groups: Array<[string, string[]]> = [
      ["capability", [".capability-detail-meta", ".capability-detail-primary", ".capability-proof"]],
      ["selected-work-entry", [".selected-work .editorial-heading", ".work-arc-stage"]],
      ["selected-work-projects", [".work-arc-name"]],
      ["selected-work-proof", [".work-project-media", ".work-project-copy"]],
      ["process-entry", [".process-editorial .editorial-heading", ".process-route"]],
      ["signals-entry", [".signals-heading", ".signals-manifesto"]],
    ];
    const collisions: string[] = [];

    for (const [name, selectors] of groups) {
      const elements = selectors.flatMap((selector) =>
        [...document.querySelectorAll(selector)].filter(visible),
      );
      for (let index = 0; index < elements.length; index += 1) {
        for (let next = index + 1; next < elements.length; next += 1) {
          if (area(elements[index].getBoundingClientRect(), elements[next].getBoundingClientRect()) > 1) {
            collisions.push(`${name}: ${elements[index].className} <> ${elements[next].className}`);
          }
        }
      }
    }

    for (const step of document.querySelectorAll(".process-route-step article")) {
      const elements = [...step.querySelectorAll(".process-route-marker, .process-route-title, .process-route-copy")].filter(visible);
      for (let index = 0; index < elements.length; index += 1) {
        for (let next = index + 1; next < elements.length; next += 1) {
          if (area(elements[index].getBoundingClientRect(), elements[next].getBoundingClientRect()) > 1) {
            collisions.push(`process-step: ${elements[index].className} <> ${elements[next].className}`);
          }
        }
      }
    }

    const signalLines = [...document.querySelectorAll(".signal-line")].filter(visible);
    for (let index = 0; index < signalLines.length - 1; index += 1) {
      if (area(signalLines[index].getBoundingClientRect(), signalLines[index + 1].getBoundingClientRect()) > 1) {
        collisions.push(`signal-lines: ${index} <> ${index + 1}`);
      }
    }

    const boundedSelectors = [
      ".editorial-heading",
      ".capability-detail-meta",
      ".capability-detail-primary",
      ".capability-proof",
      ".work-project-stage",
      ".process-route",
      ".signals-heading",
      ".signals-manifesto",
    ];
    const outsideViewport = boundedSelectors.flatMap((selector) =>
      [...document.querySelectorAll(selector)]
        .filter(visible)
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.left < -1 || rect.right > window.innerWidth + 1;
        })
        .map((element) => `${selector}: ${Math.round(element.getBoundingClientRect().left)}..${Math.round(element.getBoundingClientRect().right)}`),
    );

    const clippedHeadings = [...document.querySelectorAll<HTMLElement>("h1, h2, h3")]
      .filter(visible)
      .filter((heading) => {
        const styles = getComputedStyle(heading);
        const clipsX = styles.overflowX !== "visible" && heading.scrollWidth - heading.clientWidth > 1;
        const clipsY = styles.overflowY !== "visible" && heading.scrollHeight - heading.clientHeight > 1;
        return clipsX || clipsY;
      })
      .map((heading) => heading.textContent?.replace(/\s+/g, " ").trim() ?? "unknown");

    const stage = document.querySelector<HTMLElement>(".work-arc-stage")?.getBoundingClientRect();
    const active = document.querySelector<HTMLElement>('.work-arc-item[aria-selected="true"]')?.getBoundingClientRect();
    const activeCenterDelta = stage && active
      ? Math.abs((active.left + active.right) / 2 - (stage.left + stage.right) / 2)
      : Number.POSITIVE_INFINITY;

    return { collisions, outsideViewport, clippedHeadings, activeCenterDelta };
  });
}

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
  test(`readable collision audit ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "networkidle" });

    for (let index = 0; index < 6; index += 1) {
      await page.locator(`#capability-tab-${index}`).evaluate((element: HTMLButtonElement) => element.click());
      await page.waitForTimeout(450);
      const report = await getReadableCollisionReport(page);
      expect(report.collisions, `capability ${index + 1}`).toEqual([]);
      expect(report.outsideViewport, `capability ${index + 1}`).toEqual([]);
      expect(report.clippedHeadings, `capability ${index + 1}`).toEqual([]);
      expect(report.activeCenterDelta).toBeLessThanOrEqual(1);
    }

    const selected = page.locator('.work-arc-item[aria-selected="true"]');
    await selected.focus();
    for (let index = 0; index < 5; index += 1) {
      const report = await getReadableCollisionReport(page);
      expect(report.collisions, `project ${index + 1}`).toEqual([]);
      expect(report.outsideViewport, `project ${index + 1}`).toEqual([]);
      expect(report.clippedHeadings, `project ${index + 1}`).toEqual([]);
      expect(report.activeCenterDelta).toBeLessThanOrEqual(1);
      await page.keyboard.press("ArrowRight");
      await expect
        .poll(async () => (await getReadableCollisionReport(page)).activeCenterDelta)
        .toBeLessThanOrEqual(1);
    }
  });
}

for (const viewport of viewports) {
  test(`anchor safe offset ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/", { waitUntil: "networkidle" });

    for (const id of ["what-we-build", "selected-work", "process"]) {
      await page.evaluate((targetId) => document.getElementById(targetId)?.scrollIntoView(), id);
      await page.waitForTimeout(700);
      const positions = await page.evaluate((targetId) => ({
        sectionTop: Math.round(document.getElementById(targetId)?.getBoundingClientRect().top ?? -1),
        navBottom: Math.round(document.querySelector("header")?.getBoundingClientRect().bottom ?? 0),
      }), id);
      expect(positions.sectionTop, id).toBeGreaterThanOrEqual(positions.navBottom + 8);
    }
  });
}

for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
  test(`all case-study headers ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const slugs = ["grace", "orbit-artist-group", "media-scaling", "soniq", "dividends-total-returns"];

    for (const slug of slugs) {
      await page.goto(`/work/${slug}`, { waitUntil: "networkidle" });
      const report = await page.evaluate(() => {
        const selectors = [".case-study-eyebrow", ".case-study-title", ".case-study-meta", ".case-study-summary", ".case-study-proof"];
        const elements = selectors.map((selector) => document.querySelector<HTMLElement>(selector));
        const area = (a: DOMRect, b: DOMRect) =>
          Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
          Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
        const collisions: string[] = [];
        for (let index = 0; index < elements.length; index += 1) {
          for (let next = index + 1; next < elements.length; next += 1) {
            if (elements[index] && elements[next] && area(elements[index]!.getBoundingClientRect(), elements[next]!.getBoundingClientRect()) > 1) {
              collisions.push(`${selectors[index]} <> ${selectors[next]}`);
            }
          }
        }
        const artifact = document.querySelector(".case-study-eyebrow")?.textContent?.trim() ?? "";
        const artifactCount = artifact
          ? (document.querySelector("main")?.innerText.toLowerCase().split(artifact.toLowerCase()).length ?? 1) - 1
          : 0;
        const title = document.querySelector<HTMLElement>(".case-study-title")!;
        const backLink = document.querySelector<HTMLElement>('main a[href="/work"]')!;
        const nav = document.querySelector<HTMLElement>("header")!;
        const titleStyles = getComputedStyle(title);
        return {
          collisions,
          artifactCount: Math.max(0, artifactCount),
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          titleClipped:
            (titleStyles.overflowX !== "visible" && title.scrollWidth - title.clientWidth > 1) ||
            (titleStyles.overflowY !== "visible" && title.scrollHeight - title.clientHeight > 1),
          titleOutside: title.getBoundingClientRect().left < -1 || title.getBoundingClientRect().right > window.innerWidth + 1,
          contentUnderNav: backLink.getBoundingClientRect().top < nav.getBoundingClientRect().bottom + 8,
        };
      });

      expect(report.collisions, slug).toEqual([]);
      expect(report.artifactCount, slug).toBe(1);
      expect(report.overflow, slug).toBeLessThanOrEqual(1);
      expect(report.titleClipped, slug).toBe(false);
      expect(report.titleOutside, slug).toBe(false);
      expect(report.contentUnderNav, slug).toBe(false);
    }
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

test("mobile menu stays viewport-fixed after deep scrolling and releases every lock", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(300);

  const menuButton = page.getByRole("button", { name: "Toggle menu" });
  await menuButton.click();

  const panel = page.getByRole("dialog", { name: "Site navigation" });
  await expect(panel).toBeVisible();
  const geometry = await page.evaluate(() => {
    const header = document.querySelector("header")!.getBoundingClientRect();
    const menu = document.getElementById("mobile-navigation")!.getBoundingClientRect();
    return {
      headerBottom: Math.round(header.bottom),
      menuTop: Math.round(menu.top),
      menuBottom: Math.round(menu.bottom),
      viewportHeight: window.innerHeight,
      parent: document.getElementById("mobile-navigation")!.parentElement?.tagName,
    };
  });

  expect(Math.abs(geometry.menuTop - geometry.headerBottom)).toBeLessThanOrEqual(1);
  expect(geometry.menuBottom).toBe(geometry.viewportHeight);
  expect(geometry.parent).toBe("BODY");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(page.locator("html")).toHaveCSS("overflow", "hidden");

  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(2500);

  await menuButton.click();
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(panel).toBeHidden();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(page.locator("html")).not.toHaveCSS("overflow", "hidden");
});

test("mobile menu remains viewport-bound on every primary route", async ({ page }) => {
  await page.setViewportSize({ width: 430, height: 932 });

  for (const route of ["/", "/work", "/services", "/contact", "/work/soniq"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Toggle menu" }).click();

    const panel = page.getByRole("dialog", { name: "Site navigation" });
    await expect(panel, route).toBeVisible();
    const bounds = await panel.boundingBox();
    expect(bounds, route).not.toBeNull();
    expect(Math.round(bounds?.y ?? -1), route).toBe(64);
    expect(Math.round((bounds?.y ?? 0) + (bounds?.height ?? 0)), route).toBe(932);

    await page.getByRole("button", { name: "Toggle menu" }).click();
    await expect(panel, route).toBeHidden();
    await expect(page.locator("body"), route).not.toHaveCSS("overflow", "hidden");
    await expect(page.locator("html"), route).not.toHaveCSS("overflow", "hidden");
  }
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
