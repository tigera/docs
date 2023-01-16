function getVersion(releases) {
  return releases[0].title === 'master' ? 'master' : releases[0].title.split('.').slice(0, 2).join('.');
}

function getPPARepoName(releases) {
  const version = getVersion(releases);

  return version === 'master' ? 'master' : `calico-${version.slice(1)}`;
}

function getChartVersionName(releases) {
  const helmRelease = releases[0].helmRelease ? `-${releases[0].helmRelease}` : '';

  return `${releases[0].title}${helmRelease}`;
}

module.exports = {
  getVersion,
  getPPARepoName,
  getChartVersionName,
};
