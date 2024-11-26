import path from 'path';
import globalVariables from '../../variables';
import convertToPosixFriendlyPath from './convertToPosixFriendlyPath';
import objProp from './objProp';
import isVarValue from './isVarValue';

async function getVariableByFilePath(file, varName) {
  const contextVariables = await getContextVariables(file);

  let varValue = objProp(contextVariables, varName);
  if (isVarValue(varValue)) {
    return varValue;
  }

  varValue = objProp(globalVariables, varName);
  if (isVarValue(varValue)) {
    return varValue;
  }
}

const rootDir = path.posix.resolve('src', '..');

async function getContextVariables(file) {
  const posixFriendlyPath = convertToPosixFriendlyPath(file.path);
  const pathToVersionedDocsRoot = posixFriendlyPath.match(
    /calico(-(enterprise|cloud))?_versioned_docs\/version-.*?\//g
  );

  if (pathToVersionedDocsRoot) {
    return import(path.resolve(`${pathToVersionedDocsRoot[0]}variables.js`));
  } else if (posixFriendlyPath.includes(`${rootDir}/calico/`)) {
    return import(require(path.resolve('calico/variables.js')));
  } else if (posixFriendlyPath.includes(`${rootDir}/calico-cloud/`)) {
    return import(require(path.resolve('calico-cloud/variables.js')));
  } else if (posixFriendlyPath.includes(`${rootDir}/calico-enterprise/`)) {
    return import(require(path.resolve('calico-enterprise/variables.js')));
  }
}

export default getVariableByFilePath;
