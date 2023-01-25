const visit = require('unist-util-visit');
const linkCheck = require('link-check');
const linkRegex = [
  // new RegExp(
  //   /\bhttps?:\/\/[\w.:/-]+?(\.ya?ml|\.ps1|\.tgz|\.sh|\.zip|\.css|\.js)\b/,
  //   'g'),
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
];
const LC = 'LINK-CHECK', ERR = `${LC} ERROR`;
const DEAD = 'dead', SKIPPED = 'skipped',
  ALIVE = 'alive', ERROR = 'error', INVALID = 'invalid';
const urlMap = new Map();
const comm_errors = [];

function linkCheckerPlugin(_options) {
  const linkCheckCallback = function(err, result) {
    if (err) {
      comm_errors[comm_errors.length] = `${ERR}: ${err}`;
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
      if (sre.test(url)) {
        return true;
      }
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
              const url = match[0].trim().replace(/\)$/, '');
              if (urlMap.has(url)) continue;
              urlMap.set(url, SKIPPED); // init to skipped
              if (IsExcludedOrInvalid(url)) {
                continue;
              }
              const opts = { retryOn429: true, fallbackRetryDelay: '15s' };
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
    `${LC} REPORT\n\tSummary: skipped: ${skipped}, invalid: ${invalid}, comm_errors: ${comm_errors.length}, errors: ${error}, dead: ${dead}, alive: ${alive}, total: ${urlMap.size}`);

  if (invalid > 0) {
    console.info(
      `\n\t[INFO] LINK-CHECK skipped ${invalid} invalid link(s). The list follows:`);
    urlMap.forEach((v, k) => {
      if (v === INVALID) {
        console.warn(`\t${k} is ${v}`);
      }
    });
  }

  if (skipped > 0) {
    console.info(
      `\n\t[INFO] LINK-CHECK skipped ${skipped} external link(s) due to built-in skip rules. The list follows:`);
    urlMap.forEach((v, k) => {
      if (v === SKIPPED) {
        console.warn(`\t${k} was ${v}`);
      }
    });
  }

  if (dead > 0) {
    console.warn(
      `\n\t[WARNING] LINK-CHECK found ${dead} dead external link(s). The list follows:`);
    urlMap.forEach((v, k) => {
      if (v === DEAD) {
        console.warn(`\t${k} is ${v}`);
      }
    });
  }

  let exit = false;

  if (error > 0) {
    exit = true;
    console.error(
      `${LC} FATAL ERROR: we experienced ${error} error(s). The list follows:`);
    urlMap.forEach((v, k) => {
      if (typeof v === 'object' && v.state === ERROR) {
        console.warn(`\t${k} error: ${v.msg}`);
      }
    });
  }

  if (comm_errors.length > 0) {
    exit = true;
    console.error(
      `${LC} FATAL ERROR: we experienced ${comm_errors.length} communication errors while link checking. The list follows:`);
    for (const err of comm_errors) {
      console.error(`\t${err}`);
    }
  }

  if (exit) {
    console.error(`${LC}: A FATAL ERROR occurred - exiting now...`);
    process.exit(1);
  }
}

module.exports = {
  remarkPlugin: linkCheckerPlugin,
  docusaurusPlugin: () => {
    return {
      postBuild: postBuild,
    };
  },
};
