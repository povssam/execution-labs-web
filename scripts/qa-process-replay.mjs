import { chromium, webkit } from "playwright";

const baseUrl = process.env.QA_URL ?? "http://127.0.0.1:4175/";
const viewports = (process.env.QA_VIEWPORTS ?? "390x844,430x932,768x1024,1440x900")
  .split(",")
  .map((value) => value.split("x").map(Number));
const processVariants = ["brief", "system-map", "build", "proof"];
const downPoints = [0.1, 0.3, 0.55, 0.8];
const downIndexes = [0, 1, 2, 3];
const upPoints = [0.8, 0.55, 0.3, 0.1];
const upIndexes = [3, 2, 1, 0];
const PROCESS_PROGRESS_START = 0.7;
const PROCESS_PROGRESS_END = 0.3;
const PROCESS_ENTRY_EPSILON = 0.001;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function readProcessState(page) {
  return page.locator("#process").evaluate((section) => {
    const transition = section.getAttribute("data-process-transition");
    const currentPanel = section.querySelector(
      `[data-process-panel-transition="${transition}"]`,
    );
    const visual = currentPanel?.querySelector("[data-system-visual]");

    return {
      index: Number(section.getAttribute("data-process-index")),
      transition: Number(transition),
      variant: visual?.getAttribute("data-variant"),
    };
  });
}

async function installProcessTelemetry(page) {
  await page.evaluate(() => {
    const section = document.querySelector("#process");
    if (!section) throw new Error("Process section is missing");

    const history = [Number(section.getAttribute("data-process-index"))];
    const animationEvents = [];
    const indexObserver = new MutationObserver(() => {
      const next = Number(section.getAttribute("data-process-index"));
      if (history.at(-1) !== next) history.push(next);
    });

    indexObserver.observe(section, {
      attributes: true,
      attributeFilter: ["data-process-index"],
    });

    section.addEventListener(
      "animationstart",
      (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const visual = target.closest("[data-system-visual]");
        if (!visual) return;

        animationEvents.push({
          name: event.animationName,
          transition: Number(section.getAttribute("data-process-transition")),
          variant: visual.getAttribute("data-variant"),
        });
      },
      true,
    );

    window.__processReplayQA = { animationEvents, history, indexObserver };
  });
}

async function resetTelemetry(page) {
  await page.evaluate(() => {
    const section = document.querySelector("#process");
    const telemetry = window.__processReplayQA;
    if (!section || !telemetry) return;
    telemetry.history.splice(0, telemetry.history.length, Number(section.getAttribute("data-process-index")));
    telemetry.animationEvents.splice(0, telemetry.animationEvents.length);
  });
}

async function readProcessPlan(page) {
  return page.locator("#process").evaluate((section, offsets) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const progressStart = sectionTop - window.innerHeight * offsets.start;
    const progressEnd = sectionTop + rect.height - window.innerHeight * offsets.end;

    return {
      progressStart,
      progressEnd,
      sectionHeight: rect.height,
      maxScroll: document.documentElement.scrollHeight - window.innerHeight,
      viewportHeight: window.innerHeight,
    };
  }, { end: PROCESS_PROGRESS_END, start: PROCESS_PROGRESS_START });
}

async function readProcessProgress(page, plan) {
  return page.evaluate(({ end, start }) => {
    if (end === start) return 0;
    return (window.scrollY - start) / (end - start);
  }, { end: plan.progressEnd, start: plan.progressStart });
}

async function waitForProcessState(page, expectedIndex, label) {
  await page.waitForFunction(
    ({ index, variant }) => {
      const section = document.querySelector("#process");
      if (!section) return false;
      const transition = section.getAttribute("data-process-transition");
      const panel = section.querySelector(
        `[data-process-panel-transition="${transition}"]`,
      );
      const visual = panel?.querySelector("[data-system-visual]");
      const opacity = panel ? Number.parseFloat(getComputedStyle(panel).opacity) : 0;

      return (
        section.getAttribute("data-process-index") === String(index) &&
        visual?.getAttribute("data-variant") === variant &&
        opacity > 0.98
      );
    },
    { index: expectedIndex, variant: processVariants[expectedIndex] },
    { timeout: 3000 },
  ).catch(async (error) => {
    const diagnostic = await page.locator("#process").evaluate((section) => ({
      index: section.getAttribute("data-process-index"),
      transition: section.getAttribute("data-process-transition"),
      panels: [...section.querySelectorAll("[data-process-panel-transition]")].map((panel) => ({
        transition: panel.getAttribute("data-process-panel-transition"),
        opacity: getComputedStyle(panel).opacity,
        variant: panel.querySelector("[data-system-visual]")?.getAttribute("data-variant"),
      })),
    }));
    throw new Error(`${label}: visual did not settle: ${JSON.stringify(diagnostic)}; ${error.message}`);
  });
}

async function waitForAnimationReplay(page, transition, variant, label) {
  await page.waitForFunction(
    ({ expectedTransition, expectedVariant }) => {
      const events = window.__processReplayQA?.animationEvents ?? [];
      return events.some(
        (event) =>
          event.transition === expectedTransition &&
          event.variant === expectedVariant,
      );
    },
    { expectedTransition: transition, expectedVariant: variant },
    { timeout: 3000 },
  ).catch((error) => {
    throw new Error(`${label}: no CSS visual animation replay for transition ${transition}: ${error.message}`);
  });
}

async function scrollToProgress(page, progress, expectedIndex, label) {
  const plan = await readProcessPlan(page);
  const targetTop = plan.progressStart + (plan.progressEnd - plan.progressStart) * progress;
  const reachableTop = Math.min(plan.maxScroll, Math.max(0, targetTop));

  await page.evaluate((top) => {
    window.scrollTo({ top, behavior: "auto" });
  }, reachableTop);

  await page.waitForFunction(
    ({ end, expectedProgress, start }) => {
      if (end === start) return true;
      const currentProgress = (window.scrollY - start) / (end - start);
      return Math.abs(currentProgress - expectedProgress) < 0.02;
    },
    {
      end: plan.progressEnd,
      expectedProgress: progress,
      start: plan.progressStart,
    },
    { timeout: 3000 },
  );
  await waitForProcessState(page, expectedIndex, label);

  return {
    progress: await readProcessProgress(page, plan),
    state: await readProcessState(page),
  };
}

async function scrollAboveProcess(page, label) {
  const plan = await readProcessPlan(page);
  const targetTop = Math.max(
    0,
    plan.progressStart - Math.max(plan.viewportHeight * 0.35, plan.sectionHeight * 0.5),
  );

  await page.evaluate((top) => {
    window.scrollTo({ top, behavior: "auto" });
  }, targetTop);
  await page.waitForFunction(
    () => document.querySelector("#process")?.getBoundingClientRect().top > window.innerHeight,
    undefined,
    { timeout: 3000 },
  );
  await page.waitForFunction(
    () => document.querySelector("#process")?.getAttribute("data-process-index") === "0",
    undefined,
    { timeout: 3000 },
  );

  const progress = await readProcessProgress(page, plan);
  assert(progress <= PROCESS_ENTRY_EPSILON, `${label}: Process was not above its scroll range (${progress.toFixed(3)})`);
}

async function scrollBelowProcess(page, label) {
  const plan = await readProcessPlan(page);
  const targetTop = Math.min(
    plan.maxScroll,
    plan.progressEnd + Math.max(plan.viewportHeight * 0.35, plan.sectionHeight * 0.5),
  );

  await page.evaluate((top) => {
    window.scrollTo({ top, behavior: "auto" });
  }, targetTop);
  await page.waitForFunction(
    () => document.querySelector("#process")?.getBoundingClientRect().bottom < 0,
    undefined,
    { timeout: 3000 },
  );
  await page.waitForFunction(
    () => document.querySelector("#process")?.getAttribute("data-process-index") === "3",
    undefined,
    { timeout: 3000 },
  );

  const progress = await readProcessProgress(page, plan);
  assert(progress >= 1 - PROCESS_ENTRY_EPSILON, `${label}: Process was not below its scroll range (${progress.toFixed(3)})`);
}

async function driveSequence(page, points, indexes, label) {
  const seen = [];

  for (let step = 0; step < points.length; step += 1) {
    const before = await readProcessState(page);
    const beforeProgress = await readProcessProgress(page, await readProcessPlan(page));
    const result = await scrollToProgress(page, points[step], indexes[step], `${label} step ${step + 1}`);
    const shouldReplay =
      before.index !== result.state.index ||
      (beforeProgress <= PROCESS_ENTRY_EPSILON && result.progress > PROCESS_ENTRY_EPSILON);

    if (shouldReplay) {
      assert(
        result.state.transition > before.transition,
        `${label} step ${step + 1}: state changed without a new transition revision (${before.transition} → ${result.state.transition})`,
      );
      await waitForAnimationReplay(
        page,
        result.state.transition,
        processVariants[indexes[step]],
        `${label} step ${step + 1}`,
      );
    }

    seen.push(result.state.index);
  }

  assert(
    seen.join(",") === indexes.join(","),
    `${label}: expected ${indexes.join(",")}, got ${seen.join(",")}`,
  );

  const history = await page.evaluate(() => window.__processReplayQA?.history ?? []);
  assert(
    history.join(",") === indexes.join(","),
    `${label}: DOM active history expected ${indexes.join(",")}, got ${history.join(",")}`,
  );

  return seen;
}

async function assertNoPageOverflow(page, label) {
  const layout = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  assert(
    layout.scrollWidth <= layout.innerWidth + 1,
    `${label}: page overflowed by ${layout.scrollWidth - layout.innerWidth}px`,
  );
}

async function runViewport(browser, engine, width, height) {
  const label = `${engine} ${width}x${height}`;
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

  try {
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await assertNoPageOverflow(page, label);
    await installProcessTelemetry(page);

    const downSequences = [];
    const upSequences = [];

    for (let pass = 1; pass <= 5; pass += 1) {
      await scrollAboveProcess(page, `${label} pass ${pass} above`);
      await resetTelemetry(page);
      downSequences.push(
        await driveSequence(page, downPoints, downIndexes, `${label} pass ${pass} down`),
      );

      await scrollBelowProcess(page, `${label} pass ${pass} below`);
      await resetTelemetry(page);
      upSequences.push(
        await driveSequence(page, upPoints, upIndexes, `${label} pass ${pass} up`),
      );
    }

    await scrollAboveProcess(page, `${label} reverse setup`);
    await resetTelemetry(page);
    await scrollToProgress(page, 0.1, 0, `${label} reverse start`);
    await scrollToProgress(page, 0.55, 2, `${label} reverse midpoint down`);
    await scrollToProgress(page, 0.3, 1, `${label} reverse midpoint up`);
    await scrollToProgress(page, 0.55, 2, `${label} reverse midpoint down again`);
    await scrollToProgress(page, 0.3, 1, `${label} reverse midpoint up again`);
    await scrollToProgress(page, 0.8, 3, `${label} reverse finish`);

    assert(errors.length === 0, `${label}: browser errors: ${errors.join(" | ")}`);
    return {
      engine,
      viewport: `${width}x${height}`,
      down: downSequences.map((sequence) => sequence.join(",")),
      up: upSequences.map((sequence) => sequence.join(",")),
      replayPasses: 5,
      reverseMidpoint: true,
    };
  } finally {
    await context.close();
  }
}

async function runReducedMotion(browser, engine, width, height) {
  const label = `${engine} reduced ${width}x${height}`;
  const context = await browser.newContext({
    viewport: { width, height },
    hasTouch: width <= 768,
    isMobile: width <= 768,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  try {
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await installProcessTelemetry(page);
    await scrollAboveProcess(page, `${label} above`);
    await resetTelemetry(page);
    await scrollToProgress(page, 0.1, 0, `${label} Brief`);
    await scrollToProgress(page, 0.3, 1, `${label} System map`);
    await scrollToProgress(page, 0.55, 2, `${label} Build`);
    await scrollToProgress(page, 0.8, 3, `${label} Proof`);
    return { engine, viewport: `${width}x${height}`, reducedMotion: true };
  } finally {
    await context.close();
  }
}

const browserTypes = [
  ["chromium", chromium],
  ["webkit", webkit],
];
const results = [];

for (const [engine, browserType] of browserTypes) {
  const browser = await browserType.launch({ headless: true });
  try {
    for (const [width, height] of viewports) {
      results.push(await runViewport(browser, engine, width, height));
      if (width === 390 || width === 1440) {
        results.push(await runReducedMotion(browser, engine, width, height));
      }
    }
  } finally {
    await browser.close();
  }
}

console.log(JSON.stringify({ baseUrl, passed: results.length, results }, null, 2));
