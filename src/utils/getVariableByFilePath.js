const path = require('path');
const globalVariables = require(path.resolve('variables'));
const convertToPosixFriendlyPath = require('./convertToPosixFriendlyPath');
const objProp = require('./objProp');

module.exports = function getVariableByFilePath(file, varName) {
  const contextVariables = getContextVariables(file);

  let varValue = objProp(contextVariables, varName);
  if (varValue) {
    return varValue;
  }

  varValue = objProp(globalVariables, varName);
  if (varValue) {
    return varValue;
  }
};

const rootDir = path.posix.resolve('src', '..');

function getContextVariables(file) {
  const posixFriendlyPath = convertToPosixFriendlyPath(file.path);
  const pathToVersionedDocsRoot = posixFriendlyPath.match(/calico.*_versioned_docs\/version-.*?\//g);

  if (pathToVersionedDocsRoot) {
    return require(path.resolve(`${pathToVersionedDocsRoot[0]}variables.js`));
  } else if (posixFriendlyPath.includes(`${rootDir}/calico/`)) {
    return require(path.resolve('calico/variables.js'));
  } else if (posixFriendlyPath.includes(`${rootDir}/calico-cloud/`)) {
    return require(path.resolve('calico-cloud/variables.js'));
  } else if (posixFriendlyPath.includes(`${rootDir}/calico-enterprise/`)) {
    return require(path.resolve('calico-enterprise/variables.js'));
  }
}
