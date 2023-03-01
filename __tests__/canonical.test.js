const { test } = require('@playwright/test');
const fs = require('node:fs');
const readLine = require('node:readline');
const events = require('node:events');
const needle = require('needle');
const util = require('util');
import { RateLimiter } from "limiter";
const limiter = new RateLimiter({ tokensPerInterval: 500, interval: 'minute' });

test("Test to make sure all old pages with canonical are removed from indexing and following", async () => {
  const log = s => console.log(`${s}`);
  const WIP = 'wip', DONE = 'done', ERROR = 'error';
  const urlMap = new Map();
  const isFullReport = process.env.FULL_REPORT ? process.env.FULL_REPORT === 'true' : false;
  const metaRegex = /<meta name=["']robots["'][ \t]+content=["']([\w,; -]+)["']\/?>/gi;

  function parseRetryAfter(headers, defValue) {
    let hdrVal = '';
    try {
      if (!headers) return defValue;
      hdrVal = headers.hasOwnProperty('retry-after')
        ? headers['retry-after'].trim() : '';
      if (hdrVal === '') return defValue;
      return parseFloat(hdrVal) * 1000;
    } catch (err) {
      console.error(`Error parsing 'retry-after' header '${hdrVal}': ${err}`)
      return defValue;
    }
  }

  function get(url) {
    needle.request('get', url, null, {follow_max: 10}, (err, resp) => {
      if (err) {
        urlMap.set(url,{ status: ERROR, err, statusCode: err?.response?.statusCode });
        return;
      }
      if (resp.statusCode === 429) {
        const delay = parseRetryAfter(resp.headers, 60000);
        log(`executing retry-after: ${url} (${resp?.statusCode}) '${JSON.stringify(resp?.headers)}'`);
        setTimeout(get, delay, url);
        return;
      }
      const bd = [];
      const hdr = resp.headers['x-robots-tag'];
      if (typeof hdr === 'string') {
        bd.push(`x: ${hdr}`);
      } else if (Array.isArray(hdr)) {
        bd.push(...(hdr.map(e => `x: ${e}`)));
      } else {
        log(`x-robots-tag is missing: ${url} (${resp?.statusCode}) '${JSON.stringify(resp?.headers)}'`);
      }
      const matches = resp.body.toString().matchAll(metaRegex);
      for (const match of matches) {
        bd.push(`m: ${match[1]}`);
      }
      urlMap.set(url, { status: DONE, botDirectives: bd, statusCode: resp.statusCode });
    });
  }


  const sleep = ms => new Promise(r => setTimeout(r, ms));
  function countStatus(s) {
    let cnt = 0;
    urlMap.forEach((v, k) => { if (v.status === s) ++cnt; })
    return cnt;
  }

  async function processFile(filePath) {
    urlMap.clear();
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

    let requestCnt = 0;
    const doRateLimitedRequest = async url => {
      await limiter.removeTokens(1);
      if (++requestCnt % 500 === 0) {
        const errCnt = countStatus(ERROR);
        log(`Rate limit stats: ${requestCnt} total requests - ${errCnt} total errors`)
      }
      get(url);
    }

    for (const url of lineMap.keys()) {
      urlMap.set(url, {status: WIP});
      await doRateLimitedRequest(url);
    }

    while (true) {
      const cnt = countStatus(WIP);
      if (cnt <= 0) break;
      log(`Waiting to finish: ${cnt} remaining...`);
      await sleep(5000);
    }

    while (true) {
      const cnt = countStatus(ERROR);
      if (cnt <= 0) break;
      for (const url of urlMap.keys()) {
        const e = urlMap.get(url);
        if (e.status === ERROR) {
          urlMap.set(url, {status: ERROR});
          await doRateLimitedRequest(url);
        }
      }
      log(`Retrying ${cnt} error(s)...`);
      await sleep(10000);
    }

    if (isFullReport) {
      log("\n[INFO] Full Reporting is ON");
    } else {
      log("\n[INFO] Reporting on errors or missing bot directives");
    }

    let reported = 0;
    const report = (v, k) => {
      reported++;
      console.log(`${k} (${v.statusCode})\n--> ${v.botDirectives.join(', ')}\n`);
    }

    urlMap.forEach((v, k) => {
      if (isFullReport || v.statusCode !== 200) {
        report(v, k);
      } else {
        let noIndex = false, noFollow = false;
        for (const bd of v.botDirectives) {
          if (bd.startsWith('x:')) {
            if (bd.includes('noindex')) noIndex = true;
            if (bd.includes('nofollow')) noFollow = true;
          }
        }
        if (!noIndex || !noFollow) {
          report(v, k);
        }
      }
    });
    if (reported === 0) {
      log(`ALL GOOD! Nothing to report.`);
    }
  }

  const files = [
    '__tests__/urls_with_canonicals.txt',
  ];

  for (const f of files) {
    log(`\n${'#'.repeat(30)}\n[INFO] Processing URLs in file ${f}...`);
    await processFile(f);
  }
});
