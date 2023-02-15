const visit = require('unist-util-visit');
const linkChecker = require('../utils/linkChecker')();
const skipList = [
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

function linkCheckerPlugin(_options) {
  linkChecker.setSkipList([...linkChecker.getSkipList(), ...skipList]);
  async function transformer(tree, file) {
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

async function postBuild() {
  await linkChecker.report();
}

module.exports = {
  remarkPlugin: linkCheckerPlugin,
  docusaurusPlugin: () => {
    return {
      postBuild,
    };
  },
};
