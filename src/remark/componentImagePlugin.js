const path = require('path');
const visit = require('unist-util-visit');
const componentImage = require(path.resolve('src/components/utils/componentImage'));
const getVariableByFilePath = require('../utils/getVariableByFilePath');

const COMPONENT_IMAGE_REGEX = new RegExp(/%%\s+component_image\(["']([\w-]+)["']\)\s+%%/, 'g');

function componentImagePlugin(_options) {
  async function transformer(tree, file) {
    const releases = getVariableByFilePath(file, 'releases');

    visit(tree, ['code', 'inlineCode'], (node) => {
      node.value = node.value.replaceAll(COMPONENT_IMAGE_REGEX, (match, comp) => {
        const image = componentImage(comp, releases[0]);

        return image || match;
      });
    });
  }

  return transformer;
}

module.exports = componentImagePlugin;
