const releases = require('./releases.json');
const componentImage = require('../src/components/utils/componentImage');

const variables = {
  releaseTitle: 'master',
  prodname: 'Calico Enterprise',
  prodnamedash: 'calico-enterprise',
  version: 'master',
  openSourceVersion: releases[0].calico.minor_version.slice(1),
  baseUrl: '/calico-enterprise/next',
  filesUrl: 'https://downloads.tigera.io/ee/master',
  rpmsUrl: 'https://downloads.tigera.io/ee/rpms/' + releases[0].title.slice(0, 5),
  tutorialFilesURL: 'https://docs.tigera.io/files',
  tmpScriptsURL: 'https://docs.tigera.io/calico-enterprise/next',
  windowsScriptsURL: 'https://raw.githubusercontent.com/kubernetes-sigs/sig-windows-tools/master/hostprocess',
  prodnameWindows: 'Calico Enterprise for Windows',
  prodnamedashWindows: 'calico-enterprise-for-windows',
  downloadsurl: 'https://downloads.tigera.io',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\TigeraCalico',
  registry: 'gcr.io/unique-caldron-775/cnx/', // Change to 'quay.io/' for new release
  envoyVersion: '1.5.0',
  chart_version_name: 'master',
  tigeraOperator: releases[0]['tigera-operator'],
  dikastesVersion: releases[0].components.dikastes.version,
  manifestsUrl: 'https://docs.tigera.io/master',
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
