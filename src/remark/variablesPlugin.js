import { visit } from 'unist-util-visit';
import getVariableByFilePath from '../utils/getVariableByFilePath';
import isVarValue from '../utils/isVarValue';

const varRegex = RegExp(/\$\[[ \t]*([\w.\/-]+)[ \t]*\]/, 'g');

async function replaceTokensWithVariables(value, file) {
  const variables = {};
  const matches = Array.from(value.matchAll(varRegex));

  for (const [token, varName] of matches) {
    variables[token] = await getVariableByFilePath(file, varName);
  }

  return value.replaceAll(varRegex, (match) => (isVarValue(variables[match]) ? variables[match] : match));
}

function isString(value) {
  return typeof value === 'string';
}

async function replaceJsExpressionVariable(item, property, file) {
  if (item.expression[property]?.type === 'Literal') {
    if (isString(item.expression[property].raw)) {
      item.expression[property].raw = await replaceTokensWithVariables(item.expression.consequent.raw, file);
    }
  } else if (item.expression[property]?.type === 'TemplateLiteral') {
    item.expression[property].quasis.forEach(async (templateLiteral) => {
      if (isString(templateLiteral.value.raw)) {
        templateLiteral.value.raw = await replaceTokensWithVariables(templateLiteral.value.raw, file);
      }
    });
  }
}

async function evaluateJsExpression(node, file) {
  const body = node.data.estree.body;

  for (const item of body) {
    if (item.type === 'ExpressionStatement' && item.expression?.type === 'ConditionalExpression') {
      const condition = item.expression.test?.left?.raw;
      if (isString(condition)) {
        item.expression.test.left.raw = await replaceTokensWithVariables(condition, file);
      }

      replaceJsExpressionVariable(item, 'consequent', file);

      replaceJsExpressionVariable(item, 'alternate', file);
    }
  }
}

async function replaceJsxElementProps(node, file) {
  for (const attribute of node.attributes) {
    if (isString(attribute.value)) {
      attribute.value = await replaceTokensWithVariables(attribute.value, file);
    }
  }
}

/**
 * This is a remark plugin which runs during the build. It visits all md/mdx files
 * and replaces a token with a variable from the variables.js. For example in
 * calico-cloud_versioned_docs, $[prodname] gets replaced with Calico Cloud,
 * from calico-cloud_versioned_docs/version-*.variables.js.
 */
export default function variablesPlugin(_options) {
  return function transformer(tree, file) {
    visit(
      tree,
      () => true,
      async (node) => {
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

          node[prop] = await replaceTokensWithVariables(node[prop], file);
        }
      }
    );
  };
}
