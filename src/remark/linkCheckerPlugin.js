const visit = require('unist-util-visit');
const linkChecker = require('../utils/linkChecker')();

function linkCheckerPlugin(_options) {
  async function transformer(tree, file) {
    visit(tree, () => true, (node) => {
        for (let prop in node) {
          if (!Object.prototype.hasOwnProperty.call(node, prop)) continue;
          if (prop === 'type' || typeof node[prop] !== 'string') continue;
          linkChecker.process(node[prop]);
        }
      },
    );
  }
  return transformer;
}

function postBuild() {
  linkChecker.report();
}

module.exports = {
  remarkPlugin: linkCheckerPlugin,
  docusaurusPlugin: () => {
    return {
      postBuild,
    };
  },
};
