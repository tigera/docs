const releases = require('./releases.json');

const variables = {
  releaseTitle: 'master',
  prodname: 'Calico Enterprise',
  prodnamedash: 'calico-enterprise',
  version: 'master',
  baseUrl: '/calico-enterprise/next',
  filesUrl: 'https://downloads.tigera.io/ee/master',
  prodnameWindows: 'Calico Enterprise for Windows',
  downloadsurl: 'https://downloads.tigera.io',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\TigeraCalico',
  registry: 'gcr.io/unique-caldron-775/cnx/',
  chart_version_name: 'master',
  tigeraOperator: releases[0]['tigera-operator'],
  releases,
  imageNames: {
    node: 'tigera/cnx-node',
    kubeControllers: 'tigera/kube-controllers',
  },
};

module.exports = variables;
