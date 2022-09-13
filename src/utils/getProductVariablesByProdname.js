const variables = require('../../variables');

function getProductVariablesByProdname(prodname) {
  const productVariables = Object.values(variables)
    .filter((variables) => !!variables.prodname)
    .find((variables) => variables.prodname === prodname);

  return productVariables;
}

module.exports = getProductVariablesByProdname;
