const releases = require('./releases.json');
const componentImage = require('../../src/components/utils/componentImage');

const variables = {
  releaseTitle: 'v3.20.0-2.0',
  prodname: 'Calico Enterprise',
  prodnamedash: 'calico-enterprise',
  version: 'v3.20',
  baseUrl: '/calico-enterprise/3.20',
  filesUrl: 'https://downloads.tigera.io/ee/v3.20.0-2.0',
  tutorialFilesURL: 'https://docs.tigera.io/files',
  tmpScriptsURL: 'https://docs.tigera.io/calico-enterprise/3.20',
  windowsScriptsURL: 'https://raw.githubusercontent.com/kubernetes-sigs/sig-windows-tools/master/hostprocess',
  prodnameWindows: 'Calico Enterprise for Windows',
  downloadsurl: 'https://downloads.tigera.io',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\TigeraCalico',
  registry: 'quay.io/',
  chart_version_name: 'v3.20.0-2.0-0',
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
