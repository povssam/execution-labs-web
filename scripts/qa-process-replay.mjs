import { chromium } from "playwright";

const baseUrl = process.env.QA_URL ?? "http://127.0.0.1:4175/";
const viewports = (process.env.QA_VIEWPORTS ?? "390x844,430x932,768x1024,1440x900")
  .split(",")
  .map((value) => value.split("x").map(Number));
const processVariants = ["brief", "system-map", "build", "proof"];
const processPoints = [0.1, 0.3, 0.55, 0.8];
const processIndexes = [0, 1, 2, 3];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function readProcessState(page) {
  return page.locator("#process").evaluate((section) => ({
    index: Number(section.getAttribute("data-process-index")),
    variant: section.querySelector("[data-system-visual]")?.getAttribute("data-variant"),
  }));
}

async function readProcessPlan(page) {
  return page.locator("#process").evaluate((section) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const progressStart = sectionTop - window.innerHeight * 0.7;
    const progressEnd = sectionTop + rect.height - window.innerHeight * 0.3;

    return {
      progressStart,
      progressEnd,
      sectionHeight: rect.height,
      maxScroll: document.documentElement.scrollHeight - window.innerHeight,
    };
  });
}

async function scrollToProgress(page, progress, expectedIndex, label) {
  const plan = await readProcessPlan(page);
  const targetTop = plan.progressStart + (plan.progressEnd - plan.progressStart) * progress;
  const reachableTop = Math.min(plan.maxScroll, Math.max(0, targetTop));

  await page.evaluate((top) => {
    window.scrollTo({ top, behavior: "auto" });
  }, reachableTop);

  try {
    await page.waitForFunction(
      ({ end, progress, start }) => {
        const currentProgress = end === start ? 0 : (window.scrollY - start) / (end - start);
        return Math.abs(currentProgress - progress) < 0.02;
      },
      {
        end: plan.progressEnd,
        progress,
        start: plan.progressStart,
      },
      { timeout: 2500 },
    );
    await page.waitForFunction(
      ({ index, variant }) => {
        const section = document.querySelector("#process");
        return (
          section?.getAttribute("data-process-index") === String(index) &&
          section?.querySelector("[data-system-visual]")?.getAttribute("data-variant") === variant
        );
      },
      { index: expectedIndex, variant: processVariants[expectedIndex] },
      { timeout: 2500 },
    );
  } catch (error) {
    const state = await readProcessState(page);
    const actualProgress = await page.evaluate(({ start, end }) => {
      if (end === start) return 0;
      return (window.scrollY - start) / (end - start);
    }, { start: plan.progressStart, end: plan.progressEnd });
    throw new Error(`${label}: timed out at progress ${actualProgress.toFixed(3)} with state ${JSON.stringify(state)}; ${error.message}`);
  }

  const actual = await readProcessState(page);
  const actualProgress = await page.evaluate(({ start, end }) => {
    if (end === start) return 0;
    return (window.scrollY - start) / (end - start);
  }, { start: plan.progressStart, end: plan.progressEnd });

  assert(actual.index === expectedIndex, `${label}: expected index ${expectedIndex}, got ${actual.index}`);
  assert(actual.variant === processVariants[expectedIndex], `${label}: expected ${processVariants[expectedIndex]}, got ${actual.variant}`);
  assert(Math.abs(actualProgress - progress) < 0.02, `${label}: scroll progress drifted to ${actualProgress.toFixed(3)} for ${progress}`);
}

async function scrollAboveProcess(page, label) {
  const plan = await readProcessPlan(page);
  const targetTop = Math.max(0, plan.progressStart - Math.max(120, plan.sectionHeight * 0.25));
  await page.evaluate((top) => {
    window.scrollTo({ top, behavior: "auto" });
  }, targetTop);
  await page.waitForFunction(() => document.querySelector("#process")?.getAttribute("data-process-index") === "0");
  const state = await readProcessState(page);
  assert(state.index === 0, `${label}: expected Brief above Process, got ${state.index}`);
}

async function runSequence(page, points, indexes, label) {
  const seen = [];
  for (let point = 0; point < points.length; point += 1) {
    await scrollToProgress(page, points[point], indexes[point], `${label} step ${point + 1}`);
    seen.push((await readProcessState(page)).index);
  }

  assert(seen.join(",") === indexes.join(","), `${label}: expected ${indexes.join(",")}, got ${seen.join(",")}`);
  return seen;
}

async function assertNoPageOverflow(page, label) {
  const layout = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  assert(layout.scrollWidth <= layout.innerWidth + 1, `${label}: page overflowed by ${layout.scrollWidth - layout.innerWidth}px`);
}

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const [width, height] of viewports) {
    const label = `${width}x${height}`;
    const context = await browser.newContext({
      viewport: { width, height },
      hasTouch: width <= 768,
      isMobile: width <= 768,
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await assertNoPageOverflow(page, label);

    const plan = await readProcessPlan(page);
    assert(plan.progressEnd > plan.progressStart, `${label}: Process scroll range is invalid`);
    assert(plan.progressStart >= 0, `${label}: Process start progress is above document start`);
    assert(plan.progressEnd <= plan.maxScroll + 1, `${label}: Process end progress is below document end`);

    const down = await runSequence(page, processPoints, processIndexes, `${label} down`);
    await scrollAboveProcess(page, `${label} first reset`);
    const up = await runSequence(page, [...processPoints].reverse(), [...processIndexes].reverse(), `${label} up`);
    await scrollAboveProcess(page, `${label} second reset`);
    const downAgain = await runSequence(page, processPoints, processIndexes, `${label} down again`);

    for (let pass = 3; pass <= 5; pass += 1) {
      await scrollAboveProcess(page, `${label} pass ${pass} reset`);
      await runSequence(page, processPoints, processIndexes, `${label} pass ${pass}`);
    }

    await scrollToProgress(page, 0.55, 2, `${label} reverse midpoint start`);
    await scrollToProgress(page, 0.3, 1, `${label} reverse midpoint`);
    await scrollToProgress(page, 0.55, 2, `${label} reverse midpoint return`);
    await scrollToProgress(page, 0.8, 3, `${label} reverse midpoint finish`);

    await scrollToProgress(page, 0.1, 0, `${label} fast down-up start`);
    await scrollToProgress(page, 0.8, 3, `${label} fast down`);
    await scrollToProgress(page, 0.1, 0, `${label} fast up`);
    await scrollToProgress(page, 0.8, 3, `${label} fast down again`);

    const processTabs = page.locator('#process [role="tab"]');
    assert(await processTabs.count() === 4, `${label}: expected four Process controls`);
    await processTabs.nth(1).click();
    await page.waitForFunction(() => document.querySelector("#process")?.getAttribute("data-process-index") === "1");
    await processTabs.nth(1).press("ArrowRight");
    await page.waitForFunction(() => document.querySelector("#process")?.getAttribute("data-process-index") === "2");
    assert(await page.locator('#process [role="tab"][aria-selected="true"]').count() === 1, `${label}: Process has ambiguous active state`);

    if (width <= 430) {
      await page.locator("#process [data-system-visual]").evaluate((media) => {
        media.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 21, pointerType: "touch", clientX: 270 }));
        media.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 21, pointerType: "touch", clientX: 140 }));
      });
      await page.waitForFunction(() => document.querySelector("#process")?.getAttribute("data-process-index") === "3");
    }

    assertNoPageOverflow(page, label);
    assert(errors.length === 0, `${label}: browser errors: ${errors.join(" | ")}`);

    await page.close();
    await context.close();

    const reducedContext = await browser.newContext({
      viewport: { width, height },
      hasTouch: width <= 768,
      isMobile: width <= 768,
      reducedMotion: "reduce",
    });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto(baseUrl, { waitUntil: "networkidle" });
    await scrollToProgress(reducedPage, 0.1, 0, `${label} reduced Brief`);
    await scrollToProgress(reducedPage, 0.3, 1, `${label} reduced System map`);
    await scrollToProgress(reducedPage, 0.55, 2, `${label} reduced Build`);
    await scrollToProgress(reducedPage, 0.8, 3, `${label} reduced Proof`);
    await scrollToProgress(reducedPage, 0.1, 0, `${label} reduced reverse`);
    await assertNoPageOverflow(reducedPage, `${label} reduced`);
    await reducedContext.close();

    results.push({
      viewport: label,
      down: down.join(","),
      up: up.join(","),
      downAgain: downAgain.join(","),
      repeatedPasses: 5,
      reducedMotion: "scroll-position driven",
    });
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify({ baseUrl, passed: results.length, results }, null, 2));
