const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const readLine = require('node:readline');
const events = require('node:events');
const url = require('node:url');
const axios = require('axios')

test("Test old site to new site redirects", async () => {
  const WIP = 'wip', DONE = 'done', ERROR = 'error';
  const urlMap = new Map();
  const isFullReport = process.env.FULL_REPORT ? process.env.FULL_REPORT === 'true' : false;
  const ax = axios.create({ maxRedirects: 0 });

  function get(origin, url) {
    const ctx = urlMap.get(origin);
    return ax.get(url)
      .then(resp => {
        ctx.path.push({url, code: resp.status});
        urlMap.set(origin, {status: DONE, path: ctx.path});
      })
      .catch(err => {
        ctx.path.push({url, code: err.response.status});
        if (err.response.status === 301 || err.response.status === 302) {
          let rl = err.response.headers.get('location');
          if (!rl.startsWith('http')) rl = `${new URL(url).origin}${rl}`;
          return get(origin, rl);
        } else if (err.response.status !== 404) {
          urlMap.set(origin, {status: ERROR, path: ctx.path});
          console.log(`[WARN] url: ${url} received an unexpected http response: ${err.response.status}`);
        } else {
          urlMap.set(origin, {status: DONE, path: ctx.path});
        }
      });
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  async function processFile(filePath) {
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

    lineMap.forEach((v,url) => {
      urlMap.set(url, {status: WIP, path: []});
      return get(url, url);
    });

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
