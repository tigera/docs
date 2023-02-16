const { test, expect } = require('@playwright/test');
const http = require('node:http');
const https = require('node:https');
const fs = require('node:fs');
const readLine = require('node:readline');
const events = require('node:events');
const url = require('node:url');

test("Test old site to new site redirects", async () => {
  const WIP = 'wip', DONE = 'done', ERROR = 'error';
  const urlMap = new Map();
  const isFullReport = process.env.FULL_REPORT ? process.env.FULL_REPORT === 'true' : false;

  function responseHandler(origin, url, resp) {
    const ctx = urlMap.get(origin);
    ctx.path.push({url, code: resp.statusCode});
    if (resp.statusCode === 301 || resp.statusCode === 302) {
      let rl = resp.headers.location;
      if (!rl.startsWith('http')) rl = `${new URL(url).origin}${rl}`;
      return get(origin, rl);
    } else if (resp.statusCode !== 200 && resp.statusCode !== 404) {
      console.log(`[WARN] url: ${url} received an unexpected http response: ${resp.statusCode}`);
    }

    resp.on('error', (err) => {
      console.error(`[ERROR] error: ${err}`);
    });

    // 'end' event will not fire without a listener on the data event!
    resp.on('data', () => {})

    resp.on('end', () => {
      urlMap.set(origin, {status: DONE, path: ctx.path});
    });
  }

  async function get(origin, url) {
    if (url.startsWith('https')) {
      await https.get(url, (resp) => {
        responseHandler(origin, url, resp);
      });
      } else {
      await http.get(url, (resp) => {
        responseHandler(origin, url, resp);
      });
    }
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  async function processFile(filePath) {
    const lineReader = readLine.createInterface({
      input: fs.createReadStream(filePath)
    });
    lineReader.on('line', async function (url) {
      const u = url.trim();
      if (u.startsWith('#') || u === '') return;
      urlMap.set(u, {status: WIP, path: []});
      return await get(u, u);
    });

    await events.once(lineReader, 'close');

    while (true) {
      let cnt = 0;
      urlMap.forEach((v, k) => {if (v.status === WIP) cnt++;});
      if (cnt <= 0) break;
      console.log(`Waiting to finish: ${cnt} remaining...`);
      await sleep(5000);
    }

    if (isFullReport) {
      console.info("\n[INFO] Full Reporting is ON");
    } else {
      console.info("\n[INFO] Reporting errors, 404s, and non-redirects");
    }
    urlMap.forEach((v,k) => {
      let cnt = 0, lastCode = 0, lastUrl = '';
      let out = [];
      for (const {url, code} of v.path) {
        lastUrl = url;
        lastCode = code;
        out[out.length] = `${cnt++ > 0 ? '==>' : ''}URL: ${url} --> ${code}`;
      }
      const badCode = lastCode !== 200 && lastCode !== 0;
      const badUrl = !lastUrl.startsWith('https://docs.tigera.io') && lastUrl !== '';
      // const diffPath = !lastUrl.endsWith(new URL(k).pathname);
      if (isFullReport || badCode || badUrl) {
        console.log('');
        for (const l of out) { console.log(l); }
      }
    });
  }

  const files = [
    '__tests__/urls_docs.calicocloud.io.txt',
    '__tests__/urls_projectcalico.docs.tigera.io.txt',
    '__tests__/urls_docs.projectcalico.org.txt',
  ];

  for (const f of files) {
    console.info(`\n\n[INFO] Processing URLs in file ${f}...`);
    await processFile(f);
    urlMap.clear();
  }
});
