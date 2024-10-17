const { test, expect } = require('@playwright/test');
const {
  CheerioCrawler,
  downloadListOfUrls,
  extractUrls,
  EnqueueStrategy,
  Configuration,
  sleep,
} = require('crawlee');
import {decode} from 'html-entities';
const linkChecker = require('../src/utils/linkChecker');
import YAML from 'yaml';
import needle from 'needle';

test("Crawl the docs and execute tests", async () => {
  const PASS = 'pass', FAIL = 'fail', WIP = 'wip', DONE = 'done';
  const PROD = 'https://docs.tigera.io'
  const PROD_REGEX = /^https:\/\/docs\.tigera\.io/;
  const DOCS = (process.env.DOCS_HOST ? process.env.DOCS_HOST : PROD).trim()
      .toLowerCase().replace(/\/$/, '');
  const isLocalHost = /^http:\/\/localhost(:\d+)?$/i.test(DOCS);
  const validityTest = process.env.VALIDITY_TEST ? process.env.VALIDITY_TEST.split(',') : [];
  const validityTestFiles = process.env.VALIDITY_TEST_FILES ? process.env.VALIDITY_TEST_FILES.split(',') : [];
  const isDeepCrawl = process.env.DEEP_CRAWL ? process.env.DEEP_CRAWL==='true' : false;
  const fileRegex = /https?:\/\/[-a-zA-Z0-9()@:%._+~#?&/=]+?\.(ya?ml|zip|ps1|tgz|sh|exe|bat|json)/gi;
  const varRegex = /\{\{[ \t]*[-\w\[\]]+[ \t]*}}/g;
  const varSkipList = [
    '{{end}}',
  ];
  const liquidRegex = /\{%.*?%}/gs;
  const liquidSkipList = [];
  const SITEMAP = 'sitemap.xml';
  const SITEMAP_URL = `${DOCS}/${SITEMAP}`;
  const USE_LC = [
    { regex: inspectFilesRegExp(), processContent: true},
    { regex: fileRegex, processContent: false},
    { regex: /\/reference\/legal\/[\w-]+$/i, processContent: true },
    { regex: /\/calico-cloud\/get-help\/support$/i, processContent: true },
    { regex: /\/calico-cloud\/get-started\/connect\/connect-cluster$/i, processContent: true },
  ];
  const skipOriginsForLC = [
    // All origins to skip link checking (literal or regex)
    // Examples:
    // /\/reference\/legal\/felix$/,
    // 'http://localhost:4242/calico/3.24/reference/legal/felix',

    // Skip this license attribution file, since we need to include the text of licenses unmodified,
    // and some have dead links
    'http://localhost:4242/calico/3.24/reference/legal/projectcalico',
    'http://localhost:4242/calico/3.25/reference/legal/projectcalico',
    'http://localhost:4242/calico/3.26/reference/legal/projectcalico',
    'http://localhost:4242/calico/latest/reference/legal/projectcalico',
    'http://localhost:4242/calico/next/reference/legal/projectcalico',
    'http://localhost:4242/calico/3.25/reference/legal/node',
  ];
  const skipList = [
    /^https?:\/\/([\w-]+\.)?example\.com/,
    /^https:\/\/kubernetes\.io\/docs\/reference\/generated\/kubernetes-api\/v1\.18/i,
    /^https:\/\/v1-(15|16|17|18)\.docs\.kubernetes\.io\/docs\/reference\/generated\/kubernetes-api\/v1\.(15|16|17|18)/i,
    /^https:\/\/github\.com\/projectcalico\/calico\/tree\/master\/[\w/.-]+\.md$/i,
    /^https:\/\/www\.linkedin\.com\/company\/tigera\/?$/,
    /^https:\/\/installer\.calicocloud\.io\/manifests\/.+\/manifests/,
    'http://etcd.co',
    'https://www.tigera.io/project-calico/community',
    'https://openid.net/connect/',
    'https://fedoraproject.org/wiki/EPEL',
    'http://kubernetes.io/docs/user-guide/identifiers#names',
    'http://kubernetes.io/docs/user-guide/volumes#emptydir',
    'http://kubernetes.io/docs/user-guide/labels',
    'https://nvd.nist.gov/vuln/detail/CVE-2017-5638',
    'http://kubernetes.io/docs/user-guide/images#specifying-imagepullsecrets-on-a-pod',
    'http://kubernetes.io/docs/user-guide/annotations',
    'https://git.io/getLatestIstio',
    'https://sns.us-east-2.amazonaws.com',
    'https://success.docker.com/article/docker-ee-best-practices',
    `https://installer.calicocloud.io/`,
    `https://installer.calicocloud.io/charts`,
    `https://docs.tigera.io/calico/charts`,
    'https://Q4GSZWRKBA-dsn.algolia.net',
    'http://backend.stars:6379/status',
    'http://client.client:9000/status',
    'http://frontend.stars:80/status',
    `https://github.com/projectcalico/calico/releases/download/master/ocp.tgz`,
    `https://downloads.tigera.io/ee/master/download/binaries/master/calicoctl`,
    `https://github.com/projectcalico/calico/releases/download/master/install-calico-windows.ps1`,
    `https://downloads.tigera.io/ee/master/download/binaries/master/calicoq`,
    `https://en.wikipedia.org/wiki/Autonomous_System_(Internet)%3E`,
    //`https://installer.calicocloud.io/manifests/v3.15.1-8/manifests`,
    //`https://installer.calicocloud.io/manifests/v3.16.1-0/manifests`,
    //`https://installer.calicocloud.io/manifests/v3.16.1-5/manifests`,
    //`https://installer.calicocloud.io/manifests/v3.16.1-11/manifests`,
    //`https://installer.calicocloud.io/manifests/v3.17.1-0/manifests`,
    //`https://installer.calicocloud.io/manifests/v3.17.1-3/manifests`,
    //`https://installer.calicocloud.io/manifests/v3.17.1-4/manifests`,
    `https://d881b853ae312e00302a84f1e346a77.gr7.us-west-2.eks.amazonaws.com`,
    `https://www.googletagmanager.com`,
    'https://twitter.com/tigeraio',
    'https://twitter.com/projectcalico',
    'https://csrc.nist.gov/publications/detail/fips/140/2/final',
    /^https?:\/\/csrc\.nist\.gov\/projects\/cryptographic-module-validation-program\/certificate\/\d+$/,
    /^https:\/\/installer\.calicocloud\.io:[0-9]{3,4}$/,
    'https://help.ubuntu.com/community/NetworkManager', //==>Origin: http://localhost:4242/calico-enterprise/3.14/operations/troubleshoot/troubleshooting
    'http://dpdk.org/git/dpdk', //==>Origin: https://raw.githubusercontent.com/projectcalico/vpp-dataplane/master/scripts/init_eks.sh
    'http://dpdk.org/git/dpdk-kmods', //==>Origin: https://raw.githubusercontent.com/projectcalico/vpp-dataplane/master/scripts/init_eks.sh
    //For frustrating 503 errors:
    'https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator',
    //temp
    /^https:\/\/v1-21\.docs\.kubernetes\.io\/docs\/reference\/generated\/kubernetes-api\/v1\.21\//,
    'https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm',
    'https://www.iana.org/assignments/service-names',//==>Origin: https://downloads.tigera.io/ee/v3.15.2/manifests/tigera-operator.yaml'
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
    'http://docs.openstack.org/',
    'http://docs.openstack.org', //This seems to be temporarily down.
    'https://tools.ietf.org/html/rfc5925',
    'https://datatracker.ietf.org/doc/html/rfc1149',
    'https://datatracker.ietf.org/doc/html/rfc7938',
    'https://tools.ietf.org/html/rfc5890',
    'https://tools.ietf.org/html/rfc1123',
    'http://cr.yp.to/libtai/tai64.html#tai64n',
    'https://thenewstack.io/faster-troubleshooting-with-dynamic-packet-capture/', //==>Origin: http://localhost:4242/calico-cloud/visibility/packetcapture
    'https://golang.org/pkg/crypto/tls/#ClientAuthType', //==>Origin: https://downloads.tigera.io/ee/v3.17.0/manifests/tigera-prometheus-operator.yaml. The dead link is automatically redirected to a working page, so no fix needed in the origin.
    'https://downloads.tigera.io/ee/archives/release-master-master.tgz', //==> This started after redesigning the archive procedure.
    'http://nginx-svc.curl-ns.svc.cluster.local:80',
    'http://nginx-svc.service-ns.svc.cluster.local:80',
    'https://calicousers.slack.com/',
    'https://calicousers.slack.com/archives/C017220EXU1',
    'https://tigera-manager.mycompany.com',
    'https://kb.isc.org/article/AA-01141/31/How-to-workaround-IPv6-prefix-length-issues-with-ISC-DHCP-clients.html',
    'https://www.snort.org/documents',
    'https://www.snort.org/downloads/#rule-downloads',
    'https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-networking-on-azure/',
    'https://www.tigera.io/calico-support/',
    'https://www.tigera.io/legal/calico-cloud-support-policy',
    'https://www.tigera.io/tutorials/?_sf_s=Deploy%20Service%20Mesh',
    'https://www.projectcalico.org/comparing-kube-proxy-modes-iptables-or-ipvs/',
    'https://www.projectcalico.org/hands-on-with-calicos-ebpf-service-handling/',
    'https://www.tigera.io/blog/?_sft_post_tag=project-calico',
    'https://www.tigera.io/tutorials/?_sf_s=%27calico%20ebpf%20and%20xdp%27,',
    'https://www.tigera.io/tutorials/?_sf_s=Calico%20Basics',
    'https://www.tigera.io/tutorials/?_sf_s=WireGuard',
    'https://www.elastic.co/guide/en/apm/server/current/configuring-howto-apm-server.html',
    'https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html',
    /^https:\/\/www\.wireguard\.com\/.+/,
    'https://godoc.org/time#Duration',
    'https://www.tigera.io/contact',
    'https://www.projectcalico.org/contact',
    'https://hub.docker.com/_/microsoft-windows-servercore',
    'https://github.com/tigera/operator/blob/master/pkg/render/applicationlayer/modsec-core-ruleset/modsecdefault.conf',
    'https://github.com/tigera/operator/blob/master/pkg/render/applicationlayer/modsec-core-ruleset/crs-setup.conf',
    'https://github.com/tigera/operator/tree/master/pkg/render/applicationlayer/modsec-core-ruleset',
    'https://kubernetes.io/docs/setup/production-environment/tools/kops/#2-5-create-a-route53-domain-for-your-cluster',
    'https://pkgs.k8s.io/',
    'https://apt.kubernetes.io/',
    'https://docs.tigera.io/calico-enterprise/3.15/about-calico-enterprise',
    'https://your-jira-instance-name.atlassian.net/rest/api/2/issue/',
    'https://bugzilla.netfilter.org/show_bug.cgi?id=1119',
    'https://webexapis.com/v1/messages',
    'https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-ingress-networking/',
    'https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-networking-on-google-cloud/',
    'https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-pod-networking-on-aws/',
    'https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-services-networking/',
    'https://www.projectcalico.org/introducing-the-calico-ebpf-dataplane/',
    'https://www.projectcalico.org/kubernetes-service-ip-route-advertisement/',
    'https://www.projectcalico.org/live-migration-from-flannel-to-calico/',
    'https://www.projectcalico.org/why-bgp/',
    'https://www.tigera.io/blog/calico-ipam-explained-and-enhanced/',
    'https://www.tigera.io/blog/faster-troubleshooting-of-microservices-containers-and-kubernetes-with-dynamic-packet-capture/',
    'https://www.tigera.io/blog/hands-on-guide-how-to-scan-and-block-container-images-to-mitigate-sbom-attacks/',
    'https://www.tigera.io/blog/kubernetes-security-policy-10-critical-best-practices/',
    'https://www.tigera.io/blog/when-linux-conntrack-is-no-longer-your-friend/',
    'https://www.tigera.io/blog/why-bgp/',
    'https://docs.nginx.com/nginx-ingress-controller/configuration/',
    'https://docs.nginx.com/nginx-ingress-controller/configuration/global-configuration/configmap-resource',
    'https://prometheus.io/docs/prometheus/latest/disabled_features/', // ==>Origin: https://downloads.tigera.io/ee/v3.17.4/manifests/tigera-prometheus-operator.yaml
    'https://prometheus.io/docs/prometheus/latest/feature_flags/', // ==>Origin: https://downloads.tigera.io/ee/v3.20.0-1.0/manifests/tigera-prometheus-operator.yaml
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

  function inspectFilesRegExp() {
    const ext = '(ya?ml|ps1|sh|bat|json)';
    const domains = [
      'installer.calicocloud.io',
      'downloads.tigera.io',
      'raw.githubusercontent.com/projectcalico',
      'docs.tigera.io',
    ]
    if (isLocalHost) {
      domains.push(DOCS.replace(/^http:\/\//, ''));
    }
    const red = `(https?://${domains.join(`|https?://`)})`
      .replace('.', '\\.');
    const res = `${red}/[-a-zA-Z0-9()@:%._+~#?&/=]+?\\.${ext}`;
    return new RegExp(res, 'gi');
  }

  function cheerioCrawler() {
    return new CheerioCrawler({
      async requestHandler({ request, $, enqueueLinks, log }) {
        if (request.skipNavigation) return;
        const allText = decode($.html());
        const urls = extractUrls({string: allText, urlRegExp: lc.getLinkRegex()[0]});
        for (let url of urls) {
          if (isLocalHost) {
            const testUrl = url.replace(PROD_REGEX, DOCS);
            if (request.url === testUrl) url = testUrl;
          }
          checkAndUseLinkChecker(request.url, url);
        }

        testCodeBlocks($, request.url);

        testUnprocessedVariables(allText, request.url);

        testLiquid(allText, request.url);

        await enqueueLinks({
          strategy: EnqueueStrategy.All,
          transformRequestFunction: transformRequest,
          userData: {origin: request.url},
        });
      },
    });
  }

  function testUnprocessedVariables(allText, url) {
    // check for variables which have not been processed
    const found = new Map();
    const matches = allText.matchAll(varRegex);
    for (const match of [...matches]) {
      const key = match.toString();
      if (varSkipList.includes(key)) continue;
      if (found.has(key)) continue;
      found.set(key, true);
      console.error(`[ERROR] variable '${key}' exists in ${url}`);
    }
  }

  function testLiquid(allText, url) {
    // check for liquid template that may still exist (leftover from jekyll)
    const found = new Map();
    const matches = allText.matchAll(liquidRegex);
    for (const match of [...matches]) {
      const key = match.toString();
      if (liquidSkipList.includes(key)) continue;
      if (found.has(key)) continue;
      found.set(key, true);
      console.error(`[ERROR] liquid syntax '${key}' exists in ${url}`);
    }
  }

  function testCodeBlocks($, origin) {
    if (validityTest.length === 0) return;
    validityTest.forEach(type => {
      testCodeBlocksByType($, origin, type);
    });
  }

  function validityTestResultSetStatus(url, status) {
    const ctx = validityTestResults.get(url);
    if (!ctx && status === DONE) return;
    const results = ctx ? ctx.results : [];
    validityTestResults.set(url, {status, results});
  }

  function testCodeBlocksByType($, origin, type) {
    const bashEOF = type === 'bashEOF';
    const cbType = bashEOF ? 'bash' : type;
    const codeBlocks = $(`div[data-codeblock-validation="true"] pre.language-${cbType} code`);
    for (let idxBlock = 0; idxBlock < codeBlocks.length; idxBlock++) {
      try {
        if (bashEOF) {
          processCodeBlockEOF($, codeBlocks[idxBlock], origin);
        } else {
          processCodeBlock($, codeBlocks[idxBlock], type, origin);
        }
      } catch (err) {
        console.error(`[ERROR] an error occurred while validity testing code blocks: ${err.message}`);
      } finally {
        validityTestResultSetStatus(origin, DONE);
      }
    }
  }

  function processCodeBlock($, codeBlock, type, origin) {
    const codeLines = [];
    const lines = $(codeBlock).find('span.token-line');
    for (let idxLine = 0; idxLine < lines.length; idxLine++) {
      const line = $(lines[idxLine]).text();
      codeLines.push(line);
    }
    if (codeLines.length === 0) {
      console.warn(`[WARNING] An empty code block exists in ${origin}`);
      return;
    }
    validityTestResultSetStatus(origin, WIP);
    testValidity(type, origin, codeLines.join('\n'));
  }

  function processCodeBlockEOF($, codeBlock, origin) {
    const codeLines = [];
    let type = 'yaml', eofStart = false, eofEnd = false;
    const lines = $(codeBlock).find('span.token-line');
    for (let idxLine = 0; idxLine < lines.length; idxLine++) {
      const line = $(lines[idxLine]).text();
      const trimLine = line.trim();
      if (!eofStart && /<<\s*(EOF|'EOF'|"EOF")/i.test(trimLine)) {
        eofStart = true; eofEnd = false;
        codeLines.length = 0;
      } else if (eofStart && !eofEnd && /^EOF$/i.test(trimLine)) {
        eofEnd = true; eofStart = false;
        if (codeLines.length > 0) {
          validityTestResultSetStatus(origin, WIP);
          testValidity(type, origin, codeLines.join('\n'));
        } else {
          console.warn(`[WARNING] An empty EOF code block exists in ${origin}`);
        }
      } else if (eofStart && !eofEnd) {
        if (codeLines.length === 0 && /^[{\[]/.test(trimLine)) {
          type = 'json';
        }
        codeLines.push(line);
      }
    }
    if (eofStart && !eofEnd) {
      console.error(`[ERROR] An unterminated EOF code block exists in ${origin}`);
      validityTestResultSetStatus(origin, WIP);
      addValidityTestResult(origin, type, FAIL);
    }
  }

  function spacePrefixLen(str) {
    const match = str.match(/^[ \t]*/);
    if (match != null && match.length > 0 && typeof match[0] === 'string') {
      return match[0].replace('\t', '  ').length;
    }
    return 0;
  }

  function warnOnNoIndentation(code, origin) {
    if (!process.env.YAML_INDENTATION_WARNING) return;
    let startLen = 0;
    let indentationExists = false;
    const lines = code.split('\n');
    if (lines.length < 2) return;
    for (let idx = 0; idx < lines.length; idx++) {
      const prefixLen = spacePrefixLen(lines[idx]);
      if (idx === 0) {
        startLen = prefixLen;
      } else {
        indentationExists = prefixLen > startLen;
        if (indentationExists) break;
      }
    }
    if (!indentationExists) {
      console.warn(`[WARN] no indentation exists in yaml block on page ${origin}`);
    }
  }

  function testValidity(type, origin, code) {
    const yamlParseOptions = {strict: true, uniqueKeys: false};
    try {
      switch (type) {
        case 'yaml':
          warnOnNoIndentation(code, origin);
          const errs = [];
          const docs = YAML.parseAllDocuments(code, yamlParseOptions);
          for (const doc of docs) {
            doc.errors.forEach(e => { errs.push(e.message) });
          }
          if (errs.length > 0) {
            const err = new Error(errs.join('\nNext Error:\n'));
            logAndPrintValidityError(origin, type, code, err);
          } else {
            addValidityTestResult(origin, type, PASS);
          }
          break;
        case 'json':
          JSON.parse(code);
          addValidityTestResult(origin, type, PASS);
          break;
      }
    } catch (err) {
      logAndPrintValidityError(origin, type, code, err);
    }
  }

  function logAndPrintValidityError(origin, type, code, err) {
    addValidityTestResult(origin, type, FAIL);
    console.error(`[ERROR] validity error (${type}) in ${origin} : Error message(s):\n${err.message}`);
    if (process.env.PRINT_CODE_ON_ERROR) {
      console.error(`######## BEGIN ${type} ########`);
      console.error(`${code}`);
      console.error(`######## END ${type} ########\n`);
    }
  }

  function addValidityTestResult(origin, type, result) {
    const {status, results} = validityTestResults.get(origin);
    validityTestResults.set(origin, {status, results: [...results, {type, result}]});
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
      if (!inOriginSkipList(origin)) {
        lc.process(origin, u);
      }
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

  function inOriginSkipList(origin) {
    for (const item of skipOriginsForLC) {
      let skip = false;
      if (typeof item === 'string') {
        skip = item === origin;
      } else if (typeof item === 'object' && item && item instanceof RegExp) {
        skip = item.test(origin);
      }
      if (skip) {
        console.log(`[INFO] skipping origin for link checking: ${origin}`);
        return true;
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

  function doValidityTestRequest(vt, url) {
    validityTestResultSetStatus(url, WIP);
    const opts = {follow_max: 5, follow_keep_method: true}
    needle.request('get', url, null, opts, (err, resp) => {
      if (!err && resp.statusCode === 200) {
        testValidity(vt, url, resp.body.toString());
      } else {
        const errMsg = typeof err?.message !== 'undefined' ? `: ${err.message}` : '';
        const scMsg = typeof resp?.statusCode !== 'undefined' ? ` (${resp.statusCode})` : '';
        console.error(`[ERROR] error while getting file for validity test on ${url}${scMsg}${errMsg}`);
      }
      validityTestResultSetStatus(url, DONE);
    });
  }

  function doValidityTestOnFiles(url) {
    if (lc.isInvalidOrSkipped(url) || lc.isIgnored(url)) return;
    if (validityTestResults.has(url)) return;
    validityTestFiles.forEach(vt => {
      if ((vt === 'yaml' && /\.ya?ml$/.test(url)) ||
          (vt === 'json' && /\.json$/.test(url))) {
        doValidityTestRequest(vt, url);
      }
    });
  }

  async function doPostProcessing() {
    const opts = { url: '', urlRegExp: lc.getLinkRegex()[0]};
    for (const url of postProcessUrls.keys()) {
      if (!inOriginSkipList(url)) {
        opts.url = url;
        const urls = await downloadListOfUrls(opts);
        for (const u of urls) {
          lc.process(url, u);
        }
      }
      doValidityTestOnFiles(url);
    }
  }

  async function reportValidityTestResults() {
    if (validityTestResults.size === 0) return 0;
    let passCount = 0, failCount = 0, totalCount = 0, urlCount = 0;

    while (true) {
      let wipCount = 0;
      validityTestResults.forEach((v, k) => {
        if (v.status === WIP) wipCount++;
      })
      if (wipCount === 0) break;
      console.log(`\nWaiting on validity tests to complete: ${wipCount} remaining`);
      await sleep(1000);
    }

    const keys = [...validityTestResults.keys()].sort();
    for (const key of keys) {
      const ctx = validityTestResults.get(key);
      urlCount++;
      // console.log(`validity test url: ${key}:`);
      for (const val of ctx.results) {
        // console.log(`\t==> type: ${val.type}, result: ${val.result}`);
        totalCount++;
        if (val.result === PASS) passCount++;
        if (val.result === FAIL) failCount++;
      }
    }

    console.log(`\nValidity testing results: url total: ${urlCount}, test total: ${totalCount}, pass: ${passCount}, fail: ${failCount}`);

    return failCount;
  }

  const crawler = getCrawler();
  await processSiteMap(SITEMAP_URL);
  const urls = [...urlCache.keys()].filter(url => !url.endsWith(SITEMAP));
  await crawler.addRequests([DOCS]);
  await crawler.addRequests(urls);

  console.log(`Crawling the docs (${DOCS}) and executing tests.`);
  console.log(`Localhost mode is ${isLocalHost ? 'ON' : 'OFF'}.`);
  console.log(`Validity tests on code blocks: ${validityTest.length ? validityTest.join(',') : 'none'}`);
  console.log(`Validity tests on files: ${validityTestFiles.length ? validityTestFiles.join(',') : 'none'}`);
  console.log(`To enable validity tests on code blocks use env var VALIDITY_TEST=json,yaml,bashEOF`);
  console.log(`To enable validity tests on files use env var VALIDITY_TEST_FILES=json,yaml`);
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

  const failCount = await reportValidityTestResults();
  if (failCount > 0) {
    console.error(`[ERROR] The crawler tests failed due to validity testing errors - check the logs above for details`);
  }

  expect(allErrors).toBe(0);
  expect(failCount).toBe(0);
});
