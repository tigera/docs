const releases = require('./releases.json');

const variables = {
  releaseTitle: 'v3.14.1',
  prodname: 'Calico Cloud',
  prodnamedash: 'calico-cloud',
  baseUrl: '/calico-cloud',
  filesUrl: 'https://docs.calicocloud.io',
  filesUrl_CE: 'https://downloads.tigera.io/ee/v3.15.0',
  tutorialFilesURL: 'https://unified-docs.tigera.io/files',
  prodnameWindows: 'Calico Enterprise for Windows',
  rootDirWindows: 'C:\\TigeraCalico',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  cloudversion: 'v3.14.1-16',
  clouddownloadurl: 'https://installer.calicocloud.io/manifests/v3.14.1-16',
  clouddownloadbase: 'https://installer.calicocloud.io',
  tigeraOperator: releases[0]['tigera-operator'],
  releases,
  registry: 'quay.io/',
  imageNames: {
    node: 'tigera/cnx-node',
    kubeControllers: 'tigera/kube-controllers',
  },
};

module.exports = variables;
