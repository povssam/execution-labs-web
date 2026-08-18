import { chromium } from "playwright";

const baseUrl = process.env.QA_URL ?? "http://127.0.0.1:4175/";
const viewports = [
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1366, 768],
  [1440, 900],
];
const sectionIds = [
  "studio-statement",
  "what-we-build",
  "selected-work",
  "process",
  "client-signals",
];

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const [width, height] of viewports) {
    const page = await browser.newPage({
      viewport: { width, height },
      hasTouch: width < 768,
      reducedMotion: "no-preference",
    });
    await page.goto(baseUrl, { waitUntil: "networkidle" });

    const documentMetrics = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
    }));
    assert(
      documentMetrics.scrollWidth === documentMetrics.clientWidth &&
        documentMetrics.bodyScrollWidth <= documentMetrics.clientWidth,
      `${width}x${height}: document-level horizontal overflow`,
    );

    const sectionMetrics = await page.evaluate((ids) => ids.map((id) => {
      const section = document.getElementById(id);
      if (!section) return { id, missing: true };
      const bounds = section.getBoundingClientRect();
      return {
        id,
        missing: false,
        height: Math.round(bounds.height),
        left: Math.round(bounds.left),
        right: Math.round(bounds.right),
      };
    }), sectionIds);

    for (const section of sectionMetrics) {
      assert(!section.missing, `${width}x${height}: missing #${section.id}`);
      assert(section.left >= 0 && section.right <= width, `${width}x${height}: #${section.id} escapes viewport`);
      assert(section.height > 0, `${width}x${height}: #${section.id} has no height`);
    }

    const capabilityTabs = page.locator('[aria-label="Capabilities"] [role="tab"]');
    assert(await capabilityTabs.count() === 6, `${width}x${height}: capability count changed`);
    assert(await page.locator('[aria-label="Capabilities"] [role="tab"][aria-selected="true"]').count() === 1, `${width}x${height}: capability active state is ambiguous`);

    await capabilityTabs.nth(5).click();
    await page.waitForFunction(() => document.querySelector("#capability-panel")?.textContent?.includes("Less manual work"));
    assert(await capabilityTabs.nth(5).getAttribute("aria-selected") === "true", `${width}x${height}: capability tap failed`);
    assert((await page.locator("#capability-panel").innerText()).includes("Less manual work"), `${width}x${height}: capability content did not synchronize`);

    await capabilityTabs.nth(5).press("ArrowLeft");
    await page.waitForFunction(() => document.querySelector("#capability-panel")?.textContent?.includes("Motion as proof"));
    assert(await capabilityTabs.nth(4).getAttribute("aria-selected") === "true", `${width}x${height}: capability keyboard navigation failed`);

    if (width < 768) {
      const centerDelta = await capabilityTabs.nth(4).evaluate((tab) => {
        const rail = tab.parentElement;
        if (!rail) return Number.POSITIVE_INFINITY;
        const tabBounds = tab.getBoundingClientRect();
        const railBounds = rail.getBoundingClientRect();
        return Math.abs((tabBounds.left + tabBounds.width / 2) - (railBounds.left + railBounds.width / 2));
      });
      assert(centerDelta < 8, `${width}x${height}: active capability is not centered (${centerDelta}px)`);
    }

    const workTabs = page.locator('[aria-label="Selected projects"] [role="tab"]');
    assert(await workTabs.count() === 5, `${width}x${height}: project count changed`);
    const projectNames = await workTabs.allTextContents();
    assert(new Set(projectNames).size === projectNames.length, `${width}x${height}: duplicate project submission`);
    assert(await page.locator('[aria-label="Selected projects"] [role="tab"][aria-selected="true"]').count() === 1, `${width}x${height}: project active state is ambiguous`);

    await workTabs.nth(3).click();
    await page.waitForFunction(() => document.querySelector("#selected-work-panel h2")?.textContent === "Soniq");
    assert(await page.locator("#selected-work-panel h2").innerText() === "Soniq", `${width}x${height}: project title did not synchronize`);
    assert((await page.locator("[data-project-link]").getAttribute("href")) === "/work/soniq", `${width}x${height}: project link did not synchronize`);
    assert(await page.locator("[data-project-media]").count() === 1, `${width}x${height}: project media duplicated`);

    await workTabs.nth(3).press("ArrowRight");
    await page.waitForFunction(() => document.querySelector("#selected-work-panel h2")?.textContent === "Dividends & Total Returns");
    assert(await workTabs.nth(4).getAttribute("aria-selected") === "true", `${width}x${height}: project keyboard navigation failed`);

    const readableText = await page.locator("#process h3, #process p, #client-signals p").allTextContents();
    assert(new Set(readableText).size === readableText.length, `${width}x${height}: duplicated process or outcome text`);

    const processTabs = page.locator('[aria-label="Process steps"] [role="tab"]');
    assert(await processTabs.count() === 4, `${width}x${height}: process step count changed`);
    assert(await page.locator('[aria-label="Process steps"] [role="tab"][aria-selected="true"]').count() === 1, `${width}x${height}: process active state is ambiguous`);
    await processTabs.nth(2).click();
    await page.waitForFunction(() => document.querySelector("#process-panel [data-system-visual]")?.getAttribute("data-variant") === "build");
    assert(await processTabs.nth(2).getAttribute("aria-selected") === "true", `${width}x${height}: process tap failed`);
    await processTabs.nth(2).press("ArrowRight");
    await page.waitForFunction(() => document.querySelector("#process-panel [data-system-visual]")?.getAttribute("data-variant") === "proof");
    assert(await processTabs.nth(3).getAttribute("aria-selected") === "true", `${width}x${height}: process keyboard navigation failed`);

    if (width <= 430) {
      await page.locator("#process-panel").evaluate((panel) => {
        panel.parentElement?.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 12, pointerType: "touch", clientX: 260 }));
        panel.parentElement?.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 12, pointerType: "touch", clientX: 150 }));
      });
      await page.waitForFunction(() => document.querySelector("#process-panel [data-system-visual]")?.getAttribute("data-variant") === "brief");
      assert(await processTabs.nth(0).getAttribute("aria-selected") === "true", `${width}x${height}: process swipe failed`);
    }

    const reducedPage = await browser.newPage({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    await reducedPage.goto(baseUrl, { waitUntil: "networkidle" });
    const statementCharacters = reducedPage.locator("[data-statement-character]");
    const visibleCharacters = await statementCharacters.evaluateAll((characters) =>
      characters.filter((character) => Number(getComputedStyle(character).opacity) > 0.99).length,
    );
    assert(visibleCharacters === await statementCharacters.count(), `${width}x${height}: reduced-motion statement is incomplete`);
    assert(await reducedPage.locator("#selected-work video").evaluate((video) => video.paused), `${width}x${height}: reduced-motion Grace media autoplayed`);
    assert(await reducedPage.locator("#process [data-system-visual] path").first().evaluate((path) => getComputedStyle(path).strokeDashoffset === "0px"), `${width}x${height}: reduced-motion process visual did not settle`);
    const graceMediaCount = await reducedPage.locator('#what-we-build img[src*="grace"], #selected-work video[src*="grace-animation"]').count();
    assert(graceMediaCount === 1, `${width}x${height}: Grace media appears ${graceMediaCount} times`);
    await reducedPage.close();

    results.push({
      viewport: `${width}x${height}`,
      overflow: 0,
      sections: sectionMetrics.map(({ id, height: sectionHeight }) => ({ id, height: sectionHeight })),
    });
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify({ baseUrl, passed: results.length, results }, null, 2));
