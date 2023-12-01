function componentImage(comp, release) {
  const component = release.components[comp];
  const registry = component.registry ? `${component.registry}/` : '';

  return `${registry}${component.image}:${component.version}`;
}

export default componentImage;
