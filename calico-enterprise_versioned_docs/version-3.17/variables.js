const releases = require('./releases.json');

const variables = {
  releaseTitle: 'v3.17.2',
  prodname: 'Calico Enterprise',
  prodnamedash: 'calico-enterprise',
  version: 'v3.17',
  baseUrl: '/calico-enterprise/latest',
  filesUrl: 'https://downloads.tigera.io/ee/v3.17.2',
  tutorialFilesURL: 'https://docs.tigera.io/files',
  tmpScriptsURL: 'https://docs.tigera.io/calico-enterprise/3.17',
  prodnameWindows: 'Calico Enterprise for Windows',
  downloadsurl: 'https://downloads.tigera.io',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\TigeraCalico',
  registry: 'quay.io/',
  chart_version_name: 'v3.17.2-0',
  tigeraOperator: releases[0]['tigera-operator'],
  releases,
  imageNames: {
    node: 'tigera/cnx-node',
    kubeControllers: 'tigera/kube-controllers',
  },
};

module.exports = variables;
