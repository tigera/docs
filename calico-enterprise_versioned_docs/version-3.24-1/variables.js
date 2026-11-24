const releases = require('./releases.json');
const componentImage = require('../../src/components/utils/componentImage');

// Set these by hand for each release. A "tag" has the leading "v". A "version" doesn't.
const releaseTag = 'v3.24.0-1.0';
const minorTag = 'v3.24';

const variables = {
  releaseTag,
  releaseVersion: releaseTag.replace(/^v/, ''),
  helmPre: releaseTag.includes('-') ? ' --devel' : '',
  prodname: 'Calico Enterprise',
  prodnamedash: 'calico-enterprise',
  minorTag,
  minorVersion: minorTag.replace(/^v/, ''),
  openSourceVersion: releases[0].calico.minor_version.slice(1),
  baseUrl: '/calico-enterprise/3.24',
  filesUrl: 'https://downloads.tigera.io/ee/v3.24.0-1.0',
  rhelPkgUrl: 'https://downloads.tigera.io/ee/rpms/' + releases[0].title.slice(0, 5),
  debPkgUrl: 'https://downloads.tigera.io/ee/debs/' + releases[0].title.slice(0, 5),
  tutorialFilesURL: 'https://docs.tigera.io/files',
  tmpScriptsURL: 'https://docs.tigera.io/calico-enterprise/3.24',
  windowsScriptsURL: 'https://raw.githubusercontent.com/kubernetes-sigs/sig-windows-tools/master/hostprocess',
  prodnameWindows: 'Calico Enterprise for Windows',
  downloadsurl: 'https://downloads.tigera.io',
  nodecontainer: 'node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\TigeraCalico',
  registry: 'quay.io/',
  envoyVersion: '1.8.2',
  chartVersion: 'v3.24.0-1.0',
  tigeraOperator: releases[0]['tigera-operator'],
  dikastesVersion: releases[0].components.dikastes.version,
  releases,
  imageNames: {
    node: 'tigera/node',
    kubeControllers: 'tigera/kube-controllers',
  },
  componentImage: {
    cnxNode: componentImage('node', releases[0]),
    calicoq: componentImage('calicoq', releases[0]),
  },
};

module.exports = variables;
