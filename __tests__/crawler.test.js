const { test, expect } = require('@playwright/test');
const {
  PlaywrightCrawler,
  CheerioCrawler,
  downloadListOfUrls,
  extractUrls,
  EnqueueStrategy,
  Configuration,
} = require('crawlee');
import {decode} from 'html-entities';
const linkChecker = require('../src/utils/linkChecker');

test("Crawl the docs and test links", async () => {
  const PROD = 'https://docs.tigera.io'
  const PROD_REGEX = /^https:\/\/docs\.tigera\.io/;
  const DOCS = (process.env.DOCS_HOST ? process.env.DOCS_HOST : PROD).trim()
      .toLowerCase().replace(/\/$/, '');
  const isLocalHost = /^http:\/\/localhost(:\d+)?$/i.test(DOCS);
  const isDeepCrawl = process.env.DEEP_CRAWL ? (process.env.DEEP_CRAWL==='true') : false;
  const CONCURRENCY = process.env.CONCURRENCY ? Number(process.env.CONCURRENCY) : 50;
  const fileSearch = /https?:\/\/(installer\.calicocloud\.io|downloads\.tigera\.io|raw\.githubusercontent\.com\/projectcalico)\/[-a-zA-Z0-9()@:%._+~#?&/=]+?\.(ya?ml|ps1|sh|bat|json)/gi;
  const fileRegex = /https?:\/\/[-a-zA-Z0-9()@:%._+~#?&/=]+?\.(ya?ml|zip|ps1|tgz|sh|exe|bat|json)/gi;
  const SITEMAP = 'sitemap.xml';
  const SITEMAP_URL = `${DOCS}/${SITEMAP}`;
  const USE_LC = [
    { regex: fileSearch, processContent: true},
    { regex: fileRegex, processContent: false},
    { regex: /\/reference\/legal\/[\w-]+$/i, processContent: true },
    { regex: /\/calico-cloud\/get-help\/support$/i, processContent: true },
    { regex: /\/calico-cloud\/get-started\/connect\/connect-cluster$/i, processContent: true },
  ];
  const skipList = [
    /^https?:\/\/([\w-]+\.)?example\.com/,
    /^https:\/\/kubernetes\.io\/docs\/reference\/generated\/kubernetes-api\/v1\.18/i,
    /^https:\/\/v1-(15|16|17|18)\.docs\.kubernetes\.io\/docs\/reference\/generated\/kubernetes-api\/v1\.(15|16|17|18)/i,
    /^https:\/\/github\.com\/projectcalico\/calico\/tree\/master\/[\w/.-]+\.md$/i,
    /^https:\/\/www\.linkedin\.com\/company\/tigera\/?$/,
    'http://etcd.co',
    'https://success.docker.com/article/docker-ee-best-practices',
    `https://installer.calicocloud.io/`,
    `https://installer.calicocloud.io/charts`,
    `https://docs.tigera.io/calico/charts`,
    `https://github.com/projectcalico/calico/releases/download/master/ocp.tgz`,
    `https://downloads.tigera.io/ee/master/download/binaries/master/calicoctl`,
    `https://github.com/projectcalico/calico/releases/download/master/install-calico-windows.ps1`,
    `https://downloads.tigera.io/ee/master/download/binaries/master/calicoq`,
    `https://en.wikipedia.org/wiki/Autonomous_System_(Internet)%3E`,
    `https://installer.calicocloud.io/manifests/v3.15.1-8/manifests`,
    `https://d881b853ae312e00302a84f1e346a77.gr7.us-west-2.eks.amazonaws.com`,
    `https://www.googletagmanager.com`,
    'https://csrc.nist.gov/publications/detail/fips/140/2/final',
    /^https?:\/\/csrc\.nist\.gov\/projects\/cryptographic-module-validation-program\/certificate\/\d+$/,
    /^https:\/\/installer\.calicocloud\.io:[0-9]{3,4}$/,
    'https://help.ubuntu.com/community/NetworkManager', //==>Origin: http://localhost:4242/calico-enterprise/3.14/operations/troubleshoot/troubleshooting
    //For frustrating 503 errors:
    'https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator',
    //temp
    'https://stedolan.github.io/jq/',
    `http://kubernetes.io/docs/user-guide/secrets/`,
    `https://github.com/coreos/flannel/blob/master/Documentation/kube-flannel-rbac.yml`,
    `https://kubernetes.io/docs/tasks/access-application-cluster/configure-cloud-provider-firewall/`,
    `https://raw.githubusercontent.com/projectcalico/calico//node/windows-packaging/CalicoWindows/kubernetes/kube-proxy-service.ps1`,
    `https://projectcalico.docs.tigera.io/master/reference/installation/api#operator.tigera.io/v1.APIServer`,
    `https://projectcalico.docs.tigera.io/master/reference/installation/api#operator.tigera.io/v1.Installation`,
    'http://dpdk.org/git/dpdk', //==>Origin: https://raw.githubusercontent.com/projectcalico/vpp-dataplane/master/scripts/init_eks.sh
    'http://dpdk.org/git/dpdk-kmods', //==>Origin: https://raw.githubusercontent.com/projectcalico/vpp-dataplane/master/scripts/init_eks.sh
    'https://downloads.tigera.io/ee/master/download/binaries/master/calicoctl-darwin-amd64', //==>Origin: http://localhost:4242/calico-enterprise/next/operations/clis/calicoctl/install
    'https://downloads.tigera.io/ee/master/download/binaries/master/calicoctl-windows-amd64.exe', //==>Origin: http://localhost:4242/calico-enterprise/next/operations/clis/calicoctl/install
    'http://www.iana.org/assignments/service-names', //==>Origin: https://downloads.tigera.io/ee/v3.14.4/manifests/tigera-operator.yaml
  ];

  const lc = linkChecker();
  if (isLocalHost) lc.setLocalhost(DOCS);
  lc.setSkipList([...lc.getSkipList(), ...skipList]);
  if (process.env.CI === 'true') {
    Configuration.getGlobalConfig().set('availableMemoryRatio', 0.75);
  } else {
    Configuration.getGlobalConfig().set('availableMemoryRatio', 0.5);
  }
  let postProcessUrls = new Map();
  const urlCache = new Map();

  function getPlaywrightCrawler() {
    return new PlaywrightCrawler({
      navigationTimeoutSecs: 120,
      maxConcurrency: CONCURRENCY,
      // Use the requestHandler to process each of the crawled pages.
      async requestHandler({ request, page, enqueueLinks, log }) {
        if (request.skipNavigation) return;
        const allText = await page.locator('body').innerText();
        const urls = extractUrls({string: allText, urlRegExp: lc.getLinkRegex()[0]});
        for (const url of urls){
          checkAndUseLinkChecker(page.url(), url);
        }
        await enqueueLinks({
          strategy: EnqueueStrategy.All,
          transformRequestFunction: transformRequest,
          userData: {origin: page.url()},
        });
      },
    });
  }

  function getCheerioCrawler() {
    return new CheerioCrawler({
      // Use the requestHandler to process each of the crawled pages.
      async requestHandler({ request, $, enqueueLinks, log }) {
        if (request.skipNavigation) return;
        const allText = decode($.html());
        const urls = extractUrls({string: allText, urlRegExp: lc.getLinkRegex()[0]});
        for (let url of urls) {
          if (isLocalHost) {
            const testUrl = url.replace(PROD_REGEX, `${DOCS}`);
            if (request.url === testUrl) url = testUrl;
          }
          checkAndUseLinkChecker(request.url, url);
        }
        await enqueueLinks({
          strategy: EnqueueStrategy.All,
          transformRequestFunction: transformRequest,
          userData: {origin: request.url},
        });
      },
      // async errorHandler(context, error) {
      //   console.error(`[ERROR] Playwright request error for url: ${context.request.url} --- error: ${error}`);
      // },
      // async failedRequestHandler(context, error) {
      //   console.error(`[ERROR] Playwright request failed with errors for url: ${context.request.url} --- last error: ${error}`);
      // },
    });
  }

  function getCrawler() {
    if (process.env.PLAYWRIGHT) {
      return getPlaywrightCrawler();
    }
    return getCheerioCrawler();
  }

  function transformRequest(requestOptions) {
    if (checkAndUseLinkChecker(requestOptions.userData.origin, requestOptions.url)) {
      requestOptions.skipNavigation = true;
    }
    return requestOptions;
  }

  function checkAndUseLinkChecker(origin, url) {
    const useLinkChecker = (u, p) => {
      lc.process(origin, u);
      if (p) postProcessUrls.set(u, null);
      return true;
    }

    // if it matches any in the regex list, use linkChecker
    for (const o of USE_LC) {
      if (o.regex.test(url)) return useLinkChecker(url, o.processContent);
    }

    // if it's external, use linkChecker
    if (isDeepCrawl) {
      if (isLocalHost && !url.startsWith(DOCS) && !url.startsWith(PROD)) {
        return useLinkChecker(url, false);
      } else if (!isLocalHost && !url.startsWith(DOCS)) {
        return useLinkChecker(url, false);
      }
    } else {
      if (!url.startsWith(DOCS)) {
        return useLinkChecker(url, false);
      }
    }
    return false;
  }

  async function processSiteMap(siteMapUrl) {
    const urls = await downloadListOfUrls({ url: siteMapUrl });
    for (let url of urls) {
      if (isLocalHost) url = url.replace(PROD, DOCS);
      if (!url.startsWith(DOCS)) continue;
      if (checkAndUseLinkChecker(siteMapUrl, url)) {
        continue;
      }
      if (urlCache.has(url)) continue;
      urlCache.set(url, null);
      if (url.endsWith(SITEMAP)) {
        await processSiteMap(url);
      }
    }
  }

  async function doPostProcessing() {
    const opts = { url: '', urlRegExp: lc.getLinkRegex()[0]};
    for (const url of postProcessUrls.keys()) {
      opts.url = url;
      const urls = await downloadListOfUrls(opts);
      for (const u of urls) {
        lc.process(url, u);
      }
    }
  }

  const crawler = getCrawler();
  await processSiteMap(SITEMAP_URL);
  const urls = [...urlCache.keys()].filter(url => !url.endsWith(SITEMAP));
  await crawler.addRequests([DOCS]);
  await crawler.addRequests(urls);

  console.log(`Crawling the docs (${DOCS}) and testing links.`);
  console.log(`Localhost mode is ${isLocalHost ? 'ON' : 'OFF'}.`)
  await crawler.run()
  console.log(`Performing all post-processing steps`);
  await doPostProcessing();
  console.log(`Waiting on all remaining link checks to complete`);
  const cnt = await lc.wait();
  console.log(`Retrying all remaining errors`);
  lc.retryErrors();
  console.log(`Writing the final report.`);
  const success = await lc.report();

  const allErrors = lc.errorCount() + lc.deadCount();
  expect(allErrors).toBe(0);
});