const { test } = require('@playwright/test');
const fs = require('node:fs');
const readLine = require('node:readline');
const events = require('node:events');
const needle = require('needle');
const util = require('util');
import { RateLimiter } from "limiter";

test("Test to make sure all old pages with canonical are removed from indexing and following", async () => {
  const log = s => console.log(`${s}`);
  const WIP = 'wip', DONE = 'done', ERROR = 'error';
  const urlMap = new Map();
  const isFullReport = process.env.FULL_REPORT ? process.env.FULL_REPORT === 'true' : false;
  const metaRegex = /<meta name=["']robots["'][ \t]+content=["']([\w,; -]+)["']\/?>/gi;
  const rateLimit = process.env.RATE_LIMIT ? process.env.RATE_LIMIT.split('/') : ['500', 'minute'];
  const limiter = new RateLimiter({ 
    tokensPerInterval: Number(rateLimit[0]),
    interval: rateLimit[1],
  });

  let totalRequestCnt = 0;
  let totalRobotHdrMissing = 0;
  let totalErrors = 0;
  let totalRetryAfter = 0;

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
        totalErrors++;
        urlMap.set(url,{ status: ERROR, err, statusCode: err?.response?.statusCode });
        return;
      }
      if (resp.statusCode === 429) {
        const delay = parseRetryAfter(resp.headers, 60000);
        totalRetryAfter++;
        setTimeout(doRateLimitedRequest, delay, url);
        return;
      }
      const bd = [];
      const hdr = resp.headers['x-robots-tag'];
      if (typeof hdr === 'string') {
        bd.push(`x: ${hdr}`);
      } else if (Array.isArray(hdr)) {
        bd.push(...(hdr.map(e => `x: ${e}`)));
      }
      if (bd.length === 0) {
        totalRobotHdrMissing++;
        // leaving this log here, because it seems to be a bug on the netlify side where,
        // under stress / rate limiting conditions, you will occasionally see
        // a 200 response with no bot tag header, but manual inspection later
        // ALWAYS shows that the 'x-robots-tag' is there!
        // The 'x-robots-tag' is a custom header configured in netlify _headers.
        log(`x-robots-tag is missing: ${url} (${resp?.statusCode}) '${JSON.stringify(resp?.headers)}'`);
      }
      const matches = resp.body.toString().matchAll(metaRegex);
      for (const match of matches) {
        bd.push(`m: ${match[1]}`);
      }
      urlMap.set(url, { status: DONE, directives: bd, statusCode: resp.statusCode });
    });
  }


  const sleep = ms => new Promise(r => setTimeout(r, ms));
  function countStatus(s) {
    let cnt = 0;
    urlMap.forEach((v, k) => { if (v.status === s) ++cnt; })
    return cnt;
  }

  async function doRateLimitedRequest(url, status = WIP) {
    await limiter.removeTokens(1);
    if (++totalRequestCnt % 500 === 0) {
      const errCnt = countStatus(ERROR);
      log(`Rate limit stats: ${totalRequestCnt} total requests - ${errCnt} current error count`)
    }
    urlMap.set(url, {status});
    get(url);
  }

  async function processFile(filePath) {
    urlMap.clear();
    const lineReader = readLine.createInterface({
      input: fs.createReadStream(filePath)
    });

    log(`Rate limiting: ${rateLimit[0]} requests per ${rateLimit[1]}`);

    lineReader.on('line', async (line) => {
      const url = line.trim();
      if (url.startsWith('#') || url === '') return;
      await doRateLimitedRequest(url);
    });

    await events.once(lineReader, 'close');

    while (true) {
      const cnt = countStatus(WIP);
      if (cnt <= 0) break;
      log(`Waiting to finish: ${cnt} in-progress, ${totalErrors} total errors, ${totalRobotHdrMissing} total bot hdr missing, ${totalRetryAfter} retry-after requests`);
      await sleep(10000);
    }

    let retryErrorIter = 0;
    while (true) {
      if (++retryErrorIter > 1080) { // 3 hrs
        log(`ERROR: waited too long for errors to complete - exiting now`);
        break;
      }
      const cnt = countStatus(ERROR);
      if (cnt <= 0) break;
      for (const url of urlMap.keys()) {
        const e = urlMap.get(url);
        if (e.status === ERROR) {
          await doRateLimitedRequest(url, ERROR);
        }
      }
      log(`Retrying ${cnt} error(s), ${totalErrors} total errors, ${totalRobotHdrMissing} total bot hdr missing, ${totalRetryAfter} retry-after requests`);
      await sleep(10000);  // 10 sec
    }

    if (isFullReport) {
      log("\n[INFO] Full Reporting is ON");
    } else {
      log("\n[INFO] Reporting on errors or missing bot directives");
    }

    let reported = 0;
    const report = (v, k) => {
      reported++;
      console.log(`${k} (${v.statusCode})\n--> ${v.directives.join(', ')}\n`);
    }

    urlMap.forEach((v, k) => {
      if (isFullReport || v.statusCode !== 200) {
        report(v, k);
      } else {
        let noIndex = false, noFollow = false;
        for (const bd of v.directives) {
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
