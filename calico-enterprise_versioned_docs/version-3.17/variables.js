const releases = require('./releases.json');
const componentImage = require('../../src/components/utils/componentImage');

const variables = {
  releaseTitle: 'v3.17.4',
  prodname: 'Calico Enterprise',
  prodnamedash: 'calico-enterprise',
  version: 'v3.17',
  baseUrl: '/calico-enterprise/3.17',
  filesUrl: 'https://downloads.tigera.io/ee/v3.17.4',
  tutorialFilesURL: 'https://docs.tigera.io/files',
  tmpScriptsURL: 'https://docs.tigera.io/calico-enterprise/3.17',
  prodnameWindows: 'Calico Enterprise for Windows',
  downloadsurl: 'https://downloads.tigera.io',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\TigeraCalico',
  registry: 'quay.io/',
  chart_version_name: 'v3.17.4-0',
  tigeraOperator: releases[0]['tigera-operator'],
  releases,
  imageNames: {
    node: 'tigera/cnx-node',
    kubeControllers: 'tigera/kube-controllers',
  },
  componentImage: {
    cnxNode: componentImage('cnx-node', releases[0]),
    calicoctl:componentImage('calicoctl', releases[0]), 
    calicoq: componentImage('calicoq', releases[0]),
  },
};

module.exports = variables;
