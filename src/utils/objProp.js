/**
 * Gets the value at `path` of `obj`.
 * @param {object} obj - The object to query.
 * @param {string} path - The path of the property to get.
 */
function objProp(obj, path) {
  return path.split('.').reduce((p, prop) => {
    if (!p) {
      return;
    }

    return p[prop];
  }, obj);
}

export default objProp;
