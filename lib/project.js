const recursiveCloneAndFilter = (object, predicate, objectPath = [], knownObjects = []) => {
  if (object && !knownObjects.includes(object) && typeof object === 'object') {
    if ((object.constructor && object.constructor.name === 'Object')) {
      const currentknownObjects = knownObjects.concat([object]);
      const copy = {};
      Object.keys(object).forEach((key) => {
        const value = object[key];
        const currentPath = objectPath.concat(key);
        if (predicate(currentPath, value)) {
          copy[key] = recursiveCloneAndFilter(value, predicate, currentPath, currentknownObjects);
        }
      });
      return copy;
    }
    else if (Array.isArray(object)) {
      const copy = [];
      object.forEach((value, index) => {
        copy[index] = recursiveCloneAndFilter(value, predicate, objectPath, knownObjects);
      });
      return copy;
    }
    return object;
  }
  return object;
};

module.exports = (object, projection) => {
  const defaultPredicate = !Object.values(projection).includes(1);
  return recursiveCloneAndFilter(object, (path) => {
    const filteredPaths = Object.keys(projection).filter((ppath) => {
      const cpath = path.join('.');
      if (ppath.startsWith(cpath) || cpath.startsWith(ppath)) {
        if (defaultPredicate) {
          return (ppath === cpath && !projection[ppath] === defaultPredicate);
        }
        return (ppath === cpath || !projection[ppath] === defaultPredicate);
      }
      return false;
    });
    if (filteredPaths.length) {
      return !defaultPredicate;
    }
    return defaultPredicate;
  });
};
