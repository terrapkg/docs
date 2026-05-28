import { styleText } from "node:util";
import { test, getSitemap, localURL, expect } from "./accessibility";

const urls = await getSitemap();
const localPath = "src/content/docs";

for (const url of urls) {
  let { pathname } = new URL(url);
  let localPage = localPath + pathname + ".mdx";
  // Normalize page URL for homepage.
  if (pathname === "/") {
    pathname = "";
    localPage = localPath + "/index.mdx";
  }
  const pageURL = localURL + pathname;

  test(`Testing for accessibility violations on ${localPage}.`, async ({
    page,
    makeAxeBuilder,
  }) => {
    await page.goto(pageURL);

    // Set two second delay otherwise Playwright likes to rush ahead of the page actually loading.
    await new Promise((r) => setTimeout(r, 2000));

    const accessibilityScanResults = await makeAxeBuilder().analyze();

    function impactFormat(impact: string) {
      const impactKey: Record<string, string> = {
        minor: styleText("blue", impact),
        moderate: styleText("yellowBright", impact),
        serious: styleText("yellow", impact),
        critical: styleText("red", impact),
      };
      return impactKey[impact];
    }

    const accessibilityViolations = accessibilityScanResults.violations;
    const violationsLength = accessibilityViolations.length;
    const reportMessage = `Found ${violationsLength} accessibility violations on ${localPage}.`;
    const violationMessage = reportMessage + " Check the errors above for more details.";
    let violationLog;

    try {
      expect(accessibilityViolations, reportMessage).toHaveLength(0);
    } catch {
      for (let i = 0; i < violationsLength; i++) {
        const violationNumber = i + 1;
        const currentViolation = accessibilityViolations[i];
        const violationNodes = currentViolation.nodes;
        const currentNode = violationNodes[i];
        violationLog =
          `
${styleText(["redBright", "bold"], `Violation ${violationNumber}:`)}
${styleText("redBright", `  Violation ID:`)} ${currentViolation.id}
${styleText("redBright", `  Violation Impact:`)} ${impactFormat(currentViolation.impact ?? "")}
${styleText("redBright", `  Violation Description:`)} ${currentViolation.help}
${styleText("redBright", `  Violation HTML:`)} ${currentNode.html}
${styleText("redBright", `  Violation CSS:`)} ${currentNode.target.toString()}` +
          "\n\n" +
          `${styleText("green", `Violation Solution:`)}
  ${currentNode.failureSummary}`;
      }

      throw new Error(`${violationLog}` + "\n\n" + `${violationMessage}`);
    }
  });
}
