const releases = require('./releases.json');

const variables = {
  releaseTitle: 'v3.17.1',
  prodname: 'Calico Enterprise',
  prodnamedash: 'calico-enterprise',
  version: 'v3.17',
<<<<<<< HEAD
  baseUrl: '/calico-enterprise/latest',
=======
  baseUrl: '/calico-enterprise/3.17',
>>>>>>> ca381156 (Update docs for GA.)
  filesUrl: 'https://downloads.tigera.io/ee/v3.17.1',
  tutorialFilesURL: 'https://docs.tigera.io/files',
  tmpScriptsURL: 'https://docs.tigera.io/calico-enterprise/3.17',
  prodnameWindows: 'Calico Enterprise for Windows',
  downloadsurl: 'https://downloads.tigera.io',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\TigeraCalico',
  registry: 'quay.io/',
  chart_version_name: 'v3.17.1-0',
  tigeraOperator: releases[0]['tigera-operator'],
  releases,
  imageNames: {
    node: 'tigera/cnx-node',
    kubeControllers: 'tigera/kube-controllers',
  },
};

module.exports = variables;
