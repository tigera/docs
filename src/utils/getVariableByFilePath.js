const path = require('path');
const globalVariables = require(path.resolve('variables'));
import convertToPosixFriendlyPath from './convertToPosixFriendlyPath';
import objProp from './objProp';
import isVarValue from './isVarValue';

export default function getVariableByFilePath(file, varName) {
  const contextVariables = getContextVariables(file);

  let varValue = objProp(contextVariables, varName);
  if (isVarValue(varValue)) {
    return varValue;
  }

  varValue = objProp(globalVariables, varName);
  if (isVarValue(varValue)) {
    return varValue;
  }
};

const rootDir = path.posix.resolve('src', '..');

function getContextVariables(file) {
  const posixFriendlyPath = convertToPosixFriendlyPath(file.path);
  const pathToVersionedDocsRoot = posixFriendlyPath.match(/calico(-(enterprise|cloud))?_versioned_docs\/version-.*?\//g);

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
