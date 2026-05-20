// Based off of the official Astro accessibility tests.

import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env["CI"];

export default defineConfig({
  forbidOnly: isCI,
  fullyParallel: true,
  projects: [
    {
      name: "Chrome Stable",
      use: {
        ...devices["Desktop Chrome"],
        // Re-use system Chrome on CI to avoid re-installing it on every run.
        channel: isCI ? "chrome" : undefined,
        headless: true,
      },
    },
  ],
  reporter: [["./tests/reporter.ts"]],
  testMatch: "tests/**/*.test.ts",
  // The timeout for the accessibility tests only.
  timeout: 180 * 1_000,
  webServer: [
    {
      command: "bun run build && bun run preview",
      reuseExistingServer: !isCI,
      stdout: "pipe",
      // The timeout of the single build step ran before the accessibility tests.
      timeout: 120 * 1_000,
      url: "http://localhost:4321",
    },
  ],
});
