const releases = require('./releases.json');
const { getPPARepoName, getChartVersionName, getVersion } = require('./variableUtils');

const variables = {
  prodname: 'Calico Enterprise',
  prodnamedash: 'calico-enterprise',
  version: getVersion(releases),
  baseUrl: '/calico-enterprise', // or e.g. /calico-enterprise/next'
  prodnameWindows: 'Calico Enterprise for Windows',
  downloadsurl: 'https://downloads.tigera.io',
  siteUrl: 'https://docs.tigera.io', // TODO: Maybe should be renamed to `url` (https://tigera.atlassian.net/browse/DOCS-973)
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
