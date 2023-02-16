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

  function responseHandler(ctx, {origin, url}, resp, resolve, reject) {
    ctx.path.push({url, code: resp.statusCode});
    if (resp.statusCode === 301 || resp.statusCode === 302) {
      let rl = resp.headers.location;
      if (!rl.startsWith('http')) {
        rl = `${new URL(url).origin}${rl}`;
      }
      return get({origin, url: rl}, resolve, reject);
    } else if (resp.statusCode !== 200 && resp.statusCode !== 404) {
      console.log(`[WARN] url: ${url} received an unexpected http response: ${resp.statusCode}`);
    }

    resp.on('error', (err) => {
      console.error(`[ERROR] error: ${err}`);
    });

    // 'end' event will not fire without a listener on the data event!
    resp.on('data', () => {})

    resp.on('end', () => {
      try {
        urlMap.set(origin, {status: DONE, path: ctx.path});
        resolve(resp.statusCode);
      } catch (err) {
        urlMap.set(origin, {status: ERROR, path: ctx.path});
        console.error(`[ERROR] origin: ${origin}, err: ${err}`);
        reject(err);
      }
    });
  }

  async function get({origin, url}, resolve, reject) {
    const ctx = urlMap.get(origin);
    if (url.startsWith('https')) {
      await https.get(url, (resp) => {
        responseHandler(ctx, {origin, url}, resp, resolve, reject);
      });
    } else {
      await http.get(url, (resp) => {
        responseHandler(ctx, {origin,url}, resp, resolve, reject);
      });
    }
  }

  async function getData(url) {
    urlMap.set(url, {status: WIP, path: []});
    return new Promise((resolve, reject) =>
      get({origin: url, url}, resolve, reject));
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  async function main(filePath) {
    const lineReader = readLine.createInterface({
      input: fs.createReadStream(filePath)
    });
    lineReader.on('line', function (url) {
      getData(url);
    });

    await events.once(lineReader, 'close');

    while (true) {
      let cnt = 0;
      urlMap.forEach((v, k) => {if (v.status === WIP) cnt++;});
      if (cnt <= 0) break;
      console.log(`Waiting to finish: ${cnt} remaining...`);
      await sleep(5000);
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
      if (badCode || badUrl) {
        console.log('');
        for (const l of out) { console.log(l); }
      }
    });
  }

  const files = [
    '__tests__/urls_projectcalico.docs.tigera.io.txt',
    '__tests__/urls_docs.projectcalico.org.txt',
  ];

  for (const f of files) {
    console.info(`\n\n[INFO] Processing URLs in file ${f}...`);
    await main(f);
    urlMap.clear();
  }
});
