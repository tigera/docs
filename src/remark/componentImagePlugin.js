const path = require('path');
const visit = require('unist-util-visit');

const variables = require(path.resolve('variables'));
const componentImage = require(path.resolve('src/components/utils/componentImage'));
const convertToPosixFriendlyPath = require(path.resolve('src/utils/convertToPosixFriendlyPath'));

const COMPONENT_IMAGE_REGEX = new RegExp(/{%\s+component_image\(["']([\w-]+)["']\)\s+%}/, 'g');

function componentImagePlugin(_options) {
  async function transformer(tree, file) {
    const posixFriendlyPath = convertToPosixFriendlyPath(file.path);
    const prodname = detectProdnameByPath(posixFriendlyPath);

    visit(tree, ['code', 'inlineCode'], (node) => {
      node.value = node.value.replaceAll(COMPONENT_IMAGE_REGEX, (match, comp) => {
        const image = componentImage(comp, prodname);

        return image || match;
      });
    });
  }

  return transformer;
}

function detectProdnameByPath(path) {
  const pathPrefixes = {
    cloud: '/calico-cloud/',
    enterprise: '/calico-enterprise/',
    openSource: '/calico/',
  };

  if (path.includes(pathPrefixes.cloud)) {
    return variables.cloud.prodname;
  }

  if (path.includes(pathPrefixes.enterprise)) {
    return variables.enterprise.prodname;
  }

  if (path.includes(pathPrefixes.openSource)) {
    return variables.openSource.prodname;
  }
}

module.exports = componentImagePlugin;
