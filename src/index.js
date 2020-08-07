/**
 * Genetic Algorithm
 */
class GeneticAlgorithm {
  constructor() {
    this.optimize = null;
    this.select1 = (pop) => {
      const n = pop.length;
      const a = pop[Math.floor(Math.random() * n)];
      const b = pop[Math.floor(Math.random() * n)];
      return this.optimize(a.fitness, b.fitness) ? a.entity : b.entity;
    };
    (this.select2 = (pop) => [this.select1(pop), this.select1(pop)]),
      (this.fitness = null);
    this.seed = null;
    this.mutate = null;
    this.crossover = null;
    this.generation = null;
    this.notification = null;

    this.configuration = {
      size: 250,
      crossover: 0.9,
      mutation: 0.2,
      iterations: 100,
      fittestAlwaysSurvives: true,
      maxResults: 100,
      skip: 0,
    };

    this.userData = {};
    this.internalGenState = {};

    this.entities = [];
  }

  static Optimize = {
    Maximize: (a, b) => a >= b,
    Minimize: (a, b) => a < b,
  };

  static Serialization = {
    stringify: (obj) =>
      JSON.stringify(obj, function (key, value) {
        if (value instanceof Function || typeof value == 'function') {
          return '__func__:' + value.toString();
        }
        if (value instanceof RegExp) {
          return '__regex__:' + value;
        }
        return value;
      }),
    parse: (str) =>
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
      }),
  };

  static Clone = (obj) => {
    if (obj == null || typeof obj != 'object') {
      return obj;
    }
    return JSON.parse(JSON.stringify(obj));
  };

  evolve(config, userData) {
    var k;
    for (k in config) {
      this.configuration[k] = config[k];
    }

    for (k in userData) {
      this.userData[k] = userData[k];
    }

    this.start();
  }

  start() {
    var i;
    var self = this;

    function mutateOrNot(entity) {
      // applies mutation based on mutation probability
      return Math.random() <= self.configuration.mutation && self.mutate
        ? self.mutate(GeneticAlgorithm.Clone(entity))
        : entity;
    }

    // seed the population
    for (i = 0; i < this.configuration.size; ++i) {
      this.entities.push(GeneticAlgorithm.Clone(this.seed()));
    }

    for (i = 0; i < this.configuration.iterations; ++i) {
      // reset for each generation
      this.internalGenState = {};

      // score and sort
      var pop = this.entities
        .map(function (entity) {
          return { fitness: self.fitness(entity), entity: entity };
        })
        .sort(function (a, b) {
          return self.optimize(a.fitness, b.fitness) ? -1 : 1;
        });

      // generation notification
      var mean =
        pop.reduce(function (a, b) {
          return a + b.fitness;
        }, 0) / pop.length;
      var stdev = Math.sqrt(
        pop
          .map(function (a) {
            return (a.fitness - mean) * (a.fitness - mean);
          })
          .reduce(function (a, b) {
            return a + b;
          }, 0) / pop.length
      );

      var stats = {
        maximum: pop[0].fitness,
        minimum: pop[pop.length - 1].fitness,
        mean: mean,
        stdev: stdev,
      };

      var r = this.generation
        ? this.generation(
            pop.slice(0, this.configuration['maxResults']),
            i,
            stats
          )
        : true;
      var isFinished =
        (typeof r != 'undefined' && !r) ||
        i == this.configuration.iterations - 1;

      if (
        this.notification &&
        (isFinished ||
          this.configuration['skip'] == 0 ||
          i % this.configuration['skip'] == 0)
      ) {
        this.sendNotification(
          pop.slice(0, this.configuration['maxResults']),
          i,
          stats,
          isFinished
        );
      }

      if (isFinished) break;

      // crossover and mutate
      var newPop = [];

      if (this.configuration.fittestAlwaysSurvives)
        // lets the best solution fall through
        newPop.push(pop[0].entity);

      while (newPop.length < self.configuration.size) {
        if (
          this.crossover && // if there is a crossover function
          Math.random() <= this.configuration.crossover && // base crossover on specified probability
          newPop.length + 1 < self.configuration.size // keeps us from going 1 over the max population size
        ) {
          var parents = this.select2(pop);
          var children = this.crossover(
            GeneticAlgorithm.Clone(parents[0]),
            GeneticAlgorithm.Clone(parents[1])
          ).map(mutateOrNot);
          newPop.push(children[0], children[1]);
        } else {
          newPop.push(mutateOrNot(self.select1(pop)));
        }
      }

      this.entities = newPop;
    }
  }

  sendNotification(pop, generation, stats, isFinished) {
    const response = {
      pop: pop.map(GeneticAlgorithm.Serialization.stringify),
      generation: generation,
      stats: stats,
      isFinished: isFinished,
    };

    this.notification(
      response.pop.map(GeneticAlgorithm.Serialization.parse),
      response.generation,
      response.stats,
      response.isFinished
    );
  }
}

export {
  GeneticAlgorithm,
};
