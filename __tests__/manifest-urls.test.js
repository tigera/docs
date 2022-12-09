const { execSync } = require('child_process');
const { expect, test } = require('@jest/globals');
var https = require('https');
var fs = require('fs');

function ping([url, locations]) {
  return new Promise((resolve) => {
    try {
      const req = https.request(url, { method: 'HEAD' }, (res) => {
        resolve({ failed: res.statusCode === 404, url, locations });
      });
      req.on('error', () => {
        resolve({ failed: true, url, locations });
      });
      req.end();
    } catch {
      resolve({ failed: true, url, locations });
    }
  });
}

function groupByUrl(matchArr) {
  const map = new Map();

  matchArr.forEach((match) => {
    const urls = map.get(match.url);
    if (urls) {
      urls.push(match.location);
    } else {
      map.set(match.url, [match.location]);
    }
  });

  return Array.from(map);
}

test("Takes all `https://(.*).yaml` from CodeBlocks and check if they're all reachable", async () => {
  const buffer = execSync('docusaurus build --out-dir test-build --no-minify', {
    env: {
      ...process.env,
      TESTING: true,
    },
    stdio: 'pipe', // prevents child process logs from printing
  });
  fs.rmSync('test-build', { recursive: true, force: true });

  const bufferStr = buffer.toString();
  const matchArr = Array.from(
    bufferStr.matchAll(/\[CodeBlock url\] (https(?:(?!<|>).)*?\.yaml) \[location\] (.*)/g)
  ).map((match) => ({
    url: match[1],
    location: match[2],
  }));

  const groupedUrls = groupByUrl(matchArr);
  const results = await Promise.all(groupedUrls.map(ping));
  const failedRequests = results.filter((res) => res.failed);
  const urlsList = failedRequests
    .map(({ url, locations }) => `${url}\nLocations:\n${locations.join('\n')}\n`)
    .join('\n');

  console.info('The list of tested resources:\n');
  groupedUrls.forEach(([url]) => console.info(url));
  console.info(`\n[CodeBlock] resources not found:\n\n${urlsList}`);

  expect(failedRequests.length).toBe(0);
});
