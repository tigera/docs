const releases = require('./releases.json');
const { getPPARepoName, getChartVersionName, getVersion } = require('./variableUtils');

const variables = {
  prodname: 'Calico Enterprise',
  prodnamedash: 'calico-enterprise',
  version: getVersion(releases),
  baseUrl: '/docs/calico-enterprise', // or e.g. /docs/calico-enterprise/archive/v3.23'
  prodnameWindows: 'Calico Enterprise for Windows',
  downloadsurl: 'https://downloads.tigera.io',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  rootDirWindows: 'C:\\TigeraCalico',
  registry: 'gcr.io/unique-caldron-775/cnx/',
  ppa_repo_name: getPPARepoName(releases),
  chart_version_name: getChartVersionName(releases),
  tigeraOperator: {
    image: 'tigera/operator',
    version: 'master',
    registry: 'quay.io',
  },
  releases,
};

module.exports = variables;
