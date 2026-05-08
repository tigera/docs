const releases = require('./releases.json');

const variables = {
  releaseTitle: 'master',
  prodname: 'Calico',
  prodnamedash: 'calico',
  version: 'master',
  baseUrl: '/calico/latest',
  filesUrl: 'https://projectcalico.docs.tigera.io/master',
  tutorialFilesURL: 'https://docs.tigera.io/files',
  calicoReleasesURL: 'https://github.com/projectcalico/calico/releases/download',
  tmpScriptsURL: 'https://docs.tigera.io/calico/next',
  windowsScriptsURL: 'https://raw.githubusercontent.com/kubernetes-sigs/sig-windows-tools/master/hostprocess',
  prodnameWindows: 'Calico for Windows',
  prodnamedashWindows: 'calico-for-windows',
  nodecontainer: 'calico/node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\CalicoWindows',
  ppa_repo_name: 'calico-master',
  manifestsUrl: 'https://2025-10-03-v3-31-quarterly.docs.eng.tigera.net', //Replace with hashrelease
  releases,
  registry: '',
  vppbranch: 'master',
  envoyVersion: '1.5.0',
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
    flannel: 'docker.io/flannelcni/flannel',
  },
};

module.exports = variables;
