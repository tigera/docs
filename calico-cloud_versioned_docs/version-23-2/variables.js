const releases = require('./releases.json');

// Set these by hand for each release. A "tag" has the leading "v". A "version" doesn't.
const releaseTag = 'v3.23.1';

const variables = {
  releaseTag,
  releaseVersion: releaseTag.replace(/^v/, ''),
  cloudUserVersion: 'v23.0.1',
  prodname: 'Calico Cloud',
  manifestsUrl: 'https://raw.githubusercontent.com/projectcalico/calico/v3.32.0',
  prodnamedash: 'calico-cloud',
  baseUrl: '/calico-cloud',
  filesUrl: 'https://docs.calicocloud.io',
  filesUrl_CE: 'https://downloads.tigera.io/ee/v3.23.1',
  tutorialFilesURL: 'https://docs.tigera.io/files',
  prodnameWindows: 'Calico Enterprise for Windows',
  rootDirWindows: 'C:\\TigeraCalico',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  cloudversion: 'v3.23.1-4',
  clouddownloadurl: 'https://installer.calicocloud.io/manifests/v3.23.1-4',
  clouddownloadbase: 'https://installer.calicocloud.io',
  cloudoperatorimage: 'quay.io/tigera/cc-operator',
  tigeraOperator: releases[0]['tigera-operator'],
  dikastesVersion: releases[0].components.dikastes.version,
  releases,
  registry: 'quay.io/',
  envoyVersion: '1.8.0',
  imageNames: {
    node: 'tigera/cnx-node',
    kubeControllers: 'tigera/kube-controllers',
  },
};

module.exports = variables;
