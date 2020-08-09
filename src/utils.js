const maximize = (a, b) => a >= b;
const minimize = (a, b) => a < b;

/**
 * Make a deep copy of an object
 *
 * @param {Object} obj
 * @returns {Object}
 */
const clone = (obj) => {
  if (obj == null || typeof obj !== 'object') {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
};

const encode = (obj) =>
  JSON.stringify(obj, function (key, value) {
    if (value instanceof Function || typeof value == 'function') {
      return '__func__:' + value.toString();
    }
    if (value instanceof RegExp) {
      return '__regex__:' + value;
    }
    return value;
  });

const decode = (str) =>
  JSON.parse(str, function (key, value) {
    if (typeof value != 'string') {
      return value;
    }
    if (value.lastIndexOf('__func__:', 0) === 0) {
      return eval('(' + value.slice(9) + ')');
    }
    if (value.lastIndexOf('__regex__:', 0) === 0) {
      return eval('(' + value.slice(10) + ')');
    }
    return value;
  });

const tournamentSelection = (optimize) => (pop) => {
  const n = pop.length;
  const a = pop[Math.floor(Math.random() * n)];
  const b = pop[Math.floor(Math.random() * n)];
  return optimize(a.fitness, b.fitness) ? a.entity : b.entity;
};

export { clone, encode, decode, maximize, minimize, tournamentSelection };
