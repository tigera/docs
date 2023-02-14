const linkCheck = require('link-check');
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
  const opts = { retryOn429: true };
  const urlMap = new Map();
  const sys_errors = [];

  function linkCheckCallback(err, result) {
    if (err) {
      const url = (typeof result === 'object' && result !== null) ? result.url : undefined;
      sys_errors[sys_errors.length] = `${LC} SYS-ERROR: ${err}, url: ${url}`;
    } else if (result.err) {
      urlMap.set(result.link, { state: ERROR, msg: `${result.err}` });
    } else {
      urlMap.set(result.link, result.status);
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
        urlMap.set(url, INVALID);
        return true;
      }
    }
    if (checkList(url, skipList)) {
      urlMap.set(url, SKIPPED);
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

  function process(text) {
    for (const lre of linkRegex) {
      const matches = text.matchAll(lre);
      for (const match of matches) {
        const url = match[0].trim().replace(trimUrlChars, '').replace(/\/$/, '');
        if (isIgnored(url)) continue;
        if (urlMap.has(url)) continue;
        urlMap.set(url, undefined);
        if (isInvalidOrSkipped(url)) continue;
        urlMap.set(url, CHECKING);
        linkCheck(url, opts, linkCheckCallback);
      }
    }
  }

  async function report() {
    if (urlMap.size === 0) return;
    let exit = false;

    const cnt = await wait();
    if (cnt > 0) {
      exit = true;
      console.error(`[FATAL] ${LC} did not finish. There are ${cnt} remaining.`);
    }

    skipped = 0; invalid = 0; alive = 0; dead = 0; error = 0;
    urlMap.forEach((v, k) => {
      if (typeof v === 'object' && v.state === ERROR) {
        error++;
      } else if (v === SKIPPED) {
        skipped++;
      } else if (v === DEAD) {
        dead++;
      } else if (v === ALIVE) {
        alive++;
      } else if (v === INVALID) {
        invalid++;
      } else {
        console.error(
          `FATAL: an unknown state exists in the ${LC} urlMap. k: ${k}, v: ${v}`);
        exit = true;
      }
    });

    console.log(
      `${LC} REPORT\n\tSummary: ignored: ${ignored}, skipped: ${skipped}, invalid: ${invalid}, sys_errors: ${sys_errors.length}, errors: ${error}, dead: ${dead}, alive: ${alive}, total: ${urlMap.size}`);

    if (invalid > 0) {
      console.info(
        `\n\t[INFO] ${LC} skipped the following ${invalid} invalid link(s):`);
      enumMap(v => v === INVALID, (v, k) => `\t${k} is ${v}`, INFO);
    }

    if (skipped > 0) {
      console.info(
        `\n\t[INFO] ${LC} skipped the following ${skipped} link(s) due to built-in skip rules:`);
      enumMap(v => v === SKIPPED, (v, k) => `\t${k} was ${v}`, INFO);
    }

    if (dead > 0) {
      console.warn(
        `\n\t[WARN] ${LC} found the following ${dead} dead link(s):`);
      enumMap(v => v === DEAD, (v, k) => `\t${k} is ${v}`, WARN);
    }

    if (error > 0) {
      console.warn(`\n\t[ERROR] ${LC} hit the following ${error} error(s):`);
      enumMap(v => typeof v === 'object' && v.state === ERROR,
        (v, k) => `\t${k} error: ${v.msg}`, WARN);
    }

    if (sys_errors.length > 0) {
      exit = true;
      console.error(
        `\n\t[FATAL] ${LC} FATAL ERROR(S): the following ${sys_errors.length} system errors while link checking:`);
      sys_errors.forEach(e => console.error(`\t${e}`));
    }

    if (exit) {
      console.error(`${LC}: A FATAL ERROR occurred - exiting now...`);
      process.exit(1);
    }
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

  function sysErrors() {
    return sys_errors;
  }

  function sysErrorsCount() {
    return sys_errors.length;
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

  function countStatus(status) {
    let cnt = 0;
    urlMap.forEach((v, k) => { if (v === status) cnt++; });
    return cnt;
  }

  async function wait() {
    let cnt = 1;
    let iter = 0;
    while (true) {
      cnt = countStatus(CHECKING);
      if (cnt <= 0 || ++iter > (12 * 15)) break; // 15 min wait
      console.log(`Waiting for ${cnt} remaining ${LC}s to finish...`)
      await sleep(5000); // 5s sleep
    }
    return cnt;
  }

  function setLocalhost(lh) {
    localhost = lh;
  }

  return {
    setLocalhost,
    process,
    report,
    getDefaultLinkRegex,
    getLinkRegex,
    setLinkRegex,
    getSkipList,
    setSkipList,
    getIgnoreList,
    setIgnoreList,
    sysErrors,
    sysErrorsCount,
    errorCount,
    deadCount,
    invalidCount,
    aliveCount,
    skippedCount,
    rawMap,
  };
}

module.exports = linkChecker;
