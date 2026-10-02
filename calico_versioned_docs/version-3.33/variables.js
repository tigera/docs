const releases = require('./releases.json');

const variables = {
  releaseTitle: 'v3.33.0',
  prodname: 'Calico',
  prodnamedash: 'calico',
  version: 'v3.33',
  baseUrl: '/calico/latest',
  filesUrl: 'https://projectcalico.docs.tigera.io/v3.33',
  tutorialFilesURL: 'https://docs.tigera.io/files',
  calicoReleasesURL: 'https://github.com/projectcalico/calico/releases/download',
  windowsScriptsURL: 'https://raw.githubusercontent.com/kubernetes-sigs/sig-windows-tools/master/hostprocess',
  prodnameWindows: 'Calico for Windows',
  prodnamedashWindows: 'calico-for-windows',
  nodecontainer: 'calico/node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\CalicoWindows',
  ppa_repo_name: 'calico-3.33',
  manifestsUrl: 'https://raw.githubusercontent.com/projectcalico/calico/v3.33.0',
  releases,
  registry: '',
  // vpp-dataplane releases on its own cadence; bump only to a tag that exists.
  vppbranch: 'v3.32.0',
  envoyVersion: '1.9.1',
  istioVersion: '1.29.8',
  tigeraOperator: releases[0]['tigera-operator'],
  tigeraOperatorVersionShort: releases[0]['tigera-operator'].version.split('.').slice(0, 2).join('.'),
  imageNames: {
    'calico/calico': 'calico/calico',
    'calico/node': 'calico/node',
    'calico/whisker': 'calico/whisker',
    'calico/node-windows': 'calico/node-windows',
    'calico/cni-windows': 'calico/cni-windows',
    'calico/envoy-gateway': 'calico/envoy-gateway',
    'calico/envoy-proxy': 'calico/envoy-proxy',
    'calico/envoy-ratelimit': 'calico/envoy-ratelimit',
    flannel: 'docker.io/flannelcni/flannel'
  },
};

module.exports = variables;
