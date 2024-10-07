const visit = require('unist-util-visit').visit;
const getVariableByFilePath = require('../utils/getVariableByFilePath');
const isVarValue = require('../utils/isVarValue');

const varRegex = RegExp(/\$\[[ \t]*([\w.\/-]+)[ \t]*\]/, 'g');

function replaceVariable(value, file) {
  return value.replaceAll(varRegex, (match, varName) => {
    const varValue = getVariableByFilePath(file, varName);

    return isVarValue(varValue) ? varValue : match;
  });
}

function isString(value) {
  return typeof value === 'string';
}

function replaceJsExpressionVariable(item, property, file) {
  if (item.expression[property]?.type === 'Literal') {
    if (isString(item.expression[property].raw)) {
      item.expression[property].raw = replaceVariable(item.expression.consequent.raw, file);
    }
  } else if (item.expression[property]?.type === 'TemplateLiteral') {
    item.expression[property].quasis.forEach((templateLiteral) => {
      if (isString(templateLiteral.value.raw)) {
        templateLiteral.value.raw = replaceVariable(templateLiteral.value.raw, file);
      }
    });
  }
}

function evaluateJsExpression(node, file) {
  const body = node.data.estree.body;

  for (const item of body) {
    if (item.type === 'ExpressionStatement' && item.expression?.type === 'ConditionalExpression') {
      const condition = item.expression.test?.left?.raw;
      if (isString(condition)) {
        item.expression.test.left.raw = replaceVariable(condition, file);
      }

      replaceJsExpressionVariable(item, 'consequent', file);

      replaceJsExpressionVariable(item, 'alternate', file);
    }
  }
}

function replaceJsxElementProps(node, file) {
  for (const attribute of node.attributes) {
    if (isString(attribute.value)) {
      attribute.value = replaceVariable(attribute.value, file);
    }
  }
}

/**
 * This is a remark plugin which runs during the build. It visits all md/mdx files
 * and replaces a token with a variable from the variables.js. For example in
 * calico-cloud_versioned_docs, $(prodname) gets replaced with Calico Cloud,
 * from calico-cloud_versioned_docs/version-*.variables.js.
 */
function variablesPlugin(_options) {
  async function transformer(tree, file) {
    visit(
      tree,
      () => true,
      (node) => {
        if (node.type === 'mdxFlowExpression' && isString(node.value) && node.value.match(varRegex) !== null) {
          evaluateJsExpression(node, file);
          return;
        }

        if (node.type === 'mdxJsxFlowElement' && Array.isArray(node.attributes) && node.attributes.length > 0) {
          replaceJsxElementProps(node, file);
          return;
        }

        for (let prop in node) {
          if (!Object.prototype.hasOwnProperty.call(node, prop)) {
            continue;
          }

          if (prop === 'type' || !isString(node[prop])) {
            continue;
          }

          node[prop] = replaceVariable(node[prop], file);
        }
      }
    );
  }

  return transformer;
}

module.exports = variablesPlugin;
