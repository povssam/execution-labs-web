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
const capabilityVariants = [
  "ai-agents",
  "internal-tools",
  "mvp-software",
  "product-systems",
  "motion-design",
  "automation",
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function assert(condition, message) {
  if (!condition) throw new Error(message);
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

    await page.goto(baseUrl, { waitUntil: "networkidle" });

    const layout = await page.evaluate(() => {
      const processItems = [...document.querySelectorAll("#process [data-process-step]")];
      const signalItems = [...document.querySelectorAll("#client-signals p")];
      const middleSections = ["what-we-build", "selected-work", "process", "client-signals"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        progressUi: Boolean(document.querySelector(".nav-smart-progress, .nav-smart-bar")),
        motionWork: Boolean(document.querySelector("#motion-work")),
        graceVideos: [...document.querySelectorAll("video")].filter((video) => video.currentSrc.includes("grace-animation")).length,
        headerHeight: document.querySelector(".site-header")?.getBoundingClientRect().height ?? 0,
        processCount: processItems.length,
        signalCount: signalItems.length,
        stateAttributes: [...processItems, ...signalItems].some(
          (item) => item.hasAttribute("data-active") || item.hasAttribute("data-past"),
        ),
        hiddenReadableItems: [...processItems, ...signalItems].filter((item) => {
          const style = getComputedStyle(item);
          return style.display === "none" || style.visibility === "hidden" || Number(style.opacity) < 0.95;
        }).length,
        clippedMiddleContent: [...document.querySelectorAll(
          "#what-we-build h2, #what-we-build h3, #what-we-build [role='tabpanel'], #selected-work h2, #selected-work [data-project-media], #selected-work [data-project-link], #process [data-process-step], #process [data-system-visual], #client-signals p",
        )].filter((item) => {
          const bounds = item.getBoundingClientRect();
          return bounds.left < -0.5 || bounds.right > window.innerWidth + 0.5;
        }).map((item) => ({ className: item.className, text: item.textContent?.trim() })),
        middleHeights: middleSections.map((section) => ({ id: section.id, height: section.offsetHeight })),
      };
    });

    assert(layout.scrollWidth === width, `${width}x${height}: page overflow ${layout.scrollWidth - width}px`);
    assert(!layout.progressUi, `${width}x${height}: progress UI is still present`);
    assert(!layout.motionWork, `${width}x${height}: redundant Motion Work section remains`);
    assert(layout.graceVideos === 1, `${width}x${height}: Grace should appear once, got ${layout.graceVideos} media presentations`);
    assert(layout.processCount === 4, `${width}x${height}: expected four process steps`);
    assert(layout.signalCount === 4, `${width}x${height}: expected four client signals`);
    assert(!layout.stateAttributes, `${width}x${height}: obsolete scroll-state attributes remain`);
    assert(layout.hiddenReadableItems === 0, `${width}x${height}: middle copy is hidden or state-dimmed`);
    assert(layout.clippedMiddleContent.length === 0, `${width}x${height}: clipped middle content ${JSON.stringify(layout.clippedMiddleContent)}`);
    assert(errors.length === 0, `${width}x${height}: browser errors: ${errors.join(" | ")}`);

    const processTabs = page.locator('#process [role="tab"]');
    assert(await processTabs.count() === 4, `${width}x${height}: expected four process controls`);
    assert(await page.locator('#process [role="tab"][aria-selected="true"]').count() === 1, `${width}x${height}: process active state is ambiguous`);
    await processTabs.nth(1).click();
    await page.waitForFunction(() => document.querySelector("#process-panel [data-system-visual]")?.getAttribute("data-variant") === "system-map");
    await processTabs.nth(1).press("ArrowRight");
    await page.waitForFunction(() => document.querySelector("#process-panel [data-system-visual]")?.getAttribute("data-variant") === "build");
    assert((await processTabs.nth(2).getAttribute("aria-selected")) === "true", `${width}x${height}: process keyboard selection failed`);

    const capabilityProof = page.locator("[data-capability-proof]");
    assert(await capabilityProof.isVisible(), `${width}x${height}: capability proof is not visible`);
    const capabilityTabs = page.getByRole("tab", { name: /AI Agents|Internal Tools|MVP Software|Product Systems|Motion Design|Automation/ });
    for (let index = 0; index < await capabilityTabs.count(); index += 1) {
      const tab = capabilityTabs.nth(index);
      await tab.click();
      await page.waitForFunction((variant) => document.querySelector("#capability-panel [data-system-visual]")?.getAttribute("data-variant") === variant, capabilityVariants[index]);
      const capabilityState = await page.locator("#capability-panel").evaluate((panel) => ({
        heading: panel.querySelector("h3")?.textContent?.trim(),
        proofVisible: Boolean(panel.querySelector("[data-capability-proof] [data-system-visual]")),
      }));
      assert(Boolean(capabilityState.heading), `${width}x${height}: capability heading is empty`);
      assert(capabilityState.proofVisible, `${width}x${height}: capability has an empty proof surface`);
    }

    const projectTabs = page.locator('#selected-work [role="tab"]');
    for (let index = 0; index < await projectTabs.count(); index += 1) {
      const tab = projectTabs.nth(index);
      const expectedTitle = (await tab.textContent())?.trim();
      await tab.click();
      await page.waitForFunction((title) => document.querySelector("#selected-work-panel h2")?.textContent?.trim() === title, expectedTitle);
      const projectState = await page.locator("#selected-work-panel").evaluate((panel) => ({
        title: panel.querySelector("h2")?.textContent?.trim(),
        mediaVisible: Boolean(panel.querySelector("[data-project-media] video, [data-project-media] [data-system-visual]")),
        href: panel.querySelector("[data-project-link]")?.getAttribute("href"),
      }));
      assert(projectState.title === expectedTitle, `${width}x${height}: project title did not synchronize for ${expectedTitle}`);
      assert(projectState.mediaVisible, `${width}x${height}: ${expectedTitle} has an empty project media state`);
      assert(Boolean(projectState.href), `${width}x${height}: ${expectedTitle} has no project link`);
    }

    await capabilityTabs.nth(2).click();
    await wait(150);
    await capabilityTabs.nth(2).press("ArrowRight");
    await wait(150);
    assert(
      (await capabilityTabs.nth(3).getAttribute("aria-selected")) === "true",
      `${width}x${height}: capability keyboard selection failed`,
    );

    const workTabs = page.locator('#selected-work [role="tab"]');
    await workTabs.first().click();
    await wait(150);
    await workTabs.first().press("ArrowRight");
    await wait(150);
    assert(
      (await workTabs.nth(1).getAttribute("aria-selected")) === "true",
      `${width}x${height}: project keyboard selection failed`,
    );

    if (width <= 430) {
      const capabilityBeforeSwipe = await capabilityTabs.evaluateAll((tabs) =>
        tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"),
      );
      await page.locator('[role="tablist"][aria-label="Capabilities"]').evaluate((rail) => {
        rail.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 7, pointerType: "touch", clientX: 260 }));
        rail.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 7, pointerType: "touch", clientX: 150 }));
      });
      await wait(450);
      const capabilityTouchSelected = await capabilityTabs.evaluateAll((tabs) =>
        tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"),
      );
      assert(
        capabilityTouchSelected === (capabilityBeforeSwipe + 1) % 6,
        `${width}x${height}: capability swipe selection failed (${capabilityBeforeSwipe} → ${capabilityTouchSelected})`,
      );
      const capabilityCenterDelta = await capabilityTabs.nth(capabilityTouchSelected).evaluate((tab) => {
        const rail = tab.closest('[role="tablist"]');
        if (!rail) return Infinity;
        const tabBounds = tab.getBoundingClientRect();
        const railBounds = rail.getBoundingClientRect();
        return Math.abs((tabBounds.left + tabBounds.right) / 2 - (railBounds.left + railBounds.right) / 2);
      });
      assert(capabilityCenterDelta <= 3, `${width}x${height}: selected capability is ${capabilityCenterDelta}px off center`);

      const projectBeforeSwipe = await workTabs.evaluateAll((tabs) =>
        tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"),
      );
      await page.locator('[role="tablist"][aria-label="Selected projects"]').evaluate((rail) => {
        rail.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 8, pointerType: "touch", clientX: 260 }));
        rail.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 8, pointerType: "touch", clientX: 150 }));
      });
      await wait(450);
      const projectTouchSelected = await workTabs.evaluateAll((tabs) =>
        tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"),
      );
      assert(
        projectTouchSelected === (projectBeforeSwipe + 1) % 5,
        `${width}x${height}: project swipe selection failed (${projectBeforeSwipe} → ${projectTouchSelected})`,
      );
      const projectCenterDelta = await workTabs.nth(projectTouchSelected).evaluate((tab) => {
        const rail = tab.closest('[role="tablist"]');
        if (!rail) return Infinity;
        const tabBounds = tab.getBoundingClientRect();
        const railBounds = rail.getBoundingClientRect();
        return Math.abs((tabBounds.left + tabBounds.right) / 2 - (railBounds.left + railBounds.right) / 2);
      });
      assert(projectCenterDelta <= 3, `${width}x${height}: selected project is ${projectCenterDelta}px off center`);

    }

    if (width <= 768) {

      const menu = page.getByRole("button", { name: "Toggle menu" });
      await menu.click();
      const locked = await page.evaluate(() => ({
        body: getComputedStyle(document.body).overflow,
        root: getComputedStyle(document.documentElement).overflow,
        menu: Boolean(document.querySelector("#mobile-navigation")),
      }));
      assert(locked.body === "hidden" && locked.root === "hidden" && locked.menu, `${width}x${height}: menu lock failed`);

      await page.getByRole("link", { name: "Process" }).click();
      await wait(650);
      const afterAnchor = await page.evaluate((headerHeight) => ({
        body: document.body.style.overflow,
        root: document.documentElement.style.overflow,
        menu: Boolean(document.querySelector("#mobile-navigation")),
        processTop: document.getElementById("process")?.getBoundingClientRect().top ?? 0,
        headerHeight,
      }), layout.headerHeight);
      assert(afterAnchor.body === "" && afterAnchor.root === "", `${width}x${height}: menu scroll lock survived navigation`);
      assert(!afterAnchor.menu, `${width}x${height}: menu remained open after navigation`);
      assert(afterAnchor.processTop >= afterAnchor.headerHeight - 1, `${width}x${height}: process anchor is hidden under nav`);

      await menu.click();
      await menu.click();
      const closed = await page.evaluate(() => ({
        body: document.body.style.overflow,
        root: document.documentElement.style.overflow,
        menu: Boolean(document.querySelector("#mobile-navigation")),
      }));
      assert(closed.body === "" && closed.root === "" && !closed.menu, `${width}x${height}: menu did not release scroll lock`);
    }

    results.push({ viewport: `${width}x${height}`, middleHeights: layout.middleHeights });
    await page.close();
  }

  const resizePage = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await resizePage.goto(baseUrl, { waitUntil: "networkidle" });
  for (const [width, height] of [[390, 844], [1440, 900], [430, 932], [1366, 768]]) {
    await resizePage.setViewportSize({ width, height });
    await wait(120);
    const resizedWidth = await resizePage.evaluate(() => document.documentElement.scrollWidth);
    assert(resizedWidth === width, `${width}x${height}: resize introduced ${resizedWidth - width}px overflow`);
  }
  await resizePage.close();
} finally {
  await browser.close();
}

console.log(JSON.stringify({ baseUrl, passed: results.length, results }, null, 2));
