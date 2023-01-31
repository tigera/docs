const { test, expect } = require('@playwright/test');
const { PlaywrightCrawler, Dataset } = require('crawlee');
const linkChecker = require('../src/utils/linkChecker');

test("Takes all `https://(.*).yaml` and check if they're all reachable", async () => {
  const lc = linkChecker();
  const crawler = new PlaywrightCrawler({
    // Use the requestHandler to process each of the crawled pages.
    async requestHandler({ request, page, enqueueLinks, log }) {
      lc.setLinkRegex([/https?:\/\/[-a-zA-Z0-9()@:%._+~#?&/=]+?\.(ya?ml|zip|ps1|tgz)/g]);
      const nodes = await page.getByText(lc.getLinkRegex());
      const allText = await nodes.allInnerTexts();
      for (const text of allText) {
        lc.process(text);
      }
      await enqueueLinks();
    },
  });

  await crawler.run(['https://docs.tigera.io']);
  lc.report();
  const allErrors = lc.sysErrorsCount() + lc.errorCount() + lc.deadCount();
  expect(allErrors).toBe(0);
});
