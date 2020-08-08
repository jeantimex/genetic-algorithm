const {GeneticAlgorithm} = genetic;

const ga = new GeneticAlgorithm();

ga.seed = function () {
  function randomString(len) {
    var text = '';
    var charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));

    return text;
  }

  // create random strings that are equal in length to solution
  return randomString(this.userData['solution'].length);
};

ga.mutate = function (entity) {
  function replaceAt(str, index, character) {
    return (
      str.substr(0, index) + character + str.substr(index + character.length)
    );
  }

  // chromosomal drift
  var i = Math.floor(Math.random() * entity.length);
  return replaceAt(
    entity,
    i,
    String.fromCharCode(
      entity.charCodeAt(i) + (Math.floor(Math.random() * 2) ? 1 : -1)
    )
  );
};

ga.crossover = function (mother, father) {
  // two-point crossover
  var len = mother.length;
  var ca = Math.floor(Math.random() * len);
  var cb = Math.floor(Math.random() * len);
  if (ca > cb) {
    var tmp = cb;
    cb = ca;
    ca = tmp;
  }

  var son =
    father.substr(0, ca) + mother.substr(ca, cb - ca) + father.substr(cb);
  var daughter =
    mother.substr(0, ca) + father.substr(ca, cb - ca) + mother.substr(cb);

  return [son, daughter];
};

ga.fitness = function (entity) {
  var fitness = 0;

  var i;
  for (i = 0; i < entity.length; ++i) {
    // increase fitness for each character that matches
    if (entity[i] == this.userData['solution'][i]) fitness += 1;

    // award fractions of a point as we get warmer
    fitness +=
      (127 -
        Math.abs(
          entity.charCodeAt(i) - this.userData['solution'].charCodeAt(i)
        )) /
      50;
  }

  return fitness;
};

ga.generation = function (pop, generation, stats) {
  // stop running once we've reached the solution
  return pop[0].entity != this.userData['solution'];
};

ga.notification = function (pop, generation, stats, isFinished) {
  function lerp(a, b, p) {
    return a + (b - a) * p;
  }

  var value = pop[0].entity;
  this.last = this.last || value;

  if (pop != 0 && value == this.last) return;

  var solution = [];
  var i;
  for (i = 0; i < value.length; ++i) {
    var diff = value.charCodeAt(i) - this.last.charCodeAt(i);
    var style = 'background: transparent;';
    if (diff > 0) {
      style = 'background: rgb(0,200,50); color: #fff;';
    } else if (diff < 0) {
      style = 'background: rgb(0,100,50); color: #fff;';
    }

    solution.push('<span style="' + style + '">' + value[i] + '</span>');
  }

  var buf = '';
  buf += '<tr>';
  buf += '<td>' + generation + '</td>';
  buf += '<td>' + pop[0].fitness.toPrecision(5) + '</td>';
  buf += '<td>' + solution.join('') + '</td>';
  buf += '</tr>';

  const tbody = document.querySelector('#results tbody');
  tbody.innerHTML = buf + tbody.innerHTML;

  this.last = value;
};

const btnSolve = document.querySelector('#solve');
btnSolve.addEventListener('click', () => {
  const tbody = document.querySelector('#results tbody');
  tbody.innerHTML = '';

  var config = {
    iterations: 4000,
    size: 250,
    crossover: 0.3,
    mutation: 0.3,
    skip: 20,
  };

  const quote = document.querySelector('#quote');
  var userData = {
    solution: quote.value,
  };

  ga.evolve(config, userData);
});
