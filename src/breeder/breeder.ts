import { Agent } from '../agent/agent';

export class Breeder {

    population: Agent[] = [];

    constructor() {
    }

    createPopulation(numAgents: number, data: { dna: string; }[] = []): void {
        this.population = [];
        for (let index = numAgents; index > 0; index--) {
            this.population.push(new Agent());
        }
        if (data && data.length > 0) {
            for (let index = 0; index < Math.min(data.length, numAgents); index++) {
                this.population[index].dna = data[index].dna;
            }
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
        else {
            let newChildren = [];
            for (let index = 0; index < tempPopulation.length - 1; index += 2) {
                let parentAIndex = index;
                let parentBIndex = index + 1;
                let child1 = tempPopulation[parentAIndex].mateWith(tempPopulation[parentBIndex]);
                let child2 = tempPopulation[parentBIndex].mateWith(tempPopulation[parentAIndex]);
                newChildren.push(child1);
                newChildren.push(child2);
            }
            tempPopulation = tempPopulation.concat(newChildren);
        }
        return tempPopulation;
    }

}