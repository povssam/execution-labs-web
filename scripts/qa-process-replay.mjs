import { chromium } from "playwright";

const baseUrl = process.env.QA_URL ?? "http://127.0.0.1:4175/";
const viewports = (process.env.QA_VIEWPORTS ?? "390x844,430x932,768x1024,1440x900")
  .split(",")
  .map((value) => value.split("x").map(Number));
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function readProcessState(page) {
  return page.locator("#process").evaluate((section) => ({
    index: Number(section.getAttribute("data-process-index")),
    run: Number(section.getAttribute("data-process-run")),
    variant: section.querySelector("[data-system-visual]")?.getAttribute("data-variant"),
  }));
}

async function watchProcessHistory(page) {
  await page.evaluate(() => {
    const section = document.querySelector("#process");
    if (!section) throw new Error("Process section is missing");

    const readIndex = () => Number(section.getAttribute("data-process-index"));
    const history = [readIndex()];
    const observer = new MutationObserver(() => {
      const next = readIndex();
      if (history.at(-1) !== next) history.push(next);
    });

    observer.observe(section, { attributes: true, attributeFilter: ["data-process-index"] });
    window.__processReplayHistory = history;
    window.__processReplayObserver = observer;
  });
}

async function resetProcessHistory(page) {
  await page.evaluate(() => {
    const section = document.querySelector("#process");
    const history = window.__processReplayHistory ?? [];
    history.splice(0, history.length, Number(section?.getAttribute("data-process-index")));
    window.__processReplayHistory = history;
  });
}

async function scrollToProcess(page) {
  await page.locator("#process").evaluate((section) => {
    const top = section.offsetTop - (window.innerHeight - section.offsetHeight) / 2;
    window.scrollTo(0, Math.max(0, top));
  });
  await page.waitForFunction(() => Number(document.querySelector("#process")?.getAttribute("data-process-run")) > 0);
}

async function collectSequence(page, label) {
  await page.waitForFunction(
    () => window.__processReplayHistory?.at(-1) === 3,
    undefined,
    { timeout: 6000 },
  );
  const seen = await page.evaluate(() => window.__processReplayHistory ?? []);
  assert(seen.join(",") === "0,1,2,3", `${label}: expected 0,1,2,3, got ${seen.join(",")}`);
}

async function scrollAboveAndAssertReset(page, label) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForFunction(() => {
    const section = document.querySelector("#process");
    return section?.getAttribute("data-process-index") === "0";
  });
  const state = await readProcessState(page);
  assert(state.index === 0, `${label}: Process did not reset to Brief outside the viewport`);
  return state.run;
}

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const [width, height] of viewports) {
    const label = `${width}x${height}`;
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await watchProcessHistory(page);

    await scrollToProcess(page);
    let state = await readProcessState(page);
    await collectSequence(page, label);

    for (let pass = 1; pass <= 5; pass += 1) {
      const completedRun = state.run;
      state = { ...state, run: await scrollAboveAndAssertReset(page, `${label} pass ${pass}`) };
      await resetProcessHistory(page);
      await scrollToProcess(page);
      await page.waitForFunction(
        (previousRun) => Number(document.querySelector("#process")?.getAttribute("data-process-run")) > previousRun,
        completedRun,
      );
      await collectSequence(page, `${label} pass ${pass}`);
      state = await readProcessState(page);
    }

    const interruptedRun = await scrollAboveAndAssertReset(page, `${label} interrupted pass`);
    await resetProcessHistory(page);
    await scrollToProcess(page);
    await page.waitForFunction(
      (previousRun) =>
        Number(document.querySelector("#process")?.getAttribute("data-process-run")) > previousRun &&
        Number(document.querySelector("#process")?.getAttribute("data-process-index")) === 1,
      interruptedRun,
      { timeout: 5000 },
    );
    await scrollAboveAndAssertReset(page, `${label} interrupted exit`);
    const reentryRun = await readProcessState(page);
    await resetProcessHistory(page);
    await scrollToProcess(page);
    await page.waitForFunction(
      (previousRun) => Number(document.querySelector("#process")?.getAttribute("data-process-run")) > previousRun,
      reentryRun.run,
      { timeout: 5000 },
    ).catch(async () => {
      throw new Error(`${label} interrupted re-entry did not create a new run: ${JSON.stringify(await readProcessState(page))}`);
    });
    await collectSequence(page, `${label} interrupted re-entry`);

    await page.close();

    const reducedPage = await browser.newPage({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    await reducedPage.goto(baseUrl, { waitUntil: "networkidle" });
    await scrollToProcess(reducedPage);
    await wait(250);
    const reducedState = await readProcessState(reducedPage);
    assert(reducedState.index === 3, `${label} reduced-motion: expected final Proof state, got ${reducedState.index}`);
    const reducedRun = reducedState.run;
    await wait(1500);
    const settledReducedState = await readProcessState(reducedPage);
    assert(settledReducedState.index === 3 && settledReducedState.run === reducedRun, `${label} reduced-motion: sequence replayed or did not settle`);
    await reducedPage.close();

    results.push({ viewport: label, replayPasses: 5, sequence: "0,1,2,3", reducedMotion: "final static Proof" });
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify({ baseUrl, passed: results.length, results }, null, 2));
