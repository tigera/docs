const visit = require('unist-util-visit').visit;
const getVariableByFilePath = require('../utils/getVariableByFilePath');
const isVarValue = require('../utils/isVarValue');

const varRegex = RegExp(/\$\([ \t]*([\w.\/-]+)[ \t]*\)/, "g");

// This is a remark plugin which runs before all the docusaurus plugins which
// allows us to support variable substitution in all md/mdx files. We are
// 'visit'ing each 'node' in the AST (abstract syntax tree) to do a replacement
// on all text values where we see a pattern described in the regex above, such
// as {{ i_am_a_context_variable }} or {{objectInGlobal.foobar}}
// variables can be seen in @site/variables.js
function variablesPlugin(_options) {
  async function transformer(tree, file) {
    visit(
      tree,
      () => true,
      (node) => {
        for (let prop in node) {
          if (!Object.prototype.hasOwnProperty.call(node, prop)) continue;
          if (prop === 'type' || typeof node[prop] !== 'string') continue; 

          node[prop] = node[prop].replaceAll(varRegex, (match, varName) => {
            const varValue = getVariableByFilePath(file, varName);
            return isVarValue(varValue) ? varValue : match;
          });
        }
      }
    );
  }

  return transformer;
}

module.exports = variablesPlugin;
