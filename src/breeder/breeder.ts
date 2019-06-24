import { Agent } from '../agent/agent';

export class Breeder {

    population: any[] = [];

    constructor() {
    }

    createPopulation(numAgents: number): void {
        this.population = [];
        for (let index = numAgents; index > 0; index--) {
            this.population.push(new Agent());
        }
    }

    rankPopulation(customCompareFn?: (a: any, b: any) => number): Agent[] {
        let tempPopulation = this.population.slice(0);
        // allow the ability to override the default ranking algorithm
        if (!!customCompareFn && typeof customCompareFn === 'function') {
            tempPopulation.sort(customCompareFn);
        } else {
            tempPopulation.sort(this.compare);
        }
        return tempPopulation;
    }

    compare(a: Agent, b: Agent): number {
        return a.getFitness() - b.getFitness();
    }

    selectNextGeneration(maxPopulationSize: number, customSelectFn?: () => Agent[]): Agent[] {
        let tempPopulation = this.population.slice(0, maxPopulationSize);
        if (!!customSelectFn && typeof customSelectFn === 'function') {
            tempPopulation = customSelectFn();
        }
        return tempPopulation;
    }

    matePopulation(customCrossoverFn?: () => Agent[]): Agent[] {
        let tempPopulation = this.population.slice(0);
        if (!!customCrossoverFn && typeof customCrossoverFn === 'function') {
            tempPopulation = customCrossoverFn();
        }

        return tempPopulation;
    }

}