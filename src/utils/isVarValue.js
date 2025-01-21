const falsyValuesThatCouldBeVarValues = ['', 0];

export default function isVarValue(varValue) {
  return !!varValue || falsyValuesThatCouldBeVarValues.includes(varValue);
}
