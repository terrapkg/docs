import { type Locale } from '@lunariajs/core';
import { defineConfig } from "@lunariajs/core/config";

export const locales = [{ label: "Placeholder", lang: "ph" }] satisfies [Locale, ...Locale[]];

export default defineConfig({
  repository: {
    name: "terrapkg/docs",
  },
  sourceLocale: {
    label: "English",
    lang: "en",
  },
  locales,
  files: [
    {
      include: ["src/content/docs/**/*.{md,mdx}"],
      pattern: {
        source: "src/content/docs/@path",
        locales: "src/content/docs/@lang/@path",
      },
      type: "universal",
    },
  ],
  tracking: {
    ignoredKeywords: [
      "lunaria-ignore",
      "typo",
      "en-only",
      "broken link",
      "i18nReady",
      "i18nIgnore",
    ],
  },
  dashboard: {
    title: "Terra Docs Translation Status",
    description:
      "Translation progress tracker for the Terra documentation site. See what we currently have, and feel free to help!",
    favicon: {
      external: [{ link: "https://docs.terrapkg.com/favicon.svg", type: "image/svg+xml" }],
    },
    ui: {
      "statusByLocale.heading": "Translation progress by locale",
      "statusByLocale.incompleteLocalizationLink": "Incomplete",
      "statusByLocale.outdatedLocalizationLink": "Outdated",
      "statusByLocale.completeLocalization": "Complete!",
      "statusByFile.heading": "Translation status by file",
    },
  },
});
