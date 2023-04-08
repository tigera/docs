const { test, expect } = require('@playwright/test');
const {
  CheerioCrawler,
  downloadListOfUrls,
  extractUrls,
  EnqueueStrategy,
  Configuration,
} = require('crawlee');
import {decode} from 'html-entities';
const linkChecker = require('../src/utils/linkChecker');
import YAML from 'yaml';
import needle from 'needle';

test("Crawl the docs and execute tests", async () => {
  const PASS = 'pass', FAIL = 'fail';
  const PROD = 'https://docs.tigera.io'
  const PROD_REGEX = /^https:\/\/docs\.tigera\.io/;
  const DOCS = (process.env.DOCS_HOST ? process.env.DOCS_HOST : PROD).trim()
      .toLowerCase().replace(/\/$/, '');
  const isLocalHost = /^http:\/\/localhost(:\d+)?$/i.test(DOCS);
  const validityTests = process.env.VALIDITY_TESTS ? process.env.VALIDITY_TESTS.split(',') : [];
  const validityTestFiles = process.env.VALIDITY_TEST_FILES ? process.env.VALIDITY_TEST_FILES==='true' : false;
  const isDeepCrawl = process.env.DEEP_CRAWL ? process.env.DEEP_CRAWL==='true' : false;
  const fileInspect = /https?:\/\/(installer\.calicocloud\.io|downloads\.tigera\.io|raw\.githubusercontent\.com\/projectcalico)\/[-a-zA-Z0-9()@:%._+~#?&/=]+?\.(ya?ml|ps1|sh|bat|json)/gi;
  const fileRegex = /https?:\/\/[-a-zA-Z0-9()@:%._+~#?&/=]+?\.(ya?ml|zip|ps1|tgz|sh|exe|bat|json)/gi;
  const SITEMAP = 'sitemap.xml';
  const SITEMAP_URL = `${DOCS}/${SITEMAP}`;
  const USE_LC = [
    { regex: fileInspect, processContent: true},
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
    'http://dpdk.org/git/dpdk', //==>Origin: https://raw.githubusercontent.com/projectcalico/vpp-dataplane/master/scripts/init_eks.sh
    'http://dpdk.org/git/dpdk-kmods', //==>Origin: https://raw.githubusercontent.com/projectcalico/vpp-dataplane/master/scripts/init_eks.sh
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
    'https://downloads.tigera.io/ee/master/download/binaries/master/calicoctl-darwin-amd64', //==>Origin: http://localhost:4242/calico-enterprise/next/operations/clis/calicoctl/install
    'https://downloads.tigera.io/ee/master/download/binaries/master/calicoctl-windows-amd64.exe', //==>Origin: http://localhost:4242/calico-enterprise/next/operations/clis/calicoctl/install
    'http://www.iana.org/assignments/service-names', //==>Origin: https://downloads.tigera.io/ee/v3.14.4/manifests/tigera-operator.yaml
    'https://downloads.tigera.io/ee/master/manifests/threatdef/honeypod/psp-honeypod.yaml',
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
  const validityTestResults = new Map();


  function cheerioCrawler() {
    return new CheerioCrawler({
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

        testCodeBlocks($, request.url);

        await enqueueLinks({
          strategy: EnqueueStrategy.All,
          transformRequestFunction: transformRequest,
          userData: {origin: request.url},
        });
      },
    });
  }

  function testCodeBlocks($, origin) {
    validityTests.forEach(type => {
      testCodeBlocksByType($, origin, type);
    });
  }

  function testCodeBlocksByType($, origin, type) {
    const codeBlocks = $(`pre.language-${type} code`);
    for (let idxBlock = 0; idxBlock < codeBlocks.length; idxBlock++) {
      const codeLines = [];
      const lines = $(codeBlocks[idxBlock]).find('span.token-line');
      for (let idxLine = 0; idxLine < lines.length; idxLine++) {
        const line = $(lines[idxLine]).text();
        codeLines.push(line);
      }
      if (codeLines.length === 0) {
        console.warn(`[WARNING] An empty code block exists in ${origin}`);
        continue;
      }
      const code = codeLines.join('\n');
      testValidity(type, origin, code);
    }
  }

  function testValidity(type, origin, code) {
    const yamlParseOptions = {strict: false};
    try {
      switch (type) {
        case 'yaml':
          const errs = [];
          const docs = YAML.parseAllDocuments(code, yamlParseOptions);
          for (const doc of docs) {
            doc.errors.forEach(e => { errs.push(e.message) });
          }
          if (errs.length > 0) {
            const err = new Error(errs.join('\n'));
            logAndPrintValidityError(origin, type, code, err);
          }
          break;
        case 'json':
          JSON.parse(code); break;
      }
      addValidityTestResult(origin, type, PASS);
    } catch (err) {
      logAndPrintValidityError(origin, type, code, err);
    }
  }

  function logAndPrintValidityError(origin, type, code, err) {
    addValidityTestResult(origin, type, FAIL);
    console.error(`[ERROR] validity error (${type}) in ${origin} :\n${err.message}`);
    console.error(`\`\`\`${type}`);
    console.error(`${code}`);
    console.error(`\`\`\`\n`);
  }

  function addValidityTestResult(origin, type, result) {
    const existing = validityTestResults.get(origin);
    if (existing) {
      existing.push({type, result});
    } else {
      validityTestResults.set(origin, [{type, result}]);
    }
  }

  function getCrawler() {
    return cheerioCrawler();
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
      if (validityTestFiles) {
        validityTests.forEach(vt => {
          const re = vt === 'yaml' ? new RegExp('\.ya?ml$') : new RegExp(/\.json$/);
          if (!re.test(url)) return;
          needle.request('get', url, null, {}, (err, resp) => {
            if (!err && resp.statusCode === 200) {
              testValidity(vt, url, resp.body);
            }
          });
        });
      }
    }
  }

  const crawler = getCrawler();
  await processSiteMap(SITEMAP_URL);
  const urls = [...urlCache.keys()].filter(url => !url.endsWith(SITEMAP));
  await crawler.addRequests([DOCS]);
  await crawler.addRequests(urls);

  console.log(`Crawling the docs (${DOCS}) and executing tests.`);
  console.log(`Localhost mode is ${isLocalHost ? 'ON' : 'OFF'}.`);
  console.log(`Validity tests enabled: ${validityTests.length ? validityTests.join(',') : 'none'}`);
  console.log(`Validity test files: ${validityTestFiles ? 'enabled' : 'disabled'}`);
  console.log(`To enable validity tests use env var VALIDITY_TESTS= json | yaml | json,yaml`);
  console.log(`To enable validity tests on files use env var VALIDITY_TEST_FILES=true`);
  await crawler.run();
  console.log(`Performing all post-processing steps`);
  await doPostProcessing();
  console.log(`Waiting on all remaining link checks to complete`);
  const cnt = await lc.wait();
  console.log(`Retrying all remaining errors`);
  lc.retryErrors();
  const success = await lc.report();

  const allErrors = lc.errorCount() + lc.deadCount();
  if (allErrors > 0) {
    console.error(`[ERROR] The crawler tests failed due to error / dead links`);
  }

  let passCount = 0, failCount = 0;
  validityTestResults.forEach((v, k) => {
    v.forEach(e => {
      if (e.result === PASS) passCount++;
      if (e.result === FAIL) failCount++;
    });
  });
  console.log(`\n\nCode block testing results: pass: ${passCount}, fail: ${failCount}`)
  if (failCount > 0) {
    console.error(`[ERROR] The crawler tests failed due to code block validation errors - check the logs above for details`);
  }

  expect(allErrors).toBe(0);
  expect(failCount).toBe(0);
});
