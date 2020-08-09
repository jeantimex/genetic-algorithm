import { clone, maximize, minimize, tournamentSelection } from './utils';

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
    const { optimizeStrategy, selectionStrategy, seeds } = options;

    this.optimizeStrategy = optimizeStrategy || OptimizeStrategy.Maximize;
    this.selectionStrategy = selectionStrategy || SelectionStrategy.Tournament;

    this.fitness = null;
    this.mutate = null;
    this.crossover = null;
    this.generation = null;
    this.onEvolve = null;

    this.crossoverRate = 0.3;
    this.mutationRate = 0.3;

    this.iterations = 4000;

    this.fittestAlwaysSurvives = true;

    this.population = [];
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

  get populationSize() {
    return this.population.length;
  }

  evolve(generation) {
    // score and sort by fitness
    const entities = this.population
      .map((entity) => ({
        entity,
        fitness: this.fitness(entity),
      }))
      .sort((a, b) => {
        // Put the fittest one in front of the array.
        return this.optimize(a.fitness, b.fitness) ? -1 : 1;
      });

    // generation notification
    const mean =
      entities.reduce((a, b) => {
        return a + b.fitness;
      }, 0) / this.populationSize;
    const stdev = Math.sqrt(
      entities
        .map((a) => {
          return (a.fitness - mean) * (a.fitness - mean);
        })
        .reduce((a, b) => {
          return a + b;
        }, 0) / this.populationSize
    );

    const stats = {
      maximum: entities[0].fitness,
      minimum: entities[this.populationSize - 1].fitness,
      mean,
      stdev,
    };

    const r = this.isFinished
      ? this.isFinished(entities, generation, stats)
      : false;
    const isFinished = !!r || generation == this.iterations - 1;

    this.onEvolve(entities, generation, stats, isFinished);

    if (isFinished) return true;

    const mutateOrNot = (entity) => {
      // applies mutation based on mutation probability
      return Math.random() <= this.mutationRate && this.mutate
        ? this.mutate(clone(entity))
        : entity;
    };

    // crossover and mutate
    var newPopulation = [];

    if (this.fittestAlwaysSurvives)
      // lets the best solution fall through
      newPopulation.push(entities[0].entity);

    while (newPopulation.length < this.populationSize) {
      if (
        this.crossoverRate && // if there is a crossover function
        Math.random() <= this.crossoverRate && // base crossover on specified probability
        newPopulation.length + 1 < this.populationSize // keeps us from going 1 over the max population size
      ) {
        var parents = this.selectParents(entities);
        var children = this.crossover(clone(parents[0]), clone(parents[1])).map(
          mutateOrNot
        );
        newPopulation.push(children[0], children[1]);
      } else {
        newPopulation.push(mutateOrNot(this.selectSingle(entities)));
      }
    }

    this.population = newPopulation;
  }

  start(seeds) {
    // seed the population
    this.population = seeds;

    for (let i = 0; i < this.iterations; ++i) {
      if (this.evolve(i)) {
        break;
      }
    }
  }
}

export { GeneticAlgorithm, OptimizeStrategy, SelectionStrategy };
