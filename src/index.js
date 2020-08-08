import {
  clone,
  encode,
  decode,
  maximize,
  minimize,
  tournamentSelection,
} from './utils';

const SelectionStrategy = {
  Tournament: 'Tournament',
  Random: 'Random',
  Rank: 'Rank',
};

const OptimizeStrategy = {
  Maximize: 'Maximize',
  Minimize: 'Minimize',
};

/**
 * Genetic Algorithm
 */
class GeneticAlgorithm {
  constructor(options = {}) {
    const { optimizeStrategy, selectionStrategy } = options;

    this.optimizeStrategy = optimizeStrategy || OptimizeStrategy.Maximize;
    this.selectionStrategy = selectionStrategy || SelectionStrategy.Tournament;

    this.fitness = null;
    this.seed = null;
    this.mutate = null;
    this.crossover = null;
    this.generation = null;
    this.notification = null;

    this.populationSize = 250;
    this.crossoverRate = 0.3;
    this.mutationRate = 0.3;

    this.iterations = 4000;
    this.skip = 20;
    this.maxResults = 100;

    this.fittestAlwaysSurvives = true;

    this.userData = {};
    this.internalGenState = {};

    this.entities = [];
  }

  get optimize() {
    if (this.optimizeStrategy === OptimizeStrategy.Maximize) {
      return maximize;
    }
    if (this.optimizeStrategy === OptimizeStrategy.Minimize) {
      return minimize;
    }
  }

  get selectSingle() {
    if (this.selectionStrategy === SelectionStrategy.Tournament) {
      return tournamentSelection(this.optimize);
    }
  }

  get selectParents() {
    if (this.selectionStrategy === SelectionStrategy.Tournament) {
      return (pop) => [this.selectSingle(pop), this.selectSingle(pop)];
    }
  }

  evolve(i) {
    const mutateOrNot = (entity) => {
      // applies mutation based on mutation probability
      return Math.random() <= this.mutationRate && this.mutate
        ? this.mutate(clone(entity))
        : entity;
    }

    // reset for each generation
    this.internalGenState = {};

    // score and sort
    var pop = this.entities
      .map((entity) => {
        return { fitness: this.fitness(entity), entity: entity };
      })
      .sort((a, b) => {
        return this.optimize(a.fitness, b.fitness) ? -1 : 1;
      });

    // generation notification
    var mean =
      pop.reduce((a, b) => {
        return a + b.fitness;
      }, 0) / pop.length;
    var stdev = Math.sqrt(
      pop
        .map((a) => {
          return (a.fitness - mean) * (a.fitness - mean);
        })
        .reduce((a, b) => {
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
          pop.slice(0, this.maxResults),
          i,
          stats
        )
      : true;
    var isFinished =
      (typeof r != 'undefined' && !r) ||
      i == this.iterations - 1;

    if (
      this.notification &&
      (isFinished ||
        this.skip == 0 ||
        i % this.skip == 0)
    ) {
      this.sendNotification(
        pop.slice(0, this.maxResults),
        i,
        stats,
        isFinished
      );
    }

    if (isFinished) return true;

    // crossover and mutate
    var newPop = [];

    if (this.fittestAlwaysSurvives)
      // lets the best solution fall through
      newPop.push(pop[0].entity);

    while (newPop.length < this.populationSize) {
      if (
        this.crossoverRate && // if there is a crossover function
        Math.random() <= this.crossoverRate && // base crossover on specified probability
        newPop.length + 1 < this.populationSize // keeps us from going 1 over the max population size
      ) {
        var parents = this.selectParents(pop);
        var children = this.crossover(
          clone(parents[0]),
          clone(parents[1])
        ).map(mutateOrNot);
        newPop.push(children[0], children[1]);
      } else {
        newPop.push(mutateOrNot(this.selectSingle(pop)));
      }
    }

    this.entities = newPop;
  }

  start() {
    var i;

    // seed the population
    this.entities = [];
    for (i = 0; i < this.populationSize; ++i) {
      this.entities.push(clone(this.seed()));
    }

    for (i = 0; i < this.iterations; ++i) {
      if (this.evolve(i)) {
        break;
      }
    }
  }

  sendNotification(pop, generation, stats, isFinished) {
    const response = {
      pop: pop.map(encode),
      generation: generation,
      stats: stats,
      isFinished: isFinished,
    };

    this.notification(
      response.pop.map(decode),
      response.generation,
      response.stats,
      response.isFinished
    );
  }
}

export { GeneticAlgorithm, OptimizeStrategy, SelectionStrategy };
