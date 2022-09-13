const getProductVariablesByProdname = require('../../utils/getProductVariablesByProdname');

function componentImage(comp, prodname) {
  const productVariables = getProductVariablesByProdname(prodname);

  if (!productVariables) {
    console.error(`Invalid "prodname": ${prodname}`);

    return;
  }

  const component = productVariables.components[comp];
  const registry = component.registry ? `${component.registry}/` : '';

  return `${registry}${component.image}:${component.version}`;
}

module.exports = componentImage;
