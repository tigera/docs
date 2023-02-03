const linkCheck = require('link-check');
const LC = 'LINK-CHECK', DEAD = 'dead', SKIPPED = 'skipped', ALIVE = 'alive',
  ERROR = 'error', INVALID = 'invalid', WARN = 'warn', INFO = 'info';
const defaultLinkRegex = /https?:\/\/[-a-zA-Z0-9()@:%._+~#?&/=]+/g;
const validURLRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;
const defaultSkipList = [
  /:\/\/\d+\.\d+\.\d+\.\d+/,
  /:\/\/transfer\.sh/,
  /:\/\/example.com/,
  /:\/\/an\.example\.threat\.feed/,
  /:\/\/my\.threatfeed\.com/,
  /:\/\/mycalicocl-calicodemorg-03a087-36558dbb\.hcp\.canadaeast\.azmk8s\.io/,
  /:\/\/60F939227672BC3D5A1B3EC9744B2B21\.gr7\.us-west-2\.eks\.amazonaws\.com/,
  /:\/\/prometheus-dashboard-svc\.calico-monitoring\.svc/,
  /:\/\/manager\.apps\.demo-ocp\.tigera-solutions\.io/,
  /:\/\/d881b853ae9313e00302a84f1e346a77\.gr7\.us-west-2\.eks\.amazonaws\.com/,
  /:\/\/api\.my-ocp-domain\.com/,
  /\/manifests\/alp\/istio-inject-configmap-$/,
  /:\/\/auth\.calicocloud\.io/,
  /:\/\/www\.calicocloud\.io/,
  'https://en.wikipedia.org/wiki/Autonomous_System_(Internet',
  'https://github.com/dims/etcd3-gateway.git@5a3157a122368c2314c7a961f61722e47355f981',
  'https://installer.calicocloud.io:443/',
  'https://web.archive.org/web/20150923231827/https://www.cisco.com/web/about/ac123/ac147/archived_issues/ipj_14-3/143_trill.html',
  'https://web.archive.org/web/20210204031636/https://cumulusnetworks.com/blog/celebrating-ecmp-part-two/',
  'https://www.fluentd.org/',
  'http://ppa.launchpad.net/project-calico/calico-X.X/ubuntu',
  // TODO[dac]: we need to investigate some of these and figure out a way to
  // capture the entire URL - many of these URLs are just the base URL and the
  // final URL is constructed in the code in such a way that we currently
  // can't pick them up.
  'https://docs.tigera.io/calico/charts',
  'https://downloads.tigera.io/ee/binaries/',
  'https://downloads.tigera.io/ee/charts/tigera-operator-master.tgz',
  'https://downloads.tigera.io/ee/master/download/binaries/',
  'https://downloads.tigera.io/ee/v3.14.4/download/binaries/',
  'https://downloads.tigera.io/ee/v3.15.1/download/binaries/',
  'https://github.com/projectcalico/calico/releases/download/',
  'https://github.com/projectcalico/calico/releases/download/master/install-calico-windows.ps1',
  'https://github.com/projectcalico/calico/releases/latest/download',
  'https://installer.calicocloud.io/charts',
  'https://installer.calicocloud.io/manifests/v3.15.1-0/manifests',
];

function linkChecker() {
  let skipped = 0, invalid = 0, alive = 0, dead = 0, error = 0;
  let linkRegex = [defaultLinkRegex];
  let skipList = [...defaultSkipList];
  const opts = { retryOn429: true, fallbackRetryDelay: '15s', timeout: '30s' };
  const urlMap = new Map();
  const sys_errors = [];

  function linkCheckCallback(err, result) {
    if (err) {
      sys_errors[sys_errors.length] = `${LC} SYS-ERROR: ${err}`;
    } else if (result.err) {
      urlMap.set(result.link, { state: ERROR, msg: `${result.err}` });
    } else {
      urlMap.set(result.link, result.status);
    }
  }

  function isExcludedOrInvalid(url) {
    if (!validURLRegex.test(url)) {
      urlMap.set(url, INVALID);
      return true;
    }
    for (const e of skipList) {
      if (typeof e === 'object' && e instanceof RegExp && e.test(url)) return true;
      else if (typeof e === 'string' && e === url) return true;
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
        const url = match[0].trim().replace(/(\)|\)\.)$/, '');
        if (urlMap.has(url)) continue;
        urlMap.set(url, SKIPPED); // init to skipped
        if (isExcludedOrInvalid(url)) {
          continue;
        }
        linkCheck(url, opts, linkCheckCallback);
      }
    }
  }

  function report() {
    let exit = false;
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
          `FATAL: an unknown state exists in the ${LC} urlMap. k: ${k}, v: ${v} -- Exiting now...`);
        process.exit(1);
      }
    });

    console.log(
      `${LC} REPORT\n\tSummary: skipped: ${skipped}, invalid: ${invalid}, sys_errors: ${sys_errors.length}, errors: ${error}, dead: ${dead}, alive: ${alive}, total: ${urlMap.size}`);

    if (invalid > 0) {
      console.info(
        `\n\t[INFO] ${LC} skipped the following ${invalid} invalid link(s):`);
      enumMap(v => v === INVALID, (v, k) => `\t${k} is ${v}`, INFO);
    }

    if (skipped > 0) {
      console.info(
        `\n\t[INFO] ${LC} skipped the following ${skipped} external link(s) due to built-in skip rules:`);
      enumMap(v => v === SKIPPED, (v, k) => `\t${k} was ${v}`, INFO);
    }

    if (dead > 0) {
      console.warn(
        `\n\t[WARN] ${LC} found the following ${dead} dead external link(s):`);
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

  return {
    process,
    report,
    getDefaultLinkRegex,
    getLinkRegex,
    setLinkRegex,
    getSkipList,
    setSkipList,
    sysErrors,
    sysErrorsCount,
    errorCount,
    deadCount,
    invalidCount,
    aliveCount,
    skippedCount,
  };
}

module.exports = linkChecker;
