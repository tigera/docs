const releases = require('./releases.json');

const variables = {
  releaseTitle: 'v3.15.0',
  prodname: 'Calico Enterprise',
  prodnamedash: 'calico-enterprise',
  version: 'v3.15',
  baseUrl: '/calico-enterprise/3.15',
  filesUrl: 'https://downloads.tigera.io/ee/v3.15.0',
  prodnameWindows: 'Calico Enterprise for Windows',
  downloadsurl: 'https://downloads.tigera.io',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\TigeraCalico',
  registry: 'quay.io/',
  chart_version_name: 'v3.15.0-1',
  tigeraOperator: releases[0]['tigera-operator'],
  manifestsUrl: 'https://docs.tigera.io/v3.15',
  releases,
  imageNames: {
    node: 'tigera/cnx-node',
    kubeControllers: 'tigera/kube-controllers',
  },
};

module.exports = variables;
