const releases = require('./releases.json');
const { getPPARepoName, getChartVersionName, getVersion } = require('./variableUtils');

// e.g. "/master" or "/v3.23" or "/archive/v3.22" or "" if it's the latest
const versionPrefix = '/' + getVersion(releases);

const variables = {
  prodname: 'Calico',
  prodnamedash: 'calico',
  version: getVersion(releases),
  baseUrl: '/calico', // or e.g. /calico/next
  filesUrl: 'https://projectcalico.docs.tigera.io' + versionPrefix,
  prodnameWindows: 'Calico for Windows',
  nodecontainer: 'calico/node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\CalicoWindows',
  ppa_repo_name: getPPARepoName(releases),
  chart_version_name: getChartVersionName(releases),
  manifestsUrl: 'https://raw.githubusercontent.com/projectcalico/calico/v3.24.5',
  releases,
  registry: '',
  vppbranch: 'master',
  tigeraOperator: releases[0]['tigera-operator'],
  tigeraOperatorVersionShort: releases[0]['tigera-operator'].version.split('.').slice(0, 2).join('.'),
  imageNames: {
    'calico/node': 'calico/node',
    calicoctl: 'calico/ctl',
    typha: 'calico/typha',
    'calico/cni': 'calico/cni',
    'calico/apiserver': 'calico/apiserver',
    'calico/kube-controllers': 'calico/kube-controllers',
    'calico-upgrade': 'calico-upgrade',
    'calico/windows': 'calico/windows',
    flannel: 'docker.io/flannelcni/flannel',
    flannelMigration: 'calico/flannel-migration-controller',
    'calico/dikastes': 'calico/dikastes',
    'pilot-webhook': 'calico/pilot-webhook',
    flexvol: 'calico/pod2daemon-flexvol',
    'csi-driver': 'calico/csi',
    'csi-node-driver-registrar': 'calico/node-driver-registrar',
  },
};

module.exports = variables;
