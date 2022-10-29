const releases = require('./releases.json');
const { getPPARepoName, getChartVersionName, getVersion } = require('./variableUtils');

const variables = {
  prodname: 'Calico Cloud',
  prodnamedash: 'calico-cloud',
  version: getVersion(releases),
  baseUrl: '/calico-cloud', // or e.g. /docs/calico-cloud/archive/v3.23
  prodnameWindows: 'Calico Enterprise for Windows',
  rootDirWindows: 'C:\\TigeraCalico',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  ppa_repo_name: getPPARepoName(releases),
  chart_version_name: getChartVersionName(releases),
  clouddownloadurl: 'https://installer.calicocloud.io/manifests/v3.14.1-1',
  clouddownloadbase: 'https://installer.calicocloud.io',
  releases,
  registry: 'quay.io/',
};

module.exports = variables;
