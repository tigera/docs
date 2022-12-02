const falsyValuesThatCouldBeVarValues = ['', 0];

module.exports = function isVarValue(varValue) {
  return !!varValue || falsyValuesThatCouldBeVarValues.includes(varValue);
};
