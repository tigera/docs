const releases = require('./releases.json');

const variables = {
  releaseTitle: 'v3.18.0',
  prodname: 'Calico Enterprise',
  prodnamedash: 'calico-enterprise',
  version: 'v3.18',
  baseUrl: '/calico-enterprise/3.18',
  filesUrl: 'https://downloads.tigera.io/ee/3.18.0',
  tutorialFilesURL: 'https://docs.tigera.io/files',
  tmpScriptsURL: 'https://docs.tigera.io/calico-enterprise/3.18',
  prodnameWindows: 'Calico Enterprise for Windows',
  downloadsurl: 'https://downloads.tigera.io',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\TigeraCalico',
  registry: 'quay.io/',
  chart_version_name: 'v3.18.0-0',
  tigeraOperator: releases[0]['tigera-operator'],
  manifestsUrl: 'https://docs.tigera.io/3.18.0',
  releases,
  imageNames: {
    node: 'tigera/cnx-node',
    kubeControllers: 'tigera/kube-controllers',
  },
};

module.exports = variables;
