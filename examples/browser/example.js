const { GeneticAlgorithm } = genetic;

const ga = new GeneticAlgorithm();

let solution = '';
let last = '';

ga.mutate = function (chromosome) {
  function replaceAt(str, index, character) {
    return (
      str.substr(0, index) + character + str.substr(index + character.length)
    );
  }

  // chromosomal drift
  const i = Math.floor(Math.random() * chromosome.length);
  return replaceAt(
    chromosome,
    i,
    String.fromCharCode(
      chromosome.charCodeAt(i) + (Math.floor(Math.random() * 2) ? 1 : -1)
    )
  );
};

ga.crossover = function (mother, father) {
  // two-point crossover
  const len = mother.length;
  let ca = Math.floor(Math.random() * len);
  let cb = Math.floor(Math.random() * len);
  if (ca > cb) {
    const tmp = cb;
    cb = ca;
    ca = tmp;
  }

  const son =
    father.substr(0, ca) + mother.substr(ca, cb - ca) + father.substr(cb);
  const daughter =
    mother.substr(0, ca) + father.substr(ca, cb - ca) + mother.substr(cb);

  return [son, daughter];
};

ga.fitness = function (chromosome) {
  let fitness = 0;

  for (let i = 0; i < chromosome.length; ++i) {
    // increase fitness for each character that matches
    if (chromosome[i] == solution[i]) fitness += 1;

    // award fractions of a point as we get warmer
    fitness +=
      (127 - Math.abs(chromosome.charCodeAt(i) - solution.charCodeAt(i))) / 50;
  }

  return fitness;
};

ga.isEvolutionCompleted = function (population) {
  // stop running once we've reached the solution
  return population[0].chromosome === solution;
};

ga.onEvolve = function (generation, population) {
  function lerp(a, b, p) {
    return a + (b - a) * p;
  }

  const value = population[0].chromosome;
  last = last || value;

  if (generation !== 0 && value === last) return;

  const solution = [];
  for (let i = 0; i < value.length; ++i) {
    const diff = value.charCodeAt(i) - last.charCodeAt(i);
    let style = 'background: transparent;';
    if (diff > 0) {
      style = 'background: rgb(0,200,50); color: #fff;';
    } else if (diff < 0) {
      style = 'background: rgb(0,100,50); color: #fff;';
    }

    solution.push('<span style="' + style + '">' + value[i] + '</span>');
  }

  let buf = '';
  buf += '<tr>';
  buf += '<td>' + generation + '</td>';
  buf += '<td>' + population[0].fitness.toPrecision(5) + '</td>';
  buf += '<td>' + solution.join('') + '</td>';
  buf += '</tr>';

  const tbody = document.querySelector('#results tbody');
  tbody.innerHTML = buf + tbody.innerHTML;

  last = value;
};

const btnSolve = document.querySelector('#solve');
btnSolve.addEventListener('click', () => {
  const tbody = document.querySelector('#results tbody');
  tbody.innerHTML = '';

  const quote = document.querySelector('#quote');
  solution = quote.value;

  function randomString(len) {
    let text = '';
    const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < len; i++)
      text += charset.charAt(Math.floor(Math.random() * charset.length));

    return text;
  }

  const populationSize = 250;
  const seeds = [];
  for (let i = 0; i < populationSize; i++) {
    // create random strings that are equal in length to solution
    seeds.push(randomString(solution.length));
  }

  last = '';
  ga.start(seeds);
});
