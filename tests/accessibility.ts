import { test as base } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import Sitemapper from "sitemapper";

type AxeFixture = {
  makeAxeBuilder: () => AxeBuilder;
};

// Export for use in tests.
export const localURL = "http://localhost:4321";
const localSitemap = `${localURL}/sitemap-index.xml`;

export async function getSitemap() {
  const sitemap = new Sitemapper({ url: localSitemap });
  const { sites } = await sitemap.fetch();

  if (sites.length === 0) {
    throw new Error("No pages found in sitemap.");
  }

  const urls: string[] = [];

  for (const site of sites) {
    urls.push(site);
  }

  return urls;
}

export const test = base.extend<AxeFixture>({
  makeAxeBuilder: async ({ page }, use) => {
    const makeAxeBuilder = () =>
      new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag21a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"])
        // Asides have some issues with their landmarks. A proposed solution is switching to the "note" role.
        // Until upstream fixes this all we can do is ignore it.
        // See: https://github.com/nvaccess/nvda/issues/10439
        // See: Discussion on https://github.com/withastro/starlight/pull/2503
        .exclude(".starlight-aside")
        // Expressive Code has a (mostly) harmless violation to ARIA with a label. It still works, but predictably causes Axe test failure and they SHOULD fix this.
        // For now we exclude these tests.
        // See: https://github.com/expressive-code/expressive-code/pull/348
        .exclude(".expressive-code");

    await use(makeAxeBuilder);
  },
});
export { expect } from "@playwright/test";
