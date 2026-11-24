const releases = require('./releases.json');
const componentImage = require('../../src/components/utils/componentImage');

// Set these by hand for each release. A "tag" has the leading "v". A "version" doesn't.
const releaseTag = 'v3.21.9';
const minorTag = 'v3.21';

const variables = {
  releaseTag,
  releaseVersion: releaseTag.replace(/^v/, ''),
  prodname: 'Calico Enterprise',
  prodnamedash: 'calico-enterprise',
  minorTag,
  minorVersion: minorTag.replace(/^v/, ''),
  openSourceVersion: releases[0].calico.minor_version.slice(1),
  baseUrl: '/calico-enterprise/3.21',
  filesUrl: 'https://downloads.tigera.io/ee/v3.21.9',
  rpmsUrl: 'https://downloads.tigera.io/ee/rpms/' + releases[0].title.slice(0, 5),
  tutorialFilesURL: 'https://docs.tigera.io/files',
  tmpScriptsURL: 'https://docs.tigera.io/calico-enterprise/3.21',
  windowsScriptsURL: 'https://raw.githubusercontent.com/kubernetes-sigs/sig-windows-tools/master/hostprocess',
  prodnameWindows: 'Calico Enterprise for Windows',
  downloadsurl: 'https://downloads.tigera.io',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\TigeraCalico',
  registry: 'quay.io/',
  envoyVersion: '1.6.7',
  chartVersion: 'v3.21.9-0',
  tigeraOperator: releases[0]['tigera-operator'],
  dikastesVersion: releases[0].components.dikastes.version,
  releases,
  imageNames: {
    node: 'tigera/cnx-node',
    kubeControllers: 'tigera/kube-controllers',
  },
  componentImage: {
    cnxNode: componentImage('cnx-node', releases[0]),
    calicoctl: componentImage('calicoctl', releases[0]),
    calicoq: componentImage('calicoq', releases[0]),
  },
};

module.exports = variables;
