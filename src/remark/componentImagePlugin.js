import path from 'path';
import { visit } from 'unist-util-visit';
import getVariableByFilePath from '../utils/getVariableByFilePath';
import componentImage from '../components/utils/componentImage';

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

export default componentImagePlugin;
