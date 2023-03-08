const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const readLine = require('node:readline');
const events = require('node:events');
const url = require('node:url');
const axios = require('axios');
const https = require('node:https');
const http = require('node:http');
const { RateLimiter } = require('limiter');

test("Test old site to new site redirects", async () => {
  const log = s => console.log(`${s}`);
  const WIP = 'wip', DONE = 'done', ERROR = 'error';
  const urlMap = new Map();
  const isFullReport = process.env.FULL_REPORT ? process.env.FULL_REPORT === 'true' : false;
  const defRateLimit = '10/second';
  const rateLimit = process.env.RATE_LIMIT
    ? process.env.RATE_LIMIT.split('/') : defRateLimit.split('/');
  const limiter = new RateLimiter({
    tokensPerInterval: Number(rateLimit[0]),
    interval: rateLimit[1],
  });
  console.log(`Rate limiting: ${rateLimit[0]}/${rateLimit[1]} (default ${defRateLimit})`);
  console.log('Use env var RATE_LIMIT=N/sec to customize');
  const ax = axios.create({
    maxRedirects: 0,
    timeout: 60000,
    maxContentLength: 50 * 1000 * 1000,
    httpAgent: new http.Agent({ keepAlive: true, maxSockets: 2 }),
    httpsAgent: new https.Agent({ keepAlive: true, maxSockets: 100 }),
  });
  let promises = [];
  let failures = 0;

  async function get(origin, url, ctx) {
    await limiter.removeTokens(1);
    return ax.get(url)
      .then(resp => {
        ctx.path.push({url, code: resp.status});
        urlMap.set(origin, {status: DONE, path: [...ctx.path]});
      })
      .catch(async err => {
        if (!err.response || !err.response.status) {
          ctx.path.push({url, code: 0});
          urlMap.set(origin, {status: ERROR, path: [...ctx.path], err});
          return;
        }
        ctx.path.push({url, code: err.response.status});
        if (err.response.status === 301 || err.response.status === 302) {
          let rl = err.response.headers.get('location');
          if (!rl.startsWith('http')) rl = `${new URL(url).origin}${rl}`;
          await get(origin, rl, ctx);
        } else {
          urlMap.set(origin, {status: DONE, path: [...ctx.path]});
          if (err.response.status !== 404) {
            log(`[WARN] url: ${url} received an unexpected http response: ${err.response.status}`);
          }
        }
      });
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  function count(s) {
    let cnt = 0;
    urlMap.forEach((v, k) => { if (v.status === s) ++cnt; })
    return cnt;
  }

  async function processFile(filePath) {
    urlMap.clear();
    promises = [];
    const lineMap = new Map();
    const lineReader = readLine.createInterface({
      input: fs.createReadStream(filePath)
    });

    lineReader.on('line', function (line) {
      const url = line.trim();
      if (url.startsWith('#') || url === '') return;
      lineMap.set(url, null);
    });
    await events.once(lineReader, 'close');

    for (const url of lineMap.keys()) {
      let ctx = {status: WIP, path: []};
      urlMap.set(url, ctx);
      promises.push(get(url, url, ctx));
    }

    while (true) {
      const cnt = count(WIP);
      if (cnt <= 0) break;
      log(`Waiting to finish: ${cnt} remaining...`);
      await sleep(5000);
    }

    await Promise.allSettled(promises);

    while (true) {
      promises = [];
      const cnt = count(ERROR);
      if (cnt <= 0) break;
      for (const url of urlMap.keys()) {
        const e = urlMap.get(url);
        if (e.status === ERROR) {
          let ctx = {status: ERROR, path: []};
          urlMap.set(url, ctx);
          promises.push(get(url, url, ctx));
        }
      }
      log(`Retrying ${cnt} error(s)...`);
      await Promise.allSettled(promises);
      await sleep(1000);
    }

    if (isFullReport) {
      log("\n[INFO] Full Reporting is ON");
    } else {
      log("\n[INFO] Reporting errors, 404s, and non-redirects");
    }

    let reported = 0;
    urlMap.forEach((v,k) => {
      let cnt = 0, lastCode = 0, lastUrl = '', out = [];
      for (const e of v.path) {
        lastUrl = e.url; lastCode = e.code;
        const err = v.err ? ` (${v.err})`: '';
        out.push(`${cnt++ > 0 ? '==> ' : ''}${e.url} --> ${e.code}${err}`);
      }
      const badCode = lastCode !== 200;
      const badUrl = !lastUrl.startsWith('https://docs.tigera.io');
      // const diffPath = !lastUrl.endsWith(new URL(k).pathname);
      if (badUrl || badCode) failures++;
      if (isFullReport || badCode || badUrl) {
        log('');
        if (out.length > 0) reported++;
        for (const l of out) { log(l); }
      }
    });
    if (reported === 0) {
      log(`ALL GOOD! Nothing to report.`);
    }
  }

  const files = [
    '__tests__/data/urls_docs.calicocloud.io.txt',
    '__tests__/data/urls_projectcalico.docs.tigera.io.txt',
    '__tests__/data/urls_docs.projectcalico.org.txt',
  ];

  for (const f of files) {
    log(`\n${'#'.repeat(30)}\n[INFO] Processing URLs in file ${f}...`);
    await processFile(f);
  }

  expect(failures).toBe(0);
});
