import { chromium } from "playwright";

const baseUrl = process.env.QA_URL ?? "http://127.0.0.1:4175/";
const statement = "Building exceptional digital experiences for visionaries and innovators around the world.";
const viewports = [[390, 844], [430, 932], [1440, 900]];
const expectedLines = new Map([[390, 4], [430, 3], [1440, 2]]);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const [width, height] of viewports) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "no-preference" });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await wait(250);

    const geometry = await page.locator("#studio-statement").evaluate((section) => {
      const bounds = section.getBoundingClientRect();
      return { top: bounds.top + window.scrollY, height: bounds.height };
    });

    await page.evaluate(({ top, sectionHeight, viewportHeight }) => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, top + sectionHeight * 0.3 - viewportHeight);
    }, { top: geometry.top, sectionHeight: geometry.height, viewportHeight: height });
    await wait(250);

    const before = await page.evaluate((expectedText) => {
      const paragraph = document.querySelector("#studio-statement p");
      const characters = [...document.querySelectorAll("[data-statement-character]")];
      const words = [...document.querySelectorAll("[data-statement-word]")];
      const bounds = paragraph?.getBoundingClientRect();
      const lineTops = [...new Set(words.map((word) => Math.round(word.getBoundingClientRect().top)))];
      return {
        text: paragraph?.textContent?.replace(/\s+/g, " ").trim(),
        visibleCharacters: characters.filter((character) => Number(getComputedStyle(character).opacity) > 0.05).length,
        characterCount: characters.length,
        width: bounds?.width ?? 0,
        height: bounds?.height ?? 0,
        left: bounds?.left ?? 0,
        right: bounds?.right ?? 0,
        lineCount: lineTops.length,
        expectedText,
      };
    }, statement);

    assert(before.text === statement, `${width}x${height}: duplicate or altered statement text`);
    assert(before.visibleCharacters === 0, `${width}x${height}: animation started before 35% visibility`);
    assert(before.left >= 0 && before.right <= width, `${width}x${height}: statement is clipped`);
    assert(before.lineCount === expectedLines.get(width), `${width}x${height}: expected ${expectedLines.get(width)} lines, got ${before.lineCount}`);

    await page.evaluate(({ top, sectionHeight, viewportHeight }) => {
      window.scrollTo(0, top + sectionHeight * 0.42 - viewportHeight);
    }, { top: geometry.top, sectionHeight: geometry.height, viewportHeight: height });
    await page.waitForFunction(() =>
      [...document.querySelectorAll("[data-statement-character]")]
        .some((character) => Number(getComputedStyle(character).opacity) > 0.05),
    );
    await wait(180);

    const during = await page.evaluate(() => {
      const paragraph = document.querySelector("#studio-statement p");
      const characters = [...document.querySelectorAll("[data-statement-character]")];
      const bounds = paragraph?.getBoundingClientRect();
      return {
        visibleCharacters: characters.filter((character) => Number(getComputedStyle(character).opacity) > 0.05).length,
        width: bounds?.width ?? 0,
        height: bounds?.height ?? 0,
      };
    });

    assert(during.visibleCharacters > 0 && during.visibleCharacters < before.characterCount, `${width}x${height}: character progression is not incremental`);
    assert(Math.abs(during.width - before.width) < 0.1 && Math.abs(during.height - before.height) < 0.1, `${width}x${height}: text reflowed during animation`);

    await wait(4400);
    const settled = await page.evaluate(() => {
      const paragraph = document.querySelector("#studio-statement p");
      const characters = [...document.querySelectorAll("[data-statement-character]")];
      const bounds = paragraph?.getBoundingClientRect();
      return {
        visibleCharacters: characters.filter((character) => Number(getComputedStyle(character).opacity) > 0.99).length,
        width: bounds?.width ?? 0,
        height: bounds?.height ?? 0,
      };
    });

    assert(settled.visibleCharacters === before.characterCount, `${width}x${height}: statement did not settle fully`);
    assert(Math.abs(settled.width - before.width) < 0.1 && Math.abs(settled.height - before.height) < 0.1, `${width}x${height}: text shifted after settling`);

    await page.evaluate(() => window.scrollTo(0, 0));
    await wait(150);
    await page.evaluate(({ top, sectionHeight, viewportHeight }) => {
      window.scrollTo(0, top + sectionHeight * 0.42 - viewportHeight);
    }, { top: geometry.top, sectionHeight: geometry.height, viewportHeight: height });
    await wait(250);
    const replayed = await page.locator("[data-statement-character]").evaluateAll((characters) =>
      characters.filter((character) => Number(getComputedStyle(character).opacity) > 0.99).length,
    );
    assert(replayed === before.characterCount, `${width}x${height}: statement replayed after re-entry`);

    const reducedPage = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
    await reducedPage.goto(baseUrl, { waitUntil: "networkidle" });
    await wait(300);
    const reducedVisible = await reducedPage.locator("[data-statement-character]").evaluateAll((characters) =>
      characters.filter((character) => Number(getComputedStyle(character).opacity) > 0.99).length,
    );
    assert(reducedVisible === before.characterCount, `${width}x${height}: reduced motion did not show full text immediately`);
    await reducedPage.close();

    results.push({ viewport: `${width}x${height}`, lines: before.lineCount, characters: before.characterCount });
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(JSON.stringify({ baseUrl, passed: results.length, results }, null, 2));
