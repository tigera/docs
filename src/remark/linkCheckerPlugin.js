const visit = require('unist-util-visit');
const linkCheck = require('link-check');
const linkRegex = [
  new RegExp(/https?:\/\/[-a-zA-Z0-9()@:%._+~#?&/=]+/, 'g'),
];
const validURLRegex = new RegExp(
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/);
const skipRegex = [
  new RegExp(/:\/\/\d+\.\d+\.\d+\.\d+/),
  new RegExp(/:\/\/an\.example\.threat\.feed/),
  new RegExp(/:\/\/my\.threatfeed\.com/),
  new RegExp(
    /:\/\/mycalicocl-calicodemorg-03a087-36558dbb\.hcp\.canadaeast\.azmk8s\.io/),
  new RegExp(
    /:\/\/60F939227672BC3D5A1B3EC9744B2B21\.gr7\.us-west-2\.eks\.amazonaws\.com/),
  new RegExp(/:\/\/prometheus-dashboard-svc\.calico-monitoring\.svc/),
  new RegExp(/:\/\/manager\.apps\.demo-ocp\.tigera-solutions\.io/),
  new RegExp(
    /:\/\/d881b853ae9313e00302a84f1e346a77\.gr7\.us-west-2\.eks\.amazonaws\.com/),
  new RegExp(/:\/\/api\.my-ocp-domain\.com/),
  new RegExp(/\/manifests\/alp\/istio-inject-configmap-$/),
  new RegExp(/:\/\/transfer\.sh/),
  new RegExp(/:\/\/auth\.calicocloud\.io/),
  new RegExp(/:\/\/example.com/),
  new RegExp(/:\/\/www\.calicocloud\.io/),
];
const skipLiteral = [
  'https://web.archive.org/web/20150923231827/https://www.cisco.com/web/about/ac123/ac147/archived_issues/ipj_14-3/143_trill.html',
  'https://web.archive.org/web/20210204031636/https://cumulusnetworks.com/blog/celebrating-ecmp-part-two/',
  'https://www.fluentd.org/',
];
const LC = 'LINK-CHECK', DEAD = 'dead', SKIPPED = 'skipped',
  ALIVE = 'alive', ERROR = 'error', INVALID = 'invalid';
const urlMap = new Map();
const sys_errors = [];

function linkCheckerPlugin(_options) {
  const linkCheckCallback = function(err, result) {
    if (err) {
      sys_errors[sys_errors.length] = `${LC} SYS-ERROR: ${err}`;
    } else if (result.err) {
      urlMap.set(result.link, { state: ERROR, msg: `${result.err}` });
    } else {
      urlMap.set(result.link, result.status);
    }
  };

  function IsExcludedOrInvalid(url) {
    if (!validURLRegex.test(url)) {
      urlMap.set(url, INVALID);
      return true;
    }
    for (const sre of skipRegex) {
      if (sre.test(url)) return true;
    }
    for (const l of skipLiteral) {
      if (l === url) return true;
    }
    return false;
  }

  async function transformer(tree, file) {
    visit(tree, () => true, (node) => {
        for (let prop in node) {
          if (!Object.prototype.hasOwnProperty.call(node, prop)) continue;
          if (prop === 'type' || typeof node[prop] !== 'string') continue;
          for (const lre of linkRegex) {
            const matches = node[prop].matchAll(lre);
            for (const match of matches) {
              const url = match[0].trim().replace(/(\)|\)\.)$/, '');
              if (urlMap.has(url)) continue;
              urlMap.set(url, SKIPPED); // init to skipped
              if (IsExcludedOrInvalid(url)) {
                continue;
              }
              const opts = {
                retryOn429: true,
                fallbackRetryDelay: '15s',
                timeout: '30s',
              };
              linkCheck(url, opts, linkCheckCallback);
            }
          }
        }
      },
    );
  }

  return transformer;
}

function postBuild() {
  let exit = false;
  let skipped = 0, invalid = 0, alive = 0, dead = 0, error = 0;
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
    enumMap(v => v === INVALID, (v, k) => `\t${k} is ${v}`, 'info');
  }

  if (skipped > 0) {
    console.info(
      `\n\t[INFO] ${LC} skipped the following ${skipped} external link(s) due to built-in skip rules:`);
    enumMap(v => v === SKIPPED, (v, k) => `\t${k} was ${v}`, 'info');
  }

  if (dead > 0) {
    console.warn(
      `\n\t[WARNING] ${LC} found the following ${dead} dead external link(s):`);
    enumMap(v => v === DEAD, (v, k) => `\t${k} is ${v}`, 'warn');
  }

  if (error > 0) {
    console.warn(`\n\t[ERROR] ${LC} hit the following ${error} error(s):`);
    enumMap(v => typeof v === 'object' && v.state === ERROR,
      (v, k) => `\t${k} error: ${v.msg}`, 'warn');
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

function enumMap(cond, fmt, type) {
  let list = [];
  urlMap.forEach((v, k) => {
    if (!cond(v)) return;
    list[list.length] = fmt(v, k);
  });
  list.sort();
  list.forEach(e => {
    if (type === 'info') console.info(e);
    else if (type === 'warn') console.warn(e);
    else if (type === 'error') console.error(e);
  });
}

module.exports = {
  remarkPlugin: linkCheckerPlugin,
  docusaurusPlugin: () => {
    return {
      postBuild: postBuild,
    };
  },
};
