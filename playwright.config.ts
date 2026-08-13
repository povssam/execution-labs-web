import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: "line",
  use: {
    baseURL:
      process.env.AUDIT_URL ??
      "https://feat-art-direction-v2.execution-labs-art-direction-v2-preview.pages.dev",
    browserName: "chromium",
    colorScheme: "dark",
    trace: "retain-on-failure",
  },
});
