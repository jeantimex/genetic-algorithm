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
    this.onEvolve = null;

    this.crossoverRate = 0.3;
    this.mutationRate = 0.3;

    this.iterations = 4000;
    this.population = [];

    this.surviveFittest = true;

    this.isEvolutionCompleted = () => false;
    this.onEvolve = () => {};
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

  sortPopulation(population) {
    population.sort((a, b) => (this.optimize(a.fitness, b.fitness) ? -1 : 1));
    return population;
  }

  newEntity(chromosome) {
    return { chromosome, fitness: this.fitness(chromosome) };
  }

  evolve() {
    const mutateOrNot = (chromosome) => {
      // applies mutation based on mutation probability
      return Math.random() <= this.mutationRate && this.mutate
        ? this.mutate(clone(chromosome))
        : chromosome;
    };

    // crossover and mutate
    const newPopulation = [];

    if (this.surviveFittest)
      // lets the best solution fall through
      newPopulation.push(this.population[0]);

    while (newPopulation.length < this.population.length) {
      if (
        this.crossoverRate && // if there is a crossover function
        Math.random() <= this.crossoverRate && // base crossover on specified probability
        newPopulation.length + 1 < this.population.length // keeps us from going 1 over the max population size
      ) {
        const [mother, father] = this.selectParents(this.population);
        const children = this.crossover(clone(mother), clone(father))
          .map(mutateOrNot)
          .map(this.newEntity, this);
        newPopulation.push(...children);
      } else {
        newPopulation.push(
          this.newEntity(mutateOrNot(this.selectSingle(this.population)))
        );
      }
    }

    this.population = this.sortPopulation(newPopulation);
  }

  start(seeds) {
    // Create the first population
    this.population = this.sortPopulation(seeds.map(this.newEntity, this));

    for (let generation = 0; generation < this.iterations; generation++) {
      this.onEvolve(generation, this.population);

      if (this.isEvolutionCompleted(this.population)) break;

      this.evolve();
    }
  }
}

export { GeneticAlgorithm, OptimizeStrategy, SelectionStrategy };
