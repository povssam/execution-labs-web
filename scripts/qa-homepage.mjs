import { chromium } from "playwright";

const baseUrl = process.env.QA_URL ?? "http://127.0.0.1:4175/";
const viewports = [
  [390, 844],
  [430, 932],
  [768, 1024],
  [1024, 768],
  [1280, 800],
  [1366, 768],
  [1440, 900],
  [1728, 1117],
];
const progressSamples = [0.12, 0.24, 0.25, 0.37, 0.49, 0.5, 0.62, 0.74, 0.75, 0.87, 0.99];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function activeAtProgress(page, sectionId, selector, progress) {
  await page.evaluate(
    ({ sectionId, progress }) => {
      document.documentElement.style.scrollBehavior = "auto";
      const section = document.getElementById(sectionId);
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      const sectionTop = bounds.top + window.scrollY;
      const range = bounds.height + window.innerHeight * 0.4;
      window.scrollTo({
        top: sectionTop - window.innerHeight * 0.7 + progress * range,
        behavior: "instant",
      });
    },
    { sectionId, progress },
  );
  // A one-pixel native wheel tick makes Chromium dispatch the same scroll
  // event that a real wheel/trackpad gesture produces after a direct seek.
  await page.mouse.wheel(0, 1);
  await wait(90);
  return page.locator(`${selector}[data-active="true"]`).count();
}

async function testSequence(page, sectionId, selector, label) {
  const down = [];
  for (const progress of progressSamples) {
    const activeCount = await activeAtProgress(page, sectionId, selector, progress);
    assert(activeCount === 1, `${label}: expected exactly one active item at ${progress}, got ${activeCount}`);
    down.push(await page.locator(`${selector}[data-active="true"]`).first().evaluate((el) => el.parentElement?.textContent?.trim() ?? ""));
  }

  const reverse = [];
  for (const progress of [...progressSamples].reverse()) {
    const activeCount = await activeAtProgress(page, sectionId, selector, progress);
    assert(activeCount === 1, `${label}: expected exactly one active item while reversing at ${progress}, got ${activeCount}`);
    reverse.push(await page.locator(`${selector}[data-active="true"]`).first().evaluate((el) => el.parentElement?.textContent?.trim() ?? ""));
  }

  const order = await page.locator(selector).evaluateAll((elements) =>
    elements.map((element) => element.parentElement?.textContent?.trim() ?? ""),
  );
  const downIndexes = down.map((value) => order.indexOf(value));
  const reverseIndexes = reverse.map((value) => order.indexOf(value));
  assert(
    order.every((value) => down.includes(value)),
    `${label}: scrolling down did not visit every ordered state: ${down.join(" → ")}`,
  );
  assert(
    order.every((value) => reverse.includes(value)),
    `${label}: scrolling up did not visit every ordered state: ${reverse.join(" → ")}`,
  );
  assert(
    downIndexes.every((value, index) => index === 0 || value >= downIndexes[index - 1]),
    `${label}: active state is not monotonic while scrolling down: ${down.join(" → ")} (order: ${order.join(" | ")})`,
  );
  assert(
    reverseIndexes.every((value, index) => index === 0 || value <= reverseIndexes[index - 1]),
    `${label}: active state is not monotonic while scrolling up: ${reverse.join(" → ")} (order: ${order.join(" | ")})`,
  );

  return { down, reverse };
}

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const [width, height] of viewports) {
    const page = await browser.newPage({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await wait(500);

    const layout = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      progressUi: Boolean(document.querySelector(".nav-smart-progress, .nav-smart-bar")),
      headerHeight: document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0,
    }));
    assert(layout.scrollWidth === width, `${width}x${height}: page overflow ${layout.scrollWidth - width}px`);
    assert(!layout.progressUi, `${width}x${height}: progress UI is still present`);
    assert(errors.length === 0, `${width}x${height}: browser errors: ${errors.join(" | ")}`);

    const process = await testSequence(page, "process", "#process article", "Process");
    const signals = await testSequence(page, "client-signals", ".signal-line", "Client Signals");

    if (width <= 768) {
      const menu = page.getByRole("button", { name: "Toggle menu" });
      await menu.click();
      await wait(50);
      const locked = await page.evaluate(() => ({
        body: getComputedStyle(document.body).overflow,
        root: getComputedStyle(document.documentElement).overflow,
        menu: Boolean(document.querySelector("#mobile-navigation")),
      }));
      assert(locked.body === "hidden" && locked.root === "hidden" && locked.menu, `${width}x${height}: menu did not lock correctly`);

      await page.getByRole("link", { name: "Process" }).click();
      await wait(600);
      const afterAnchor = await page.evaluate((headerHeight) => ({
        scrollY: window.scrollY,
        body: document.body.style.overflow,
        root: document.documentElement.style.overflow,
        menu: Boolean(document.querySelector("#mobile-navigation")),
        processTop: document.getElementById("process")?.getBoundingClientRect().top ?? 0,
        headerHeight,
      }), layout.headerHeight);
      assert(afterAnchor.scrollY > 0, `${width}x${height}: menu anchor did not scroll`);
      assert(afterAnchor.body === "" && afterAnchor.root === "", `${width}x${height}: scroll lock survived menu navigation`);
      assert(!afterAnchor.menu, `${width}x${height}: menu remained open after navigation`);
      assert(afterAnchor.processTop >= afterAnchor.headerHeight - 1, `${width}x${height}: process anchor is under fixed header`);

      await menu.click();
      await wait(50);
      await menu.click();
      await wait(50);
      const closed = await page.evaluate(() => ({
        body: document.body.style.overflow,
        root: document.documentElement.style.overflow,
        menu: Boolean(document.querySelector("#mobile-navigation")),
      }));
      assert(closed.body === "" && closed.root === "" && !closed.menu, `${width}x${height}: menu did not release scroll lock`);
    }

    results.push({ viewport: `${width}x${height}`, process, signals });
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(
  JSON.stringify(
    {
      baseUrl,
      passed: results.length,
      results: results.map(({ viewport, process, signals }) => ({
        viewport,
        processDown: [...new Set(process.down)],
        processUp: [...new Set(process.reverse)],
        signalsDown: [...new Set(signals.down)],
        signalsUp: [...new Set(signals.reverse)],
      })),
    },
    null,
    2,
  ),
);
