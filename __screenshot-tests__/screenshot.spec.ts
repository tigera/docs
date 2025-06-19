import * as fs from 'fs';
import { test, expect } from '@playwright/test';
import { extractSitemapPathnames } from './utils';

const siteUrl = 'http://localhost:3000';
const stylesheetPath = './__screenshot-tests__/screenshot.css';
const stylesheet = fs.readFileSync(stylesheetPath).toString();
const sitemapPath = './build/sitemap.xml';

function waitForDocusaurusHydration() {
  return document.documentElement.dataset.hasHydrated === 'true';
}

const screenshotPathname = (pathname: string) => {
  test(`pathname ${pathname}`, async ({ page }) => {
    const url = siteUrl + pathname;

    await page.goto(url);
    await page.waitForFunction(waitForDocusaurusHydration);
    await page.addStyleTag({ content: stylesheet });
    await expect(page).toHaveScreenshot({
      fullPage: true,
      maxDiffPixels: 10
    });
  });
};

// add exceptions here
const exceptions: string[] = []
// run subsection of tests
const startsWith: string = '';

test.describe('Docs visual regression testing', () => {
  const pathnames = extractSitemapPathnames(sitemapPath);
  const paths = pathnames.filter((path: string) => path.startsWith(startsWith) && !exceptions.includes(path))
  const length = paths.length;

  for (let i = 0; i < length; i++) {
    screenshotPathname(paths[i])
  }
});
