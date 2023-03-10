const urlCheck = require('./urlCheck');
const LC = 'LINK-CHECK', DEAD = 'dead', SKIPPED = 'skipped', ALIVE = 'alive',
  ERROR = 'error', INVALID = 'invalid', WARN = 'warn', INFO = 'info',
  CHECKING = 'checking';
const defaultLinkRegex = /https?:\/\/[-a-zA-Z0-9()@:%._+~#?&/=]+/gi;
const validURLRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
const trimUrlChars = /(\)|\)\.|\.)$/;

// Skip patterns are skipped, but remain in the reporting for visibility
const defaultSkipList = [
  /^https?:\/\/\d+\.\d+\.\d+\.\d+/,
  /^https?:\/\/transfer\.sh/,
  /^https?:\/\/example.com/,
  /^https?:\/\/an\.example\.threat\.feed/,
  /^https?:\/\/my\.threatfeed\.com/,
  /^https?:\/\/mycalicocl-calicodemorg-03a087-36558dbb\.hcp\.canadaeast\.azmk8s\.io/,
  /^https?:\/\/60F939227672BC3D5A1B3EC9744B2B21\.gr7\.us-west-2\.eks\.amazonaws\.com/,
  /^https?:\/\/prometheus-dashboard-svc\.calico-monitoring\.svc/,
  /^https?:\/\/manager\.apps\.demo-ocp\.tigera-solutions\.io/,
  /^https?:\/\/d881b853ae9313e00302a84f1e346a77\.gr7\.us-west-2\.eks\.amazonaws\.com/,
  /^https?:\/\/api\.my-ocp-domain\.com/,
  /\/manifests\/alp\/istio-inject-configmap-$/,
  /^https?:\/\/auth\.calicocloud\.io/,
  /^https?:\/\/www\.calicocloud\.io/,
  'https://en.wikipedia.org/wiki/Autonomous_System_(Internet',
  'https://github.com/dims/etcd3-gateway.git@5a3157a122368c2314c7a961f61722e47355f981',
  'https://installer.calicocloud.io:443/',
  'https://web.archive.org/web/20150923231827/https://www.cisco.com/web/about/ac123/ac147/archived_issues/ipj_14-3/143_trill.html',
  'https://web.archive.org/web/20210204031636/https://cumulusnetworks.com/blog/celebrating-ecmp-part-two/',
  'http://ppa.launchpad.net/project-calico/calico-X.X/ubuntu',
];

// Ignore patterns are skipped and ignored completely - no visibility whatsoever
const defaultIgnoreList = [
  /^https:\/\/github\.com\/tigera\/docs\/edit\//i,
  /^https:\/\/github\.com\/projectcalico\/calico\/pull\/\d+$/i,
  /^https:\/\/github\.com\/projectcalico\/calico\/tree\/master\/[\w/.-]+?\.md$/i,
];

function linkChecker() {
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let skipped = 0, invalid = 0, alive = 0, dead = 0, error = 0;
  let linkRegex = [defaultLinkRegex];
  let skipList = [...defaultSkipList];
  let ignoreList = [...defaultIgnoreList];
  let ignored = 0;
  let localhost = undefined;
  const urlMap = new Map();

  function linkCheckCallback(err, result) {
    const getMsg = err => {
      if (typeof err === 'string') return `error: ${err}`;
      return `message: '${err?.message}', errno: ${err?.errno}, code: ${err?.code}`;
    };
    if (err) {
      urlMap.set(result.link, { ...result, msg: `SYS-ERROR: ${getMsg(err)}` });
    } else if (result?.err) {
      urlMap.set(result.link, { ...result, msg: `${getMsg(result.err)}` });
    } else {
      urlMap.set(result.link, { ...result });
    }
  }

  function checkList(url, list) {
    for (const e of list) {
      if (typeof e === 'object' && e instanceof RegExp && e.test(url)) return true;
      else if (typeof e === 'string' && e === url) return true;
    }
    return false;
  }

  function isInvalidOrSkipped(url) {
    if (!validURLRegex.test(url)) {
      if (!(localhost && url.startsWith(localhost))) {
        urlMap.set(url, { status: INVALID });
        return true;
      }
    }
    if (checkList(url, skipList)) {
      urlMap.set(url, { status: SKIPPED });
      return true;
    }
    return false;
  }

  function isIgnored(url) {
    if (checkList(url, ignoreList)) {
      ignored++;
      return true;
    }
    return false;
  }

  function enumMap(cond, fmt, type) {
    let list = [];
    urlMap.forEach((v, k) => {
      if (!cond(v)) return;
      list[list.length] = fmt(v, k);
    });
    list.sort();
    list.forEach(e => {
      if (type === INFO) console.info(e);
      else if (type === WARN) console.warn(e);
      else if (type === ERROR) console.error(e);
    });
  }

  function process(origin, text) {
    for (const lre of linkRegex) {
      const matches = text.matchAll(lre);
      for (const match of matches) {
        const url = match[0].trim().replace(trimUrlChars, '');
        if (isIgnored(url)) continue;
        if (urlMap.has(url)) continue;
        urlMap.set(url, null);
        if (isInvalidOrSkipped(url)) continue;
        urlMap.set(url, { status: CHECKING });
        urlCheck(origin, url, linkCheckCallback).then(r => {});
      }
    }
  }

  async function report() {
    if (urlMap.size === 0) return;
    let failed = false;

    const cnt = await wait();
    if (cnt > 0) {
      failed = true;
      console.error(`[FATAL] ${LC} did not finish. There are ${cnt} remaining.`);
    }

    skipped = 0; invalid = 0; alive = 0; dead = 0; error = 0;
    urlMap.forEach((v, k) => {
      if (typeof v === 'object') {
        if (v.status === ERROR) {
          error++;
        } else if (v.status === SKIPPED) {
          skipped++;
        } else if (v.status === DEAD) {
          dead++;
        } else if (v.status === ALIVE) {
          alive++;
        } else if (v.status === INVALID) {
          invalid++;
        } else {
          console.error(
            `FATAL: an invalid status exists in the ${LC} urlMap. k: ${k}, v: ${JSON.stringify(v)}`);
          failed = true;
        }
      } else {
        console.error(
          `FATAL: an invalid status exists in the ${LC} urlMap. k: ${k}, v: ${v}`);
        failed = true;
      }
    });

    console.log(
      `${LC} REPORT\n\tSummary: ignored: ${ignored}, skipped: ${skipped}, invalid: ${invalid}, errors: ${error}, dead: ${dead}, alive: ${alive}, total: ${urlMap.size}`);

    if (invalid > 0) {
      console.info(
        `\n\t[INFO] ${LC} skipped the following ${invalid} invalid link(s):`);
      enumMap(v => v.status === INVALID, (v, k) => `\t${k} is ${v.status}`, INFO);
    }

    if (skipped > 0) {
      console.info(
        `\n\t[INFO] ${LC} skipped the following ${skipped} link(s) due to built-in skip rules:`);
      enumMap(v => v.status === SKIPPED, (v, k) => `\t${k} was ${v.status}`, INFO);
    }

    if (dead > 0) {
      console.warn(
        `\n\t[WARN] ${LC} found the following ${dead} dead link(s):`);
      enumMap(v => v.status === DEAD, (v, k) => `\t${k} is ${v.status} (${v.statusCode})\n\t==>Origin: ${v?.origin}\n`, WARN);
    }

    if (error > 0) {
      console.warn(`\n\t[ERROR] ${LC} hit the following ${error} error(s):`);
      enumMap(v => v.status === ERROR,(v, k) => `\t${k} (${v.statusCode}) error: ${v.msg}\n\t==>Origin: ${v?.origin}\n`, WARN);
    }

    return !failed;
  }

  function getDefaultLinkRegex() {
    return defaultLinkRegex;
  }

  function getLinkRegex() {
    return linkRegex;
  }

  function setLinkRegex(lre) {
    linkRegex = lre;
    return linkRegex;
  }

  function getSkipList() {
    return skipList;
  }

  function setSkipList(sl) {
    skipList = sl;
    return skipList;
  }

  function getIgnoreList() {
    return ignoreList;
  }

  function setIgnoreList(il) {
    ignoreList = il;
    return ignoreList;
  }

  function errorCount() {
    return error;
  }

  function deadCount() {
    return dead;
  }

  function invalidCount() {
    return invalid;
  }

  function aliveCount() {
    return alive;
  }

  function skippedCount() {
    return skipped;
  }

  function rawMap() {
    return urlMap;
  }

  function getStatus(status) {
    const ret = [];
    urlMap.forEach((v, k) => {
      if (typeof v === 'object' && v.status === status) ret.push(k)
      else if (v === status) ret.push(k)
    });
    return ret;
  }

  async function wait() {
    let cnt = 0, iter = 0, lastCnt = 0, lastRpt = 0;
    while (true) {
      const checking = getStatus(CHECKING);
      cnt = checking.length;
      if (cnt <= 0 || ++iter > (12 * 30)) break; // 30 min wait
      console.log(`Waiting for ${cnt} remaining ${LC}s to finish...`)
      if (cnt === lastCnt && cnt !== lastRpt) {
        lastRpt = cnt;
        console.log(`Here is what we're waiting on:`);
        for (const c of checking) { console.log(`> ${c}`) }
      }
      lastCnt = cnt;
      await sleep(5000); // 5s sleep
    }
    return cnt;
  }

  function setLocalhost(lh) {
    localhost = lh;
  }

  function retryErrors() {
    const errors = getStatus(ERROR);
    for (const url of errors) {
      const obj = urlMap.get(url);
      urlMap.set(url, { status: CHECKING });
      urlCheck(obj.origin, url, linkCheckCallback).then(r => {});
    }
  }

  return {
    setLocalhost,
    process,
    report,
    retryErrors,
    getDefaultLinkRegex,
    getLinkRegex,
    setLinkRegex,
    getSkipList,
    setSkipList,
    getIgnoreList,
    setIgnoreList,
    errorCount,
    deadCount,
    invalidCount,
    aliveCount,
    skippedCount,
    wait,
    getStatus,
    rawMap,
  };
}

module.exports = linkChecker;
