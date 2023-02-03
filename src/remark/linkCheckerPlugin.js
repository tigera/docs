const visit = require('unist-util-visit');
const linkChecker = require('../utils/linkChecker')();
const skipList = [
  ...linkChecker.getSkipList(),
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
  'https://web.archive.org/web/20150923231827/https://www.cisco.com/web/about/ac123/ac147/archived_issues/ipj_14-3/143_trill.html',
  'https://web.archive.org/web/20210204031636/https://cumulusnetworks.com/blog/celebrating-ecmp-part-two/',
  'https://www.fluentd.org/',
]

function linkCheckerPlugin(_options) {
  async function transformer(tree, file) {
    linkChecker.setSkipList(skipList);
    visit(tree, () => true, (node) => {
        for (let prop in node) {
          if (!Object.prototype.hasOwnProperty.call(node, prop)) continue;
          if (prop === 'type' || typeof node[prop] !== 'string') continue;
          linkChecker.process(node[prop]);
        }
      },
    );
  }
  return transformer;
}

function postBuild() {
  linkChecker.report();
}

module.exports = {
  remarkPlugin: linkCheckerPlugin,
  docusaurusPlugin: () => {
    return {
      postBuild,
    };
  },
};
