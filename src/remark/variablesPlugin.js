const path = require("path");
const visit = require("unist-util-visit");

const variables = require(path.resolve("variables"));
const objProp = require(path.resolve("src/utils/objProp"));
const varRegex = RegExp(/\{\{[ \t]*([\w.]+)[ \t]*}}/, "g");

// This is a remark plugin which runs before all the docusaurus plugins which
// allows us to support variable substitution in all md/mdx files. We are
// 'visit'ing each 'node' in the AST (abstract syntax tree) to do a replacement
// on all text values where we see a pattern described in the regex above, such
// as {{ i_am_a_context_variable }} or {{objectInGlobal.foobar}}
// variables can be seen in @site/variables.js
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

// We enumerate through each object in 'variables' which has a 'docsPathPrefix'
// property. The 'docsPathPrefix' can be an array of strings or a string. We
// then check to see if that path prefix occurs in the current file's path. If
// so, we add that variables object to the list of objects we'll use for
// variable substitution.
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
