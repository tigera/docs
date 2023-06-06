const releases = require('./releases.json');

const variables = {
  releaseTitle: 'v3.16.1',
  prodname: 'Calico Cloud',
  prodnamedash: 'calico-cloud',
  baseUrl: '/calico-cloud',
  filesUrl: 'https://docs.calicocloud.io',
  filesUrl_CE: 'https://downloads.tigera.io/ee/v3.16.1',
  tutorialFilesURL: 'https://docs.tigera.io/files',
  prodnameWindows: 'Calico Enterprise for Windows',
  rootDirWindows: 'C:\\TigeraCalico',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  cloudversion: 'v3.16.1-11',
  clouddownloadurl: 'https://installer.calicocloud.io/manifests/v3.16.1-11',
  clouddownloadbase: 'https://installer.calicocloud.io',
  cloudoperatorimage: 'us-docker.pkg.dev/tigera-prod-01/calico-cloud-public/cc-operator',
  imageassuranceversion: 'v1.7.3',
  tigeraOperator: releases[0]['tigera-operator'],
  releases,
  registry: 'quay.io/',
  imageNames: {
    node: 'tigera/cnx-node',
    kubeControllers: 'tigera/kube-controllers',
  },
};

module.exports = variables;
