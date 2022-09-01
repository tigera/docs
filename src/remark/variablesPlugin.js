const path = require("path");
const visit = require("unist-util-visit");

const variables = require(path.resolve("variables"));
const objProp = require(path.resolve("src/utils/objProp"));
const varRegex = RegExp(/\{\{[ \t]*([\w.]+)[ \t]*}}/, "g");

function variablesPlugin(_options) {
  async function transformer(tree, file) {
    const contextVariables = getContextVariables(file, variables);
    visit(
      tree,
      () => true,
      (node) => {
        for (let prop in node) {
          if (!Object.prototype.hasOwnProperty.call(node, prop)) continue;
          if (prop === "type" || typeof node[prop] !== "string") continue;

          node[prop] = node[prop].replaceAll(varRegex, (match, varName) => {
            let varValue;
            for (let cv of contextVariables) {
              varValue = objProp(cv, varName);
              if (varValue) return String(varValue);
            }
            varValue = objProp(variables.global, varName);
            if (varValue) return String(varValue);
            return match;
          });
        }
      }
    );
  }

  return transformer;
}

function getContextVariables(file, variables) {
  let cvars = [];
  const dpName = "docsPathPrefix";
  const posixFriendlyPath = convertToPosixFriendlyPath(file.path);

  for (let p in variables) {
    if (!Object.prototype.hasOwnProperty.call(variables, p)) continue;
    if (typeof variables[p] !== "object") continue;
    if (!Object.prototype.hasOwnProperty.call(variables[p], dpName)) continue;
    const docsPathPrefix = variables[p][dpName];
    if (Array.isArray(docsPathPrefix)) {
      for (let dpp of docsPathPrefix) {
        if (posixFriendlyPath.includes(dpp)) {
          cvars[cvars.length] = variables[p];
        }
      }
    } else if (typeof docsPathPrefix === "string") {
      if (posixFriendlyPath.includes(docsPathPrefix)) {
        cvars[cvars.length] = variables[p];
      }
    }
  }
  return cvars;
}

function convertToPosixFriendlyPath(maybeWindowsPath) {
  return maybeWindowsPath.split(path.sep).join(path.posix.sep);
}

module.exports = variablesPlugin;
